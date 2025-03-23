import { writable } from 'svelte/store';

// Initialize with current date/time
const now = new Date();
export const selectedDateTime = writable(now); 