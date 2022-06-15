<script>
	import AlphaIcon from '$lib/icons/AlphaIcon.svelte';
	import ClockIcon from '$lib/icons/ClockIcon.svelte';
	import StarIcon from '$lib/icons/StarIcon.svelte';

	/** @typedef {import('src/types').SortType} SortType */

	/** @type {SortType} */
	export let sortType = 'recent';
	export let sortDesc = true;

	/** @param {SortType} type */
	const setSortType = (type) => {
		// Set to true if not selected, otherwise toggle
		sortDesc = type === sortType ? !sortDesc : true;
		sortType = type;
	};
</script>

<div class="sort-by">
	<button
		on:click={() => setSortType('recent')}
		class:selected={sortType === 'recent'}
		class="button"
	>
		<ClockIcon filled={sortDesc || sortType !== 'recent'} />
	</button>
	<button
		on:click={() => setSortType('favorite')}
		class:selected={sortType === 'favorite'}
		class="button"
	>
		<StarIcon filled={sortDesc || sortType !== 'favorite'} />
	</button>
	<button
		on:click={() => setSortType('alpha')}
		class:selected={sortType === 'alpha'}
		class="button"
	>
		<AlphaIcon desc={sortDesc || sortType !== 'alpha'} />
	</button>
</div>

<style lang="scss">
	.sort-by {
		display: flex;

		> button {
			padding: var(--size-2);
			border-radius: 0;
			color: var(--slate-9);

			&.selected {
				background-color: var(--cyan-9);
				// background-color: var(--blue-9);
				color: var(--text-light);
				&:hover,
				&:focus-visible {
					background-color: var(--cyan-8);
					// background-color: var(--blue-7);
				}
			}
		}

		--radius: var(--radius-2);

		:first-child {
			border-radius: var(--radius) 0 0 var(--radius);
		}
		:last-child {
			border-radius: 0 var(--radius) var(--radius) 0;
		}
	}
</style>
