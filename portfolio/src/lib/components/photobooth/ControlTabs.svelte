<script>
	import { Sparkles, SlidersHorizontal, Frame, LayoutGrid, Timer } from 'lucide-svelte';
	import { FILTERS, FRAMES, LAYOUTS, TEMPLATES, COUNTDOWN_OPTIONS } from './config.js';

	let {
		filter = $bindable(),
		frame = $bindable(),
		layout = $bindable(),
		template = $bindable(),
		countdown = $bindable()
	} = $props();

	let active = $state('template');

	/** @param {HTMLElement} node */
	function horizontalScroll(node) {
		/** @param {WheelEvent} e */
		const onWheel = (e) => {
			if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
				node.scrollLeft += e.deltaY;
				e.preventDefault();
			}
		};
		node.addEventListener('wheel', onWheel, { passive: false });
		return { destroy() { node.removeEventListener('wheel', onWheel); } };
	}

	const tabs = [
		{ id: 'template', label: 'Tema',    icon: Sparkles },
		{ id: 'filter',   label: 'Filter',  icon: SlidersHorizontal },
		{ id: 'frame',    label: 'Bingkai', icon: Frame },
		{ id: 'layout',   label: 'Kolase',  icon: LayoutGrid },
		{ id: 'timer',    label: 'Timer',   icon: Timer }
	];
</script>

<section class="panel">
	<div class="tabs" role="tablist">
		{#each tabs as t (t.id)}
			{@const Icon = t.icon}
			<button
				type="button"
				class="tab"
				class:active={active === t.id}
				role="tab"
				aria-selected={active === t.id}
				onclick={() => (active = t.id)}
			>
				<Icon size={18} />
				<span>{t.label}</span>
			</button>
		{/each}
	</div>

	<div class="tab-body">
		{#if active === 'template'}
			<div class="row scroll" use:horizontalScroll>
				{#each TEMPLATES as t (t.id)}
					<button
						type="button"
						class="chip template"
						class:selected={template?.id === t.id}
						style="--accent: {t.accent}; --bg: {t.bg};"
						onclick={() => (template = t)}
					>
						<span class="swatch" style="background: {t.bg}; border-color: {t.border};"></span>
						<span class="chip-label">{t.label}</span>
					</button>
				{/each}
			</div>
		{:else if active === 'filter'}
			<div class="row scroll" use:horizontalScroll>
				{#each FILTERS as f (f.id)}
					<button
						type="button"
						class="chip"
						class:selected={filter.id === f.id}
						style="--accent: {f.accent};"
						onclick={() => (filter = f)}
					>
						<span class="filter-prev" style="filter: {f.css};"></span>
						<span class="chip-label">{f.label}</span>
					</button>
				{/each}
			</div>
		{:else if active === 'frame'}
			<div class="row scroll" use:horizontalScroll>
				{#each FRAMES as fr (fr.id)}
					<button
						type="button"
						class="chip"
						class:selected={frame.id === fr.id}
						style="--accent: {fr.accent};"
						onclick={() => (frame = fr)}
					>
						<span class="frame-prev">
							<svg viewBox="0 0 80 80" width="42" height="42">
								<rect x="2" y="2" width="76" height="76" rx="10" fill="white" stroke={fr.accent} stroke-width="2" />
								{@html fr.svg(80, 80)}
							</svg>
						</span>
						<span class="chip-label">{fr.label}</span>
					</button>
				{/each}
			</div>
		{:else if active === 'layout'}
			<div class="row scroll" use:horizontalScroll>
				{#each LAYOUTS as l (l.id)}
					<button
						type="button"
						class="chip layout"
						class:selected={layout.id === l.id}
						onclick={() => (layout = l)}
					>
						<span class="layout-prev" style="aspect-ratio: {l.aspect};">
							{#each l.cells as c, i (i)}
								<span style="left: {c.x * 100}%; top: {c.y * 100}%; width: {c.w * 100}%; height: {c.h * 100}%;"></span>
							{/each}
						</span>
						<span class="chip-label">{l.label}</span>
					</button>
				{/each}
			</div>
		{:else if active === 'timer'}
			<div class="row center">
				{#each COUNTDOWN_OPTIONS as sec (sec)}
					<button
						type="button"
						class="chip timer-chip"
						class:selected={countdown === sec}
						onclick={() => (countdown = sec)}
					>
						<span class="timer-val">{sec === 0 ? 'Off' : `${sec}s`}</span>
					</button>
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
	.panel {
		width: 100%;
		max-width: 520px;
		margin: 0 auto;
		background: rgba(255, 255, 255, 0.7);
		border-radius: var(--pb-radius-lg);
		padding: 12px;
		box-shadow: var(--pb-shadow-sm);
		backdrop-filter: blur(8px);
		border: 1px solid rgba(255, 184, 214, 0.5);
	}
	.tabs {
		display: flex;
		gap: 4px;
		padding: 4px;
		background: var(--pb-pink-100);
		border-radius: 999px;
		overflow-x: auto;
		scrollbar-width: none;
	}
	.tabs::-webkit-scrollbar { display: none; }
	.tab {
		flex: 1 0 auto;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		padding: 9px 12px;
		border-radius: 999px;
		font-size: 13px;
		color: var(--pb-ink-soft);
		transition: background 0.18s ease, color 0.18s ease, transform 0.12s ease;
		white-space: nowrap;
		background: transparent;
		border: none;
		cursor: pointer;
		font-family: inherit;
		font-weight: 600;
	}
	.tab.active {
		background: white;
		color: var(--pb-pink-600);
		box-shadow: var(--pb-shadow-sm);
	}
	.tab:active { transform: scale(0.96); }

	.tab-body { padding: 12px 4px 4px; }
	.row {
		display: flex;
		gap: 10px;
		overflow-x: auto;
		scrollbar-width: none;
		padding: 4px 16px 8px 4px;
	}
	.row::-webkit-scrollbar { display: none; }
	.row.scroll {
		scroll-snap-type: x mandatory;
		-webkit-mask-image: linear-gradient(to right, black 0, black calc(100% - 28px), transparent 100%);
		mask-image: linear-gradient(to right, black 0, black calc(100% - 28px), transparent 100%);
	}
	.row.center { justify-content: center; flex-wrap: wrap; }

	.chip {
		flex: 0 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		padding: 8px 10px 10px;
		border-radius: var(--pb-radius-md);
		background: white;
		box-shadow: 0 2px 8px rgba(255, 106, 168, 0.08);
		min-width: 72px;
		transition: transform 0.14s ease, box-shadow 0.18s ease;
		scroll-snap-align: start;
		border: 2px solid transparent;
		cursor: pointer;
		font-family: inherit;
		color: inherit;
	}
	.chip:active { transform: scale(0.95); }
	.chip.selected {
		border-color: var(--accent, var(--pb-pink-300));
		box-shadow: 0 4px 14px rgba(255, 106, 168, 0.22);
	}
	.chip-label {
		font-size: 12px;
		font-weight: 700;
		color: var(--pb-ink-soft);
	}
	.chip.selected .chip-label { color: var(--pb-ink); }

	.swatch {
		width: 44px;
		height: 44px;
		border-radius: 12px;
		border: 2px solid;
		background: var(--pb-pink-200);
	}

	.filter-prev {
		width: 44px;
		height: 44px;
		border-radius: 12px;
		background:
			radial-gradient(circle at 30% 30%, #ffd6a8, transparent 50%),
			radial-gradient(circle at 70% 70%, #c9b3ff, transparent 50%),
			linear-gradient(135deg, #ffb8d6, #8ec8f4);
	}

	.frame-prev {
		width: 46px;
		height: 46px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.layout-prev {
		position: relative;
		width: 46px;
		background: var(--pb-pink-100);
		border: 2px solid var(--pb-pink-200);
		border-radius: 8px;
	}
	.layout-prev > span {
		position: absolute;
		background: var(--pb-pink-300);
		border-radius: 3px;
	}

	.timer-chip .timer-val {
		font-family: var(--pb-font);
		font-size: 22px;
		font-weight: 700;
		color: var(--pb-pink-600);
		padding: 8px 14px;
		min-width: 56px;
		text-align: center;
	}
	.timer-chip.selected .timer-val { color: white; }
	.timer-chip.selected { background: var(--pb-pink-500); border-color: var(--pb-pink-500); }

	@media (max-width: 420px) {
		.tab span { display: none; }
		.tab { padding: 9px; }
	}
</style>
