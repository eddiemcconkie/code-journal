<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';

	import BlockWrapper from '$lib/components/BlockWrapper.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import TextBlock from '$lib/components/TextBlock.svelte';
	import { flip } from 'svelte/animate';
	import { editStore } from '$lib/stores/edit';
	import { beforeNavigate, goto } from '$app/navigation';
	import TagEdit from './TagEdit.svelte';
	import EntryOptionDropdown from './EntryOptionDropdown.svelte';
	import { deleteEntry } from '$lib/firebase/db';

	/** @typedef {import('src/types').CodeBlock} CodeBlock */
	/** @typedef {import('src/types').TextBlock} TextBlock */

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

	/** @param {number} index */
	const onAddCode = (index) => {
		/** @type {CodeBlock} */
		const newBlock = {
			id: uuidv4(),
			type: 'code',
			code: '',
			language: 'JavaScript'
		};
		entry.blocks = [...entry.blocks.slice(0, index), newBlock, ...entry.blocks.slice(index)];
		dispatch('update', entry);
	};

	/** @param {number} index */
	const onAddText = (index) => {
		/** @type {TextBlock} */
		const newBlock = {
			id: uuidv4(),
			type: 'text',
			title: '',
			content: ''
		};
		entry.blocks = [...entry.blocks.slice(0, index), newBlock, ...entry.blocks.slice(index)];
		dispatch('update', entry);
	};

	/** @param {number} index */
	const onMoveUp = (index) => {
		entry.blocks = [
			...entry.blocks.slice(0, index - 1),
			entry.blocks[index],
			entry.blocks[index - 1],
			...entry.blocks.slice(index + 1)
		];
		dispatch('update', entry);
	};

	/** @param {number} index */
	const onMoveDown = (index) => {
		entry.blocks = [
			...entry.blocks.slice(0, index),
			entry.blocks[index + 1],
			entry.blocks[index],
			...entry.blocks.slice(index + 2)
		];
		dispatch('update', entry);
	};

	/** @param {string} id */
	const onDeleteBlock = (id) => {
		entry.blocks = entry.blocks.filter((block) => block.id !== id);
		dispatch('update', entry);
	};

	const onSave = () => {
		dispatch('update', entry);
		goto(`/${entry.id}`);
	};

	const onDeleteEntry = async () => {
		if (confirm('Are you sure you want to delete this entry?')) {
			await deleteEntry(entry);
			await goto('/');
		}
	};

	onMount(() => {
		/** @param {KeyboardEvent} e */
		const save = (e) => {
			if (e.ctrlKey && e.key === 's' && !e.shiftKey && !e.altKey) {
				e.preventDefault();
				onSave();
			}
		};
		window.addEventListener('keydown', save);

		return () => {
			window.removeEventListener('keydown', save);
		};
	});
</script>

<main class="stack" class:editing={$editStore}>
	<!-- Entry title and data -->
	<BlockWrapper>
		<header>
			{#if $editStore}
				<div class="space-between gap-3">
					<input
						type="text"
						class="title-input"
						bind:value={entry.title}
						on:blur={() => dispatch('update', entry)}
						placeholder="New Entry"
					/>
					<button class="button" data-type="primary" on:click={onSave}>Save</button>
				</div>
			{:else}
				<div class="space-between gap-3">
					<h2>{entry.title || 'Untitled'}</h2>
					<EntryOptionDropdown {entry} on:delete={onDeleteEntry} />
				</div>
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
						first={index === 0}
						last={index === entry.blocks.length - 1}
						on:moveup={() => onMoveUp(index)}
						on:movedown={() => onMoveDown(index)}
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
		--margin: var(--size-3);
		width: min(var(--max-width), 100% - var(--margin));
		margin-inline: auto;
		display: flex;
		flex-direction: column;
		padding-block: var(--size-7) var(--size-13);

		&:not(.editing) {
			background-color: #fff;
			padding-inline: var(--size-7);
			gap: var(--size-7);
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
