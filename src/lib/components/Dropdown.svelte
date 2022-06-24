<script>
	import { fade } from 'svelte/transition';
	import { clickOutside } from '$lib/actions/clickOutside';
	import { trapFocus } from '$lib/actions/trapFocus';

	// Export in case the parent component wants to open or close manually
	export let isOpen = false;

	const openDropdown = () => {
		isOpen = true;
	};
	const closeDropdown = () => {
		isOpen = false;
	};
	const toggleDropdown = () => {
		isOpen = !isOpen;
	};

	let toggleButton;
</script>

<div class="container">
	<button class="trigger" on:click|stopPropagation={toggleDropdown} bind:this={toggleButton}>
		<slot name="button" open={isOpen} />
	</button>
	{#if isOpen}
		<div
			class="dropdown"
			class:right={toggleButton.getBoundingClientRect().right > window.innerWidth - 150}
			use:clickOutside={toggleButton}
			use:trapFocus
			on:close={closeDropdown}
			on:click={closeDropdown}
			in:fade={{ duration: 50 }}
		>
			<!-- transition:fly={{ duration: 50, y: 30 }} -->
			<slot name="dropdown" />
		</div>
	{/if}
</div>

<style>
	.container {
		position: relative;
		display: flex;
	}

	/* .trigger { */
	button {
		background-color: transparent;
		padding: 0;
		flex: 1;
	}

	.dropdown {
		position: absolute;
		top: 100%;
		background-color: white;
		border-radius: var(--radius-1);
		/* overflow: hidden; */
		box-shadow: var(--shadow-2);
		z-index: var(--layer-5);
		min-width: 180px;
	}

	.right {
		right: 0;
	}

	/* .nested {
		top: 50%;
	}

	.nested:not(.right) {
		left: calc(100% + var(--size-1));
	}

	.nested.right {
		right: calc(100% + var(--size-1));
	} */

	/* @media (max-width: 480px) {
		.dropdown {
			position: fixed;
			inset: auto 0 0 0;
			box-shadow: var(--shadow-4);
		}
	} */
</style>
