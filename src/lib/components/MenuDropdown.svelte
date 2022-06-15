<script>
	import Dropdown from '$lib/components/Dropdown.svelte';
	import MenuIcon from '$lib/icons/MenuIcon.svelte';
	import CloseIcon from '$lib/icons/CloseIcon.svelte';
	import { signOut } from '$lib/firebase/auth';
</script>

<Dropdown>
	<span slot="button" let:open>
		{#if open}
			<CloseIcon />
		{:else}
			<MenuIcon />
		{/if}
	</span>

	<ul slot="dropdown" class="select-list">
		<li>
			<button on:click={signOut}>Sign Out</button>
		</li>
	</ul>
</Dropdown>

<style>
	button {
		width: 100%;
	}
	span {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
