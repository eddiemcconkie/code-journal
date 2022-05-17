<script>
	import { addDoc, collection, getDocs, Timestamp } from 'firebase/firestore';

	import { goto } from '$app/navigation';
	import { auth, db } from '$lib/firebase';
	import { userStore } from '$lib/stores/user';
	import { signInWithGithub, signInWithGoogle } from '$lib/auth';

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
</script>

{#if $userStore}
	{#await getDocs(collection(db, `users/${$userStore.uid}/entries`))}
		Loading...
	{:then querySnapshot}
		{#if !querySnapshot.empty}
			{#each sorted(querySnapshot) as doc}
				<p>
					<a href={`/${doc.id}`}>
						{#if doc.title}
							{doc.title}
						{:else}
							<em>Untitled</em>
						{/if}
					</a>&nbsp;
					<a href={`/${doc.id}?mode=edit`}>Edit</a>
				</p>
			{/each}
		{/if}
	{/await}
	<button on:click={createNewEntry}>New Entry!</button>
{:else}
	<button on:click={signInWithGithub}>Sign In with GitHub</button>
	<button on:click={signInWithGoogle}>Sign In with Google</button>
	<a href="/demo">Continue As Guest</a>
{/if}

<style>
	a {
		color: white;
	}
</style>
