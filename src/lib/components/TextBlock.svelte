<script>
	import { createEventDispatcher } from 'svelte';
	import autosize from 'svelte-autosize';

	import { editStore } from '$lib/stores/edit';
	import BlockDropdown from './BlockDropdown.svelte';

	/** @type {import('src/types').TextBlock} */
	export let props;

	/** @type {boolean} */
	export let first;
	/** @type {boolean} */
	export let last;

	const dispatch = createEventDispatcher();
</script>

<div class="container">
	{#if $editStore}
		<div class="space-between gap-3">
			<input
				bind:value={props.title}
				on:input={() => dispatch('dirty')}
				type="text"
				placeholder="Title"
			/>
			<BlockDropdown {first} {last} on:moveup on:movedown on:delete />
		</div>
		<textarea bind:value={props.content} on:input={() => dispatch('dirty')} use:autosize />
	{:else}
		{#if props.title}
			<h3>{props.title}</h3>
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
	}

	input {
		flex: 1;
	}

	input {
		font-weight: bold;
		font-size: 1.3rem;
	}

	textarea {
		resize: none;
	}

	h3,
	p {
		color: var(--slate-9);
	}
</style>
