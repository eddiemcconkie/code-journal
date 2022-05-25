<script>
	import { page } from '$app/stores';
	import { entryStore } from '$lib/stores/entry';

	$: tag = $page.url.searchParams.get('name') || '';
	$: entries = $entryStore.filter((entry) => entry.tags.includes(tag));
</script>

<a href="/">&larr; Back</a>

<h2>Tag: {tag}</h2>

{#each entries as entry (entry.id)}
	<li>
		<a href={`/${entry.id}`}>{entry.title}</a>
	</li>
{:else}
	<h3>No entries with that tag</h3>
{/each}
