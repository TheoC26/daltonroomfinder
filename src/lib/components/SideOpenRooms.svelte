<script>
	import { sideOpenRooms, sideCal, roomData } from '$lib/state.svelte';

	// Open the room calendar when a room is selected
	function openRoomCalendar(room) {
		sideCal.room = room;
		sideCal.isShowing = true;
	}

    function closeSideOpenRooms() {
        sideOpenRooms.isShowing = false;
    }
    function openSideOpenRooms() {
        sideOpenRooms.isShowing = true;
    }
</script>

<!-- svelte-ignore a11y_consider_explicit_label -->
<button class="fixed block lg:hidden right-3 top-16 rounded-lg bg-[#E1F9D6] px-3 py-1 cursor-pointer" onclick={openSideOpenRooms}>Show Current Available Rooms</button>

<div
	class="fixed top-32 right-5 bottom-32 z-40 w-[19rem] scale-100 overflow-hidden rounded-xl backdrop-blur-md transition-all lg:opacity-100 lg:block {sideOpenRooms.isShowing
		? 'right-5 scale-100 opacity-100 block'
		: 'right-0 scale-95 opacity-0 hidden'}"
>
	<div class="fixed top-3 right-3 block lg:hidden">
		<!-- svelte-ignore a11y_consider_explicit_label -->
		<button class="cursor-pointer" onclick={closeSideOpenRooms}>
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
	<div class="rounded-xg flex h-full flex-col">
		<div class="py-4 pb-0 text-black">
			<h2 class="text-lg font-semibold">Available Rooms</h2>
		</div>

		<div class="flex-grow overflow-y-scroll py-2">
			<!-- map through roomData -->
			{#each roomData.freeRooms as room}
				<button
					class="mb-2 w-full cursor-pointer rounded-lg bg-[#E1F9D6] px-3 py-1 transition-all hover:brightness-95"
					onclick={() => openRoomCalendar(room)}
				>
					<div class="flex items-center justify-between">
						<h3 class="font-medium">Room {room}</h3>
					</div>
				</button>
			{/each}
		</div>
	</div>
</div>

<style>
</style>
