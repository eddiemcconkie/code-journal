import { derived } from 'svelte/store';
import { entryStore } from '$lib/stores/entry';

// /** @type {import('svelte/store').Readable<string[]>} */
// export const groupStore = derived(entryStore, ($entryStore) =>
// 	$entryStore.reduce((/** @type {string[]} */ acc, entry) => {
// 		if (entry.group.trim() !== '' && !acc.includes(entry.group)) {
// 			acc.push(entry.group.trim());
// 		}
// 		return acc;
// 	}, [])
// );

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
		return acc;
	}, [])
);
