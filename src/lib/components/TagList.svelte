<script>
	/** @type {import('src/types').Entry[]} */
	export let entries;
	let tags = entries.reduce((/** @type {string[]} */ acc, entry) => {
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
		<li><button>#{tag}</button></li>
	{/each}
</ul>
