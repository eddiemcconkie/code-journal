<script>
	import { goto } from '$app/navigation';
	import { createNewEntry, deleteEntry } from '$lib/firebase/db';
	import { userStore } from '$lib/stores/user';
	import { flip } from 'svelte/animate';
	import StarIcon from '$lib/icons/StarIcon.svelte';
	import EntryListDropdown from './EntryListDropdown.svelte';
	import SortControls from './SortControls.svelte';
	import { filteredEntryStore } from '$lib/stores/filteredEntry';
	import BackIcon from '$lib/icons/BackIcon.svelte';
	import { groupParam, tagParam } from '$lib/stores/searchParam';

	let canCreateNew = true;

	const createNew = async () => {
		canCreateNew = false;
		const id = await createNewEntry({ group: $groupParam, tag: $tagParam });
		await goto(`/${id}?mode=edit`);
		canCreateNew = true;
	};

	/** @type {import('src/types').SortType} */
	let sortType = 'recent';
	let sortDesc = true;

	$: sortedEntries = $filteredEntryStore.sort((a, b) => {
		if (sortType === 'favorite') {
			if (a.favorite !== b.favorite) {
				if (sortDesc) return a.favorite ? -1 : 1;
				else return a.favorite ? 1 : -1;
			}
		}
		if (sortType === 'alpha') {
			if (sortDesc) return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1;
			else return a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1;
		}
		return sortDesc
			? b.updatedAt.toMillis() - a.updatedAt.toMillis()
			: a.updatedAt.toMillis() - b.updatedAt.toMillis();
	});

	/** @param {import('src/types').Entry} entry */
	const onDelete = (entry) => {
		$userStore && deleteEntry(entry);
	};

	/** @param {import("@firebase/firestore").Timestamp} date */
	const timeSince = (date) => {
		const now = Date.now();
		const diffSeconds = (now - date.toMillis()) / 1000;

		const times = [
			{ label: 'year', seconds: 60 * 60 * 24 * 365 },
			{ label: 'month', seconds: 60 * 60 * 24 * 30 },
			{ label: 'week', seconds: 60 * 60 * 24 * 7 },
			{ label: 'day', seconds: 60 * 60 * 24 },
			{ label: 'hour', seconds: 60 * 60 },
			{ label: 'minute', seconds: 60 }
		];

		for (const time of times) {
			if (diffSeconds >= time.seconds) {
				const ratio = diffSeconds / time.seconds;
				return `${Math.floor(ratio)} ${time.label}${Math.floor(ratio) > 1 ? 's' : ''} ago`;
			}
		}
		return 'just now';
	};
</script>

<div class="action-bar">
	<button on:click={createNew} disabled={!canCreateNew} class="button" data-type="primary">
		New Entry!
	</button>
	<SortControls bind:sortType bind:sortDesc />
</div>

<div>
	<div class="filter | align-item">
		{#if !$groupParam && !$tagParam}
			<span>All Entries</span>
		{:else}
			<a href="/" class="back-icon"><BackIcon /></a>
		{/if}

		{$groupParam}
		{$tagParam}
	</div>
	<!-- Don't animate if the tag or group are changing -->
	{#key [$groupParam, $tagParam]}
		<ul class="select-list" data-type="gray">
			{#each sortedEntries as entry (entry.id)}
				<li animate:flip={{ duration: 200 }}>
					<button on:click={() => goto(`/${entry.id}`)} class="entry-info">
						<span class="entry-title">
							{#if entry.title}
								{entry.title}
							{:else}
								<em>Untitled</em>
							{/if}
							<!-- Show the group label if it exists and all entries are being shown -->
							{#if entry.group && !$groupParam}
								<span class="group-label">/ {entry.group}</span>
							{/if}
						</span>
						<span class="entry-icon">
							{#if entry.favorite}
								<StarIcon filled small />
							{/if}
						</span>
						<span class="entry-time-since">{timeSince(entry.updatedAt)}</span>
					</button>
					<EntryListDropdown {entry} on:delete={() => onDelete(entry)} />
				</li>
			{:else}
				<div class="no-entries"><em>No entries</em></div>
			{/each}
		</ul>
	{/key}
</div>

<style lang="scss">
	.action-bar {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		align-items: flex-end;
	}

	.entry-info {
		display: flex;
		align-items: baseline;
		gap: var(--size-2);
		min-width: 0;
		padding-right: 0;
	}

	.entry-title {
		margin-right: auto;
		display: inline-block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		// Prevents a bit of clipping from overlow: hidden
		padding-right: var(--size-1);
	}

	.group-label {
		font-size: var(--font-size-0);
	}

	.entry-icon {
		flex-shrink: 0;
	}

	.entry-time-since {
		font-weight: normal;
		font-size: var(--font-size-0);
		font-style: italic;
		white-space: nowrap;
		min-width: var(--size-10);
		text-align: end;

		// 480px = var(--size-sm)
		@media screen and (max-width: 480px) {
			display: none;
		}
	}

	.filter {
		background-color: var(--slate-9);
		color: white;
		display: flex;
		padding: var(--size-1) var(--size-3);
		gap: var(--size-2);
		font-weight: bold;
		font-size: var(--font-size-3);
	}

	.back-icon {
		margin: 0;
		margin-left: var(--size-000);

		color: inherit;
		display: flex;
	}

	.no-entries {
		font-size: var(--font-size-2);
		color: var(--text-dark);
		background-color: var(--slate-0);
		padding: var(--size-4);
	}
</style>
