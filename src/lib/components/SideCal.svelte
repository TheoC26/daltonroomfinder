<script>
    import { sideCal, sideOpenRooms } from "$lib/state.svelte";
    // Dummy calendar data with start and end times
    const events = [
        {
            title: "Team Meeting",
            start: "09:00",
            end: "12:00",
            color: "bg-blue-200"
        },
        {
            title: "Lunch with Client",
            start: "12:30",
            end: "14:00",
            color: "bg-green-200"
        },
        {
            title: "Project Review",
            start: "15:00",
            end: "16:00",
            color: "bg-purple-200"
        }
    ];

    // Get current date and time
    const today = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));
    const roomNumber = "1401"


    const timeSlots = Array.from({ length: 40 }, (_, i) => {
        const hour = Math.floor(i / 4) + 8;
        const minute = (i % 4) * 15;
        return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    });

    $: currentTime = `${today.getHours().toString().padStart(2, '0')}:${today.getMinutes().toString().padStart(2, '0')}`;
    $: currentTimePosition = `${((today.getHours() - 8) * 60 + today.getMinutes()) / 600 * 100}%`;


    function getEventStyle(start, end) {
        const [startHour, startMin] = start.split(':').map(Number);
        const [endHour, endMin] = end.split(':').map(Number);
        
        const startMinutes = (startHour - 8) * 60 + startMin;
        const endMinutes = (endHour - 8) * 60 + endMin;
        
        const top = `${(startMinutes / 600) * 100}%`;
        const height = `${((endMinutes - startMinutes) / 600) * 100}%`;
        
        return `top: ${top}; height: ${height};`;
    }

    function closeCal() {
        sideCal.isShowing = false;
        sideOpenRooms.isShowing = true;
    }
</script>

<div class="fixed top-24 bottom-32 w-80 z-40 shadow-2xl rounded-xl transition-all {sideCal.isShowing ? "opacity-100 right-5 scale-100" : "opacity-0 right-0 scale-95 pointer-events-none"}">
    <div class="fixed right-3 top-3">
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button class="p-2 bg-white rounded-full cursor-pointer" onclick={closeCal}>
            <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </button>
    </div>
    <div class="bg-white h-full p-4 flex rounded-xl flex-col">
        <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold">Room {sideCal.room}</h2>
        </div>
        
        <div class="flex-1 relative">
            <!-- Time slots -->
            {#each timeSlots as time}
                {@const isHour = time.endsWith('00')}
                <div class="absolute right-0 border-t {isHour ? "border-1 left-8 border-gray-200" : "left-0 border-gray-100"}" style="top: {(timeSlots.indexOf(time) / 40) * 100}%">
                    {#if isHour}
                        <span class="absolute -top-2 -left-9 text-xs text-gray-500">
                            {time.split(':')[0] < 13 ? time.split(':')[0] : time.split(':')[0] - 12}:00
                        </span>
                    {/if}
                </div>
            {/each}

            <!-- Current time indicator -->
            <div class="absolute w-[calc(100%-3rem)] right-2 border-t-2 border-red-500 z-10" style="top: {currentTimePosition};">
                <div class="absolute -left-3 -top-[9px] w-4 h-4 rounded-full bg-red-500"></div>
            </div>

            <!-- Events -->
            {#each events as event}
                <div 
                    class="absolute w-[calc(100%-3rem)] right-2 rounded-lg py-0.5 px-2 {event.color} hover:brightness-95 cursor-pointer"
                    style={getEventStyle(event.start, event.end)}
                >
                    <p class="font-medium text-sm">{event.title}</p>
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
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }
</style>