import { derived } from 'svelte/store';
import { entryStore } from '$lib/stores/entry';

/** @typedef {{name: string, size: number}[]} GroupList */

/** @type {import('svelte/store').Readable<GroupList>} */
export const groupStore = derived(entryStore, ($entryStore) =>
	$entryStore.reduce((/** @type {GroupList} */ acc, entry) => {
		if (entry.group !== '') {
			const groupIndex = acc.findIndex((group) => group.name === entry.group);
			if (groupIndex === -1) {
				acc.push({ name: entry.group, size: 1 });
			} else {
				acc[groupIndex].size += 1;
			}
		}
		return acc.sort((a, b) => (a.name > b.name ? 1 : -1));
	}, [])
);
