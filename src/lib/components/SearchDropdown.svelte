<script>
	import Dropdown from '$lib/components/Dropdown.svelte';
	import AddIcon from '$lib/icons/AddIcon.svelte';
	import { trapFocus } from '$lib/actions/trapFocus';
	import { submitOnEnter } from '$lib/actions/submitOnEnter';
	import { createEventDispatcher } from 'svelte';

	/** @type {string[]} */
	export let data;

	export let closeOnSelect = false;

	const dispatch = createEventDispatcher();

	let searchQuery = '';

	/** @type {boolean} */
	let isOpen; // Bind to dropdown

	/** @type {HTMLInputElement} */
	let input;

	$: filteredData =
		searchQuery.trim().length > 0
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
	<span slot="button" class="trigger">
		Add tag <AddIcon small />
	</span>

	<div slot="dropdown" class="search" on:click|stopPropagation use:trapFocus>
		<!-- svelte-ignore a11y-autofocus -->
		<input
			type="text"
			bind:this={input}
			bind:value={searchQuery}
			use:submitOnEnter={onSelect}
			autofocus
		/>
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
	.trigger {
		background-color: var(--cyan-9);
		display: flex;
		align-items: center;
		gap: var(--size-1);
		padding: var(--size-1) var(--size-2);
		border-radius: var(--border-size-3);

		&:hover,
		&:focus-visible {
			background-color: var(--cyan-8);
		}
	}

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
