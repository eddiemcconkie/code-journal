<script context="module">
	/** @type {import('./guest').Load} */
	export const load = async ({ session }) => {
		if (session.loggedIn) {
			return {
				redirect: '/',
				status: 307
			};
		}
		return {};
	};
</script>

<h1>HELLO THERE</h1>
