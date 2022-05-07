<script>
	import autosize from 'svelte-autosize';
	import { editStore } from './stores/edit';

	/** @type {{ id: string; title: string; content: string; }} */
	export let data;
</script>

<div class="container">
	{#if $editStore}
		<input bind:value={data.title} placeholder="Title" />
		<textarea bind:value={data.content} use:autosize />
	{:else}
		{#if data.title}
			<h2>{data.title}</h2>
		{/if}
		<p>{data.content}</p>
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
		border-radius: 5px;
		border: 0;
		box-shadow: 0 0 5px hsl(258, 29%, 93%);
	}

	input,
	h2 {
		font-weight: bold;
		font-size: 1.3rem;
		color: hsl(258, 24%, 28%);
	}

	textarea {
		resize: none;
	}
</style>
