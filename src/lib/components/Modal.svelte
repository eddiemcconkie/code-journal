<script>
	import { createEventDispatcher } from 'svelte';
	import { trapFocus } from '$lib/actions/trapFocus';

	let open = false;

	const dispatch = createEventDispatcher();

	const openModal = () => {
		open = true;
	};

	const closeModal = () => {
		open = false;
	};

	const accept = () => {
		closeModal();
		dispatch('accept');
	};

	const cancel = () => {
		closeModal();
		dispatch('cancel');
	};
</script>

<button on:click|stopPropagation={openModal}>
	<slot name="trigger" />
</button>

<div class="backdrop" class:open on:click={closeModal}>
	<div class="modal text-dark" on:click|stopPropagation use:trapFocus>
		<h3 class="text-dark"><slot name="title" /></h3>
		<p><slot name="content" /></p>
		<div class="actions">
			<button on:click={cancel} class="button" data-type="gray">Cancel</button>
			<button on:click={accept} class="button" data-type="flat">OK</button>
		</div>
	</div>
</div>

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.3);
		display: grid;
		place-items: center;
	}

	.backdrop:not(.open) {
		display: none;
	}

	.modal {
		background: white;
		box-shadow: var(--shadow-3);
		padding: var(--size-3);
		display: flex;
		flex-direction: column;
		gap: var(--size-3);
	}

	.modal > :empty {
		display: none;
	}

	.actions {
		display: flex;
		gap: var(--size-2);
		justify-content: flex-end;
	}
</style>
