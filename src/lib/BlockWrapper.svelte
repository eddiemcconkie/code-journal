<script>
	import { createEventDispatcher } from 'svelte';
	import { editStore } from './stores/edit';

	export let id = '';

	const dispatch = createEventDispatcher();
</script>

<div class="container">
	<div class="content">
		<slot />
	</div>
	{#if $editStore}
		<div class="side">
			<button on:click={() => dispatch('delete', { id })}>X</button>
		</div>
	{/if}
</div>

<style>
	.container {
		display: flex;
		gap: 1rem;
		/* border: 3px solid hsl(252, 40%, 68%); */
		border: 3px solid hsl(249, 31%, 88%);
		border-radius: 0.5rem;
		padding: 1rem;
		/* margin-bottom: 1rem; */
		background-color: hsl(250, 100%, 99%);
		margin-block: 0.5rem;
	}
	.content {
		flex: 1;
	}

	button {
		/* border: 2px solid hsl(258, 59%, 58%); */
		border: 2px solid hsl(258, 59%, 58%);
		/* color: white; */
		color: hsl(258, 59%, 58%);
		/* color: hsl(252, 40%, 68%); */
		/* background-color: hsl(258, 59%, 58%); */
		background-color: transparent;
		/* padding: 0.5rem; */
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
		color: white;
		/* background-color: hsl(258, 59%, 58%); */
		background-color: hsl(258, 59%, 58%);
	}
</style>
