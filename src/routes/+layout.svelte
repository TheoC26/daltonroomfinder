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
	let { children } = $props();
</script>

<svelte:head>
	<title>Dalton Room Finder</title>
	<meta property="description" content="Find empty rooms at Dalton!" />
</svelte:head>

{@render children()}
