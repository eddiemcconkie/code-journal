<script context="module">
	/** @type {import('./guest').Load} */
	export const load = async ({ session }) => {
		if (session.loggedIn) {
			return {
				redirect: '/',
				status: 307
			};
		}
		return {};
	};
</script>

<script>
	import Stack from '$lib/Stack.svelte';
	import { loadData, saveData } from '$lib/storage';
	import { onMount } from 'svelte';

	let isMounted = false;

	/** @type {import('../types').Stack} */
	let stack = {
		id: '',
		name: '',
		blocks: [],
		group: '',
		favorite: false,
		createdAt: '',
		updatedAt: '',
		tags: [],
		links: []
	};

	onMount(() => {
		isMounted = true;
		stack = loadData('journal');
	});

	$: isMounted && saveData('journal', stack);
</script>

<Stack bind:blocks={stack.blocks} />
