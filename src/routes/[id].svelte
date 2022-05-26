<script>
	import { editStore } from '$lib/stores/edit';
	import Entry from '$lib/components/Entry.svelte';
	import { userStore } from '$lib/stores/user';
	import { entryStore } from '$lib/stores/entry';
	import { page } from '$app/stores';
	import { updateEntry } from '$lib/firebase/db';

	const editing = $page.url.searchParams.get('mode') === 'edit';
	$editStore = editing;

	$: docId = $page.params.id;
	$: entry = $entryStore.find((doc) => doc.id === docId);

	/** @param {CustomEvent<import('src/types').Entry>} event */
	const onUpdate = async (event) => {
		if ($userStore) {
			updateEntry(event.detail);
		}
	};
</script>

<a href="/">&larr; Back</a>

{#if entry}
	<Entry {entry} on:update={onUpdate} />
{/if}
