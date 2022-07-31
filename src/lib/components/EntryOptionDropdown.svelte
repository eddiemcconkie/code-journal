<script>
	import { createEventDispatcher } from 'svelte';

	import Dropdown from '$lib/components/Dropdown.svelte';
	import PenIcon from '$lib/icons/PenIcon.svelte';
	import TrashIcon from '$lib/icons/TrashIcon.svelte';
	import { goto } from '$app/navigation';
	import EllipsisIcon from '$lib/icons/EllipsisIcon.svelte';
	import GroupSearchDropdown from './GroupSearchDropdown.svelte';
	import Modal from './Modal.svelte';

	/** @type {import('src/types').Entry} */
	export let entry;

	const dispatch = createEventDispatcher();
</script>

<Dropdown>
	<span slot="button" class="text-dark">
		<EllipsisIcon />
	</span>

	<ul slot="dropdown" class="select-list">
		<li>
			<button on:click={() => goto(`/${entry.id}?mode=edit`)}>
				<span class="space-between">Edit <PenIcon /></span>
			</button>
		</li>
		<li>
			<GroupSearchDropdown {entry} />
		</li>
		<li>
			<!-- <button on:click={() => dispatch('delete')}>
				<span class="space-between">Delete <TrashIcon /></span>
			</button> -->
			<Modal on:accept={() => dispatch('delete')}>
				<span slot="trigger" class="space-between">Delete <TrashIcon /></span>
				<svelte:fragment slot="content">
					Are you sure you want to delete this entry?
				</svelte:fragment>
			</Modal>
		</li>
	</ul>
</Dropdown>
