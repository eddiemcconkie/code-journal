<script context="module">
	/** @type {import('./[id]').Load} */
	export const load = async ({ params, url }) => {
		const editing = url.searchParams.get('mode') === 'edit';
		editStore.set(editing);

		return {
			props: {
				docId: params.id
			}
		};
	};
</script>

<script>
	import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';

	import { db } from '$lib/firebase';
	import { editStore } from '$lib/stores/edit';
	import Entry from '$lib/components/Entry.svelte';
	import { userStore } from '$lib/stores/user';

	/** @type {string} */
	export let docId;

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
{#if $userStore}
	{#await getDoc(doc(db, `users/${$userStore.uid}/entries/${docId}`))}
		Loading...
	{:then document}
		{#if document.exists()}
			<Entry entry={returnData(document)} on:update={onUpdate} />
		{:else}
			Document could not be loaded!
		{/if}
	{:catch error}
		<p>{error}</p>
	{/await}
{/if}
