<script>
	import { signInWithGithub, signInWithGoogle } from '$lib/firebase/auth';
	import GithubIcon from '$lib/icons/GithubIcon.svelte';
	import GoogleIcon from '$lib/icons/GoogleIcon.svelte';
</script>

<div class="container">
	<h3 class="text-dark">Sign in</h3>
	<button on:click={signInWithGithub}>GitHub <GithubIcon /></button>
	<button on:click={signInWithGoogle}>Google <GoogleIcon /></button>
	<!-- <a href="/demo" class="link-dark">Continue As Guest</a> -->
</div>

<style>
	.container {
		max-inline-size: var(--size-content-2);
		margin-inline: auto;
		display: flex;
		flex-direction: column;
		gap: var(--size-3);
		align-items: center;
		background-color: white;
		padding-block: var(--size-11) var(--size-11);
		margin-block-start: var(--size-11);
		box-shadow: var(--shadow-1);
		border-radius: var(--radius-3);
	}

	h3 {
		font-size: var(--font-size-5);
	}

	button {
		padding: var(--size-2) var(--size-8);
		display: flex;
		gap: var(--size-3);
		border-radius: var(--radius-2);
	}
</style>
