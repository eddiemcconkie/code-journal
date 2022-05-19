<script>
	import { editStore } from '$lib/stores/edit';
</script>

<div class="container" class:editing={$editStore}>
	<slot />
</div>

<style lang="scss">
	.container {
		border-radius: 0.5rem;
		margin-block: 0.5rem;
		padding: 1rem;
		background-color: $gray-800;

		&:not(.editing) {
			display: contents;
		}
	}
</style>
