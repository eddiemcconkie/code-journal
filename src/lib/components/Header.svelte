<script>
	import { page } from '$app/stores';
	import { userStore } from '$lib/stores/user';
	import MenuDropdown from './MenuDropdown.svelte';

	page;
</script>

<header>
	<div class="container space-between">
		<h1>Code Journal</h1>
		{#if $userStore}
			<MenuDropdown />
		{:else if $page.url.pathname !== '/'}
			<a href="/">Sign in</a>
		{/if}
	</div>
</header>

<style lang="scss">
	header {
		color: $text-light;
		background-color: var(--slate-dark);
		box-shadow: var(--shadow-1);

		position: sticky;
		top: 0;
		z-index: var(--layer-5);
	}

	.container {
		max-width: min(100%, var(--container-width));
		margin-inline: auto;
		padding: var(--size-1) var(--size-fluid-2);
	}

	h1 {
		font-size: 1.8rem;
	}

	a {
		color: white;
		font-size: 1.2rem;
	}
</style>
