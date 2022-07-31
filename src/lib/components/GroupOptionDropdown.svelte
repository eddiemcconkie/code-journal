<script>
	import { renameGroup } from '$lib/firebase/db';
	import EllipsisIcon from '$lib/icons/EllipsisIcon.svelte';

	import GroupIcon from '$lib/icons/GroupIcon.svelte';
	import PenIcon from '$lib/icons/PenIcon.svelte';
	import { entryStore } from '$lib/stores/entry';
	import { groupStore } from '$lib/stores/group';
	import Dropdown from './Dropdown.svelte';

	import SearchDropdown from './SearchDropdown.svelte';

	/** @type {string}*/
	export let oldGroup;

	/** @param {{detail:string}} event */
	const onChangeGroup = ({ detail: newGroup }) => {
		renameGroup($entryStore, oldGroup, newGroup);
	};
</script>

<Dropdown>
	<span slot="button" class="text-dark">
		<EllipsisIcon />
	</span>

	<ul slot="dropdown" class="select-list">
		<li>
			<SearchDropdown data={[]} defaultText={oldGroup} closeOnSelect on:select={onChangeGroup}>
				<span slot="button" class="space-between">Rename <PenIcon /></span>
			</SearchDropdown>
		</li>
	</ul>
</Dropdown>
