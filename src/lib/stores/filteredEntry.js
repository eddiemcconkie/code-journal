import { derived } from 'svelte/store';
import { page } from '$app/stores';
import { entryStore } from '$lib/stores/entry';

export const filteredEntryStore = derived([page, entryStore], ([$page, $entryStore]) => {
	const group = $page.url.searchParams.get('group');
	const tag = $page.url.searchParams.get('tag');
	// const tags = $page.url.searchParams.getAll('tag');
	// console.log('in store', tags);
	// If group is not a search parameter, return all entries
	if (group === null && tag === null) return $entryStore;

	let filtered = $entryStore;
	// Return entries that match the group
	// If group is left empty, only the entries without a group will be returned
	if (group !== null) filtered = filtered.filter((entry) => entry.group.trim() === group.trim());
	if (tag !== null) filtered = filtered.filter((entry) => entry.tags.includes(tag));
	// if (tags.length > 0)
	// filtered = filtered.filter((entry) => tags.some((tag) => entry.tags.includes(tag)));

	return filtered;
});
