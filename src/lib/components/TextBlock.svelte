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
			<input
				bind:value={props.title}
				on:blur={() => dispatch('update')}
				type="text"
				placeholder="Title"
			/>
			<DeleteButton on:delete />
		</div>
		<textarea bind:value={props.content} on:blur={() => dispatch('update')} use:autosize />
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
		padding: 0.5rem;
		border-radius: 4px;
		border: 0;
		color: $text-light;
		// background-color: $gray-700;
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
		color: $text-light;
	}

	textarea {
		resize: none;
	}

	p {
		color: $text-light;
	}
</style>
