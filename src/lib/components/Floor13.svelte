<script>
	import { roomData } from '$lib/state.svelte';

	// props
	let { scaler, handleRoomClick } = $props();

	let color1303 = $state('#E1F9D6');

	$effect(() => {
		if (!roomData.rooms) return;
		// color1303 = roomData.rooms[1303].isOccupied ? '#F0CBCB' : '#E1F9D6';
	});
</script>

<div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
	<svg
		width={804 * scaler}
		height={480 * scaler}
		viewBox="0 0 804 480"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<rect x="5.5" y="5" width="793" height="470" fill="white" />
		<rect x="639.5" y="281" width="160" height="194" fill="#E0E0E0" />
		<rect x="733.5" y="191" width="61" height="98" fill="white" />
		<rect x="569" y="5" width="75" height="195" fill="#E0E0E0" />
		<!-- <rect x="479" y="281" width="161" height="194" fill={color1303} class="cursor-pointer outline-none" onkeydown={(e) => e.key === 'Enter' && handleRoomClick(1303)}  tabindex="0" role="button" onclick={() => handleRoomClick(1303)} /> -->
		<rect x="479" y="281" width="161" height="194" fill="#E0E0E0" />
		<rect x="643" y="5" width="68" height="85" fill="#E0E0E0" />
		<rect x="436" y="5" width="133" height="195" fill="#E0E0E0" />
		<path
			d="M30 4.5H4.5V196M25 475H4.5V285V196M154 475H198.5V285M306.5 475H319H337M462 475H483M492.5 475H483M619 475H640M646.5 475H640M771.5 475H798.5V292.5M778.5 4.5H798.5V192M732.5 4.5H711M700.5 4.5H711M653.5 4.5L643.562 4.5M628.5 4.5L643.562 4.5M582 4.5H555.5M259.5 4.5H237H226.5M150 4.5H165H167.75H185.5V196M104.5 4.5H94.5M70 4.5H94.5M4.5 196H86H94.5V4.5M588.5 196H555.5M555.5 196V4.5M555.5 196H539.5M555.5 4.5H565H438.5V196H505.5M643.562 4.5V86M622 196H643L643.562 86M643.562 86H663.5M711 4.5V86M711 154.5V86M711 86H689.5M798.5 192H711V183V196H731V211.5M798.5 192V292.5M731 238.5V243M731 269.5V285M798.5 292.5H731V285M731 285H678M588.5 285H544.5H483M619 285H640M650.5 285H640M640 285V430M640 475V463M483 475V463M70 475V285M70 475H56.5M70 475H81M479.5 285H483M483 430V285"
			stroke="black"
			stroke-width="9"
		/>
		<path d="M4.5 475H799.5" stroke="black" stroke-width="3" />
		<path d="M4.5 5H799.5" stroke="black" stroke-width="3" />
		<path d="M4.5 51H92.5" stroke="black" stroke-width="3" />
		<path d="M4.5 57H92.5" stroke="black" stroke-width="3" />
		<path d="M4.5 63H92.5" stroke="black" stroke-width="3" />
		<path d="M4.5 69H92.5" stroke="black" stroke-width="3" />
		<path d="M4.5 75H92.5" stroke="black" stroke-width="3" />
		<path d="M4.5 81H92.5" stroke="black" stroke-width="3" />
		<path d="M4.5 87H92.5" stroke="black" stroke-width="3" />
		<path d="M4.5 93H92.5" stroke="black" stroke-width="3" />
		<path d="M4.5 99H92.5" stroke="black" stroke-width="3" />
		<path d="M4.5 105H92.5" stroke="black" stroke-width="3" />
		<path d="M4.5 111H92.5" stroke="black" stroke-width="3" />
		<path d="M4.5 117H92.5" stroke="black" stroke-width="3" />
		<path d="M4.5 123H92.5" stroke="black" stroke-width="3" />
		<path d="M5 314H72" stroke="black" stroke-width="3" />
		<path d="M5 320H72" stroke="black" stroke-width="3" />
		<path d="M5 326H72" stroke="black" stroke-width="3" />
		<path d="M5 332H72" stroke="black" stroke-width="3" />
		<path d="M5 338H72" stroke="black" stroke-width="3" />
		<path d="M5 344H72" stroke="black" stroke-width="3" />
		<path d="M5 350H72" stroke="black" stroke-width="3" />
		<path d="M5 356H72" stroke="black" stroke-width="3" />
		<path d="M5 362H72" stroke="black" stroke-width="3" />
		<path d="M5 368H72" stroke="black" stroke-width="3" />
		<path d="M5 374H72" stroke="black" stroke-width="3" />
		<path d="M5 380H72" stroke="black" stroke-width="3" />
		<path d="M5 386H72" stroke="black" stroke-width="3" />
		<path d="M5 392H72" stroke="black" stroke-width="3" />
		<path d="M5 398H72" stroke="black" stroke-width="3" />
		<path d="M5 404H72" stroke="black" stroke-width="3" />
		<path d="M5 410H72" stroke="black" stroke-width="3" />
		<path d="M5 416H72" stroke="black" stroke-width="3" />
		<path d="M5 422H72" stroke="black" stroke-width="3" />
		<path d="M43.5 51V123.5" stroke="black" stroke-width="3" />
		<path d="M56.5 51.5V122" stroke="black" stroke-width="3" />
		<path d="M710.5 51H798.5" stroke="black" stroke-width="3" />
		<path d="M710.5 57H798.5" stroke="black" stroke-width="3" />
		<path d="M710.5 63H798.5" stroke="black" stroke-width="3" />
		<path d="M710.5 69H798.5" stroke="black" stroke-width="3" />
		<path d="M710.5 75H798.5" stroke="black" stroke-width="3" />
		<path d="M710.5 81H798.5" stroke="black" stroke-width="3" />
		<path d="M710.5 87H798.5" stroke="black" stroke-width="3" />
		<path d="M710.5 93H798.5" stroke="black" stroke-width="3" />
		<path d="M710.5 99H798.5" stroke="black" stroke-width="3" />
		<path d="M710.5 105H798.5" stroke="black" stroke-width="3" />
		<path d="M710.5 111H798.5" stroke="black" stroke-width="3" />
		<path d="M710.5 117H798.5" stroke="black" stroke-width="3" />
		<path d="M710.5 123H798.5" stroke="black" stroke-width="3" />
		<path d="M749.5 51V123.5" stroke="black" stroke-width="3" />
		<path d="M762.5 51.5V122" stroke="black" stroke-width="3" />
		<path
			d="M733 210V238M733 274V245M733 238H788M733 238L788 195.5V238M733 238V245M788 238L733 195.5M733 245H788M733 245L788 288.5V245M788 245L733 288.5"
			stroke="black"
			stroke-width="3"
		/>
		<path
			d="M527.7 368.52V365.864H533.716V389H530.772V368.52H527.7ZM538.654 371.688C538.804 369.725 539.561 368.189 540.926 367.08C542.292 365.971 544.062 365.416 546.238 365.416C547.689 365.416 548.937 365.683 549.982 366.216C551.049 366.728 551.849 367.432 552.382 368.328C552.937 369.224 553.214 370.237 553.214 371.368C553.214 372.691 552.83 373.832 552.062 374.792C551.316 375.752 550.334 376.371 549.118 376.648V376.808C550.505 377.149 551.604 377.821 552.414 378.824C553.225 379.827 553.63 381.139 553.63 382.76C553.63 383.976 553.353 385.075 552.798 386.056C552.244 387.016 551.412 387.773 550.302 388.328C549.193 388.883 547.86 389.16 546.302 389.16C544.041 389.16 542.185 388.573 540.734 387.4C539.284 386.205 538.473 384.52 538.302 382.344H541.118C541.268 383.624 541.79 384.669 542.686 385.48C543.582 386.291 544.777 386.696 546.27 386.696C547.764 386.696 548.894 386.312 549.662 385.544C550.452 384.755 550.846 383.741 550.846 382.504C550.846 380.904 550.313 379.752 549.246 379.048C548.18 378.344 546.569 377.992 544.414 377.992H543.678V375.56H544.446C546.409 375.539 547.892 375.219 548.894 374.6C549.897 373.96 550.398 372.979 550.398 371.656C550.398 370.525 550.025 369.619 549.278 368.936C548.553 368.253 547.508 367.912 546.142 367.912C544.82 367.912 543.753 368.253 542.942 368.936C542.132 369.619 541.652 370.536 541.502 371.688H538.654ZM557.562 377.192C557.562 373.523 558.159 370.664 559.354 368.616C560.549 366.547 562.639 365.512 565.626 365.512C568.591 365.512 570.671 366.547 571.866 368.616C573.061 370.664 573.658 373.523 573.658 377.192C573.658 380.925 573.061 383.827 571.866 385.896C570.671 387.965 568.591 389 565.626 389C562.639 389 560.549 387.965 559.354 385.896C558.159 383.827 557.562 380.925 557.562 377.192ZM570.778 377.192C570.778 375.336 570.65 373.768 570.394 372.488C570.159 371.187 569.658 370.141 568.89 369.352C568.143 368.563 567.055 368.168 565.626 368.168C564.175 368.168 563.066 368.563 562.298 369.352C561.551 370.141 561.05 371.187 560.794 372.488C560.559 373.768 560.442 375.336 560.442 377.192C560.442 379.112 560.559 380.723 560.794 382.024C561.05 383.325 561.551 384.371 562.298 385.16C563.066 385.949 564.175 386.344 565.626 386.344C567.055 386.344 568.143 385.949 568.89 385.16C569.658 384.371 570.159 383.325 570.394 382.024C570.65 380.723 570.778 379.112 570.778 377.192ZM577.592 371.688C577.741 369.725 578.499 368.189 579.864 367.08C581.229 365.971 583 365.416 585.176 365.416C586.627 365.416 587.875 365.683 588.92 366.216C589.987 366.728 590.787 367.432 591.32 368.328C591.875 369.224 592.152 370.237 592.152 371.368C592.152 372.691 591.768 373.832 591 374.792C590.253 375.752 589.272 376.371 588.056 376.648V376.808C589.443 377.149 590.541 377.821 591.352 378.824C592.163 379.827 592.568 381.139 592.568 382.76C592.568 383.976 592.291 385.075 591.736 386.056C591.181 387.016 590.349 387.773 589.24 388.328C588.131 388.883 586.797 389.16 585.24 389.16C582.979 389.16 581.123 388.573 579.672 387.4C578.221 386.205 577.411 384.52 577.24 382.344H580.056C580.205 383.624 580.728 384.669 581.624 385.48C582.52 386.291 583.715 386.696 585.208 386.696C586.701 386.696 587.832 386.312 588.6 385.544C589.389 384.755 589.784 383.741 589.784 382.504C589.784 380.904 589.251 379.752 588.184 379.048C587.117 378.344 585.507 377.992 583.352 377.992H582.616V375.56H583.384C585.347 375.539 586.829 375.219 587.832 374.6C588.835 373.96 589.336 372.979 589.336 371.656C589.336 370.525 588.963 369.619 588.216 368.936C587.491 368.253 586.445 367.912 585.08 367.912C583.757 367.912 582.691 368.253 581.88 368.936C581.069 369.619 580.589 370.536 580.44 371.688H577.592Z"
			fill="black"
			class="pointer-events-none"
		/>
		<path d="M99 52H187" stroke="black" stroke-width="3" />
		<path d="M99 58H187" stroke="black" stroke-width="3" />
		<path d="M99 64H187" stroke="black" stroke-width="3" />
		<path d="M99 70H187" stroke="black" stroke-width="3" />
		<path d="M99 76H187" stroke="black" stroke-width="3" />
		<path d="M99 82H187" stroke="black" stroke-width="3" />
		<path d="M99 88H187" stroke="black" stroke-width="3" />
		<path d="M99 94H187" stroke="black" stroke-width="3" />
		<path d="M99 100H187" stroke="black" stroke-width="3" />
		<path d="M99 106H187" stroke="black" stroke-width="3" />
		<path d="M99 112H187" stroke="black" stroke-width="3" />
		<path d="M99 118H187" stroke="black" stroke-width="3" />
		<path d="M99 124H187" stroke="black" stroke-width="3" />
		<path d="M99 130H187" stroke="black" stroke-width="3" />
		<path d="M99 136H187" stroke="black" stroke-width="3" />
		<path d="M99 142H187" stroke="black" stroke-width="3" />
		<path d="M99 148H187" stroke="black" stroke-width="3" />
		<path d="M99 154H187" stroke="black" stroke-width="3" />
		<path d="M99 160H187" stroke="black" stroke-width="3" />
	</svg>
</div>
