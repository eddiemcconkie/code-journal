import { derived } from 'svelte/store';
import { entryStore } from '$lib/stores/entry';

export const groupStore = derived(entryStore, ($entryStore) =>
	$entryStore.reduce((/** @type {string[]} */ acc, entry) => {
		if (entry.group.trim() !== '' && !acc.includes(entry.group)) {
			acc.push(entry.group.trim());
		}
		return acc;
	}, [])
);
