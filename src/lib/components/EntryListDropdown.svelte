<script>
	import { createEventDispatcher } from 'svelte';

	import Dropdown from '$lib/components/Dropdown.svelte';
	import CaretIcon from '$lib/icons/CaretIcon.svelte';
	import PenIcon from '$lib/icons/PenIcon.svelte';
	import TrashIcon from '$lib/icons/TrashIcon.svelte';
	import { goto } from '$app/navigation';
	import StarIcon from '$lib/icons/StarIcon.svelte';
	import { toggleFavorite } from '$lib/firebase/db';
	import GroupIcon from '$lib/icons/GroupIcon.svelte';

	/** @type {import('src/types').Entry} */
	export let entry;

	const dispatch = createEventDispatcher();
</script>

<Dropdown>
	<span slot="button" let:open>
		<CaretIcon down={!open} />
	</span>

	<ul slot="dropdown" class="select-list">
		<li>
			<button on:click={() => goto(`/${entry.id}?mode=edit`)}>
				<span>Edit <PenIcon /></span>
			</button>
		</li>
		<li>
			<button on:click={() => toggleFavorite(entry)}>
				{#if entry.favorite}
					<span>Unavorite <StarIcon /></span>
				{:else}
					<span>Favorite <StarIcon filled /></span>
				{/if}
			</button>
		</li>
		<li>
			<button>
				<span>Add to Group <GroupIcon /></span>
			</button>
		</li>
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
