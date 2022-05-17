<script>
	import { signOut } from '$lib/auth';
	import { userStore } from '$lib/stores/user';
</script>

<header class="_space-between">
	<h1>Code Journal</h1>
	<!-- <label><input type="checkbox" bind:checked={$editStore} /> Edit Mode</label> -->
	{#if $userStore}
		<button on:click={signOut}>Sign Out</button>
	{:else}
		<a href="/login" class="_button">Log in</a>
	{/if}
</header>

<style>
	header {
		padding: 0.2rem 3rem;
		color: #b7c5d3;
		background-color: #252e36;
		border-bottom: 2px solid #12181c;
		position: sticky;
		top: 0;
		z-index: 100;
	}
	h1 {
		font-size: 1.8rem;
	}
</style>
