<script>
	import '../styles/modern-css-reset.css';
	import '../styles/app.scss';
	import { auth } from '$lib/firebase';
	import { userStore } from '$lib/stores/user';
	import Header from '$lib/components/Header.svelte';
	import { entryStore } from '$lib/stores/entry';

	auth.onAuthStateChanged((user) => {
		$userStore = user;
	});

	// Stay subbed globally to the list of entries
	$entryStore;
</script>

<Header />
<slot />
