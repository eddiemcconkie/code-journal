<script>
	import { createEventDispatcher } from 'svelte';
	import { editStore } from './stores/edit';

	const dispatch = createEventDispatcher();
</script>

<div class="container">
	<div class="content">
		<slot />
	</div>
	{#if $editStore}
		<div class="side">
			<button on:click={() => dispatch('delete')}>X</button>
		</div>
	{/if}
</div>

<style lang="scss">
	.container {
		display: flex;
		gap: 1rem;
		border-radius: 0.5rem;
		padding: 1rem;
		background-color: hsl(207, 23%, 16%);
		margin-block: 0.5rem;
	}
	.content {
		flex: 1;
	}

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
