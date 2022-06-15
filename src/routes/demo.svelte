<script>
	import { onMount } from 'svelte';
	import { Timestamp } from 'firebase/firestore';

	import Entry from '$lib/components/Entry.svelte';
	import { loadData, saveData } from '$lib/storage';

	let isMounted = false;

	/** @type {import('src/types').Entry} */
	let entry = {
		id: 'demo',
		title: '',
		blocks: [],
		group: '',
		favorite: false,
		createdAt: Timestamp.now(),
		updatedAt: Timestamp.now(),
		tags: [],
		links: []
	};

	onMount(() => {
		isMounted = true;
		entry = loadData('journal');
	});

	$: isMounted && saveData('journal', entry);
</script>

<Entry bind:entry />
