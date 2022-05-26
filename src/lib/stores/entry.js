import { derived } from 'svelte/store';
import { onSnapshot, collection, query } from 'firebase/firestore';
import { userStore } from '$lib/stores/user';
import { db } from '$lib/firebase';

/** @type {import('svelte/store').Readable<import('src/types').Entry[]>} */
export const entryStore = derived(userStore, ($user, set) => {
	if ($user) {
		const unsubscribe = onSnapshot(
			query(collection(db, `users/${$user.uid}/entries`)),
			(querySnapshot) => {
				/** @type {import('src/types').Entry[]} */
				const entries = [];
				querySnapshot.forEach((doc) => {
					// @ts-ignore
					entries.push({ id: doc.id, ...doc.data() });
				});
				set(entries);
			}
		);
		return () => {
			unsubscribe();
		};
	} else {
		set([]);
	}
});
