<script>
	import { signOut } from '$lib/auth';
	import { editStore } from '$lib/stores/edit';
	import { userStore } from '$lib/stores/user';
</script>

<header class="_space-between">
	<h1>Code Journal</h1>
	<label><input type="checkbox" bind:checked={$editStore} /> Edit Mode</label>
	{#if $userStore}
		<button on:click={signOut}>Sign Out</button>
	{:else}
		<a href="/" class="_button">Log in</a>
	{/if}
</header>

<style lang="scss">
	header {
		padding: 0.2rem 3rem;
		color: $text-light;
		background-color: $gray-600;
		border-bottom: 2px solid $gray-950;
		position: sticky;
		top: 0;
		z-index: 100;
	}
	h1 {
		font-size: 1.8rem;
	}
</style>
