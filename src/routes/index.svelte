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

	/** @type {import('../types').Block[]} */
	let blocks = [];

	onMount(() => {
		isMounted = true;
		blocks = loadData('journal');
	});

	const components = {
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

	$: isMounted && save('journal', blocks);
</script>

<div class="body">
	<main class="track">
		<label>Edit Mode <input type="checkbox" bind:checked={$editStore} /></label>
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
					<BlockWrapper on:delete={() => onDelete(block.id)}>
						<!-- Bit of a hack, but it will reload the component if the language changes -->
						{#key block.language}
							<svelte:component
								this={components[block.type]}
								bind:props={block}
								on:delete={onDelete}
							/>
						{/key}
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

<style lang="scss">
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
</style>
