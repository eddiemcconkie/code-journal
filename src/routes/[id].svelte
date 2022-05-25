<script>
	import { doc, setDoc, Timestamp } from 'firebase/firestore';

	import { db } from '$lib/firebase';
	import { editStore } from '$lib/stores/edit';
	import Entry from '$lib/components/Entry.svelte';
	import { userStore } from '$lib/stores/user';
	import { entryStore } from '$lib/stores/entry';
	import { page } from '$app/stores';

	const editing = $page.url.searchParams.get('mode') === 'edit';
	$editStore = editing;

	$: docId = $page.params.id;
	$: entry = $entryStore.find((doc) => doc.id === docId);

	/** @param {import('firebase/firestore').DocumentSnapshot<import('firebase/firestore').DocumentData>} document */
	const returnData = (document) => {
		/** @type {import('src/types').Entry} */
		// @ts-ignore
		let data = document.data();
		return data;
	};

	/** @param {CustomEvent<import('src/types').Entry>} event */
	const onUpdate = async (event) => {
		if ($userStore) {
			await setDoc(doc(db, `users/${$userStore.uid}/entries/${docId}`), {
				...event.detail,
				updatedAt: Timestamp.now()
			});
		}
	};
</script>

<a href="/">&larr; Back</a>

{#if entry}
	<Entry {entry} on:update={onUpdate} />
{/if}
