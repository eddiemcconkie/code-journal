<script>
	import { signInWithGithub, signInWithGoogle } from '$lib/firebase/auth';
</script>

<div class="container">
	<!-- <h3>Sign In</h3> -->
	<button on:click={signInWithGithub}>Sign In with GitHub</button>
	<button on:click={signInWithGoogle}>Sign In with Google</button>
	<a href="/demo">Continue As Guest</a>
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
