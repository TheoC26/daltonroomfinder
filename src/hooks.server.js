import { createServerClient } from '@supabase/ssr';
import { redirect } from '@sveltejs/kit';

import { env } from '$env/dynamic/private';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

const supabaseUrl = PUBLIC_SUPABASE_URL;
const supabaseKey = PUBLIC_SUPABASE_ANON_KEY;

// If Supabase is not configured, allow access for development
const isSupabaseConfigured = supabaseUrl && supabaseKey && 
    supabaseUrl !== 'https://test.supabase.co' && 
    supabaseKey !== 'test-key';

export async function handle({ event, resolve }) {
    // Skip auth for static assets and API routes
    if (event.url.pathname.startsWith('/static/') || 
        event.url.pathname.startsWith('/_app/') ||
        event.url.pathname.includes('.')) {
        return resolve(event);
    }

    console.log('Processing route:', event.url.pathname);

    // If Supabase is not properly configured, skip auth checks for development
    if (!isSupabaseConfigured) {
        console.log('Supabase not configured - skipping auth checks');
        event.locals.session = null;
        event.locals.user = null;
        event.locals.supabase = null;
        return resolve(event);
    }

    // Create a Supabase client for the server
    event.locals.supabase = createServerClient(supabaseUrl, supabaseKey, {
        cookies: {
            get: (key) => event.cookies.get(key),
            set: (key, value, options) => {
                event.cookies.set(key, value, { ...options, path: '/' });
            },
            remove: (key, options) => {
                event.cookies.delete(key, { ...options, path: '/' });
            }
        }
    });
    
    // Get the session and authenticated user from Supabase
    const { data: { session }, error: sessionError } = await event.locals.supabase.auth.getSession();
    
    if (sessionError) {
        console.error('Error getting session in hooks:', sessionError);
    }
    
    // Get authenticated user data (more secure than using session.user)
    let authenticatedUser = null;
    if (session) {
        const { data: { user }, error: userError } = await event.locals.supabase.auth.getUser();
        if (userError) {
            console.error('Error getting user in hooks:', userError);
        } else {
            authenticatedUser = user;
        }
    }
    
    console.log('Auth status - Session exists:', !!session, 'User:', authenticatedUser?.email);
    
    event.locals.session = session;
    event.locals.user = authenticatedUser;
    
    // Define protected routes that require authentication
    const protectedRoutes = ['/']; // The main page requires auth
    const publicRoutes = ['/login', '/unauthorized', '/auth/callback'];
    
    const isProtectedRoute = protectedRoutes.some(route => 
        event.url.pathname === route || event.url.pathname.startsWith(route + '/')
    );
    
    const isPublicRoute = publicRoutes.some(route => 
        event.url.pathname === route || event.url.pathname.startsWith(route + '/')
    );
    
    // If trying to access a protected route without being authenticated
    if (isProtectedRoute && !authenticatedUser) {
        console.log('Redirecting to login - no user authenticated');
        throw redirect(302, '/login');
    }
    
    // Check if user has valid email (Dalton domain or test email)
    const hasValidEmail = authenticatedUser?.email?.endsWith('@dalton.org') || 
                         authenticatedUser?.email === 'theo.htf.chan@gmail.com';
    
    // If authenticated but trying to access unauthorized content with invalid email
    if (isProtectedRoute && authenticatedUser && !hasValidEmail) {
        console.log('Redirecting to unauthorized - invalid email domain:', authenticatedUser.email);
        throw redirect(302, '/unauthorized');
    }
    
    // If authenticated with valid email and trying to access login page, redirect to home
    if (event.url.pathname === '/login' && hasValidEmail) {
        console.log('Redirecting to home - user already logged in with valid email');
        throw redirect(302, '/');
    }
    
    return resolve(event, {
        filterSerializedResponseHeaders(name) {
            return name === 'content-range';
        },
    });
}