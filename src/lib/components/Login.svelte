<script>
	import { signInWithGithub, signInWithGoogle } from '$lib/firebase/auth';
	import GithubIcon from '$lib/icons/GithubIcon.svelte';
	import GoogleIcon from '$lib/icons/GoogleIcon.svelte';
</script>

<div class="container">
	<!-- <h3>Sign In</h3> -->
	<button on:click={signInWithGithub}>Sign In with GitHub <GithubIcon /></button>
	<button on:click={signInWithGoogle}>Sign In with Google <GoogleIcon /></button>
	<a href="/demo" class="link-dark">Continue As Guest</a>
</div>

<style>
	.container {
		max-inline-size: var(--size-content-3);
		margin-inline: auto;
		display: flex;
		flex-direction: column;
		gap: var(--size-3);
		align-items: center;
	}

	button {
		padding: var(--size-4) var(--size-6);
	}
</style>
