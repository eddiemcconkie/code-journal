<script>
	import '../styles/modern-css-reset.css';
	import '../styles/app.css';
	import { auth } from '$lib/firebase';
	import { userStore } from '$lib/stores/user';
	import Header from '$lib/components/Header.svelte';

	auth.onAuthStateChanged((user) => {
		$userStore = user;
	});
</script>

<Header />
<slot />
