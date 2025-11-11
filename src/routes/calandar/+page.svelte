<script>
  import { onMount } from 'svelte';
  
  // Access the data passed from load function
  export let data;

  console.log(data.freeRooms)
  
  // Local state
  let selectedRoom = null;
  let searchTerm = '';
  let viewMode = 'grid'; // 'grid' or 'list'
  let sortBy = 'roomNumber'; // 'roomNumber' or 'eventCount'
  
  // Format date for display
  function formatDateTime(dateTimeStr) {
    if (!dateTimeStr) return '';
    const date = new Date(dateTimeStr);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  }
  
  // Filter events happening today
  function isToday(dateTimeStr) {
    if (!dateTimeStr) return false;
    const today = new Date();
    const eventDate = new Date(dateTimeStr);
    return (
      eventDate.getDate() === today.getDate() &&
      eventDate.getMonth() === today.getMonth() &&
      eventDate.getFullYear() === today.getFullYear()
    );
  }
  
  // Get room events, sorted by time
  function getRoomEvents(roomId) {
    const room = data?.rooms?.[roomId];
    if (!room) return [];
    
    return [...room.events].sort((a, b) => {
      return new Date(a.start.dateTime) - new Date(b.start.dateTime);
    });
  }
  
  // Get event duration in hours
  function getEventDuration(event) {
    const start = new Date(event.start.dateTime);
    const end = new Date(event.end.dateTime);
    return (end - start) / (1000 * 60 * 60);
  }

  // Get filtered and sorted room list
  $: roomList = Object.keys(data?.rooms || {})
    .filter(roomId => {
      if (!searchTerm) return true;
      return roomId.toString().toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      if (sortBy === 'eventCount') {
        return (data.rooms[b]?.events?.length || 0) - (data.rooms[a]?.events?.length || 0);
      } else {
        // Convert to number for proper sorting (except for special rooms)
        const aNum = isNaN(Number(a)) ? a : Number(a);
        const bNum = isNaN(Number(b)) ? b : Number(b);
        return aNum > bNum ? 1 : -1;
      }
    });
    
  // Get room availability status
  function getRoomStatus(roomId) {
    const events = getRoomEvents(roomId);
    const now = new Date();
    
    for (const event of events) {
      const start = new Date(event.start.dateTime);
      const end = new Date(event.end.dateTime);
      
      if (now >= start && now < end) {
        return 'occupied';
      }
      
      // Next event is within 30 minutes
      if (now < start && (start - now) < 30 * 60 * 1000) {
        return 'soon';
      }
    }
    
    return 'available';
  }
  
  onMount(() => {
    // Set the default selected room to the first room if available
    if (roomList.length > 0) {
      selectedRoom = roomList[0];
    }
  });
</script>

<svelte:head>
  <title>Room Schedule Viewer</title>
</svelte:head>

<div class="container">
  <header>
    <h1>Room Schedule Viewer</h1>
    <div class="controls">
      <div class="search-box">
        <input
          type="text"
          bind:value={searchTerm}
          placeholder="Search rooms..."
        />
      </div>
      
      <div class="view-controls">
        <select bind:value={sortBy}>
          <option value="roomNumber">Sort by Room #</option>
          <option value="eventCount">Sort by Event Count</option>
        </select>
        
        <div class="view-toggle">
          <button
            class:active={viewMode === 'grid'}
            onclick={() => viewMode = 'grid'}
          >
            Grid View
          </button>
          <button
            class:active={viewMode === 'list'}
            onclick={() => viewMode = 'list'}
          >
            List View
          </button>
        </div>
      </div>
    </div>
  </header>

  <main>
    {#if viewMode === 'grid'}
      <div class="room-grid">
        {#each roomList as roomId}
          {@const status = getRoomStatus(roomId)}
          {@const events = getRoomEvents(roomId)}
          <div 
            class="room-card {status}"
            class:selected={selectedRoom === roomId}
            onclick={() => selectedRoom = roomId}
          >
            <h2>Room {roomId}</h2>
            <div class="status-indicator">
              {#if status === 'occupied'}
                <span class="status occupied">Currently Occupied</span>
              {:else if status === 'soon'}
                <span class="status soon">Occupied Soon</span>
              {:else}
                <span class="status available">Available</span>
              {/if}
            </div>
            <div class="event-count">
              <span>{events.length} events</span>
              <span>{events.filter(e => isToday(e.start.dateTime)).length} today</span>
            </div>
          </div>
        {/each}
      </div>
      
      {#if selectedRoom}
        <div class="selected-room-details">
          <h2>Room {selectedRoom} Schedule</h2>
          <div class="event-timeline">
            {#each getRoomEvents(selectedRoom) as event}
              <div class="timeline-event">
                <div class="event-time">
                  <div>{formatDateTime(event.start.dateTime)}</div>
                  <div>to</div>
                  <div>{formatDateTime(event.end.dateTime)}</div>
                </div>
                <div class="event-duration">
                  {getEventDuration(event).toFixed(1)} hours
                </div>
              </div>
            {/each}
            
            {#if getRoomEvents(selectedRoom).length === 0}
              <div class="no-events">No events scheduled</div>
            {/if}
          </div>
        </div>
      {/if}
    {:else}
      <div class="list-view">
        <table>
          <thead>
            <tr>
              <th>Room</th>
              <th>Status</th>
              <th>Total Events</th>
              <th>Today's Events</th>
              <th>Next Event</th>
            </tr>
          </thead>
          <tbody>
            {#each roomList as roomId}
              {@const status = getRoomStatus(roomId)}
              {@const events = getRoomEvents(roomId)}
              {@const nextEvent = events.find(e => new Date(e.start.dateTime) > new Date())}
              <tr 
                class="room-row {status}"
                class:selected={selectedRoom === roomId}
                onclick={() => selectedRoom = roomId}
              >
                <td><strong>Room {roomId}</strong></td>
                <td>
                  {#if status === 'occupied'}
                    <span class="status occupied">Occupied</span>
                  {:else if status === 'soon'}
                    <span class="status soon">Soon</span>
                  {:else}
                    <span class="status available">Available</span>
                  {/if}
                </td>
                <td>{events.length}</td>
                <td>{events.filter(e => isToday(e.start.dateTime)).length}</td>
                <td>
                  {#if nextEvent}
                    {formatDateTime(nextEvent.start.dateTime)}
                  {:else}
                    --
                  {/if}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </main>
</div>

<style>
  .container {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
  }
  
  header {
    margin-bottom: 2rem;
  }
  
  h1 {
    margin-bottom: 1rem;
    color: #333;
  }
  
  .controls {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .search-box input {
    padding: 0.5rem;
    width: 250px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .view-controls {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  
  select {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .view-toggle button {
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    background: #f5f5f5;
    cursor: pointer;
  }
  
  .view-toggle button.active {
    background: #007bff;
    color: white;
    border-color: #0056b3;
  }
  
  .view-toggle button:first-child {
    border-radius: 4px 0 0 4px;
  }
  
  .view-toggle button:last-child {
    border-radius: 0 4px 4px 0;
  }
  
  /* Grid View Styles */
  .room-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1rem;
    max-height: 60vh;
    overflow-y: auto;
    padding-right: 1rem;
  }
  
  .room-card {
    background: white;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .room-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }
  
  .room-card.selected {
    border: 2px solid #007bff;
  }
  
  .room-card h2 {
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
  }
  
  .status-indicator {
    margin-bottom: 0.5rem;
  }
  
  .status {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: bold;
  }
  
  .status.available {
    background: #d4edda;
    color: #155724;
  }
  
  .status.occupied {
    background: #f8d7da;
    color: #721c24;
  }
  
  .status.soon {
    background: #fff3cd;
    color: #856404;
  }
  
  .event-count {
    font-size: 0.9rem;
    display: flex;
    justify-content: space-between;
  }
  
  /* Room details */
  .selected-room-details {
    margin-top: 2rem;
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  
  .selected-room-details h2 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
  
  .event-timeline {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .timeline-event {
    display: flex;
    justify-content: space-between;
    padding: 0.75rem;
    background: #f9f9f9;
    border-radius: 6px;
    border-left: 4px solid #007bff;
  }
  
  .event-time {
    font-size: 0.9rem;
  }
  
  .event-duration {
    font-weight: bold;
    color: #495057;
  }

  .no-events {
    padding: 1rem;
    text-align: center;
    color: #6c757d;
    font-style: italic;
  }
  
  /* List View */
  .list-view {
    width: 100%;
    overflow-x: auto;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  table th, table td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #dee2e6;
  }
  
  table th {
    background: #f8f9fa;
  }
  
  .room-row {
    cursor: pointer;
  }
  
  .room-row:hover {
    background: #f1f1f1;
  }
  
  .room-row.selected {
    background: #e2f0ff;
  }
  
  .room-row.occupied {
    border-left: 4px solid #dc3545;
  }
  
  .room-row.soon {
    border-left: 4px solid #ffc107;
  }
  
  .room-row.available {
    border-left: 4px solid #28a745;
  }
  
  @media (max-width: 768px) {
    .controls {
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .search-box input {
      width: 100%;
    }
    
    .view-controls {
      width: 100%;
      justify-content: space-between;
    }
    
    .room-grid {
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    }
    
    .selected-room-details {
      padding: 1rem;
    }
    
    .timeline-event {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
</style>