<script>
	import { createEventDispatcher } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';

	import BlockWrapper from '$lib/components/BlockWrapper.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import TextBlock from '$lib/components/TextBlock.svelte';
	import { flip } from 'svelte/animate';
	import { editStore } from '$lib/stores/edit';
	import { beforeNavigate } from '$app/navigation';

	/** @type {import('src/types').Entry} */
	export let entry;

	const dispatch = createEventDispatcher();
	// Save the entry to the database before navigating away
	beforeNavigate(() => {
		dispatch('update', entry);
	});

	const componentsMap = {
		code: CodeBlock,
		text: TextBlock
	};

	/** @type {(index: number) => void} */
	const onAddCode = (index) => {
		/** @type {import('src/types').CodeBlock} */
		const newBlock = {
			id: uuidv4(),
			type: 'code',
			code: '',
			language: 'JavaScript'
		};
		entry.blocks = [...entry.blocks.slice(0, index), newBlock, ...entry.blocks.slice(index)];
		dispatch('update', entry);
	};

	/** @type {(index: number) => void} */
	const onAddText = (index) => {
		/** @type {import('src/types').TextBlock} */
		const newBlock = {
			id: uuidv4(),
			type: 'text',
			title: '',
			content: ''
		};
		entry.blocks = [...entry.blocks.slice(0, index), newBlock, ...entry.blocks.slice(index)];
		dispatch('update', entry);
	};

	const onDeleteBlock = (/** @type {string} */ id) => {
		entry.blocks = entry.blocks.filter((block) => block.id !== id);
		dispatch('update', entry);
	};

	let newTag = '';

	const onAddTag = () => {
		let formattedTag = newTag.trim().toLowerCase();
		if (formattedTag === '') {
			return;
		}
		if (!entry.tags.includes(formattedTag)) {
			entry.tags = [...entry.tags, formattedTag];
			dispatch('update', entry);
		}
		newTag = '';
	};

	const onDeleteTag = (/** @type {string} */ tag) => {
		entry.tags = entry.tags.filter((t) => t !== tag);
		dispatch('update', entry);
	};
</script>

<main class="stack" class:editing={$editStore}>
	<!-- Entry title and data -->
	<BlockWrapper>
		{#if $editStore}
			<input
				type="text"
				bind:value={entry.title}
				on:blur={() => dispatch('update', entry)}
				placeholder="New Entry"
			/>
		{:else}
			<h2>{entry.title || 'Untitled'}</h2>
		{/if}
		<div class="tags" class:empty={entry.tags.length === 0}>
			{#each entry.tags as tag}
				<span>
					#{tag}
					{#if $editStore}
						<button on:click={() => onDeleteTag(tag)} />
					{/if}
				</span>
			{/each}
			{#if $editStore}
				<form on:submit|preventDefault={onAddTag}>
					<input type="text" bind:value={newTag} placeholder="add tag" />
				</form>
			{/if}
		</div>
	</BlockWrapper>
	<!-- Prevents distortion when switching the edit mode -->
	{#key $editStore}
		{#if $editStore}
			<!-- Add block before first block -->
			<div class="button-set">
				<button on:click={() => onAddCode(0)}>Code +</button>
				<button on:click={() => onAddText(0)}>Text +</button>
			</div>
		{/if}
		{#each entry.blocks as block, index (block.id)}
			<div animate:flip={{ duration: 200 }}>
				<BlockWrapper>
					<svelte:component
						this={componentsMap[block.type]}
						bind:props={block}
						on:delete={() => onDeleteBlock(block.id)}
						on:update={() => dispatch('update', entry)}
					/>
				</BlockWrapper>
				{#if $editStore}
					<!-- Add block between blocks -->
					<div class="button-set">
						<button on:click={() => onAddCode(index + 1)}>Code +</button>
						<button on:click={() => onAddText(index + 1)}>Text +</button>
					</div>
				{/if}
			</div>
		{/each}
	{/key}
</main>

<style lang="scss">
	.stack {
		--max-width: 800px;
		--margin: 1rem;
		width: min(var(--max-width), 100% - var(--margin));
		margin-inline: auto;
		display: flex;
		flex-direction: column;

		&:not(.editing) {
			background-color: $slate-800;
			// background-color: var(--gray-9);
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

	// button {
	// 	border: 2px solid $primary;
	// 	color: $primary;
	// 	background-color: transparent;
	// 	border-radius: 0.5rem;
	// 	padding: 0.2em 0.6em;
	// 	font-weight: bold;
	// 	font-size: 1.1rem;
	// 	cursor: pointer;
	// 	transition: all 100ms ease-in-out;
	// }

	// button:hover {
	// 	color: hsl(240, 21%, 9%);
	// 	background-color: $primary;
	// }

	.tags {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		padding: var(--size-2) 0;
		gap: var(--size-2);

		&.empty {
			display: contents;
		}

		span {
			display: flex;
			align-items: center;
			gap: var(--size-2);
			// font-style: italic;
			padding: var(--size-1) var(--size-2);
			// padding: var(--size-1);
			// padding-left: var(--size-2);
			background-color: var(--blue-9);
			border-radius: var(--radius-round);
			line-height: var(--font-lineheight-00);

			button {
				width: var(--size-4);
				font-size: var(--font-size-0);
				aspect-ratio: var(--ratio-square);
				border-radius: var(--radius-round);
				background-color: var(--gray-9);
				background-color: var(--blue-0);
			}
		}

		input {
			width: auto;
			max-width: min-content;
		}
	}
</style>
