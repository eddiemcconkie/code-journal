import { derived } from 'svelte/store';
import { entryStore } from './entry';

/** @type {import("svelte/store").Readable<string[]>} */
export const tagStore = derived(entryStore, ($entryStore) =>
	$entryStore
		.reduce((/** @type {string[]} */ acc, entry) => {
			entry.tags.forEach((tag) => {
				if (!acc.includes(tag)) {
					acc.push(tag);
				}
			});
			return acc;
		}, [])
		.sort((a, b) => (a > b ? 1 : -1))
);
