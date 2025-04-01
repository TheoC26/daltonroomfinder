<script>
    import { sideOpenRooms, sideCal } from "$lib/state.svelte";
    
    // Dummy data for available rooms
    const rooms = [
        { number: 512, people: 12 },
        { number: 502, people: 5 },
        { number: 501, people: 8 },
        { number: 601, people: 15 },
        { number: 501, people: 7 },
        { number: 1001, people: 4 },
        { number: 1204, people: 12 },
        { number: 1205, people: 5 },
        { number: 1206, people: 8 },
        { number: 1403, people: 15 },
    ];

    // Open the room calendar when a room is selected
    function openRoomCalendar(room) {
        sideCal.room = room.number;
        sideCal.isShowing = true;
        sideOpenRooms.isShowing = false;
    }
    

</script>

<div class="fixed top-32 bottom-32 w-[19rem] z-40 rounded-xl transition-all opacity-100 right-5 scale-100 overflow-hidden">
    <div class="h-full rounded-xg flex flex-col">
        <div class="text-black py-4 pb-0">
            <h2 class="text-lg font-semibold">Available Rooms</h2>
        </div>
        
        <div class="overflow-y-scroll flex-grow py-2">
            {#each rooms as room}
                <button 
                    class="rounded-lg py-1 px-3 bg-[#E1F9D6] mb-2 transition-all hover:brightness-95 cursor-pointer w-full"
                    onclick={() => openRoomCalendar(room)}
                >
                    <div class="flex justify-between items-center">
                        <h3 class="font-medium">Room {room.number}</h3>
                    </div>
                    <div class="text-sm text-left text-gray-500 mt-1">
                        ~{room.people} people in room
                    </div>
                </button>
            {/each}
        </div>
    </div>
</div>

<style>
</style>