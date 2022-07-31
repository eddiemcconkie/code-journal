import { auth, db } from '$lib/firebase';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	setDoc,
	Timestamp,
	writeBatch
} from 'firebase/firestore';

/** @typedef {import('src/types').Entry} Entry */

/** @param {{tag?: string , group?: string }} args */
export const createNewEntry = async ({ tag, group } = {}) => {
	const tags = tag ? [tag] : [];
	group = group || '';
	if (auth.currentUser) {
		const docRef = await addDoc(collection(db, `users/${auth.currentUser.uid}/entries`), {
			title: 'New Entry',
			blocks: [],
			group,
			favorite: false,
			createdAt: Timestamp.now(),
			updatedAt: Timestamp.now(),
			tags,
			links: []
		});
		return docRef.id;
	}
};

/** @param {Entry} entry */
export const updateEntry = async (entry) => {
	if (auth.currentUser) {
		await setDoc(doc(db, `users/${auth.currentUser.uid}/entries/${entry.id}`), {
			...entry,
			updatedAt: Timestamp.now()
		});
	}
};

/** @param {Entry} entry */
export const deleteEntry = async (entry) => {
	if (auth.currentUser)
		await deleteDoc(doc(db, `users/${auth.currentUser.uid}/entries/${entry.id}`));
};

/** @param {Entry} entry */
export const toggleFavorite = async (entry) => {
	if (auth.currentUser) {
		await setDoc(doc(db, `users/${auth.currentUser.uid}/entries/${entry.id}`), {
			...entry,
			favorite: !entry.favorite
		});
	}
};

/**
 * @param {Entry} entry
 * @param {string} group
 */
export const setGroup = async (entry, group) => {
	if (auth.currentUser) {
		await setDoc(doc(db, `users/${auth.currentUser.uid}/entries/${entry.id}`), {
			...entry,
			group
		});
	}
};

/**
 * @param {Entry[]} entries
 * @param {string} oldGroup
 * @param {string} newGroup
 */
export const renameGroup = async (entries, oldGroup, newGroup) => {
	if (!auth.currentUser) return;

	newGroup = newGroup.trim();
	if (newGroup === '') return;

	// Keep in mind that a batch can contain up to 500 operations
	const batch = writeBatch(db);

	for (const entry of entries) {
		if (entry.group === oldGroup) {
			// const ref = doc(db, `users/${auth.currentUser.uid}/entries/${entry.id}`);
			const ref = doc(db, 'users', auth.currentUser.uid, 'entries', entry.id);
			batch.update(ref, { group: newGroup });
		}
	}

	await batch.commit();
};
