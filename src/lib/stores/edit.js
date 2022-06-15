import { page } from '$app/stores';
import { derived } from 'svelte/store';

export const editStore = derived(page, ($page) => $page.url.searchParams.get('mode') === 'edit');
