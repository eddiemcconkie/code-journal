<script>
	import { createEventDispatcher } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';

	import BlockWrapper from '$lib/components/BlockWrapper.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import TextBlock from '$lib/components/TextBlock.svelte';
	import { flip } from 'svelte/animate';
	import { editStore } from '$lib/stores/edit';
	import { beforeNavigate } from '$app/navigation';
	import CloseIcon from '$lib/icons/CloseIcon.svelte';
	import TagEdit from './TagEdit.svelte';

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
</script>

<main class="stack" class:editing={$editStore}>
	<!-- Entry title and data -->
	<BlockWrapper>
		<header>
			{#if $editStore}
				<input
					type="text"
					class="title-input"
					bind:value={entry.title}
					on:blur={() => dispatch('update', entry)}
					placeholder="New Entry"
				/>
			{:else}
				<h2>{entry.title || 'Untitled'}</h2>
			{/if}
			<TagEdit {entry} />
		</header>
	</BlockWrapper>
	<!-- Prevents distortion when switching the edit mode -->
	{#key $editStore}
		{#if $editStore}
			<!-- Add block before first block -->
			<div class="button-set">
				<button on:click={() => onAddCode(0)} class="button">Code +</button>
				<button on:click={() => onAddText(0)} class="button">Text +</button>
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
						<button on:click={() => onAddCode(index + 1)} class="button">Code +</button>
						<button on:click={() => onAddText(index + 1)} class="button">Text +</button>
					</div>
				{/if}
			</div>
		{/each}
	{/key}
</main>

<style lang="scss">
	header {
		display: flex;
		flex-direction: column;
		gap: var(--size-3);
	}

	.stack {
		--max-width: 800px;
		--margin: 1rem;
		width: min(var(--max-width), 100% - var(--margin));
		margin-inline: auto;
		display: flex;
		flex-direction: column;

		&:not(.editing) {
			background-color: #fff;
			padding: 2rem;
			gap: 2rem;
			box-shadow: var(--shadow-1);
		}
	}

	.title-input {
		font-weight: bold;
		font-size: 1.8rem;
	}

	h2 {
		color: var(--text-dark);
	}

	.button-set {
		display: flex;
		gap: 0.5rem;
		margin-inline: auto;
		justify-content: center;
	}
</style>
