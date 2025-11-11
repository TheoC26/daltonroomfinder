import { createServerClient } from '@supabase/ssr';
import { redirect } from '@sveltejs/kit';

import { env } from '$env/dynamic/private';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

const supabaseUrl = PUBLIC_SUPABASE_URL;
const supabaseKey = PUBLIC_SUPABASE_ANON_KEY;

export async function handle({ event, resolve }) {
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
    
    // Get the session from Supabase
    const { data: { session }, error } = await event.locals.supabase.auth.getSession();
    
    if (error) {
        console.error('Error getting session in hooks:', error);
    }
    
    event.locals.session = session;
    event.locals.user = session?.user || null;
    
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
    if (isProtectedRoute && !session?.user) {
        throw redirect(302, '/login');
    }
    
    // If authenticated but trying to access unauthorized content with invalid email
    if (isProtectedRoute && session?.user && !session.user.email?.endsWith('@dalton.org')) {
        throw redirect(302, '/unauthorized');
    }
    
    // If authenticated with valid email and trying to access login page, redirect to home
    if (event.url.pathname === '/login' && session?.user?.email?.endsWith('@dalton.org')) {
        throw redirect(302, '/');
    }
    
    return resolve(event, {
        filterSerializedResponseHeaders(name) {
            return name === 'content-range';
        },
    });
}