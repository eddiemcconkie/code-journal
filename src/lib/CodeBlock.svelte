<script>
	// import { EditorState } from '@codemirror/state';
	import { EditorState, basicSetup } from '@codemirror/basic-setup';
	import { EditorView, keymap } from '@codemirror/view';
	import { indentWithTab } from '@codemirror/commands';
	import { javascript } from '@codemirror/lang-javascript';
	import { createEventDispatcher, onMount } from 'svelte';

	// export let id = '';
	// export let code = '';
	/** @type {{ id: string; code: string; }} */
	export let data;

	const dispatch = createEventDispatcher();

	/** @type {HTMLElement} */
	let parent;
	/** @type {EditorView} */
	let myView;

	// 	let doc = `function add(a, b) {
	// 	return a + b;
	// }

	// function subtract(a, b) {
	// 	return a - b;
	// }

	// let result = add(1, 2);
	// `;

	onMount(() => {
		myView = new EditorView({
			state: EditorState.create({
				doc: data.code,
				extensions: [
					basicSetup,
					keymap.of([indentWithTab]),
					javascript(),
					EditorView.updateListener.of((update) => {
						// console.log(update.state.doc.toString());
						data.code = update.state.doc.toString();
					})
				]
			}),
			parent
		});

		// EditorView.updateListener.of(myView, () => {
		// 	data.code = myView.state.doc.toString();
		// });
	});

	// $: data.code = myView?.state.doc.toString() ?? '';
</script>

<div bind:this={parent} />
<button on:click={() => dispatch('delete', { id: data.id })}>X</button>
