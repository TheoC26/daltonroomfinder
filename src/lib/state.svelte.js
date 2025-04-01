const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));

export const selectedDate = $state({
	date: now
});

export const sideCal = $state({
	room: 1401,
	isShowing: false
});

export const sideOpenRooms = $state({
	isShowing: true
});