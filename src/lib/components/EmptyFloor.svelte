<script>
	function handleClick() {
		console.log('Floor1');
	}

	let { scaler } = $props();
</script>

<div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
	<svg
		width={804 * scaler}
		height={480 * scaler}
		viewBox="0 0 804 480"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M784.869 467.5H9.13086L397 237.904L784.869 467.5ZM392.092 235L2.5 465.614V4.38477L392.092 235ZM791.5 465.614L401.907 235L791.5 4.38477V465.614ZM784.869 2.5L397 232.095L9.13086 2.5H784.869Z" fill="#ffffff" stroke="black" stroke-width="6"/>
	</svg>
</div>
