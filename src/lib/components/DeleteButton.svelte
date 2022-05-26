<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<button on:click={() => dispatch('delete')} class="button">X</button>

<style lang="scss">
	button {
		min-height: var(--size-6);
		aspect-ratio: var(--ratio-square);
	}
	// button {
	// 	border: 2px solid $warning;
	// 	color: $warning;
	// 	background-color: transparent;
	// 	border-radius: 0.5rem;
	// 	display: grid;
	// 	place-items: center;
	// 	font-weight: bold;
	// 	width: 2rem;
	// 	height: 2rem;
	// 	cursor: pointer;
	// 	transition: all 100ms ease-in-out;
	// }

	// button:hover {
	// 	color: hsl(240, 21%, 9%);
	// 	background-color: $warning;
	// }
</style>
