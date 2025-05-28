<script>
	import { sideCal, sideOpenRooms, roomData, selectedDate } from '$lib/state.svelte';

	let events = $state([]);

	// whenever sideCal.room changes, update the events
	$effect(() => {
		if (sideCal && roomData.rooms[sideCal.room]) {
			console.log('sideCal.room', sideCal.room, sideCal.isShowing);
			events = roomData.rooms[sideCal.room].events;
		}
	});

	function updateEvents() {
		if (sideCal && roomData.rooms[sideCal.room]) {
			events = roomData.rooms[sideCal.room].events;
		}
	}

	// Get current date and time
	const today = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));
	const roomNumber = '1401';

	const timeSlots = Array.from({ length: 48 }, (_, i) => {
		const hour = Math.floor(i / 4) + 7;
		const minute = (i % 4) * 15;
		return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
	});

	const currentTime = $derived(
		`${today.getHours().toString().padStart(2, '0')}:${today.getMinutes().toString().padStart(2, '0')}`
	);
	const currentTimePosition = $derived(
		`${(((today.getHours() - 7) * 60 + today.getMinutes()) / 720) * 100}%`
	);
	const selectedTime = $derived(
		`${selectedDate.date.getHours().toString().padStart(2, '0')}:${selectedDate.date.getMinutes().toString().padStart(2, '0')}`
	);
	const selectedTimePosition = $derived(
		`${(((selectedDate.date.getHours() - 7) * 60 + selectedDate.date.getMinutes()) / 720) * 100}%`
	);

	function getEventStyle(start, end) {
		const startHour = new Date(start).getHours();
		const startMin = new Date(start).getMinutes();
		const endHour = new Date(end).getHours();
		const endMin = new Date(end).getMinutes();

		const startMinutes = (startHour - 7) * 60 + startMin;
		const endMinutes = (endHour - 7) * 60 + endMin;

		const top = `${(startMinutes / 720) * 100}%`;
		const height = `${((endMinutes - startMinutes) / 720) * 100}%`;

		return `top: ${top}; height: ${height};`;
	}

	function closeCal() {
		sideCal.isShowing = false;
		sideOpenRooms.isShowing = true;
	}
</script>

<div
	class="fixed top-24 bottom-24 z-40 w-80 overflow-clip rounded-xl shadow-2xl transition-all {sideCal.isShowing
		? 'right-5 scale-100 opacity-100'
		: 'pointer-events-none right-0 scale-95 opacity-0'}"
>
	<div class="fixed top-3 right-3">
		<!-- svelte-ignore a11y_consider_explicit_label -->
		<button class="cursor-pointer rounded-full bg-white p-2" onclick={closeCal}>
			<svg
				class="h-6 w-6 text-gray-500"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				></path>
			</svg>
		</button>
	</div>
	<div class="flex h-full flex-col rounded-xl bg-white p-4">
		<div class="mb-4 flex items-center justify-between">
			<h2 class="text-lg font-semibold">Room {sideCal.room}</h2>
		</div>

		<div class="relative flex-1">
			<!-- Time slots -->
			{#each timeSlots as time}
				{@const isHour = time.endsWith('00')}
				<div
					class="absolute right-0 border-t {isHour
						? 'left-8 border-1 border-gray-200'
						: 'left-0 border-gray-100'}"
					style="top: {(timeSlots.indexOf(time) / 48) * 100}%"
				>
					{#if isHour}
						<span class="absolute -top-2 -left-9 text-xs text-gray-500">
							{time.split(':')[0] < 13 ? time.split(':')[0] : time.split(':')[0] - 12}:00
						</span>
					{/if}
				</div>
			{/each}

			<!-- Current time indicator -->
			<div
				class="absolute right-2 z-10 w-[calc(100%-3rem)] border-t-2 border-red-500"
				style="top: {currentTimePosition};"
			>
				<div class="absolute -top-[9px] -left-3 h-4 w-4 rounded-full bg-red-500"></div>
			</div>

			<!-- Selected time indicator -->
             {#if currentTime !== selectedTime}
			<div
				class="absolute right-2 z-10 w-[calc(100%-3rem)] border-t-2 border-black"
				style="top: {selectedTimePosition};"
			>
				<div class="absolute -top-[9px] -left-3 h-4 w-4 rounded-full bg-black"></div>
			</div>
            {/if}

			<!-- Events -->
			{#each events as event}
				<div
					class="absolute right-2 w-[calc(100%-3rem)] rounded-lg bg-[#F0CBCB] px-2 py-0.5"
					style={getEventStyle(event.start.dateTime, event.end.dateTime)}
				>
					<p class="text-sm font-medium">Occupied</p>
					<!-- <p class="text-xs text-gray-600">{event.start} - {event.end}</p> -->
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	/* Hide scrollbar for Chrome, Safari and Opera */
	.overflow-y-auto::-webkit-scrollbar {
		display: none;
	}

	/* Hide scrollbar for IE, Edge and Firefox */
	.overflow-y-auto {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
</style>
