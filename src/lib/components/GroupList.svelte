<script>
	import GroupIcon from '$lib/icons/GroupIcon.svelte';
	import { groupStore } from '$lib/stores/group';
	import { groupParam } from '$lib/stores/searchParam';

	/** @param {string} str */
	const encode = (str) => encodeURIComponent(str).replace(/%20/g, '+');
</script>

<div>
	<h3 class="align-base gap-2">Groups <GroupIcon small /></h3>
	<ul class="select-list" data-type="blue">
		{#each $groupStore as group}
			<li class:highlight={group.name === $groupParam}>
				<a
					href={group.name === $groupParam ? '/' : `/?group=${encode(group.name)}`}
					class="space-between"
				>
					<span class="name">{group.name}</span>
					<span class="size">({group.size})</span>
				</a>
			</li>
		{/each}
	</ul>
</div>

<style>
	ul {
		margin-top: var(--size-2);
		max-width: var(--size-14);
	}

	a {
		color: inherit;
		text-decoration: none;
		/* display: inline-block; */
		padding: var(--size-2) var(--size-3);
	}

	.highlight,
	.highlight:hover,
	.highlight:focus-visible {
		background-color: var(--cyan-8);
		color: white;
		/* margin-left: var(--size-2); */
	}
</style>
