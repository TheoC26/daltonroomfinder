import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

const roomToColumnKey = {
	203: 'A',
	205: 'B',
	207: 'C',
	210: 'D',
	212: 'E',
	251: 'F',
	252: 'G',
	350: 'H',
	401: 'I',
	450: 'J',
	501: 'K',
	502: 'L',
	503: 'M',
	504: 'N',
	505: 'O',
	509: 'P',
	1001: 'Q',
	1002: 'R',
	1003: 'S',
	1005: 'T',
	1007: 'U',
	1101: 'V',
	1103: 'W',
	1105: 'X',
	1201: 'Y',
	1205: 'Z',
	1208: 'AA',
	1401: 'AB',
	1402: 'AC',
	1403: 'AD',
	1404: 'AE',
	1405: 'AF',
	1406: 'AG',
	1407: 'AH',
	1409: 'AI',
	'10M': 'AJ',
	B02: 'AK',
	B03: 'AL',
	B05: 'AM',
	B06: 'AN',
	B10: 'AO',
	Theatre: 'AP'
};

const CACHE_FILE = path.resolve('room-data-cache.json');
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

// Check if cache is valid
function isCacheValid() {
	// return false;
	try {
		if (!fs.existsSync(CACHE_FILE)) {
			return false;
		}

		const stats = fs.statSync(CACHE_FILE);
		const cacheAge = Date.now() - stats.mtimeMs;

		// Only use cache if it's from the current hour (rounded down)
		const currentHourTimestamp = Math.floor(Date.now() / CACHE_DURATION) * CACHE_DURATION;
		const cacheHourTimestamp = Math.floor(stats.mtimeMs / CACHE_DURATION) * CACHE_DURATION;

		return currentHourTimestamp === cacheHourTimestamp;
	} catch (error) {
		console.error('Error checking cache validity:', error);
		return false;
	}
}

// Read data from cache
function readCache() {
	try {
		const cacheData = fs.readFileSync(CACHE_FILE, 'utf8');
		return JSON.parse(cacheData);
	} catch (error) {
		console.error('Error reading cache:', error);
		return null;
	}
}

// Write data to cache
function writeCache(data) {
	try {
		fs.writeFileSync(CACHE_FILE, JSON.stringify(data));
	} catch (error) {
		console.error('Error writing cache:', error);
	}
}

// Extract events from a cell value
function extractEventsFromCell(cellValue) {
	const events = [];
	if (!cellValue) return events;

	try {
		const text = cellValue.toString();
		// Extract all JSON objects from the text
		const jsonRegex = /{[^{}]*}/g;
		const matches = text.match(jsonRegex);

		if (matches) {
			matches.forEach((match) => {
				try {
					const jsonObj = JSON.parse(match);
					if (jsonObj.start && jsonObj.end) {
						events.push({
							start: { dateTime: jsonObj.start },
							end: { dateTime: jsonObj.end }
						});
					}
				} catch (e) {
					console.error('Error parsing JSON object:', match, e);
				}
			});
		}
	} catch (e) {
		console.error('Error processing cell value:', cellValue, e);
	}

	return events;
}

export const load = async () => {
	// Check if we have valid cached data
	if (isCacheValid()) {
		console.log('Using cached room data');
		const cachedData = readCache();
		if (cachedData) {
			return cachedData;
		}
	}

	console.log('fetching data');

	const auth = new google.auth.GoogleAuth({
		credentials: {
			type: 'service_account',
			project_id: import.meta.env.VITE_GOOGLE_PROJECT_ID,
			private_key_id: import.meta.env.VITE_GOOGLE_PRIVATE_KEY_ID,
			private_key: import.meta.env.VITE_GOOGLE_PRIVATE_KEY,
			client_email: import.meta.env.VITE_GOOGLE_CLIENT_EMAIL,
			client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
			auth_uri: import.meta.env.VITE_GOOGLE_AUTH_URI,
			token_uri: import.meta.env.VITE_GOOGLE_TOKEN_URI,
			auth_provider_x509_cert_url: import.meta.env.VITE_GOOGLE_AUTH_PROVIDER_CERT_URL,
			client_x509_cert_url: import.meta.env.VITE_GOOGLE_CLIENT_CERT_URL
		},
		scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
	});

	const authClient = await auth.getClient();
	const sheets = google.sheets({ version: 'v4', auth: authClient });

	const spreadsheetId = '1TBgL-nsI-sBXh4Pl_mi3NB1ZtIcE_jIAvAuDrPrdf90';

	try {
		const spreadsheet = await sheets.spreadsheets.get({
			spreadsheetId
		});

		const firstSheetName = spreadsheet.data.sheets[0].properties.title;

		// Get all columns at once - determine the range dynamically
		const lastColumn = 'AP'; // Based on your roomToColumnKey, "Theatre" is column "AP"

		// Fetch the entire sheet data in one API call
		const response = await sheets.spreadsheets.values.get({
			spreadsheetId,
			range: `${firstSheetName}!A:${lastColumn}`
		});

		const allRows = response.data.values || [];

		// Process the data for each room
		const roomData = {};

		// Create entry for each room
		Object.entries(roomToColumnKey).forEach(([roomId, columnLetter]) => {
			roomData[roomId] = { events: [] };
		});

		// Map column letters to array indices
		const columnToIndex = {};
		for (const [roomId, columnLetter] of Object.entries(roomToColumnKey)) {
			// Convert column letter to index (0-based)
			// A=0, B=1, ..., Z=25, AA=26, etc.
			const index = columnLetterToIndex(columnLetter);
			columnToIndex[roomId] = index;
		}

		// Process each row in the spreadsheet
		allRows.forEach((row) => {
			// For each room, check if there's data in its column for this row
			Object.entries(columnToIndex).forEach(([roomId, colIndex]) => {
				if (row.length > colIndex && row[colIndex]) {
					// Extract events from this cell and add to the room's events
					const cellEvents = extractEventsFromCell(row[colIndex]);
					//  make sure every event is from today
					cellEvents.forEach((event) => {
						if (cellEvents.length > 0) {
							const startDate = new Date(event.start.dateTime);
							const endDate = new Date(event.end.dateTime);
							const today = new Date();
							today.setHours(0, 0, 0, 0); // Set time to midnight
							startDate.setHours(0, 0, 0, 0); // Set time to midnight
							endDate.setHours(0, 0, 0, 0); // Set time to midnight
							if (
								startDate.getTime() === today.getTime() ||
								endDate.getTime() === today.getTime()
							) {
								// Only add events that are for today
								roomData[roomId].events.push(event);
							}
							roomData[roomId].isOccupied = isRoomOccupied(roomData, roomId);
						}
					});
				}
			});
		});

		// Calculate which rooms are currently free
		const freeRooms = getFreeRooms(roomData);

		// Write the complete data to cache
		const result = {
			rooms: roomData,
			freeRooms: freeRooms
		};
		writeCache(result);

		// Also write to a JSON file for external use
		fs.writeFileSync('room-data.json', JSON.stringify(result, null, 2));

		return result;
	} catch (error) {
		console.error('Error fetching sheet data:', error);

		// Return empty data structure on error
		return { rooms: {} };
	}
};

// Helper function to convert column letter to array index
function columnLetterToIndex(column) {
	let result = 0;
	for (let i = 0; i < column.length; i++) {
		const charCode = column.charCodeAt(i) - 65; // 'A' is 65 in ASCII
		result = result * 26 + charCode + (i === 0 ? 0 : 1);
	}
	return result;
}

function isRoomOccupied(roomData, roomId) {
	const now = new Date();
	const room = roomData[roomId];
	if (!room) return false;

	return room.events.some((event) => {
		const startTime = new Date(event.start.dateTime);
		const endTime = new Date(event.end.dateTime);
		return now >= startTime && now <= endTime;
	});
}

// Function to determine which rooms are currently free
function getFreeRooms(roomData) {
	const now = new Date(); // Add this line to define 'now'
	const freeRooms = [];

	Object.entries(roomData).forEach(([roomId, data]) => {
		// Check if the room is currently occupied
		const isOccupied = data.events.some((event) => {
			const startTime = new Date(event.start.dateTime);
			const endTime = new Date(event.end.dateTime);

			// Room is occupied if current time is between event start and end times
			return now >= startTime && now <= endTime;
		});

		// If not occupied, add to free rooms list
		if (!isOccupied) {
			freeRooms.push(roomId);
		}
	});

	return freeRooms;
}
