<script>
	import { groupStore } from '$lib/stores/group';
</script>

<h3>Groups</h3>
<ul>
	{#each $groupStore as group}
		<li><a href={`/tags/${group}`}>#{group}</a></li>
	{/each}
</ul>

<style>
	ul {
		list-style-type: none;
		padding: 0;
	}
</style>
