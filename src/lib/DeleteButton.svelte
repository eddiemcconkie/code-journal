<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<button on:click={() => dispatch('delete')}>X</button>

<style lang="scss">
	button {
		border: 2px solid $warning;
		color: $warning;
		background-color: transparent;
		border-radius: 0.5rem;
		display: grid;
		place-items: center;
		font-weight: bold;
		width: 2rem;
		height: 2rem;
		cursor: pointer;
		transition: all 100ms ease-in-out;
	}

	button:hover {
		color: hsl(240, 21%, 9%);
		background-color: $warning;
	}
</style>
