<script>
	import CodeBlock from '$lib/CodeBlock.svelte';
	import TextBlock from '$lib/TextBlock.svelte';

	import { load, save } from '$lib/storage';
	import { onMount } from 'svelte';

	let isMounted = false;

	/** @type {Block[]} */
	let blocks = [];

	onMount(() => {
		isMounted = true;
		blocks = load('journal');
	});

	/** @typedef {{
	 	id: string,
		type: 'code' | 'text',
		code?: string,
		title?: string,
		content?: string
	 }} Block */

	// /** @type {{
	//  			id: string,
	// 			type: 'code' | 'text',
	// 			code?: string,
	// 			title?: string,
	// 			content?: string
	// 		}[] } */

	// /** @type {Block[]} */
	// let blocks = [
	// 	{
	// 		id: '1',
	// 		type: 'code',
	// 		code: `
	// function add(a, b) {
	// 	return a + b;
	// }

	// function subtract(a, b) {
	// 	return a - b;
	// }

	// let result = add(1, 2);
	// 			`
	// 	},
	// 	{
	// 		id: '2',
	// 		type: 'text',
	// 		title: 'Title',
	// 		content: `This is very nice.`
	// 	}
	// ];

	const components = {
		code: CodeBlock,
		text: TextBlock
	};

	const onAddCode = () => {
		blocks = [
			...blocks,
			{
				id: `${Math.floor(Math.random() * 1000)}`,
				type: 'code',
				code: ``
			}
		];
	};

	const onAddText = () => {
		blocks = [
			...blocks,
			{
				id: `${Math.floor(Math.random() * 1000)}`,
				type: 'text',
				title: 'Title',
				content: `Content`
			}
		];
	};

	const onDelete = (/** @type {{ detail: { id: string; }; }} */ event) => {
		const id = event.detail.id;
		blocks = blocks.filter((block) => block.id !== id);
	};

	// const onUpdate = (/** @type {{ detail: Block }} */ event) => {
	// 	blocks = blocks.map((block) => {
	// 		if (block.id === event.detail.id) {
	// 			console.log(event.detail);
	// 			return { ...block, ...event.detail };
	// 		}
	// 		return block;
	// 	});
	// 	// const id = event.detail.id;
	// 	// let block = blocks.find((block) => block.id === id);
	// 	// if (block) {
	// 	// 	block = {
	// 	// 		...block,
	// 	// 		...event.detail
	// 	// 	};
	// 	// }
	// 	console.log(blocks);
	// };
	// $: console.log(blocks);
	$: isMounted && save('journal', blocks);
</script>

<div class="body">
	<main class="track">
		<!-- {#each blocks as block (block.id)}
			{@const { type, ...props } = block}
			<svelte:component
				this={components[type]}
				{...props}
				on:update={onUpdate}
				on:delete={onDelete}
			/>
		{/each} -->
		{#each blocks as block (block.id)}
			<svelte:component this={components[block.type]} bind:data={block} on:delete={onDelete} />
		{/each}
		<button on:click={onAddCode}>+ Code</button>
		<button on:click={onAddText}>+ Text</button>
	</main>
</div>

<style>
	.track {
		--max-width: 800px;
		--margin: 1rem;
		width: min(var(--max-width), 100% - var(--margin));
		margin-inline: auto;
	}
</style>
