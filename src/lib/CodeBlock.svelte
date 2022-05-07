<script>
	import { EditorState, basicSetup } from '@codemirror/basic-setup';
	import { EditorView, keymap } from '@codemirror/view';
	import { indentWithTab } from '@codemirror/commands';
	import { javascript } from '@codemirror/lang-javascript';
	import { onMount } from 'svelte';

	/** @type {{ id: string; code: string; }} */
	export let data;

	/** @type {HTMLElement} */
	let parent;
	/** @type {EditorView} */
	let myView;

	onMount(() => {
		myView = new EditorView({
			state: EditorState.create({
				doc: data.code,
				extensions: [
					basicSetup,
					keymap.of([indentWithTab]),
					javascript(),
					EditorView.updateListener.of((update) => {
						data.code = update.state.doc.toString();
					})
				]
			}),
			parent
		});
	});
</script>

<div bind:this={parent} class="container" />

<style>
	.container {
		background-color: white;
		box-shadow: 0 0 10px hsl(258, 29%, 93%);
	}
</style>
