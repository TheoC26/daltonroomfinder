import { redirect } from '@sveltejs/kit';

export async function GET({ url, locals }) {
    const code = url.searchParams.get('code');
    
    if (code) {
        const supabase = locals.supabase;
        
        // Exchange the code for a session
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);
        
        if (error) {
            console.error('Error exchanging code for session:', error);
            throw redirect(302, '/login?error=auth_error');
        }
        
        // Check if the user has a valid Dalton email
        if (data.user && data.user.email?.endsWith('@dalton.org')) {
            // Valid Dalton user, redirect to home
            throw redirect(302, '/');
        } else {
            // Invalid email, redirect to unauthorized page
            throw redirect(302, '/unauthorized');
        }
    }
    
    // If no code, redirect back to login
    throw redirect(302, '/login');
}