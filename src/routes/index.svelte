<script>
	import { userStore } from '$lib/stores/user';
	import TagList from '$lib/components/TagList.svelte';
	import GroupList from '$lib/components/GroupList.svelte';
	import Login from '$lib/components/Login.svelte';
	import EntryList from '$lib/components/EntryList.svelte';
</script>

{#if $userStore}
	<div class="layout">
		<main>
			<EntryList />
		</main>
		<aside>
			<TagList />
			<GroupList />
		</aside>
	</div>
{:else}
	<Login />
{/if}

<style lang="scss">
	.layout {
		display: flex;
		flex-flow: row wrap;
		--max-width: var(--container-width);
		// --margin: var(--size-fluid-1);
		// max-width: min(100% - var(--margin) * 0, var(--max-width));
		max-width: min(100%, var(--max-width));
		margin-inline: auto;
		color: var(--slate-9);
		box-shadow: var(--shadow-1);
	}

	main {
		flex: 1 1 500px;
		min-width: 0;
		background-color: #fff;
		padding: var(--size-fluid-2);
		display: flex;
		flex-direction: column;
		gap: var(--size-3);
	}
	aside {
		background-color: var(--slate-9);
		flex: 1 1 200px;
		display: flex;
		flex-flow: row wrap;
		gap: var(--size-fluid-2) var(--size-fluid-6);
		padding: var(--size-fluid-2);
	}
</style>
