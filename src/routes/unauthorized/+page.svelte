<script>
    import { onMount } from 'svelte';
    import { signOut } from '$lib/auth.js';
    
    const { data } = $props();
    
    let loading = false;
    
    async function handleSignOut() {
        try {
            loading = true;
            await signOut();
            // Redirect will happen automatically via auth state change
            window.location.href = '/login';
        } catch (error) {
            console.error('Sign out error:', error);
            loading = false;
        }
    }
</script>

<svelte:head>
    <title>Unauthorized - Dalton Room Finder</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
        <!-- Error Icon -->
        <div class="mb-6">
            <div class="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
            </div>
        </div>
        
        <h1 class="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
        
        <p class="text-gray-600 mb-2">Your account does not have access to this service.</p>
        
        {#if data.user?.email}
            <p class="text-sm text-gray-500 mb-6">
                Signed in as: <span class="font-medium">{data.user.email}</span>
            </p>
        {/if}
        
        <p class="text-sm text-gray-600 mb-8">
            Only accounts ending in <span class="font-medium text-gray-900">@dalton.org</span> are permitted to access the Dalton Room Finder.
        </p>
        
        <button
            onclick={handleSignOut}
            disabled={loading}
            class="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
        >
            {#if loading}
                <svg class="animate-spin h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            {:else}
                Sign Out & Try Different Account
            {/if}
        </button>
        
        <div class="mt-6">
            <img src="/DaltonLogo.png" alt="Dalton Logo" class="h-8 mx-auto opacity-50" />
        </div>
    </div>
</div>