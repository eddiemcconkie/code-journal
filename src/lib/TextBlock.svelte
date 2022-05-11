<script>
	import autosize from 'svelte-autosize';
	import { editStore } from './stores/edit';

	// /** @type {{ id: string; title: string; content: string; }} */
	/** @type {import('../types').TextBlock} */
	export let props;
</script>

<div class="container">
	{#if $editStore}
		<input bind:value={props.title} placeholder="Title" />
		<textarea bind:value={props.content} use:autosize />
	{:else}
		{#if props.title}
			<h2>{props.title}</h2>
		{/if}
		<p>{props.content}</p>
	{/if}
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		position: relative;
	}

	input,
	textarea {
		/* display: block; */
		/* width: 100%; */
		padding: 0.5rem;
		/* border: 2px solid hsl(250, 100%, 99%); */
		/* border: 2px solid hsl(258, 100%, 98%); */
		border-radius: 4px;
		border: 0;
		// box-shadow: 0 0 5px hsl(258, 29%, 93%);
		color: #dbf4f7;
		background-color: #445564;
		// background-color: #30383f;
		background-color: #1c252c;
		border: 3px solid #191f24;
		// border-radius: 4px;
	}

	input,
	h2 {
		font-weight: bold;
		font-size: 1.3rem;
		color: hsl(258, 24%, 28%);
		color: #dbf4f7;
	}

	textarea {
		resize: none;
	}

	p {
		color: #dbf4f7;
	}
</style>
