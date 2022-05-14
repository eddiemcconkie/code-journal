<script>
	// CodeMirror
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
	import DeleteButton from './DeleteButton.svelte';

	/** @type {import('../types').CodeBlock} */
	export let props;

	/** @type {HTMLElement} */
	let parent;
	/** @type {EditorView} */
	let view;

	let languageConf = new Compartment();
	let editConf = new Compartment();
	let readonlyConf = new Compartment();

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
			languageConf.of(languages[props.language]()),
			EditorView.updateListener.of((update) => {
				props.code = update.state.doc.toString();
			}),
			EditorView.lineWrapping,
			editConf.of(EditorView.editable.of($editStore)),
			readonlyConf.of(EditorState.readOnly.of(!$editStore)),
			oneDark
		]
	});

	onMount(() => {
		view = new EditorView({
			state,
			parent
		});
	});

	// @ts-ignore
	// Update the language
	$: view?.dispatch({ effects: languageConf.reconfigure(languages[props.language]()) });
	// Update the editable and readonly states
	// I use both because there are certain events that can still change the content if only one is used
	$: view?.dispatch({ effects: editConf.reconfigure(EditorView.editable.of($editStore)) });
	$: view?.dispatch({ effects: readonlyConf.reconfigure(EditorState.readOnly.of(!$editStore)) });

	let copied = false;

	const copyToClipboard = () => {
		navigator.clipboard.writeText(props.code);
		if (!copied) {
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
		}
	};
</script>

<div>
	{#if $editStore}
		<div class="_space-between">
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
			<DeleteButton on:delete />
		</div>
	{:else}
		<p>{props.language}</p>
	{/if}
	<div bind:this={parent} class="container">
		{#if !$editStore}
			<button class="copy-button" on:click={copyToClipboard} class:copied>
				{#if copied}
					Copied!
				{:else}
					Copy
				{/if}
			</button>
		{/if}
	</div>
</div>

<style>
	.container {
		/* background-color: white; */
		/* box-shadow: 0 0 10px hsl(258, 29%, 93%); */
		/* border: 3px solid #191f24; */
		overflow: hidden;
		border-radius: 5px;
		position: relative;
	}

	.copy-button {
		position: absolute;
		top: 0;
		right: 0;
		padding: 5px 10px;
		border: 0;
		border-radius: 5px;
		/* background-color: #191f24; */
		background-color: hsl(210, 19%, 10%);
		color: white;
		cursor: pointer;
		z-index: 1;
	}

	/* Only show the hover state if the code has not been copied yet */
	.copy-button:not(.copied):hover,
	.copy-button:not(.copied):focus-visible {
		background-color: #28313a;
	}

	select {
		color-scheme: dark;
		/* margin-bottom: 1rem; */
	}

	._space-between {
		margin-bottom: 1rem;
	}

	p {
		/* color: #89a9ac; */
		color: #6b8c8f;
		font-weight: bold;
		font-size: 0.9rem;
		/* margin-top: 1rem; */
	}
</style>
