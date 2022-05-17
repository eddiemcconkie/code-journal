<script>
	import { createEventDispatcher } from 'svelte';

	import BlockWrapper from '$lib/components/BlockWrapper.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import TextBlock from '$lib/components/TextBlock.svelte';
	import { flip } from 'svelte/animate';
	import { editStore } from '$lib/stores/edit';
	import { beforeNavigate } from '$app/navigation';

	let isMounted = false;

	// let blocks = [];
	// /** @type {import('src/types').Block[]} */
	/** @type {import('src/types').Entry} */
	export let entry;

	// onMount(() => {
	// 	isMounted = true;
	// 	blocks = loadData('journal');
	// });

	const dispatch = createEventDispatcher();
	beforeNavigate(() => {
		dispatch('update', entry);
	});

	const componentsMap = {
		code: CodeBlock,
		text: TextBlock
	};

	/** @type {(index: number) => void} */
	const onAddCode = (index) => {
		dispatch('update', entry);
		entry.blocks = [
			...entry.blocks.slice(0, index),
			{
				id: `${Math.floor(Math.random() * 100000000)}`,
				type: 'code',
				code: '',
				language: 'JavaScript'
			},
			...entry.blocks.slice(index)
		];
	};

	/** @type {(index: number) => void} */
	const onAddText = (index) => {
		dispatch('update', entry);
		entry.blocks = [
			...entry.blocks.slice(0, index),
			{
				id: `${Math.floor(Math.random() * 100000000)}`,
				type: 'text',
				title: '',
				content: ''
			},
			...entry.blocks.slice(index)
		];
	};

	const onDelete = (/** @type {string} */ id) => {
		dispatch('update', entry);
		entry.blocks = entry.blocks.filter((block) => block.id !== id);
	};

	// $: isMounted && saveData('journal', blocks);
	// onMount(() => {
	// 	setInterval(() => dispatch('update', entry), 60 * 1000);
	// });
</script>

<!-- <div class="body"> -->

<main class="track" class:editing={$editStore}>
	<BlockWrapper>
		{#if $editStore}
			<input type="text" bind:value={entry.title} on:blur={() => dispatch('update', entry)} />
		{:else}
			<h2>{entry.title}</h2>
		{/if}
	</BlockWrapper>
	<!-- Prevents distortion when switching the edit mode -->
	{#key $editStore}
		{#if $editStore}
			<div class="button-set">
				<button on:click={() => onAddCode(0)}>Code +</button>
				<button on:click={() => onAddText(0)}>Text +</button>
			</div>
		{/if}
		{#each entry.blocks as block, index (block.id)}
			<div animate:flip={{ duration: 200 }}>
				<!-- <BlockWrapper on:delete={() => onDelete(block.id)}> -->
				<BlockWrapper>
					<svelte:component
						this={componentsMap[block.type]}
						bind:props={block}
						on:delete={() => onDelete(block.id)}
						on:update={() => dispatch('update', entry)}
					/>
					<!-- on:delete={onDelete} -->
				</BlockWrapper>
				{#if $editStore}
					<div class="button-set">
						<button on:click={() => onAddCode(index + 1)}>Code +</button>
						<button on:click={() => onAddText(index + 1)}>Text +</button>
					</div>
				{/if}
			</div>
		{/each}
	{/key}
</main>

<!-- </div> -->
<style lang="scss">
	.track {
		--max-width: 800px;
		--margin: 1rem;
		width: min(var(--max-width), 100% - var(--margin));
		margin-inline: auto;
		display: flex;
		flex-direction: column;

		&:not(.editing) {
			// background-color: hsl(180, 6%, 10%);
			background-color: #191f24;
			padding: 2rem;
			gap: 2rem;
		}
	}

	.button-set {
		display: flex;
		gap: 0.5rem;
		margin-inline: auto;
		justify-content: center;
	}

	button {
		border: 2px solid $primary;
		color: $primary;
		background-color: transparent;
		border-radius: 0.5rem;
		padding: 0.2em 0.6em;
		font-weight: bold;
		font-size: 1.1rem;
		cursor: pointer;
		transition: all 100ms ease-in-out;
	}

	button:hover {
		color: hsl(240, 21%, 9%);
		background-color: $primary;
	}

	label {
		color: white;
	}
</style>
