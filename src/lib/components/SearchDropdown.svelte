<script>
	import Dropdown from '$lib/components/Dropdown.svelte';
	import { trapFocus } from '$lib/actions/trapFocus';
	import { submitOnEnter } from '$lib/actions/submitOnEnter';
	import { createEventDispatcher } from 'svelte';

	/** @type {string[]} */
	export let data;

	export let defaultText = '';

	export let closeOnSelect = false;

	export let filterResults = false;

	const dispatch = createEventDispatcher();

	let searchQuery = defaultText;

	/** @type {boolean} */
	let isOpen; // Bind to dropdown

	/** @type {HTMLInputElement} */
	let input;

	// $: isOpen && input.select();
	$: if (isOpen && input) input.select();

	$: filteredData =
		filterResults && searchQuery.trim().length > 0
			? data.filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()))
			: data;

	/** @param {string} selection */
	const onSelect = (selection) => {
		if (selection.trim().length > 0) dispatch('select', selection);

		searchQuery = '';
		input.focus();

		if (closeOnSelect) isOpen = false;
	};
</script>

<Dropdown bind:isOpen>
	<slot name="button" slot="button" />

	<div slot="dropdown" class="search" on:click|stopPropagation use:trapFocus>
		<input type="text" bind:this={input} bind:value={searchQuery} use:submitOnEnter={onSelect} />
		<!-- Set tabindex to prevent focus when scrolling is enabled (Firefox) -->
		<ul class="select-list" data-type="compact" tabindex="-1">
			{#each filteredData as item}
				<li>
					<button on:click={() => onSelect(item)}>{item}</button>
				</li>
			{/each}
		</ul>
	</div>
</Dropdown>

<style lang="scss">
	.search {
		color: var(--text-dark);
		padding: var(--size-2);
		display: flex;
		flex-direction: column;
		gap: var(--size-2);

		:focus {
			outline: none;
		}
	}

	.select-list {
		max-height: var(--size-12);
		overflow-y: auto;
	}
</style>
