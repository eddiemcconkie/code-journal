import { writable } from 'svelte/store';

/** @type {import('svelte/store').Writable<import('firebase/auth').User | null>} */
export const userStore = writable(null);
