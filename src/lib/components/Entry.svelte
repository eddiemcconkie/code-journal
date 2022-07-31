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

	let dirty = false;

	// Save the entry to the database before navigating away
	beforeNavigate(() => {
		if (dirty) dispatch('save');
		dirty = false;
	});

	onMount(() => {
		/** @param {KeyboardEvent} e */
		const ctrlS = (e) => {
			if (e.ctrlKey && e.key === 's' && !e.shiftKey && !e.altKey) {
				e.preventDefault();
				onSave();
			}
		};
		/** @param {BeforeUnloadEvent} e */
		const preventCloseTab = (e) => {
			if (dirty) {
				let canClose = confirm('You have unsaved changes. Do you want to close the tab?');
				if (!canClose) e.preventDefault();
			}
		};
		window.addEventListener('keydown', ctrlS);
		window.addEventListener('beforeunload', preventCloseTab);

		return () => {
			window.removeEventListener('keydown', ctrlS);
			window.removeEventListener('beforeunload', preventCloseTab);
		};
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
		dirty = true;
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
		dirty = true;
	};

	/** @param {number} index */
	const onMoveUp = (index) => {
		entry.blocks = [
			...entry.blocks.slice(0, index - 1),
			entry.blocks[index],
			entry.blocks[index - 1],
			...entry.blocks.slice(index + 1)
		];
		dirty = true;
	};

	/** @param {number} index */
	const onMoveDown = (index) => {
		entry.blocks = [
			...entry.blocks.slice(0, index),
			entry.blocks[index + 1],
			entry.blocks[index],
			...entry.blocks.slice(index + 2)
		];
		dirty = true;
	};

	/** @param {string} id */
	const onDeleteBlock = (id) => {
		entry.blocks = entry.blocks.filter((block) => block.id !== id);
		dirty = true;
	};

	const onSave = () => {
		if (dirty) {
			dirty = false;
			dispatch('save');
		}
		goto(`/${entry.id}`);
	};

	const onDeleteEntry = async () => {
		await deleteEntry(entry);
		await goto('/');
	};

	const setDirty = () => {
		dirty = true;
	};
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
						on:input={setDirty}
						placeholder="New Entry"
					/>
					<button class="button" data-type="primary" on:click={onSave}>
						{dirty ? 'Save' : 'Preview'}
					</button>
				</div>
			{:else}
				<div class="space-between gap-3">
					<h2>{entry.title || 'Untitled'}</h2>
					<EntryOptionDropdown {entry} on:delete={onDeleteEntry} on:dirty={setDirty} />
				</div>
			{/if}
			<TagEdit {entry} on:dirty={setDirty} />
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
						on:dirty={setDirty}
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
