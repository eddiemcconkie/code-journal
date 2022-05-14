<script>
	import { onMount } from 'svelte';
	import { loadData, saveData } from '$lib/storage';
	import { signOut } from '$lib/auth';
	import BlockWrapper from '$lib/BlockWrapper.svelte';
	import CodeBlock from '$lib/CodeBlock.svelte';
	import TextBlock from '$lib/TextBlock.svelte';
	import { flip } from 'svelte/animate';
	import { editStore } from '$lib/stores/edit';

	let isMounted = false;

	// let blocks = [];
	/** @type {import('../types').Block[]} */
	export let blocks;

	// onMount(() => {
	// 	isMounted = true;
	// 	blocks = loadData('journal');
	// });

	const componentsMap = {
		code: CodeBlock,
		text: TextBlock
	};

	/** @type {(index: number) => void} */
	const onAddCode = (index) => {
		blocks = [
			...blocks.slice(0, index),
			{
				id: `${Math.floor(Math.random() * 100000000)}`,
				type: 'code',
				code: '',
				language: 'JavaScript'
			},
			...blocks.slice(index)
		];
	};

	/** @type {(index: number) => void} */
	const onAddText = (index) => {
		blocks = [
			...blocks.slice(0, index),
			{
				id: `${Math.floor(Math.random() * 100000000)}`,
				type: 'text',
				title: '',
				content: ''
			},
			...blocks.slice(index)
		];
	};

	const onDelete = (/** @type {string} */ id) => {
		blocks = blocks.filter((block) => block.id !== id);
	};

	// $: isMounted && saveData('journal', blocks);
</script>

<!-- <div class="body"> -->
<header class="_space-between">
	<h1>Code Journal</h1>
	<label><input type="checkbox" bind:checked={$editStore} /> Edit Mode</label>
	<button on:click={signOut}>Sign Out</button>
</header>
<main class="track" class:editing={$editStore}>
	<!-- Prevents distortion when switching the edit mode -->
	{#key $editStore}
		{#if $editStore}
			<div class="button-set">
				<button on:click={() => onAddCode(0)}>Code +</button>
				<button on:click={() => onAddText(0)}>Text +</button>
			</div>
		{/if}
		{#each blocks as block, index (block.id)}
			<div animate:flip={{ duration: 200 }}>
				<!-- <BlockWrapper on:delete={() => onDelete(block.id)}> -->
				<BlockWrapper>
					<svelte:component
						this={componentsMap[block.type]}
						bind:props={block}
						on:delete={() => onDelete(block.id)}
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
	header {
		padding: 0.3rem 3rem;
		color: #b7c5d3;
		background-color: #252e36;
		border-bottom: 2px solid #12181c;
		position: sticky;
		top: 0;
		z-index: 100;
	}

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
