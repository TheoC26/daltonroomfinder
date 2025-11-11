import { writable } from 'svelte/store';
import { supabase } from './supabase.js';

// Create reactive stores for authentication state
export const user = writable(null);
export const isLoading = writable(true);

// Initialize authentication state
export async function initializeAuth() {
    try {
        // Get authenticated user data (more secure than using session.user)
        const { data: { user: currentUser }, error } = await supabase.auth.getUser();
        
        if (error) {
            console.error('Error getting user:', error);
            user.set(null);
        } else {
            user.set(currentUser);
        }
        
        // Listen for auth state changes
        supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('Auth state changed:', event);
            
            // Get fresh user data on auth state change
            if (session) {
                const { data: { user: freshUser }, error: userError } = await supabase.auth.getUser();
                if (userError) {
                    console.error('Error getting user on auth change:', userError);
                    user.set(null);
                } else {
                    console.log('User authenticated:', freshUser?.email);
                    user.set(freshUser);
                }
            } else {
                user.set(null);
            }
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

// Check if user has valid email (Dalton domain or test email)
export function hasValidDaltonEmail(user) {
    return user?.email?.endsWith('@dalton.org') || 
           user?.email === 'theo.htf.chan@gmail.com' || 
           false;
}

// Get user's authentication status
export function getAuthStatus(user) {
    if (!user) return 'unauthenticated';
    if (!hasValidDaltonEmail(user)) return 'unauthorized';
    return 'authenticated';
}