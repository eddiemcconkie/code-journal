<script>
	import { addDoc, collection, Timestamp, deleteDoc, doc } from 'firebase/firestore';

	import { goto } from '$app/navigation';
	import { auth, db } from '$lib/firebase';
	import { userStore } from '$lib/stores/user';
	import { signInWithGithub, signInWithGoogle } from '$lib/auth';
	import TagList from '$lib/components/TagList.svelte';
	import GroupList from '$lib/components/GroupList.svelte';
	import { entryStore } from '$lib/stores/entry';
	import { flip } from 'svelte/animate';

	let canCreateNew = true;

	const createNewEntry = async () => {
		canCreateNew = false;
		if (auth.currentUser) {
			const docRef = await addDoc(collection(db, `users/${auth.currentUser.uid}/entries`), {
				title: 'New Entry',
				blocks: [],
				group: '',
				favorite: false,
				createdAt: Timestamp.now(),
				updatedAt: Timestamp.now(),
				tags: [],
				links: []
			});
			await goto(`/${docRef.id}?mode=edit`);
			canCreateNew = true;
		}
	};

	/** @typedef { 'recent' | 'favorite' | 'alphabetical' } SortType */

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
		if (sortType === 'alphabetical') {
			if (sortDesc) return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1;
			else return a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1;
		}
		return sortDesc
			? b.updatedAt.toMillis() - a.updatedAt.toMillis()
			: a.updatedAt.toMillis() - b.updatedAt.toMillis();
	});

	/** @param {import('src/types').Entry} entry */
	const onDelete = (entry) => {
		$userStore &&
			confirm('Are you sure you want to delete this entry?') &&
			deleteDoc(doc(db, `users/${$userStore.uid}/entries/${entry.id}`));
	};
</script>

{#if $userStore}
	<div class="layout">
		<main>
			<div class="sort-by">
				Sort &nbsp;
				<button on:click={() => setSortType('recent')} class:selected={sortType === 'recent'}>
					⌚
				</button>
				<button on:click={() => setSortType('favorite')} class:selected={sortType === 'favorite'}>
					⭐
				</button>
				<button
					on:click={() => setSortType('alphabetical')}
					class:selected={sortType === 'alphabetical'}
				>
					🔤
				</button>
			</div>
			<button on:click={createNewEntry} disabled={!canCreateNew}>New Entry!</button>
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
							<!-- <a href={`/${entry.id}?mode=edit`}>Edit</a> -->
							<a href={`/${entry.id}?mode=edit`}>✒️</a>
							<!-- <button on:click={() => onDelete(entry)}>Delete</button> -->
							<button on:click={() => onDelete(entry)}>🗑️</button>
						</div>
					</li>
				{/each}
			</ul>
		</main>
		<aside>
			<TagList />
			<GroupList />
		</aside>
	</div>
{:else}
	<button on:click={signInWithGithub}>Sign In with GitHub</button>
	<button on:click={signInWithGoogle}>Sign In with Google</button>
	<a href="/demo">Continue As Guest</a>
{/if}

<style lang="scss">
	.layout {
		display: grid;
		grid-template-columns: 1fr var(--size-content-1);
		/* max-width: var(--size-content-3); */
		max-width: min(100% - 2rem, 1200px);
		margin-inline: auto;
		background-color: $slate-800;
	}

	main {
		padding: var(--size-fluid-2);
		display: grid;
		gap: var(--size-3);

		> button {
			padding: var(--size-fluid-1);
			max-inline-size: var(--size-content-1);
		}
	}

	ul {
		list-style-type: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		// gap: var(--size-3);
		gap: var(--size-1);
	}

	li {
		// width: 100%;
		// max-inline-size: var(--size-content-3);
		// padding: 0 var(--size-2);
		padding: var(--size-2) var(--size-3);
		display: flex;
		justify-content: space-between;
		border: var(--border-size-1) solid var(--gray-5);
		border-radius: var(--radius-2);

		&:hover,
		&:focus-visible {
			background-color: var(--gray-8);
		}

		> a {
			width: 100%;
			font-weight: bold;
			text-decoration: none;
		}
	}

	.actions {
		display: flex;
		gap: var(--size-3);

		> a {
			text-decoration: none;
			transition: all 100ms ease-in-out;
			transform-origin: 50% 75%;
			// transform-origin: center;

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

	.sort-by > button {
		padding: var(--size-1) var(--size-2);

		&.selected {
			background-color: var(--cyan-9);
			&:hover,
			&:focus-visible {
				background-color: var(--cyan-7);
			}
		}
	}
</style>
