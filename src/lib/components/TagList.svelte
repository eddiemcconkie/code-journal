<script>
	import TagIcon from '$lib/icons/TagIcon.svelte';
	import { tagStore } from '$lib/stores/tag';
</script>

<div>
	<h3>Tags <TagIcon /></h3>
	<ul>
		{#each $tagStore as tag}
			<li><a href={`/tags?name=${tag}`}>{tag}</a></li>
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
