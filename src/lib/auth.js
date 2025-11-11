import { writable } from 'svelte/store';
import { supabase } from './supabase.js';

// Create reactive stores for authentication state
export const user = writable(null);
export const isLoading = writable(true);

// Initialize authentication state
export async function initializeAuth() {
    try {
        // Get current session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
            console.error('Error getting session:', error);
            user.set(null);
        } else {
            user.set(session?.user || null);
        }
        
        // Listen for auth state changes
        supabase.auth.onAuthStateChange((event, session) => {
            console.log('Auth state changed:', event, session?.user?.email);
            user.set(session?.user || null);
            isLoading.set(false);
        });
        
    } catch (error) {
        console.error('Error initializing auth:', error);
        user.set(null);
    } finally {
        isLoading.set(false);
    }
}

// Sign in with Google
export async function signInWithGoogle() {
    try {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            }
        });
        
        if (error) {
            console.error('Error signing in with Google:', error);
            throw error;
        }
    } catch (error) {
        console.error('Sign in error:', error);
        throw error;
    }
}

// Sign out
export async function signOut() {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error signing out:', error);
            throw error;
        }
    } catch (error) {
        console.error('Sign out error:', error);
        throw error;
    }
}

// Check if user has valid Dalton email
export function hasValidDaltonEmail(user) {
    return user?.email?.endsWith('@dalton.org') || false;
}

// Get user's authentication status
export function getAuthStatus(user) {
    if (!user) return 'unauthenticated';
    if (!hasValidDaltonEmail(user)) return 'unauthorized';
    return 'authenticated';
}