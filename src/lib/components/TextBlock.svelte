<script>
	import { createEventDispatcher } from 'svelte';
	import autosize from 'svelte-autosize';

	import DeleteButton from '$lib/components/DeleteButton.svelte';
	import { editStore } from '$lib/stores/edit';

	/** @type {import('src/types').TextBlock} */
	export let props;
	const dispatch = createEventDispatcher();
</script>

<div class="container">
	{#if $editStore}
		<div class="_space-between">
			<input bind:value={props.title} placeholder="Title" on:blur={() => dispatch('update')} />
			<DeleteButton on:delete />
		</div>
		<textarea bind:value={props.content} use:autosize on:blur={() => dispatch('update')} />
	{:else}
		{#if props.title}
			<h2>{props.title}</h2>
		{/if}
		<!-- Split the content into paragraphs and filter out any potential empty lines -->
		{#each props.content.split(/\n+/).filter((p) => p.trim() !== '') as paragraph}
			<p>{paragraph}</p>
		{/each}
	{/if}
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		position: relative;
	}

	input,
	textarea {
		/* display: block; */
		/* width: 100%; */
		padding: 0.5rem;
		/* border: 2px solid hsl(250, 100%, 99%); */
		/* border: 2px solid hsl(258, 100%, 98%); */
		border-radius: 4px;
		border: 0;
		// box-shadow: 0 0 5px hsl(258, 29%, 93%);
		color: #b7c5d3;
		// color: #dbf4f7;
		background-color: #445564;
		// background-color: #30383f;
		background-color: #1c252c;
		// border: 3px solid #191f24;
		// border-radius: 4px;
	}

	input {
		flex: 1;
	}

	._space-between {
		--gap: 1.5rem;
	}

	input,
	h2 {
		font-weight: bold;
		font-size: 1.3rem;
		// color: #dbf4f7;
		color: #b7c5d3;
	}

	textarea {
		resize: none;
	}

	p {
		// color: #dbf4f7;
		color: #b7c5d3;
	}
</style>
