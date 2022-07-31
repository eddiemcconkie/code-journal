<script>
	import { setGroup } from '$lib/firebase/db';
	import { groupStore } from '$lib/stores/group';
	import GroupIcon from '$lib/icons/GroupIcon.svelte';
	import SearchDropdown from '$lib/components/SearchDropdown.svelte';

	/** @type {import('src/types').Entry} */
	export let entry;

	/** @param {{detail: string}} event */
	const onSetGroup = ({ detail: group }) => {
		setGroup(entry, group);
	};
</script>

<SearchDropdown
	data={$groupStore.map((group) => group.name)}
	defaultText={entry.group}
	closeOnSelect
	on:select={onSetGroup}
>
	<span slot="button" on:click>{entry.group ? 'Change Group' : 'Add to Group'} <GroupIcon /></span>
</SearchDropdown>

<style>
	span {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
