<script context="module">
	/** @type {import('./').Load} */
	export const load = async ({ session }) => {
		if (!session.loggedIn) {
			return {
				status: 307,
				redirect: '/login'
			};
		}
		return {};
	};
</script>
