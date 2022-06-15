<script>
	import { editStore } from '$lib/stores/edit';
	import { flip } from 'svelte/animate';
	import SearchDropdown from './SearchDropdown.svelte';
	import CloseIcon from '$lib/icons/CloseIcon.svelte';
	import { tagStore } from '$lib/stores/tag';

	/** @type {import('src/types').Entry} */
	export let entry;

	// let newTag = '';

	/** @param {{detail: string}} event */
	const onAddTag = ({ detail }) => {
		// const onAddTag = () => {
		let formattedTag = detail.trim().toLowerCase();
		if (formattedTag === '') {
			return;
		}
		if (!entry.tags.includes(formattedTag)) {
			entry.tags = [...entry.tags, formattedTag];
		}
		// newTag = '';
	};

	const onDeleteTag = (/** @type {string} */ tag) => {
		entry.tags = entry.tags.filter((t) => t !== tag);
	};
</script>

<div class="tags" class:empty={entry.tags.length === 0}>
	{#if $editStore}
		{#each entry.tags.sort((a, b) => (a < b ? -1 : 1)) as tag (tag)}
			<span animate:flip={{ duration: 200 }}>
				{tag}
				<button on:click={() => onDeleteTag(tag)}>
					<CloseIcon color="var(--cyan-9)" />
				</button>
			</span>
		{/each}
	{:else}
		{#each entry.tags.sort((a, b) => (a < b ? -1 : 1)) as tag (tag)}
			<span><a href={`/tags?name=${tag}`}>{tag}</a></span>
		{/each}
	{/if}
</div>
{#if $editStore}
	<SearchDropdown data={$tagStore} on:select={onAddTag} closeOnSelect={false} />
{/if}

<style lang="scss">
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
			padding: var(--size-1) var(--size-2);
			font-size: var(--font-size-2);
			background-color: var(--cyan-9);
			border-radius: var(--radius-round);
			line-height: var(--font-lineheight-00);

			button {
				width: var(--size-4);
				font-size: var(--font-size-0);
				aspect-ratio: var(--ratio-square);
				border-radius: var(--radius-round);
				background-color: var(--gray-0);

				&:hover,
				&:focus-visible {
					opacity: 0.5;
				}
			}

			a {
				color: white;
				&:hover,
				&:focus-visible {
					text-decoration: underline solid white;
				}
			}
		}
	}
	input {
		width: auto;
	}
</style>
