<script>
	import '../app.css';
	import '@fontsource/poppins/100.css';
	import '@fontsource/poppins/200.css';
	import '@fontsource/poppins/300.css';
	import '@fontsource/poppins/400.css';
	import '@fontsource/poppins/500.css';
	import '@fontsource/poppins/600.css';
	import '@fontsource/poppins/700.css';
	import '@fontsource/poppins/800.css';
	import '@fontsource/poppins/900.css';
	import { onMount } from 'svelte';
	import { initializeAuth, user } from '$lib/auth.js';
	import { supabase } from '$lib/supabase.js';
	
	let { children, data } = $props();
	
	// Initialize authentication on app startup
	onMount(async () => {
		// Set initial user state from server data
		if (data.user) {
			user.set(data.user);
		}
		
		// Initialize auth listeners
		await initializeAuth();
	});
</script>

<svelte:head>
	<title>Dalton Room Finder</title>
	<meta property="description" content="Find empty rooms at Dalton!" />
</svelte:head>

{@render children()}
