<script>
	import { createEventDispatcher } from 'svelte';

	// export let id = '';
	// export let title = '';
	// export let content = '';
	/** @type {{ id: string; title: string; content: string; }} */
	export let data;

	const dispatch = createEventDispatcher();
</script>

<div>
	<h3>{data.title}</h3>
	<textarea bind:value={data.content} />
	<button on:click={() => dispatch('delete', { id: data.id })}>X</button>
</div>
<!-- on:input={() => dispatch('update', { id, title, content })} -->
