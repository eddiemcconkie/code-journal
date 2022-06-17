<script>
	import { createEventDispatcher } from 'svelte';

	import Dropdown from '$lib/components/Dropdown.svelte';
	import TrashIcon from '$lib/icons/TrashIcon.svelte';
	import ArrowIcon from '$lib/icons/ArrowIcon.svelte';
	import EllipsisIcon from '$lib/icons/EllipsisIcon.svelte';

	/** @type {boolean} */
	export let first;
	/** @type {boolean} */
	export let last;

	const dispatch = createEventDispatcher();
</script>

<Dropdown>
	<span slot="button" class="text-dark">
		<EllipsisIcon />
	</span>

	<ul slot="dropdown" class="select-list">
		{#if !first}
			<li>
				<button on:click={() => dispatch('moveup')}>
					<span class="space-between">Move up <ArrowIcon down={false} /></span>
				</button>
			</li>
		{/if}
		{#if !last}
			<li>
				<button on:click={() => dispatch('movedown')}>
					<span class="space-between">Move down <ArrowIcon down={true} /></span>
				</button>
			</li>
		{/if}
		<li>
			<button on:click={() => dispatch('delete')}>
				<span class="space-between">Delete <TrashIcon /></span>
			</button>
		</li>
	</ul>
</Dropdown>
