<script context="module">
	/** @type {import('./').Load} */
	export const load = async ({ session }) => {
		if (!session.loggedIn) {
			return {
				status: 307,
				redirect: '/login'
			};
		}
		return {};
	};
</script>

<script>
	import { onMount } from 'svelte';
	import { load as loadData, save } from '$lib/storage';
	import { signOut } from '$lib/auth';
	import BlockWrapper from '$lib/BlockWrapper.svelte';
	import CodeBlock from '$lib/CodeBlock.svelte';
	import TextBlock from '$lib/TextBlock.svelte';
	import { flip } from 'svelte/animate';
	import { editStore } from '$lib/stores/edit';

	let isMounted = false;

	/** @typedef {{
			id: string,
			type: 'code' | 'text',
			code?: string,
			title?: string,
			content?: string
		 }} Block */

	/** @type {Block[]} */
	let blocks = [];

	onMount(() => {
		isMounted = true;
		blocks = loadData('journal');
	});

	const components = {
		code: CodeBlock,
		text: TextBlock
	};

	/** @type {(index: number)=>void} */
	const onAddCode = (index) => {
		blocks = [
			...blocks.slice(0, index),
			{
				id: `${Math.floor(Math.random() * 100000000)}`,
				type: 'code',
				code: ``
			},
			...blocks.slice(index)
		];
		// blocks = [
		// 	...blocks,
		// 	{
		// 		id: `${Math.floor(Math.random() * 1000)}`,
		// 		type: 'code',
		// 		code: ``
		// 	}
		// ];
	};

	/** @type {(index: number)=>void} */
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
		// blocks = [
		// 	...blocks,
		// 	{
		// 		id: `${Math.floor(Math.random() * 1000)}`,
		// 		type: 'text',
		// 		title: '',
		// 		content: ''
		// 	}
		// ];
	};

	const onDelete = (/** @type {{ detail: { id: string; }; }} */ event) => {
		const id = event.detail.id;
		blocks = blocks.filter((block) => block.id !== id);
	};

	$: isMounted && save('journal', blocks);

	// let editing = true;
	// editStore
</script>

<div class="body">
	<main class="track">
		<label>Edit Mode <input type="checkbox" bind:checked={$editStore} /></label>
		<!-- Prevents distortion when switching the edit mode -->
		{#key $editStore}
			{#each blocks as block, index (block.id)}
				<div animate:flip={{ duration: 200 }}>
					<BlockWrapper id={block.id} on:delete={onDelete}>
						<svelte:component
							this={components[block.type]}
							bind:data={block}
							on:delete={onDelete}
						/>
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
</div>

<button on:click={signOut}>Sign Out</button>

<style>
	.track {
		--max-width: 800px;
		--margin: 1rem;
		width: min(var(--max-width), 100% - var(--margin));
		margin-inline: auto;
		display: flex;
		flex-direction: column;
	}

	.button-set {
		display: flex;
		gap: 0.5rem;
		margin-inline: auto;
		justify-content: center;
		/* padding-block: 0.5rem; */
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
		padding: 0.2em 0.6em;
		font-weight: bold;
		font-size: 1.1rem;
		cursor: pointer;
		transition: all 100ms ease-in-out;
	}

	button:hover {
		color: white;
		/* background-color: hsl(258, 59%, 58%); */
		background-color: hsl(258, 59%, 58%);
	}
</style>
