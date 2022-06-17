<script>
	import Dropdown from '$lib/components/Dropdown.svelte';
	import MenuIcon from '$lib/icons/MenuIcon.svelte';
	import CloseIcon from '$lib/icons/CloseIcon.svelte';
	import { signOut } from '$lib/firebase/auth';
	import { fly } from 'svelte/transition';
</script>

<Dropdown>
	<span slot="button" let:open class="overlap-children">
		{#if open}
			<span transition:fly={{ y: 20, duration: 100 }}>
				<CloseIcon />
			</span>
		{:else}
			<span transition:fly={{ y: 20, duration: 100 }}>
				<MenuIcon />
			</span>
		{/if}
	</span>

	<ul slot="dropdown" class="select-list">
		<li>
			<button on:click={signOut}>Sign Out</button>
		</li>
	</ul>
</Dropdown>
