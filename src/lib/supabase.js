import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

// Use PUBLIC_ variables for client-side, fallback to VITE_ for backward compatibility
const supabaseUrl = PUBLIC_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = PUBLIC_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
	throw new Error('Missing Supabase environment variables');
}

export const supabase = createBrowserClient(supabaseUrl, supabaseKey);

export function createSupabaseServerClient(fetch) {
	return createServerClient(supabaseUrl, supabaseKey, {
		cookies: {
			get: (key) => {
				// In SvelteKit, we need to handle cookies differently in server context
				if (isBrowser) {
					return document.cookie
						.split('; ')
						.find(row => row.startsWith(`${key}=`))
						?.split('=')[1];
				}
				return null;
			},
			set: (key, value, options) => {
				if (isBrowser) {
					document.cookie = `${key}=${value}; ${Object.entries(options).map(([k, v]) => `${k}=${v}`).join('; ')}`;
				}
			},
			remove: (key, options) => {
				if (isBrowser) {
					document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; ${Object.entries(options).map(([k, v]) => `${k}=${v}`).join('; ')}`;
				}
			}
		}
	});
}
