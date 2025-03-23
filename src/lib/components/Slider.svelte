<script>
	import { selectedDateTime } from '$lib/stores/dateTime';
	import { selectedDate } from '$lib/state.svelte.js';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { Draggable } from 'gsap/Draggable';

	let sliderContainer;
	let isDragging = false;

	// 143 ticks for every 10 minutes in 24 hours
	const totalTicks = 143;
	const minutesPerTick = 10;

	$effect(() => {
		const date = selectedDate.date;
		const totalMinutes = date.getHours() * 60 + date.getMinutes();
		const newPos = mapRange(totalMinutes, 10, 1430, 300, -1122);

		gsap.set(sliderContainer, { x: `${newPos}px` });
	});

	onMount(() => {
		gsap.registerPlugin(Draggable);

		// Calculate initial position based on current time
		const date = selectedDate.date;
		const totalMinutes = date.getHours() * 60 + date.getMinutes();
		console.log('totalMinutes', totalMinutes);
		const initialX = mapRange(totalMinutes, 10, 1430, 300, -1122);

		gsap.set(sliderContainer, { x: `${initialX}px` });

		Draggable.create(sliderContainer, {
			type: 'x',
			bounds: { minX: -1122, maxX: 300 }, // Adjust these values as needed
			inertia: true,
			onDrag: function () {
				updateTimeFromSlider(this.x);
			},
			onDragEnd: function () {
				isDragging = false;
			},
			onDragStart: function () {
				isDragging = true;
			}
		});
	});

	function mapRange(value, fromMin, fromMax, toMin, toMax) {
		return ((value - fromMin) * (toMax - toMin)) / (fromMax - fromMin) + toMin;
	}

	function updateTimeFromSlider(x) {
		// Convert position to time
		const realX = mapRange(x, 300, -1132, 0, 100);
		const tickPosition = (realX / 100) * totalTicks;
		const totalMinutes = Math.round(tickPosition * minutesPerTick) + 10;

		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;

		const newDate = new Date(selectedDate.date);
		newDate.setHours(hours, minutes);
		selectedDate.date = newDate;
	}
</script>

<div class="relative h-6 w-[600px] overflow-hidden">
	<!-- <div class="absolute left-1/2 w-0.5 h-6 bg-black -translate-x-1/2"></div> -->
	<div
		bind:this={sliderContainer}
		class="fixed flex cursor-grab items-center active:cursor-grabbing"
	>
		<!-- {#each Array(144) as _, i}
			<div 
				class="w-[2px] mx-1 rounded-full {i % 6 === 0 ? 'h-6 bg-[#626262]' : 'h-4 bg-[#BCBCBC]'}" 
			></div>
		{/each} -->
		<svg
			width="1432"
			height="26"
			viewBox="0 0 1432 26"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M1 22L1 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M11 22L11 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M21 24L21 2" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M31 22L31 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M41 22L41 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M51 25L51 1" stroke="#626262" stroke-width="2" stroke-linecap="round" />
			<path d="M61 22L61 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M71 22L71 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M81 24L81 2" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M91 22L91 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M101 22L101 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M111 25L111 1" stroke="#626262" stroke-width="2" stroke-linecap="round" />
			<path d="M121 22L121 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M131 22L131 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M141 24L141 2" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M151 22L151 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M161 22L161 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M171 25L171 1" stroke="#626262" stroke-width="2" stroke-linecap="round" />
			<path d="M181 22L181 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M191 22L191 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M201 24L201 2" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M211 22L211 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M221 22L221 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M231 25L231 1" stroke="#626262" stroke-width="2" stroke-linecap="round" />
			<path d="M241 22L241 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M251 22L251 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M261 24L261 2" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M271 22L271 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M281 22L281 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M291 25L291 1" stroke="#626262" stroke-width="2" stroke-linecap="round" />
			<path d="M301 22L301 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M311 22L311 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M321 24L321 2" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M331 22L331 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M341 22L341 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M351 25L351 1" stroke="#626262" stroke-width="2" stroke-linecap="round" />
			<path d="M361 22L361 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M371 22L371 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M381 24L381 2" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M391 22L391 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M401 22L401 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M411 25L411 1" stroke="#626262" stroke-width="2" stroke-linecap="round" />
			<path d="M421 22L421 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M431 22L431 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M441 24L441 2" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M451 22L451 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M461 22L461 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M471 25L471 1" stroke="#626262" stroke-width="2" stroke-linecap="round" />
			<path d="M481 22L481 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M491 22L491 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M501 24L501 2" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M511 22L511 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M521 22L521 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M531 25L531 1" stroke="#626262" stroke-width="2" stroke-linecap="round" />
			<path d="M541 22L541 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M551 22L551 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M561 24L561 2" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M571 22L571 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M581 22L581 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M591 25L591 1" stroke="#626262" stroke-width="2" stroke-linecap="round" />
			<path d="M601 22L601 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M611 22L611 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M621 24L621 2" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M631 22L631 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M641 22L641 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M651 25L651 1" stroke="#626262" stroke-width="2" stroke-linecap="round" />
			<path d="M661 22L661 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M671 22L671 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M681 24L681 2" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M691 22L691 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M701 22L701 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M711 25L711 1" stroke="#626262" stroke-width="2" stroke-linecap="round" />
			<path d="M721 22L721 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M731 22L731 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M741 24L741 2" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M751 22L751 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M761 22L761 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M771 25L771 1" stroke="#626262" stroke-width="2" stroke-linecap="round" />
			<path d="M781 22L781 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M791 22L791 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M801 24L801 2" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M811 22L811 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M821 22L821 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M831 25L831 1" stroke="#626262" stroke-width="2" stroke-linecap="round" />
			<path d="M841 22L841 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M851 22L851 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M861 24L861 2" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M871 22L871 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M881 22L881 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M891 25L891 1" stroke="#626262" stroke-width="2" stroke-linecap="round" />
			<path d="M901 22L901 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M911 22L911 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M921 24L921 2" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M931 22L931 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M941 22L941 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M951 25L951 1" stroke="#626262" stroke-width="2" stroke-linecap="round" />
			<path d="M961 22L961 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M971 22L971 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M981 24L981 2" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M991 22L991 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M1001 22L1001 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M1011 25L1011 1" stroke="#626262" stroke-width="2" stroke-linecap="round" />
			<path d="M1021 22L1021 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M1031 22L1031 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M1041 24L1041 2" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M1051 22L1051 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M1061 22L1061 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M1071 25L1071 1" stroke="#626262" stroke-width="2" stroke-linecap="round" />
			<path d="M1081 22L1081 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M1091 22L1091 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M1101 24L1101 2" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M1111 22L1111 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M1121 22L1121 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M1131 25L1131 1" stroke="#626262" stroke-width="2" stroke-linecap="round" />
			<path d="M1141 22L1141 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M1151 22L1151 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M1161 24L1161 2" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M1171 22L1171 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M1181 22L1181 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M1191 25L1191 1" stroke="#626262" stroke-width="2" stroke-linecap="round" />
			<path d="M1201 22L1201 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M1211 22L1211 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M1221 24L1221 2" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M1231 22L1231 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M1241 22L1241 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M1251 25L1251 1" stroke="#626262" stroke-width="2" stroke-linecap="round" />
			<path d="M1261 22L1261 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M1271 22L1271 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M1281 24L1281 2" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M1291 22L1291 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M1301 22L1301 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M1311 25L1311 1" stroke="#626262" stroke-width="2" stroke-linecap="round" />
			<path d="M1321 22L1321 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M1331 22L1331 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M1341 24L1341 2" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M1351 22L1351 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M1361 22L1361 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M1371 25L1371 1" stroke="#626262" stroke-width="2" stroke-linecap="round" />
			<path d="M1381 22L1381 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M1391 22L1391 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M1401 24L1401 2" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M1411 22L1411 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path d="M1421 22L1421 4" stroke="#BCBCBC" stroke-width="2" stroke-linecap="round" />
			<path
				d="M1431 25L1431 1"
				stroke="#626262"
				stroke-width="2"
				stroke-linecap="round"
				opacity="0"
			/>
		</svg>
	</div>
</div>
