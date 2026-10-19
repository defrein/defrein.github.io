<script>
	import { Camera as CameraIcon, SkipForward, ChevronDown, Trash2, Wand2 } from 'lucide-svelte';
	import { FILTERS, FRAMES, STICKERS, TEMPLATES, LAYOUTS, COUNTDOWN_OPTIONS } from './config.js';

	let {
		filter = $bindable(),
		frame = $bindable(),
		template = $bindable(),
		layout = $bindable(),
		countdown = $bindable(),
		stickers = $bindable(),
		onstart = () => {}
	} = $props();

	let showMore = $state(false);

	// Preset "scatter" spots so stickers chosen now land in pleasant corners;
	// the user can rearrange any of them later in the result editor.
	const SPOTS = [
		{ x: 0.16, y: 0.13 }, { x: 0.84, y: 0.15 }, { x: 0.13, y: 0.83 },
		{ x: 0.87, y: 0.81 }, { x: 0.5, y: 0.09 }, { x: 0.1, y: 0.5 },
		{ x: 0.9, y: 0.5 }, { x: 0.5, y: 0.91 }, { x: 0.3, y: 0.24 }, { x: 0.72, y: 0.74 }
	];
	let uidSeq = 0;

	function addSticker(stickerId) {
		const spot = SPOTS[stickers.length % SPOTS.length];
		stickers = [
			...stickers,
			{
				uid: `s${Date.now().toString(36)}${uidSeq++}`,
				stickerId,
				x: spot.x,
				y: spot.y,
				scale: 0.17,
				rot: Math.round((Math.random() - 0.5) * 28)
			}
		];
	}

	function removeLast(stickerId) {
		for (let i = stickers.length - 1; i >= 0; i--) {
			if (stickers[i].stickerId === stickerId) {
				stickers = stickers.filter((_, idx) => idx !== i);
				return;
			}
		}
	}

	function clearStickers() {
		stickers = [];
	}

	function countOf(stickerId) {
		return stickers.filter((s) => s.stickerId === stickerId).length;
	}

	/** @param {HTMLElement} node */
	function horizontalScroll(node) {
		const onWheel = (e) => {
			if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
				node.scrollLeft += e.deltaY;
				e.preventDefault();
			}
		};
		node.addEventListener('wheel', onWheel, { passive: false });
		return { destroy() { node.removeEventListener('wheel', onWheel); } };
	}
</script>

<section class="setup" aria-labelledby="setup-title">
	<header class="intro">
		<p class="kicker"><Wand2 size={15} /> Atur gaya kamu</p>
		<h2 id="setup-title">Pilih filter, bingkai &amp; stiker dulu</h2>
		<p class="lede">Semua pilihan langsung dipakai saat memotret — dan masih bisa kamu ubah lagi setelah jadi.</p>
	</header>

	<!-- Filter -->
	<div class="group">
		<div class="group-head">
			<h3>Filter</h3>
			<span class="hint">{filter.label}</span>
		</div>
		<div class="row" use:horizontalScroll>
			{#each FILTERS as f (f.id)}
				<button
					type="button"
					class="chip"
					class:selected={filter.id === f.id}
					style="--accent: {f.accent};"
					aria-pressed={filter.id === f.id}
					onclick={() => (filter = f)}
				>
					<span class="filter-prev" style="filter: {f.css};"></span>
					<span class="chip-label">{f.label}</span>
				</button>
			{/each}
		</div>
	</div>

	<!-- Frame -->
	<div class="group">
		<div class="group-head">
			<h3>Bingkai</h3>
			<span class="hint">{frame.label}</span>
		</div>
		<div class="row" use:horizontalScroll>
			{#each FRAMES as fr (fr.id)}
				<button
					type="button"
					class="chip"
					class:selected={frame.id === fr.id}
					style="--accent: {fr.accent};"
					aria-pressed={frame.id === fr.id}
					onclick={() => (frame = fr)}
				>
					<span class="frame-prev">
						<svg viewBox="0 0 80 80" width="44" height="44" aria-hidden="true">
							<rect x="2" y="2" width="76" height="76" rx="12" fill="white" stroke={fr.accent} stroke-width="2" />
							{@html fr.svg(80, 80)}
						</svg>
					</span>
					<span class="chip-label">{fr.label}</span>
				</button>
			{/each}
		</div>
	</div>

	<!-- Stickers -->
	<div class="group">
		<div class="group-head">
			<h3>Stiker</h3>
			{#if stickers.length}
				<button type="button" class="clear" onclick={clearStickers}>
					<Trash2 size={13} /> Hapus semua ({stickers.length})
				</button>
			{:else}
				<span class="hint">ketuk untuk menempel</span>
			{/if}
		</div>
		<div class="sticker-grid">
			{#each STICKERS as st (st.id)}
				{@const n = countOf(st.id)}
				<button
					type="button"
					class="sticker-btn"
					class:active={n > 0}
					title="Tambah {st.label}"
					aria-label="Tambah stiker {st.label}{n ? `, terpasang ${n}` : ''}"
					onclick={() => addSticker(st.id)}
					oncontextmenu={(e) => { e.preventDefault(); removeLast(st.id); }}
				>
					<svg viewBox="0 0 100 100" aria-hidden="true">{@html st.body}</svg>
					{#if n > 0}<span class="badge">{n}</span>{/if}
				</button>
			{/each}
		</div>
	</div>

	<!-- Secondary options -->
	<div class="group">
		<button
			type="button"
			class="more-toggle"
			aria-expanded={showMore}
			onclick={() => (showMore = !showMore)}
		>
			<span>Tema, kolase &amp; timer</span>
			<ChevronDown size={18} class={showMore ? 'rot' : ''} />
		</button>

		{#if showMore}
			<div class="more">
				<div class="sub-head">Tema</div>
				<div class="row" use:horizontalScroll>
					{#each TEMPLATES as t (t.id)}
						<button
							type="button"
							class="chip"
							class:selected={template?.id === t.id}
							style="--accent: {t.accent};"
							aria-pressed={template?.id === t.id}
							onclick={() => (template = t)}
						>
							<span class="swatch" style="background: {t.bg}; border-color: {t.border};"></span>
							<span class="chip-label">{t.label}</span>
						</button>
					{/each}
				</div>

				<div class="sub-head">Kolase</div>
				<div class="row" use:horizontalScroll>
					{#each LAYOUTS as l (l.id)}
						<button
							type="button"
							class="chip"
							class:selected={layout.id === l.id}
							aria-pressed={layout.id === l.id}
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

				<div class="sub-head">Timer</div>
				<div class="row center">
					{#each COUNTDOWN_OPTIONS as sec (sec)}
						<button
							type="button"
							class="timer-chip"
							class:selected={countdown === sec}
							aria-pressed={countdown === sec}
							onclick={() => (countdown = sec)}
						>
							{sec === 0 ? 'Off' : `${sec}s`}
						</button>
					{/each}
				</div>
			</div>
		{/if}
	</div>

	<div class="cta">
		<button type="button" class="skip" onclick={onstart}>
			<SkipForward size={17} /> Lewati
		</button>
		<button type="button" class="start" onclick={onstart}>
			<CameraIcon size={19} /> Mulai Foto
		</button>
	</div>
</section>

<style>
	.setup {
		width: 100%;
		max-width: 520px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.intro { text-align: center; padding: 0 6px; }
	.kicker {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		margin: 0 0 8px;
		color: var(--pb-pink-600);
		font-weight: 700;
		font-size: 13px;
	}
	.intro h2 {
		margin: 0;
		font-size: clamp(22px, 6vw, 28px);
		font-weight: 700;
		line-height: 1.12;
		color: var(--pb-ink);
	}
	.lede {
		margin: 8px auto 0;
		max-width: 38ch;
		font-size: 14px;
		line-height: 1.5;
		color: var(--pb-ink-soft);
	}

	.group {
		background: rgba(255, 255, 255, 0.72);
		border: 1px solid rgba(155, 209, 237, 0.5);
		border-radius: var(--pb-radius-lg);
		padding: 14px 14px 10px;
		box-shadow: var(--pb-shadow-sm);
	}
	.group-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 10px;
		margin-bottom: 10px;
		padding: 0 2px;
	}
	.group-head h3 {
		margin: 0;
		font-size: 16px;
		font-weight: 700;
		color: var(--pb-ink);
	}
	.hint { font-size: 12px; color: var(--pb-ink-soft); }
	.clear {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		font-size: 12px;
		font-weight: 700;
		color: var(--pb-pink-600);
		background: var(--pb-pink-100);
		border: none;
		border-radius: 999px;
		padding: 5px 10px;
		cursor: pointer;
		font-family: inherit;
	}
	.clear:active { transform: scale(0.96); }

	.row {
		display: flex;
		gap: 10px;
		overflow-x: auto;
		scrollbar-width: none;
		padding: 2px 16px 8px 2px;
		scroll-snap-type: x proximity;
	}
	.row::-webkit-scrollbar { display: none; }
	.row.center { justify-content: center; flex-wrap: wrap; overflow: visible; padding-right: 2px; }

	.chip {
		flex: 0 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		padding: 8px 10px 10px;
		border-radius: var(--pb-radius-md);
		background: white;
		box-shadow: 0 2px 8px rgba(2, 62, 138, 0.08);
		min-width: 72px;
		border: 2px solid transparent;
		cursor: pointer;
		font-family: inherit;
		color: inherit;
		transition: transform 0.14s ease, box-shadow 0.18s ease, border-color 0.14s ease;
		scroll-snap-align: start;
	}
	.chip:hover { transform: translateY(-2px); }
	.chip:active { transform: scale(0.95); }
	.chip.selected {
		border-color: var(--accent, var(--pb-pink-400));
		box-shadow: 0 5px 16px rgba(0, 180, 216, 0.22);
	}
	.chip-label { font-size: 12px; font-weight: 700; color: var(--pb-ink-soft); }
	.chip.selected .chip-label { color: var(--pb-ink); }

	.swatch { width: 44px; height: 44px; border-radius: 12px; border: 2px solid; }
	.filter-prev {
		width: 44px;
		height: 44px;
		border-radius: 12px;
		background:
			radial-gradient(circle at 30% 28%, #ffd6a8, transparent 52%),
			radial-gradient(circle at 72% 72%, #c9b3ff, transparent 52%),
			linear-gradient(135deg, #ffb8d6, #8ec8f4);
	}
	.frame-prev { width: 46px; height: 46px; display: grid; place-items: center; }
	.layout-prev {
		position: relative;
		width: 44px;
		background: var(--pb-pink-100);
		border: 2px solid var(--pb-pink-200);
		border-radius: 8px;
	}
	.layout-prev > span { position: absolute; background: var(--pb-pink-400); border-radius: 3px; }

	.sticker-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(58px, 1fr));
		gap: 8px;
	}
	.sticker-btn {
		position: relative;
		aspect-ratio: 1;
		display: grid;
		place-items: center;
		padding: 7px;
		border-radius: 16px;
		background: white;
		border: 2px solid transparent;
		box-shadow: 0 2px 8px rgba(2, 62, 138, 0.08);
		cursor: pointer;
		transition: transform 0.14s ease, box-shadow 0.18s ease, border-color 0.14s ease;
	}
	.sticker-btn svg { width: 100%; height: 100%; display: block; }
	.sticker-btn:hover { transform: translateY(-2px) rotate(-3deg); }
	.sticker-btn:active { transform: scale(0.92); }
	.sticker-btn.active {
		border-color: var(--pb-pink-400);
		background: var(--pb-pink-50);
		box-shadow: 0 5px 14px rgba(0, 180, 216, 0.2);
	}
	.badge {
		position: absolute;
		top: -6px;
		right: -6px;
		min-width: 20px;
		height: 20px;
		padding: 0 5px;
		border-radius: 999px;
		background: var(--pb-pink-500);
		color: white;
		font-size: 11px;
		font-weight: 700;
		display: grid;
		place-items: center;
		box-shadow: var(--pb-shadow-sm);
	}

	.more-toggle {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 6px 4px;
		background: transparent;
		border: none;
		cursor: pointer;
		font-family: inherit;
		font-size: 15px;
		font-weight: 700;
		color: var(--pb-ink);
	}
	.more-toggle :global(svg.rot) { transform: rotate(180deg); }
	.more-toggle :global(svg) { transition: transform 0.2s ease; color: var(--pb-ink-soft); }
	.sub-head {
		font-size: 13px;
		font-weight: 700;
		color: var(--pb-ink-soft);
		margin: 12px 2px 6px;
	}

	.timer-chip {
		flex: 0 0 auto;
		min-width: 60px;
		padding: 12px 16px;
		border-radius: var(--pb-radius-md);
		background: white;
		border: 2px solid transparent;
		box-shadow: 0 2px 8px rgba(2, 62, 138, 0.08);
		font-family: var(--pb-font);
		font-size: 18px;
		font-weight: 700;
		color: var(--pb-pink-600);
		cursor: pointer;
		transition: transform 0.14s ease;
	}
	.timer-chip:active { transform: scale(0.95); }
	.timer-chip.selected { background: var(--pb-pink-500); border-color: var(--pb-pink-500); color: white; }

	.cta {
		display: flex;
		gap: 10px;
		position: sticky;
		bottom: 8px;
		padding-top: 4px;
	}
	.skip, .start {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		border-radius: 999px;
		font-family: inherit;
		font-weight: 700;
		font-size: 16px;
		cursor: pointer;
		border: none;
		transition: transform 0.12s ease, box-shadow 0.18s ease;
	}
	.skip {
		flex: 0 0 auto;
		padding: 15px 20px;
		background: rgba(255, 255, 255, 0.9);
		color: var(--pb-ink-soft);
		box-shadow: var(--pb-shadow-sm);
	}
	.start {
		flex: 1 1 auto;
		padding: 15px 22px;
		background: linear-gradient(135deg, var(--pb-pink-400), var(--pb-pink-600));
		color: white;
		box-shadow: var(--pb-shadow-md);
	}
	.skip:active, .start:active { transform: scale(0.97); }
	.start:hover { box-shadow: var(--pb-shadow-lg); }

	@media (prefers-reduced-motion: reduce) {
		.chip, .sticker-btn, .timer-chip, .skip, .start { transition: none; }
	}
</style>
