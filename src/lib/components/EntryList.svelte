<script>
	import { goto } from '$app/navigation';
	import { createNewEntry, deleteEntry } from '$lib/firebase/db';
	import { userStore } from '$lib/stores/user';
	import { entryStore } from '$lib/stores/entry';
	import { flip } from 'svelte/animate';
	import StarIcon from '$lib/icons/StarIcon.svelte';
	import AlphaIcon from '$lib/icons/AlphaIcon.svelte';
	import ClockIcon from '$lib/icons/ClockIcon.svelte';
	import TrashIcon from '$lib/icons/TrashIcon.svelte';
	import PenIcon from '$lib/icons/PenIcon.svelte';

	let canCreateNew = true;

	// const createNewEntry = async () => {
	// 	canCreateNew = false;
	// 	if (auth.currentUser) {
	// 		const docRef = await addDoc(collection(db, `users/${auth.currentUser.uid}/entries`), {
	// 			title: 'New Entry',
	// 			blocks: [],
	// 			group: '',
	// 			favorite: false,
	// 			createdAt: Timestamp.now(),
	// 			updatedAt: Timestamp.now(),
	// 			tags: [],
	// 			links: []
	// 		});
	// 		await goto(`/${docRef.id}?mode=edit`);
	// 		canCreateNew = true;
	// 	}
	// };
	const createNew = async () => {
		canCreateNew = false;
		const id = await createNewEntry();
		await goto(`/${id}?mode=edit`);
		canCreateNew = true;
	};

	/** @typedef { 'recent' | 'favorite' | 'alpha' } SortType */

	/** @type {SortType} */
	let sortType = 'recent';
	let sortDesc = true;

	/** @param {SortType} type */
	const setSortType = (type) => {
		// Set to true if not selected, otherwise toggle
		sortDesc = type === sortType ? !sortDesc : true;
		sortType = type;
	};

	$: sortedEntries = $entryStore.sort((a, b) => {
		if (sortType === 'favorite') {
			if (a.favorite !== b.favorite) {
				return a.favorite ? -1 : 1;
			}
		}
		if (sortType === 'alpha') {
			if (sortDesc) return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1;
			else return a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1;
		}
		return sortDesc
			? b.updatedAt.toMillis() - a.updatedAt.toMillis()
			: a.updatedAt.toMillis() - b.updatedAt.toMillis();
	});

	/** @param {import('src/types').Entry} entry */
	const onDelete = (entry) => {
		$userStore && confirm('Are you sure you want to delete this entry?') && deleteEntry(entry.id);
	};
</script>

<div class="action-bar">
	<button on:click={createNew} disabled={!canCreateNew} class="button primary"> New Entry! </button>
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
</div>
<ul>
	{#each sortedEntries as entry (entry.id)}
		<li animate:flip={{ duration: 200 }}>
			<a href={`/${entry.id}`}>
				{#if entry.title}
					{entry.title}
				{:else}
					<em>Untitled</em>
				{/if}
			</a>&nbsp;
			<div class="actions">
				<a href={`/${entry.id}?mode=edit`} class="icon">
					<PenIcon />
				</a>
				<button on:click={() => onDelete(entry)} class="icon">
					<TrashIcon />
				</button>
			</div>
		</li>
	{/each}
</ul>

<style lang="scss">
	.action-bar {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		// align-items: center;
		align-items: flex-end;
	}

	ul {
		list-style-type: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 1px;
		border-top: var(--border-size-5) solid var(--slate-9);
		// gap: var(--size-3);
		// gap: var(--size-1);
		// border-radius: var(--radius-2);
		// overflow: hidden;
		background-color: var(--slate-9);
	}

	li {
		// width: 100%;
		max-inline-size: 100%;
		// max-inline-size: var(--size-content-3);
		// padding: 0 var(--size-2);
		padding: var(--size-2) var(--size-3);
		display: flex;
		justify-content: space-between;
		// border: var(--border-size-1) solid var(--gray-5);
		// border-radius: var(--radius-2);
		background-color: var(--slate-0);
		box-shadow: var(--shadow-1);

		transition: background-color 100ms var(--ease-5);

		.icon {
			color: var(--slate-8);
		}

		&:hover,
		&:focus-within {
			background-color: var(--slate-8);

			> a {
				color: var(--text-light);
			}

			.icon {
				color: var(--text-light);
			}
		}

		> a {
			width: 100%;
			font-weight: bold;
			text-decoration: none;
			color: var(--text-dark);
		}
	}

	.actions {
		display: flex;
		gap: var(--size-3);

		> a {
			text-decoration: none;
			// transition: transform 100ms ease-in-out;
			// transform-origin: 50% 75%;
			// transform-origin: center;
			display: grid;
			place-items: center;

			&:hover,
			&:focus-visible {
				transform: scale(1.5);
			}
		}
	}

	a {
		color: white;
		text-decoration: underline solid white;

		&:hover,
		&:focus-visible {
			text-decoration: none;
		}
	}

	.sort-by {
		display: flex;

		> button {
			padding: var(--size-2);
			border-radius: 0;
			color: var(--slate-9);

			:global(svg) {
				transition: transform 200ms var(--ease-5);
			}
			&:hover,
			&:focus-visible {
				:global(svg) {
					transform: scale(1.2);
				}
			}

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
