<script>
	import { signOut } from '$lib/firebase/auth';
	import { userStore } from '$lib/stores/user';
	import Dropdown from './Dropdown.svelte';
	import MenuDropdown from './MenuDropdown.svelte';
</script>

<header>
	<div class="container space-between">
		<h1>Code Journal</h1>
		{#if $userStore}
			<MenuDropdown />
		{:else}
			<a href="/" class="button">Log in</a>
		{/if}
	</div>
</header>

<style lang="scss">
	header {
		// padding: 0.2rem 3rem;
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
</style>
