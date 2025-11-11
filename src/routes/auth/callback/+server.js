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
        
        // Get authenticated user data (more secure than using data.user from session)
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
            console.error('Error getting user after auth:', userError);
            throw redirect(302, '/login?error=user_error');
        }
        
        // Check if the user has a valid email (Dalton domain or test email)
        const hasValidEmail = user?.email?.endsWith('@dalton.org') || 
                             user?.email === 'theo.htf.chan@gmail.com';
        
        if (user && hasValidEmail) {
            // Valid user, redirect to home
            throw redirect(302, '/');
        } else {
            // Invalid email, redirect to unauthorized page
            throw redirect(302, '/unauthorized');
        }
    }
    
    // If no code, redirect back to login
    throw redirect(302, '/login');
}