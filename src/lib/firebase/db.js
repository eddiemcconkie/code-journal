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

/** @param {string} id */
export const deleteEntry = async (id) => {
	if (auth.currentUser) await deleteDoc(doc(db, `users/${auth.currentUser.uid}/entries/${id}`));
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
