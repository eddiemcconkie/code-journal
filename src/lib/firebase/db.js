import { auth, db } from '$lib/firebase';
import { addDoc, collection, deleteDoc, doc, setDoc, Timestamp } from 'firebase/firestore';

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

/** @param {import('src/types').Entry} entry */
export const updateEntry = async (entry) => {
	if (auth.currentUser) {
		await setDoc(doc(db, `users/${auth.currentUser.uid}/entries/${entry.id}`), {
			...entry,
			updatedAt: Timestamp.now()
		});
	}
};

/** @param {import('src/types').Entry} entry */
export const deleteEntry = async (entry) => {
	if (auth.currentUser)
		await deleteDoc(doc(db, `users/${auth.currentUser.uid}/entries/${entry.id}`));
};

/** @param {import('src/types').Entry} entry */
export const toggleFavorite = async (entry) => {
	if (auth.currentUser) {
		await setDoc(doc(db, `users/${auth.currentUser.uid}/entries/${entry.id}`), {
			...entry,
			favorite: !entry.favorite
		});
	}
};

/**
 * @param {import('src/types').Entry} entry
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
