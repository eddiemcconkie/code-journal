<script>
	import { addDoc, collection, getDocs, Timestamp, deleteDoc, doc } from 'firebase/firestore';

	import { goto } from '$app/navigation';
	import { auth, db } from '$lib/firebase';
	import { userStore } from '$lib/stores/user';
	import { signInWithGithub, signInWithGoogle } from '$lib/auth';
	import TagList from '$lib/components/TagList.svelte';
	import GroupList from '$lib/components/GroupList.svelte';

	const createNewEntry = async () => {
		if (auth.currentUser) {
			const docRef = await addDoc(collection(db, `users/${auth.currentUser.uid}/entries`), {
				title: 'New Entry',
				blocks: [],
				groupId: '',
				favorite: false,
				createdAt: Timestamp.now(),
				updatedAt: Timestamp.now(),
				tags: [],
				links: []
			});
			goto(`/${docRef.id}?mode=edit`);
		}
	};

	/**
	 * @param {import("@firebase/firestore").QuerySnapshot<import("@firebase/firestore").DocumentData>} snapshot
	 * @param {'most recent' | 'least recent' | 'favorite'} sortBy
	 */
	const sorted = (snapshot, sortBy = 'most recent') => {
		/** @type {import('src/types').Entry[]} */
		const docs = [];
		snapshot.forEach((doc) => {
			// @ts-ignore
			docs.push({ ...doc.data(), id: doc.id });
		});
		return docs.sort((a, b) => b.updatedAt.toMillis() - a.updatedAt.toMillis());
	};

	/**
	 * @param {import('src/types').Entry} entry
	 */
	const onDelete = (entry) => {
		$userStore &&
			confirm('Are you sure you want to delete this entry?') &&
			deleteDoc(doc(db, `users/${$userStore.uid}/entries/${entry.id}`));
	};
</script>

{#if $userStore}
	{#await getDocs(collection(db, `users/${$userStore.uid}/entries`))}
		Loading...
	{:then querySnapshot}
		{@const entries = sorted(querySnapshot)}
		<div class="layout">
			<main>
				<button on:click={createNewEntry}>New Entry!</button>
				<ul class="entry-list">
					{#each entries as entry (entry.id)}
						<li>
							<a href={`/${entry.id}`}>
								{#if entry.title}
									{entry.title}
								{:else}
									<em>Untitled</em>
								{/if}
							</a>&nbsp;
							<a href={`/${entry.id}?mode=edit`}>Edit</a>
							<button on:click={() => onDelete(entry)}>Delete</button>
						</li>
					{/each}
				</ul>
			</main>
			<aside>
				<TagList {entries} />
				<GroupList {entries} />
			</aside>
		</div>
	{/await}
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
	/* a {
		color: white;
	} */
</style>
