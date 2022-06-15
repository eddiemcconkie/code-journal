<script>
	import { createEventDispatcher } from 'svelte';

	import Dropdown from '$lib/components/Dropdown.svelte';
	import CaretIcon from '$lib/icons/CaretIcon.svelte';
	import TrashIcon from '$lib/icons/TrashIcon.svelte';
	import ArrowIcon from '$lib/icons/ArrowIcon.svelte';

	/** @type {boolean} */
	export let first;
	/** @type {boolean} */
	export let last;

	const dispatch = createEventDispatcher();
</script>

<Dropdown>
	<span slot="button" let:open class="text-dark">
		<CaretIcon down={!open} />
	</span>

	<ul slot="dropdown" class="select-list">
		{#if !first}
			<li>
				<button on:click={() => dispatch('moveup')}>
					<span>Move up <ArrowIcon down={false} /></span>
				</button>
			</li>
		{/if}
		{#if !last}
			<li>
				<button on:click={() => dispatch('movedown')}>
					<span>Move down <ArrowIcon down={true} /></span>
				</button>
			</li>
		{/if}
		<li>
			<button on:click={() => dispatch('delete')}>
				<span>Delete <TrashIcon /></span>
			</button>
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
