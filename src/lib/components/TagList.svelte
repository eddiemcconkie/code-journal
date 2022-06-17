<script>
	import { goto } from '$app/navigation';

	import { page } from '$app/stores';

	import TagIcon from '$lib/icons/TagIcon.svelte';
	import { tagParam } from '$lib/stores/searchParam';
	import { tagStore } from '$lib/stores/tag';

	/** @param {string} tag */
	const toggleTag = (tag) => {
		const params = $page.url.searchParams;
		const tags = params.getAll('tag');

		if (tags.includes(tag)) {
			tags.splice(tags.indexOf(tag), 1);
		} else {
			tags.push(tag);
		}
		params.delete('tag');
		tags.forEach((tag) => params.append('tag', tag));
		console.log(params.getAll('tag'));
		goto(`/?${params.toString()}`, { replaceState: true });
	};

	/** @param {string} str */
	const encode = (str) => encodeURIComponent(str).replace(/%20/g, '+');
</script>

<div>
	<h3 class="align-base gap-2">Tags <TagIcon small /></h3>
	<ul>
		{#each $tagStore as tag}
			<li>
				{#if tag === $tagParam}
					<a class="button highlight" href={`/`}>
						{tag}
					</a>
				{:else}
					<a class="button" href={`/?tag=${encode(tag)}`}>
						{tag}
					</a>
				{/if}
			</li>
		{/each}
	</ul>
</div>

<style>
	ul {
		display: flex;
		flex-flow: row wrap;
		gap: var(--size-2) var(--size-3);
		margin-top: var(--size-2);
	}

	a {
		white-space: nowrap;
		font-weight: normal;
		border-radius: 100vw;
		display: inline-block;
		padding: 0 var(--size-2) var(--border-size-2);
	}

	.highlight,
	.highlight:hover,
	.highlight:focus-visible {
		background-color: var(--cyan-9);
		color: white;
	}
</style>
