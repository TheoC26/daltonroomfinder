<script>
	import Floor14 from '$lib/components/Floor14.svelte';
	import Floor13 from '$lib/components/Floor13.svelte';
	import Floor12 from '$lib/components/Floor12.svelte';
	import Floor11 from '$lib/components/Floor11.svelte';
	import Floor10M from '$lib/components/Floor10M.svelte';
	import Floor10 from '$lib/components/Floor10.svelte';
	import Floor9 from '$lib/components/Floor9.svelte';
	import Floor8 from '$lib/components/Floor8.svelte';
	import Floor7 from '$lib/components/Floor7.svelte';
	import Floor6 from '$lib/components/Floor6.svelte';
	import Floor5 from '$lib/components/Floor5.svelte';
	import Floor4 from '$lib/components/Floor4.svelte';
	import Floor3 from '$lib/components/Floor3.svelte';
	import Floor2 from '$lib/components/Floor2.svelte';
	import Floor1 from '$lib/components/Floor1.svelte';
	import FloorB from '$lib/components/FloorB.svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
	import { onMount } from 'svelte';
	import Slider from '$lib/components/Slider.svelte';
	// import { selectedDateTime } from '$lib/stores/dateTime';
	import { format } from 'date-fns';
	import { selectedDate } from '$lib/state.svelte.js';

	const DaltonFloors = [
		{
			name: 'B',
			rooms: [
				{ name: 'Room 1', status: 'occupied' },
				{ name: 'Room 2', status: 'free' },
				{ name: 'Room 3', status: 'occupied' },
				{ name: 'Room 4', status: 'free' },
				{ name: 'Room 5', status: 'occupied' },
				{ name: 'Room 6', status: 'free' },
				{ name: 'Room 7', status: 'occupied' },
				{ name: 'Room 8', status: 'free' },
				{ name: 'Room 9', status: 'occupied' },
				{ name: 'Room 10', status: 'free' }
			]
		},
		{
			name: '1',
			rooms: [
				{ name: 'Room 1', status: 'occupied' },
				{ name: 'Room 2', status: 'free' },
				{ name: 'Room 3', status: 'occupied' },
				{ name: 'Room 4', status: 'free' },
				{ name: 'Room 5', status: 'occupied' },
				{ name: 'Room 6', status: 'free' },
				{ name: 'Room 7', status: 'occupied' },
				{ name: 'Room 8', status: 'free' },
				{ name: 'Room 9', status: 'occupied' },
				{ name: 'Room 10', status: 'free' }
			]
		},
		{
			name: '2',
			rooms: [
				{ name: 'Room 1', status: 'occupied' },
				{ name: 'Room 2', status: 'free' },
				{ name: 'Room 3', status: 'occupied' },
				{ name: 'Room 4', status: 'free' },
				{ name: 'Room 5', status: 'occupied' },
				{ name: 'Room 6', status: 'free' },
				{ name: 'Room 7', status: 'occupied' },
				{ name: 'Room 8', status: 'free' },
				{ name: 'Room 9', status: 'occupied' },
				{ name: 'Room 10', status: 'free' }
			]
		},
		{
			name: '3',
			rooms: [
				{ name: 'Room 1', status: 'occupied' },
				{ name: 'Room 2', status: 'free' },
				{ name: 'Room 3', status: 'occupied' },
				{ name: 'Room 4', status: 'free' },
				{ name: 'Room 5', status: 'occupied' },
				{ name: 'Room 6', status: 'free' },
				{ name: 'Room 7', status: 'occupied' },
				{ name: 'Room 8', status: 'free' },
				{ name: 'Room 9', status: 'occupied' },
				{ name: 'Room 10', status: 'free' }
			]
		},
		{
			name: '4',
			rooms: [
				{ name: 'Room 1', status: 'occupied' },
				{ name: 'Room 2', status: 'free' },
				{ name: 'Room 3', status: 'occupied' },
				{ name: 'Room 4', status: 'free' },
				{ name: 'Room 5', status: 'occupied' },
				{ name: 'Room 6', status: 'free' },
				{ name: 'Room 7', status: 'occupied' },
				{ name: 'Room 8', status: 'free' },
				{ name: 'Room 9', status: 'occupied' },
				{ name: 'Room 10', status: 'free' }
			]
		},
		{
			name: '5',
			rooms: [
				{ name: 'Room 1', status: 'occupied' },
				{ name: 'Room 2', status: 'free' },
				{ name: 'Room 3', status: 'occupied' },
				{ name: 'Room 4', status: 'free' },
				{ name: 'Room 5', status: 'occupied' },
				{ name: 'Room 6', status: 'free' },
				{ name: 'Room 7', status: 'occupied' },
				{ name: 'Room 8', status: 'free' },
				{ name: 'Room 9', status: 'occupied' },
				{ name: 'Room 10', status: 'free' }
			]
		},
		{
			name: '6',
			rooms: [
				{ name: 'Room 1', status: 'occupied' },
				{ name: 'Room 2', status: 'free' },
				{ name: 'Room 3', status: 'occupied' },
				{ name: 'Room 4', status: 'free' },
				{ name: 'Room 5', status: 'occupied' },
				{ name: 'Room 6', status: 'free' },
				{ name: 'Room 7', status: 'occupied' },
				{ name: 'Room 8', status: 'free' },
				{ name: 'Room 9', status: 'occupied' },
				{ name: 'Room 10', status: 'free' }
			]
		},
		{
			name: '7',
			rooms: [
				{ name: 'Room 1', status: 'occupied' },
				{ name: 'Room 2', status: 'free' },
				{ name: 'Room 3', status: 'occupied' },
				{ name: 'Room 4', status: 'free' },
				{ name: 'Room 5', status: 'occupied' },
				{ name: 'Room 6', status: 'free' },
				{ name: 'Room 7', status: 'occupied' },
				{ name: 'Room 8', status: 'free' },
				{ name: 'Room 9', status: 'occupied' },
				{ name: 'Room 10', status: 'free' }
			]
		},
		{
			name: '8',
			rooms: [
				{ name: 'Room 1', status: 'occupied' },
				{ name: 'Room 2', status: 'free' },
				{ name: 'Room 3', status: 'occupied' },
				{ name: 'Room 4', status: 'free' },
				{ name: 'Room 5', status: 'occupied' },
				{ name: 'Room 6', status: 'free' },
				{ name: 'Room 7', status: 'occupied' },
				{ name: 'Room 8', status: 'free' },
				{ name: 'Room 9', status: 'occupied' },
				{ name: 'Room 10', status: 'free' }
			]
		},
		{
			name: '9',
			rooms: [
				{ name: 'Room 1', status: 'occupied' },
				{ name: 'Room 2', status: 'free' },
				{ name: 'Room 3', status: 'occupied' },
				{ name: 'Room 4', status: 'free' },
				{ name: 'Room 5', status: 'occupied' },
				{ name: 'Room 6', status: 'free' },
				{ name: 'Room 7', status: 'occupied' },
				{ name: 'Room 8', status: 'free' },
				{ name: 'Room 9', status: 'occupied' },
				{ name: 'Room 10', status: 'free' }
			]
		},
		{
			name: '10',
			rooms: [
				{ name: 'Room 1', status: 'occupied' },
				{ name: 'Room 2', status: 'free' },
				{ name: 'Room 3', status: 'occupied' },
				{ name: 'Room 4', status: 'free' },
				{ name: 'Room 5', status: 'occupied' },
				{ name: 'Room 6', status: 'free' },
				{ name: 'Room 7', status: 'occupied' },
				{ name: 'Room 8', status: 'free' },
				{ name: 'Room 9', status: 'occupied' },
				{ name: 'Room 10', status: 'free' }
			]
		},
		{
			name: '10M',
			rooms: [
				{ name: 'Room 1', status: 'occupied' },
				{ name: 'Room 2', status: 'free' },
				{ name: 'Room 3', status: 'occupied' },
				{ name: 'Room 4', status: 'free' },
				{ name: 'Room 5', status: 'occupied' },
				{ name: 'Room 6', status: 'free' },
				{ name: 'Room 7', status: 'occupied' },
				{ name: 'Room 8', status: 'free' },
				{ name: 'Room 9', status: 'occupied' },
				{ name: 'Room 10', status: 'free' }
			]
		},
		{
			name: '11',
			rooms: [
				{ name: 'Room 1', status: 'occupied' },
				{ name: 'Room 2', status: 'free' },
				{ name: 'Room 3', status: 'occupied' },
				{ name: 'Room 4', status: 'free' },
				{ name: 'Room 5', status: 'occupied' },
				{ name: 'Room 6', status: 'free' },
				{ name: 'Room 7', status: 'occupied' },
				{ name: 'Room 8', status: 'free' },
				{ name: 'Room 9', status: 'occupied' },
				{ name: 'Room 10', status: 'free' }
			]
		},
		{
			name: '12',
			rooms: [
				{ name: 'Room 1', status: 'occupied' },
				{ name: 'Room 2', status: 'free' },
				{ name: 'Room 3', status: 'occupied' },
				{ name: 'Room 4', status: 'free' },
				{ name: 'Room 5', status: 'occupied' },
				{ name: 'Room 6', status: 'free' },
				{ name: 'Room 7', status: 'occupied' },
				{ name: 'Room 8', status: 'free' },
				{ name: 'Room 9', status: 'occupied' },
				{ name: 'Room 10', status: 'free' }
			]
		},
		{
			name: '13',
			rooms: [
				{ name: 'Room 1', status: 'occupied' },
				{ name: 'Room 2', status: 'free' },
				{ name: 'Room 3', status: 'occupied' },
				{ name: 'Room 4', status: 'free' },
				{ name: 'Room 5', status: 'occupied' },
				{ name: 'Room 6', status: 'free' },
				{ name: 'Room 7', status: 'occupied' },
				{ name: 'Room 8', status: 'free' },
				{ name: 'Room 9', status: 'occupied' },
				{ name: 'Room 10', status: 'free' }
			]
		},
		{
			name: '14',
			rooms: [
				{ name: 'Room 1', status: 'occupied' },
				{ name: 'Room 2', status: 'free' },
				{ name: 'Room 3', status: 'occupied' },
				{ name: 'Room 4', status: 'free' },
				{ name: 'Room 5', status: 'occupied' },
				{ name: 'Room 6', status: 'free' },
				{ name: 'Room 7', status: 'occupied' },
				{ name: 'Room 8', status: 'free' },
				{ name: 'Room 9', status: 'occupied' },
				{ name: 'Room 10', status: 'free' }
			]
		}
	];
	let selectedFloorName = $state('5');
	let scrollContainer = null;
	let floorContainers = [];
	const floors = [
		{ component: Floor14, name: '14', scrollPercent: 0 },
		{ component: Floor13, name: '13', scrollPercent: 741.1 / 4531.66 },
		{ component: Floor12, name: '12', scrollPercent: 993.8 / 4531.66 },
		{ component: Floor11, name: '11', scrollPercent: 1233.8 / 4531.66 },
		{ component: Floor10M, name: '10M', scrollPercent: 1505 / 4531.66 },
		{ component: Floor10, name: '10', scrollPercent: 1756 / 4531.66 },
		{ component: Floor9, name: '9', scrollPercent: 2010 / 4531.66 },
		{ component: Floor8, name: '8', scrollPercent: 2261.1 / 4531.66 },
		{ component: Floor7, name: '7', scrollPercent: 2517.2 / 4531.66 },
		{ component: Floor6, name: '6', scrollPercent: 2770 / 4531.66 },
		{ component: Floor5, name: '5', scrollPercent: 3023 / 4531.66 },
		{ component: Floor4, name: '4', scrollPercent: 3271.6 / 4531.66 },
		{ component: Floor3, name: '3', scrollPercent: 3519.4 / 4531.66 },
		{ component: Floor2, name: '2', scrollPercent: 3782.2 / 4531.66 },
		{ component: Floor1, name: '1', scrollPercent: 4026.1 / 4531.66 },
		{ component: FloorB, name: 'B', scrollPercent: 1 }
	];

	let showDatePicker = $state(false);
	let showTimePicker = $state(false);

	function mapRange(value, fromMin, fromMax, toMin, toMax) {
		return ((value - fromMin) * (toMax - toMin)) / (fromMax - fromMin) + toMin;
	}

	function formatTime(date) {
		return format(date, 'h:mm a');
	}

	function formatDate(date) {
		return format(date, 'EEEE MMM d, yyyy');
	}

	function updateDate(event) {
		const newDate = new Date(event.target.value);
		const currentDate = selectedDate.date;
		newDate.setHours(currentDate.getHours(), currentDate.getMinutes());
		selectedDate.date = newDate;
		showDatePicker = false;
	}

	function updateTime(event) {
		const [hours, minutes] = event.target.value.split(':');
		const newDate = new Date(selectedDate.date);
		newDate.setHours(hours, minutes);
		selectedDate.date = newDate;
		showTimePicker = false;
	}

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

		// Create a master timeline
		const masterTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.floors-container',
				start: 'center center',
				end: '+=600%',
				scrub: 1,
				pin: true,
				pinSpacing: true,
				onUpdate: (self) => {
					// print the y scroll amount
				},
				// markers: true
			}
		});

		window.masterTimeline = masterTl;

		// Create staggered animations for each floor
		floorContainers.forEach((container, index) => {
			const progress = index / (floors.length - 1);
			let staggerDelay = progress;

			// Start with the first floor visible
			if (index === 0) {
				masterTl.fromTo(
					container,
					{
						opacity: 1,
						top: '0vh',
						left: '50vw',
						scale: 1
					},
					{
						opacity: 0,
						top: '-150vh',
						left: '50vw',
						scale: 1.5,
						duration: 0.5,
						ease: 'power1.out',
						delay: 0.5
					},
					'>'
				);
			} else {
				gsap.set(container, {
					opacity: 0,
					top: '100vh',
					left: '50vw',
					scale: 0.5
				});
			}

			// Don't animate the first floor until the second floor starts appearing
			if (index > 0) {
				masterTl.fromTo(
					container,
					{
						opacity: 0,
						top: '100vh',
						left: '50vw',
						scale: 0.5
					},
					{
						opacity: 1,
						top: '0vh',
						left: '50vw',
						scale: 1,
						duration: 0.5,
						ease: 'power1.inOut',
						onUpdate: function () {
							const id = this._targets[0].id;
							const floorIndex = parseInt(id.split('-')[1]);
							if (floorIndex === 1 && this.progress() <= 0.9) {
								selectedFloorName = floors[0].name;
							}
							if (this.progress() >= 0.9) {
								selectedFloorName = floors[floorIndex].name;
							}
						}
					},
					staggerDelay * 2
				);
			}

			// Don't animate the last floor out
			if (index < floors.length - 1 && index > 0) {
				masterTl.to(
					container,
					{
						opacity: 0,
						top: '-150vh',
						left: '50vw',
						scale: 1.5,
						duration: 0.5,
						ease: 'power1.out'
					},
					`>0.0`
				);
			}
		});
	});

	function scrollToFloor(floorName) {
		const floorIndex = [...floors].findIndex((f) => f.name === floorName);
		if (floorIndex === -1) return;

		// Adjust the progress calculation to account for the new animation timing
		const progress = floorIndex / (floors.length - 1);
		const timeline = window.masterTimeline;

		if (timeline) {
			const st = timeline.scrollTrigger;
			const targetScroll2 = st.start + (st.end - st.start) * progress;
			const targetScroll =
				floors[floorIndex].scrollPercent * scrollContainer.scrollHeight * 0.8336162551;
			// TODO: Fix this hard coded value

			gsap.to(window, {
				duration: 1,
				ease: 'power2.inOut',
				scrollTo: {
					y: targetScroll,
					autoKill: false
				}
			});
		}
	}
</script>

<div>
	<div class="" bind:this={scrollContainer}>
		<div class="floors-container">
			{#each floors as floor, i}
				<div
					bind:this={floorContainers[i]}
					class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
					id="floor-{i}"
					style="z-index: {floorContainers.length - i};"
				>
					<floor.component />
				</div>
			{/each}
		</div>
	</div>

	<div class="fixed top-1/2 left-6 flex -translate-y-1/2 flex-col">
		{#each floors as floor, i}
			{#if floor.name === selectedFloorName}
				<div class="text-center text-2xl font-bold">{floor.name}</div>
			{:else}
				<button
					onclick={() => scrollToFloor(floor.name)}
					class="cursor-pointer text-center text-2xl font-light opacity-50">{floor.name}</button
				>
			{/if}
		{/each}
		<div class="w-16"></div>
	</div>

	<header
		class="fixed top-0 right-0 left-0 flex w-full items-center justify-between bg-linear-to-b from-white via-white to-transparent p-6 pt-4"
	>
		<img class="h-8" src="DaltonLogo.png" alt="Dalton Logo" />
		<div class="flex flex-col text-base">
			<div class="flex items-center gap-4">
				<div class="h-4 w-10 rounded-sm bg-[#F0CBCB]"></div>
				<div>Occupied</div>
			</div>
			<div class="flex items-center gap-4">
				<div class="h-4 w-10 rounded-sm bg-[#E1F9D6]"></div>
				<div>Free</div>
			</div>
		</div>
	</header>

	<div
		class="fixed right-0 bottom-0 left-0 flex w-full flex-col items-center justify-between bg-linear-to-t from-white via-white to-transparent p-6 pt-16 pb-4"
	>
		<div class="relative">
			<button class="text-xl">
				{formatTime(selectedDate.date)}
			</button>
			{#if showTimePicker}
				<input
					type="time"
					class="absolute top-full left-1/2 z-50 mt-2 -translate-x-1/2 rounded-xl bg-white p-2 shadow-lg"
					value={format(selectedDate.date, 'HH:mm')}
					onchange={updateTime}
					onblur={() => {
						showTimePicker = false;
						updateTime();
					}}
				/>
			{/if}
		</div>

		<div class="h-2 w-0.5 rounded-full bg-black"></div>
		<div class="-z-10 my-2">
			<Slider />
		</div>
		<div class="h-2 w-0.5 rounded-full bg-black"></div>

		<div class="relative">
			<button class="cursor-pointer text-xl" onclick={() => (showDatePicker = !showDatePicker)}>
				{formatDate(selectedDate.date)}
			</button>
			{#if showDatePicker}
				<input
					type="date"
					class="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 rounded-xl bg-white p-2"
					value={format(selectedDate.date, 'yyyy-MM-dd')}
					onchange={updateDate}
					onblur={() => (showDatePicker = false)}
					onkeydown={(e) => e.preventDefault()}
				/>
			{/if}
		</div>
	</div>
</div>
