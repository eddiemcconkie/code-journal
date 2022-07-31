<script>
	import { page } from '$app/stores';
	import Entry from '$lib/components/Entry.svelte';
	import { userStore } from '$lib/stores/user';
	import { entryStore } from '$lib/stores/entry';
	import { updateEntry } from '$lib/firebase/db';

	// $: editing = $page.url.searchParams.get('mode') === 'edit';
	// $editStore = editing;

	$: docId = $page.params.id;
	$: entry = $entryStore.find((doc) => doc.id === docId);

	// /** @param {CustomEvent<import('src/types').Entry>} event */
	// // /** @param {{detail: import('src/types').Entry}} event */
	// const onUpdate = async (event) => {
	// 	if ($userStore) {
	// 		updateEntry(event.detail);
	// 	}
	// };

	const onSave = async () => {
		if (entry) updateEntry(entry);
	};
</script>

<a href="/" class="link-dark">&larr; Back</a>

{#if entry}
	<!-- <Entry {entry} on:update={onUpdate} /> -->
	<!-- <Entry {entry} on:save={onSave} /> -->
	<Entry bind:entry on:save={onSave} />
{/if}
