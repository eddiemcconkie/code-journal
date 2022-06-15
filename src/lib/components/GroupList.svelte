<script>
	import GroupIcon from '$lib/icons/GroupIcon.svelte';
	import { groupStore } from '$lib/stores/group';
</script>

<div>
	<h3>Groups <GroupIcon /></h3>
	<ul>
		{#each $groupStore as group}
			<li><a href={`/tags/${group}`}>#{group}</a></li>
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
