<script>
	import { editStore } from '$lib/stores/edit';
</script>

{#if $editStore}
	<div class="container">
		<slot />
	</div>
{:else}
	<slot />
{/if}

<style lang="scss">
	.container {
		// display: flex;
		// gap: 1rem;
		border-radius: 0.5rem;
		padding: 1rem;
		// background-color: hsl(207, 23%, 16%);
		background-color: #191f24;
		// background-color: hsl(187, 8%, 22%);
		margin-block: 0.5rem;
	}
	.content {
		flex: 1;
	}
</style>
