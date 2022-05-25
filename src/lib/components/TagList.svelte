<script>
	import { entryStore } from '$lib/stores/entry';

	$: tags = $entryStore.reduce((/** @type {string[]} */ acc, entry) => {
		entry.tags.forEach((tag) => {
			if (!acc.includes(tag)) {
				acc.push(tag);
			}
		});
		return acc;
	}, []);
</script>

<h3>Tags</h3>
<ul>
	{#each tags as tag}
		<li><a href={`/tags?name=${tag}`}>#{tag}</a></li>
	{/each}
</ul>

<style>
	ul {
		list-style-type: none;
		padding: 0;
	}
</style>
