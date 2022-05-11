<script>
	import { EditorState, basicSetup } from '@codemirror/basic-setup';
	import { EditorView, keymap } from '@codemirror/view';
	import { indentWithTab } from '@codemirror/commands';
	import { Compartment } from '@codemirror/state';
	// CodeMirror langauges
	import { cpp } from '@codemirror/lang-cpp';
	import { css } from '@codemirror/lang-css';
	import { html } from '@codemirror/lang-html';
	import { java } from '@codemirror/lang-java';
	import { javascript } from '@codemirror/lang-javascript';
	import { json } from '@codemirror/lang-json';
	import { markdown } from '@codemirror/lang-markdown';
	import { php } from '@codemirror/lang-php';
	import { python } from '@codemirror/lang-python';
	import { sql } from '@codemirror/lang-sql';

	// import { oneDark } from '@codemirror/theme-one-dark';
	import { oneDark } from '$lib/codemirror-styles';
	import { onMount } from 'svelte';
	import { editStore } from './stores/edit';

	// /** @type {{ id: string; code: string; language: string; }} */
	/** @type {import('../types').CodeBlock} */
	export let props;

	/** @type {HTMLElement} */
	let parent;
	/** @type {EditorView} */
	let myView;

	// let languageConf = new Compartment();

	const languages = {
		JavaScript: javascript,
		HTML: html,
		CSS: css,
		Python: python,
		'C++': cpp,
		SQL: sql,
		Java: java,
		PHP: php,
		JSON: json,
		Markdown: markdown
	};

	let state = EditorState.create({
		doc: props.code,
		extensions: [
			basicSetup,
			keymap.of([indentWithTab]),
			// @ts-ignore
			languages[props.language](),
			// languageConf.of(languages[props.language]()),
			EditorView.updateListener.of((update) => {
				props.code = update.state.doc.toString();
			}),
			EditorState.readOnly.of(!$editStore),
			oneDark
		]
	});

	onMount(() => {
		myView = new EditorView({
			state,
			parent
		});
	});
</script>

<div>
	<select bind:value={props.language}>
		<option>JavaScript</option>
		<option>HTML</option>
		<option>CSS</option>
		<option>Python</option>
		<option>C++</option>
		<option>SQL</option>
		<option>Java</option>
		<option>PHP</option>
		<option>JSON</option>
		<option>Markdown</option>
	</select>
	<div bind:this={parent} class="container" />
</div>

<style>
	.container {
		/* background-color: white; */
		/* box-shadow: 0 0 10px hsl(258, 29%, 93%); */
		border: 3px solid #191f24;
		border-radius: 4px;
	}

	select {
		color-scheme: dark;
		margin-bottom: 1rem;
	}
</style>
