<script context="module">
	/** @type {import('./login').Load} */
	export const load = async ({ session }) => {
		if (session.loggedIn) {
			return {
				status: 307,
				redirect: '/'
			};
		}
		return {};
	};
</script>

<script>
	import { signInWithGithub } from '$lib/auth';
</script>

<button on:click={signInWithGithub}>Sign In with GitHub</button>
