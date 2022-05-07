<script context="module">
	import { auth } from '$lib/firebase';
	import { browser } from '$app/env';
	// export const prerender = false;

	/** @type {import('./__layout').Load} */
	export const load = ({ session }) => {
		if (browser) {
			auth.onAuthStateChanged(async (user) => {
				if (user) {
					await fetch('/auth', { method: 'PUT' });
				} else {
					await fetch('/auth', { method: 'DELETE' });
				}
				userStore.set(user);
			});
		}

		return {};
	};
</script>

<script>
	import '../styles/modern-css-reset.css';
	import '../styles/app.css';
	import { userStore } from '$lib/stores/user';
	import { beforeNavigate } from '$app/navigation';

	// Stop navigation depending on the user's login state and the page they're trying to access.
	// The problem mainly comes from navigating backwards
	// beforeNavigate((nav) => {
	// 	const signedOutPaths = ['/login', '/demo'];
	// 	if (
	// 		// User is signed in and tries to acces the login or guest page
	// 		($userStore && nav.to && nav.to.pathname in signedOutPaths) ||
	// 		// User is signed out and tries to access a page that requires login
	// 		($userStore === null && nav.to && !(nav.to.pathname in signedOutPaths))
	// 	) {
	// 		nav.cancel();
	// 	}
	// });
</script>

<!-- <h1>Current User: {$userStore?.displayName ?? 'Not signed in'}</h1> -->

<slot />
