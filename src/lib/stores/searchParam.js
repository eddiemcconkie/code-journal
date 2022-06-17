import { page } from '$app/stores';
import { derived } from 'svelte/store';

export const groupParam = derived(page, ($page) => $page.url.searchParams.get('group') || '');

export const tagParam = derived(page, ($page) => $page.url.searchParams.get('tag') || '');
