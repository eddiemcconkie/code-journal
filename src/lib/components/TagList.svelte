<script>
	import TagIcon from '$lib/icons/TagIcon.svelte';
	import { entryStore } from '$lib/stores/entry';

	$: tags = $entryStore
		.reduce((/** @type {string[]} */ acc, entry) => {
			entry.tags.forEach((tag) => {
				if (!acc.includes(tag)) {
					acc.push(tag);
				}
			});
			return acc;
		}, [])
		.sort((a, b) => (a > b ? 1 : -1));
</script>

<div>
	<h3><TagIcon /> Tags</h3>
	<ul>
		{#each tags as tag}
			<li><a href={`/tags?name=${tag}`}>#{tag}</a></li>
		{/each}
	</ul>
</div>

<style>
	h3 > :global(svg) {
		display: inline-block;
	}
	ul {
		list-style-type: none;
		padding: 0;
	}
</style>
