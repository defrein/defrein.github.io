<script>
	import { Download, RefreshCw, Share2, X, Maximize2, SlidersHorizontal, Frame as FrameIcon, Sparkles, Smile } from 'lucide-svelte';
	import { FILTERS, FRAMES, TEMPLATES, STICKERS, stickerSvg } from './config.js';
	import { geometry } from './collage.js';

	let {
		photos = [],
		layout = $bindable(),
		frame = $bindable(),
		template = $bindable(),
		filter = $bindable(),
		stickers = $bindable(),
		onretake = () => {}
	} = $props();

	const EXPORT_BASE = 1400;
	const STICKER_BODY = Object.fromEntries(STICKERS.map((s) => [s.id, s.body]));

	let stageEl = $state(null);
	let selected = $state(null); // uid of selected sticker
	let exporting = $state(false);
	let canShare = $state(false);
	let tab = $state('sticker'); // sticker | filter | frame | theme
	let uidSeq = 0;

	let geom = $derived(geometry(layout, !!template?.caption, EXPORT_BASE));
	// Frame decoration markup per cell, sized to that cell — identical string is
	// used for the live overlay and the exported PNG, so they always match.
	let frameInners = $derived(
		geom.cells.map((c) =>
			frame && frame.id !== 'none' && typeof frame.svg === 'function'
				? frame.svg(c.wPx, c.hPx)
				: ''
		)
	);
	// Decorative border ring, as percentages of the card for the DOM overlay.
	let borderBox = $derived({
		left: (geom.border.xPx / geom.canvasW) * 100,
		top: (geom.border.yPx / geom.canvasH) * 100,
		width: (geom.border.wPx / geom.canvasW) * 100,
		height: (geom.border.hPx / geom.canvasH) * 100
	});

	const tabs = [
		{ id: 'sticker', label: 'Stiker', icon: Smile },
		{ id: 'filter', label: 'Filter', icon: SlidersHorizontal },
		{ id: 'frame', label: 'Bingkai', icon: FrameIcon },
		{ id: 'theme', label: 'Tema', icon: Sparkles }
	];

	// ── Sticker placement / editing ──────────────────────────────────────────
	function addSticker(stickerId) {
		const uid = `s${Date.now().toString(36)}${uidSeq++}`;
		stickers = [
			...stickers,
			{ uid, stickerId, x: 0.5, y: 0.5, scale: 0.2, rot: Math.round((Math.random() - 0.5) * 20) }
		];
		selected = uid;
	}

	function updateSticker(uid, patch) {
		stickers = stickers.map((s) => (s.uid === uid ? { ...s, ...patch } : s));
	}

	function removeSticker(uid) {
		stickers = stickers.filter((s) => s.uid !== uid);
		if (selected === uid) selected = null;
	}

	const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

	/** Drag a sticker body around the stage. */
	function startDrag(e, s) {
		if (e.button != null && e.button !== 0) return;
		e.stopPropagation();
		selected = s.uid;
		const rect = stageEl.getBoundingClientRect();
		const startX = e.clientX;
		const startY = e.clientY;
		const origX = s.x;
		const origY = s.y;
		e.currentTarget.setPointerCapture?.(e.pointerId);

		const move = (ev) => {
			const nx = clamp(origX + (ev.clientX - startX) / rect.width, 0.02, 0.98);
			const ny = clamp(origY + (ev.clientY - startY) / rect.height, 0.02, 0.98);
			updateSticker(s.uid, { x: nx, y: ny });
		};
		const up = () => {
			window.removeEventListener('pointermove', move);
			window.removeEventListener('pointerup', up);
		};
		window.addEventListener('pointermove', move);
		window.addEventListener('pointerup', up);
	}

	/** Corner handle: distance sets scale, angle sets rotation. */
	function startTransform(e, s) {
		e.stopPropagation();
		e.preventDefault();
		selected = s.uid;
		const rect = stageEl.getBoundingClientRect();
		const cx = rect.left + s.x * rect.width;
		const cy = rect.top + s.y * rect.height;
		e.currentTarget.setPointerCapture?.(e.pointerId);

		const move = (ev) => {
			const dx = ev.clientX - cx;
			const dy = ev.clientY - cy;
			const dist = Math.hypot(dx, dy);
			const scale = clamp((dist * 1.414) / rect.width, 0.07, 0.62);
			const rot = Math.round((Math.atan2(dy, dx) * 180) / Math.PI - 45);
			updateSticker(s.uid, { scale, rot });
		};
		const up = () => {
			window.removeEventListener('pointermove', move);
			window.removeEventListener('pointerup', up);
		};
		window.addEventListener('pointermove', move);
		window.addEventListener('pointerup', up);
	}

	/** Keyboard nudging / sizing for the selected sticker. */
	function onStickerKey(e, s) {
		const step = e.shiftKey ? 0.05 : 0.01;
		let handled = true;
		if (e.key === 'ArrowLeft') updateSticker(s.uid, { x: clamp(s.x - step, 0.02, 0.98) });
		else if (e.key === 'ArrowRight') updateSticker(s.uid, { x: clamp(s.x + step, 0.02, 0.98) });
		else if (e.key === 'ArrowUp') updateSticker(s.uid, { y: clamp(s.y - step, 0.02, 0.98) });
		else if (e.key === 'ArrowDown') updateSticker(s.uid, { y: clamp(s.y + step, 0.02, 0.98) });
		else if (e.key === '+' || e.key === '=') updateSticker(s.uid, { scale: clamp(s.scale + 0.02, 0.07, 0.62) });
		else if (e.key === '-' || e.key === '_') updateSticker(s.uid, { scale: clamp(s.scale - 0.02, 0.07, 0.62) });
		else if (e.key === 'Delete' || e.key === 'Backspace') removeSticker(s.uid);
		else handled = false;
		if (handled) e.preventDefault();
	}

	// ── Export ────────────────────────────────────────────────────────────────
	function loadImage(src) {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.crossOrigin = 'anonymous';
			img.onload = () => resolve(img);
			img.onerror = reject;
			img.src = src;
		});
	}

	function roundRect(ctx, x, y, w, h, r) {
		const rr = Math.min(r, w / 2, h / 2);
		ctx.beginPath();
		ctx.moveTo(x + rr, y);
		ctx.arcTo(x + w, y, x + w, y + h, rr);
		ctx.arcTo(x + w, y + h, x, y + h, rr);
		ctx.arcTo(x, y + h, x, y, rr);
		ctx.arcTo(x, y, x + w, y, rr);
		ctx.closePath();
	}

	function drawCover(ctx, img, dx, dy, dw, dh) {
		const ir = img.width / img.height;
		const dr = dw / dh;
		let sx, sy, sw, sh;
		if (ir > dr) {
			sh = img.height;
			sw = img.height * dr;
			sx = (img.width - sw) / 2;
			sy = 0;
		} else {
			sw = img.width;
			sh = img.width / dr;
			sx = 0;
			sy = (img.height - sh) / 2;
		}
		ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
	}

	async function buildCanvas() {
		const { canvasW, canvasH, cells, caption, border } = geom;
		const canvas = document.createElement('canvas');
		canvas.width = canvasW;
		canvas.height = canvasH;
		const ctx = canvas.getContext('2d');

		ctx.fillStyle = template?.bg || '#fff8f0';
		ctx.fillRect(0, 0, canvasW, canvasH);
		const grad = ctx.createLinearGradient(0, 0, 0, canvasH);
		grad.addColorStop(0, 'rgba(255,255,255,0.35)');
		grad.addColorStop(1, 'rgba(255,255,255,0)');
		ctx.fillStyle = grad;
		ctx.fillRect(0, 0, canvasW, canvasH);

		for (let i = 0; i < cells.length; i++) {
			const cell = cells[i];
			if (!photos[i]) continue;
			const { xPx: cx, yPx: cy, wPx: cw, hPx: ch, radiusPx: radius } = cell;

			ctx.save();
			ctx.shadowColor = 'rgba(2, 40, 80, 0.2)';
			ctx.shadowBlur = 20;
			ctx.shadowOffsetY = 7;
			ctx.fillStyle = '#fff';
			roundRect(ctx, cx, cy, cw, ch, radius);
			ctx.fill();
			ctx.restore();

			try {
				const img = await loadImage(photos[i]);
				ctx.save();
				roundRect(ctx, cx, cy, cw, ch, radius);
				ctx.clip();
				ctx.filter = filter?.css && filter.css !== 'none' ? filter.css : 'none';
				drawCover(ctx, img, cx, cy, cw, ch);
				ctx.restore();
			} catch (err) {
				console.warn('photo draw failed', err);
			}

			if (frameInners[i]) {
				const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${cw}" height="${ch}" viewBox="0 0 ${cw} ${ch}">${frameInners[i]}</svg>`;
				const url = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
				try {
					const fimg = await loadImage(url);
					ctx.save();
					roundRect(ctx, cx, cy, cw, ch, radius);
					ctx.clip();
					ctx.drawImage(fimg, cx, cy, cw, ch);
					ctx.restore();
				} catch (err) {
					console.warn('frame draw failed', err);
				}
			}
		}

		if (template?.border) {
			ctx.strokeStyle = template.border;
			ctx.lineWidth = 3;
			roundRect(ctx, border.xPx, border.yPx, border.wPx, border.hPx, border.rPx);
			ctx.stroke();
		}

		if (template?.caption) {
			await document.fonts.ready;
			ctx.fillStyle = template.caption.color;
			ctx.font = template.caption.font;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillText(template.caption.text, canvasW / 2, caption.centerPx);
			ctx.globalAlpha = 0.55;
			ctx.font = '500 15px Quicksand';
			const stamp = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
			ctx.fillText(stamp, canvasW / 2, caption.centerPx + geom.canvasW * 0.03);
			ctx.globalAlpha = 1;
		}

		// Stickers on top, drawn in placement order.
		for (const s of stickers) {
			const body = STICKER_BODY[s.stickerId];
			if (!body) continue;
			const size = s.scale * canvasW;
			const url = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(stickerSvg(body))));
			try {
				const simg = await loadImage(url);
				ctx.save();
				ctx.translate(s.x * canvasW, s.y * canvasH);
				ctx.rotate((s.rot * Math.PI) / 180);
				ctx.drawImage(simg, -size / 2, -size / 2, size, size);
				ctx.restore();
			} catch (err) {
				console.warn('sticker draw failed', err);
			}
		}

		return canvas;
	}

	async function download() {
		exporting = true;
		const prev = selected;
		selected = null;
		try {
			const canvas = await buildCanvas();
			const url = canvas.toDataURL('image/png');
			const a = document.createElement('a');
			a.download = `photobooth-${new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)}.png`;
			a.href = url;
			document.body.appendChild(a);
			a.click();
			a.remove();
		} catch (err) {
			console.error(err);
		} finally {
			selected = prev;
			exporting = false;
		}
	}

	async function share() {
		if (!navigator.share) return download();
		exporting = true;
		const prev = selected;
		selected = null;
		try {
			const canvas = await buildCanvas();
			const blob = await new Promise((res) => canvas.toBlob(res, 'image/png'));
			const file = new File([blob], 'photobooth.png', { type: 'image/png' });
			if (navigator.canShare?.({ files: [file] })) {
				await navigator.share({ files: [file], title: 'Photobooth' });
			} else {
				download();
			}
		} catch (err) {
			console.warn(err);
		} finally {
			selected = prev;
			exporting = false;
		}
	}

	$effect(() => {
		canShare = typeof navigator !== 'undefined' && !!navigator.share;
	});
</script>

<section class="result">
	<p class="done-note">Foto siap! Geser stiker, ganti filter atau bingkai sampai pas. ✨</p>

	<!-- Interactive collage -->
	<div class="stage-shell">
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="stage"
			bind:this={stageEl}
			style="aspect-ratio: {geom.cardAspect}; background: {template?.bg || '#fff8f0'};"
			onpointerdown={() => (selected = null)}
		>
			<div class="sheen"></div>

			{#each geom.cells as cell, i (i)}
				{#if photos[i]}
					<div
						class="cell"
						style="left:{cell.leftPct}%; top:{cell.topPct}%; width:{cell.widthPct}%; height:{cell.heightPct}%; border-radius:{Math.max(6, cell.widthPct * 0.09)}px;"
					>
						<img src={photos[i]} alt="Foto {i + 1}" style="filter: {filter?.css || 'none'};" />
						{#if frameInners[i]}
							<svg class="frame" viewBox="0 0 {cell.wPx} {cell.hPx}" preserveAspectRatio="none" aria-hidden="true">
								{@html frameInners[i]}
							</svg>
						{/if}
					</div>
				{/if}
			{/each}

			{#if template?.border}
				<div
					class="border-ring"
					style="left:{borderBox.left}%; top:{borderBox.top}%; width:{borderBox.width}%; height:{borderBox.height}%; border-color:{template.border};"
				></div>
			{/if}

			{#if template?.caption}
				<div class="caption" style="top:{geom.caption.centerPct}%; color:{template.caption.color};">
					{template.caption.text}
				</div>
			{/if}

			<!-- Sticker layer -->
			{#each stickers as s (s.uid)}
				<div
					class="sticker"
					class:selected={selected === s.uid}
					style="left:{s.x * 100}%; top:{s.y * 100}%; width:{s.scale * 100}%; transform: translate(-50%, -50%) rotate({s.rot}deg);"
					role="button"
					tabindex="0"
					aria-label="Stiker {s.stickerId}. Panah untuk geser, +/- untuk ukuran, Delete untuk hapus."
					onpointerdown={(e) => startDrag(e, s)}
					onkeydown={(e) => onStickerKey(e, s)}
				>
					<svg viewBox="0 0 100 100" aria-hidden="true">{@html STICKER_BODY[s.stickerId]}</svg>
					{#if selected === s.uid}
						<span class="box" aria-hidden="true"></span>
						<button
							type="button"
							class="handle del"
							aria-label="Hapus stiker"
							onpointerdown={(e) => e.stopPropagation()}
							onclick={(e) => { e.stopPropagation(); removeSticker(s.uid); }}
						>
							<X size={13} strokeWidth={3} />
						</button>
						<button
							type="button"
							class="handle size"
							aria-label="Ubah ukuran dan putar"
							onpointerdown={(e) => startTransform(e, s)}
						>
							<Maximize2 size={13} strokeWidth={2.6} />
						</button>
					{/if}
				</div>
			{/each}
		</div>

		{#if exporting}
			<div class="exporting" role="status" aria-live="polite">
				<div class="loader" aria-hidden="true"></div><span>Menyimpan…</span>
			</div>
		{/if}
	</div>

	<!-- Editor -->
	<div class="editor">
		<div class="tabs" role="tablist" aria-label="Edit foto">
			{#each tabs as t (t.id)}
				{@const Icon = t.icon}
				<button
					type="button"
					class="tab"
					class:active={tab === t.id}
					role="tab"
					aria-selected={tab === t.id}
					onclick={() => (tab = t.id)}
				>
					<Icon size={17} />
					<span>{t.label}</span>
				</button>
			{/each}
		</div>

		<div class="tab-body">
			{#if tab === 'sticker'}
				<p class="tip">Ketuk stiker untuk menambah, lalu geser di foto. Pilih stiker untuk putar / ubah ukuran / hapus.</p>
				<div class="sticker-grid">
					{#each STICKERS as st (st.id)}
						<button type="button" class="add-sticker" aria-label="Tambah {st.label}" onclick={() => addSticker(st.id)}>
							<svg viewBox="0 0 100 100" aria-hidden="true">{@html st.body}</svg>
						</button>
					{/each}
				</div>
			{:else if tab === 'filter'}
				<div class="chips">
					{#each FILTERS as f (f.id)}
						<button type="button" class="chip" class:selected={filter?.id === f.id} style="--accent:{f.accent};" aria-pressed={filter?.id === f.id} onclick={() => (filter = f)}>
							<span class="filter-prev" style="filter:{f.css};"></span>
							<span class="chip-label">{f.label}</span>
						</button>
					{/each}
				</div>
			{:else if tab === 'frame'}
				<div class="chips">
					{#each FRAMES as fr (fr.id)}
						<button type="button" class="chip" class:selected={frame?.id === fr.id} style="--accent:{fr.accent};" aria-pressed={frame?.id === fr.id} onclick={() => (frame = fr)}>
							<span class="frame-prev">
								<svg viewBox="0 0 80 80" width="42" height="42" aria-hidden="true">
									<rect x="2" y="2" width="76" height="76" rx="12" fill="white" stroke={fr.accent} stroke-width="2" />
									{@html fr.svg(80, 80)}
								</svg>
							</span>
							<span class="chip-label">{fr.label}</span>
						</button>
					{/each}
				</div>
			{:else if tab === 'theme'}
				<div class="chips">
					{#each TEMPLATES.filter((t) => t.layoutId === layout.id) as t (t.id)}
						<button type="button" class="chip" class:selected={template?.id === t.id} style="--accent:{t.accent};" aria-pressed={template?.id === t.id} onclick={() => (template = t)}>
							<span class="swatch" style="background:{t.bg}; border-color:{t.border};"></span>
							<span class="chip-label">{t.label}</span>
						</button>
					{/each}
				</div>
				<p class="tip">Tema mengikuti kolase <strong>{layout.label}</strong>.</p>
			{/if}
		</div>
	</div>

	<div class="actions">
		<button class="btn ghost" type="button" onclick={onretake}>
			<RefreshCw size={19} /> <span>Ulang</span>
		</button>
		<button class="btn primary" type="button" onclick={download} disabled={exporting}>
			<Download size={19} color="white" /> <span>Simpan</span>
		</button>
		{#if canShare}
			<button class="btn ghost" type="button" onclick={share} disabled={exporting}>
				<Share2 size={19} /> <span>Bagikan</span>
			</button>
		{/if}
	</div>
</section>

<style>
	.result {
		display: flex;
		flex-direction: column;
		gap: 16px;
		align-items: center;
		width: 100%;
	}
	.done-note {
		margin: 0;
		font-size: 14px;
		font-weight: 600;
		color: var(--pb-ink-soft);
		text-align: center;
	}

	.stage-shell {
		position: relative;
		width: 100%;
		max-width: 440px;
	}
	.stage {
		position: relative;
		width: 100%;
		border-radius: var(--pb-radius-md);
		box-shadow: var(--pb-shadow-lg);
		overflow: hidden;
		touch-action: none;
		user-select: none;
	}
	.sheen {
		position: absolute;
		inset: 0;
		background: linear-gradient(to bottom, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0));
		pointer-events: none;
		z-index: 1;
	}
	.cell {
		position: absolute;
		overflow: hidden;
		z-index: 2;
		box-shadow: 0 5px 16px rgba(2, 40, 80, 0.18);
		background: #fff;
	}
	.cell img { width: 100%; height: 100%; object-fit: cover; display: block; }
	.frame { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
	.border-ring {
		position: absolute;
		z-index: 3;
		border: 3px solid;
		border-radius: 16px;
		pointer-events: none;
	}
	.caption {
		position: absolute;
		left: 0;
		right: 0;
		transform: translateY(-50%);
		text-align: center;
		font-family: var(--pb-font);
		font-weight: 700;
		font-style: italic;
		font-size: clamp(16px, 5.5vw, 24px);
		z-index: 3;
		pointer-events: none;
	}

	.sticker {
		position: absolute;
		aspect-ratio: 1;
		z-index: 6;
		cursor: grab;
		touch-action: none;
	}
	.sticker:active { cursor: grabbing; }
	.sticker svg {
		width: 100%;
		height: 100%;
		display: block;
		filter: drop-shadow(0 2px 3px rgba(2, 40, 80, 0.25));
		pointer-events: none;
	}
	.sticker:focus-visible { outline: none; }
	.sticker:focus-visible .box { opacity: 1; }
	.box {
		position: absolute;
		inset: -6%;
		border: 2px dashed var(--pb-pink-500);
		border-radius: 10px;
		pointer-events: none;
	}
	.handle {
		position: absolute;
		width: 26px;
		height: 26px;
		border-radius: 50%;
		display: grid;
		place-items: center;
		border: 2px solid white;
		color: white;
		cursor: pointer;
		box-shadow: var(--pb-shadow-md);
		padding: 0;
		z-index: 7;
	}
	.handle.del { top: -13px; right: -13px; background: #ff5d8f; }
	.handle.size { bottom: -13px; right: -13px; background: var(--pb-pink-500); cursor: nwse-resize; touch-action: none; }

	.exporting {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 10px;
		background: rgba(240, 249, 255, 0.78);
		backdrop-filter: blur(3px);
		border-radius: var(--pb-radius-md);
		color: var(--pb-ink-soft);
		font-weight: 700;
		z-index: 10;
	}
	.loader {
		width: 34px; height: 34px; border-radius: 50%;
		border: 4px solid var(--pb-pink-200); border-top-color: var(--pb-pink-500);
		animation: pb-spin 0.8s linear infinite;
	}
	@keyframes pb-spin { to { transform: rotate(360deg); } }

	/* Editor */
	.editor {
		width: 100%;
		max-width: 520px;
		background: rgba(255, 255, 255, 0.72);
		border: 1px solid rgba(155, 209, 237, 0.5);
		border-radius: var(--pb-radius-lg);
		padding: 10px;
		box-shadow: var(--pb-shadow-sm);
	}
	.tabs {
		display: flex;
		gap: 4px;
		padding: 4px;
		background: var(--pb-pink-100);
		border-radius: 999px;
	}
	.tab {
		flex: 1;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		padding: 9px 8px;
		border-radius: 999px;
		font-size: 13px;
		font-weight: 700;
		color: var(--pb-ink-soft);
		background: transparent;
		border: none;
		cursor: pointer;
		font-family: inherit;
		transition: background 0.16s ease, color 0.16s ease;
	}
	.tab.active { background: white; color: var(--pb-pink-600); box-shadow: var(--pb-shadow-sm); }
	.tab:hover:not(.active) { color: var(--pb-pink-600); }
	.tab:active { transform: scale(0.97); }

	.tab-body { padding: 10px 2px 2px; }
	.tip { margin: 0 2px 10px; font-size: 12.5px; line-height: 1.45; color: var(--pb-ink-soft); }

	.chips {
		display: flex;
		gap: 10px;
		overflow-x: auto;
		scrollbar-width: none;
		padding: 2px 16px 8px 2px;
	}
	.chips::-webkit-scrollbar { display: none; }
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
		min-width: 70px;
		border: 2px solid transparent;
		cursor: pointer;
		font-family: inherit;
		transition: transform 0.14s ease, border-color 0.14s ease;
	}
	.chip:hover { transform: translateY(-2px); }
	.chip:active { transform: scale(0.95); }
	.chip.selected { border-color: var(--accent, var(--pb-pink-400)); box-shadow: 0 5px 14px rgba(0, 180, 216, 0.2); }
	.chip-label { font-size: 12px; font-weight: 700; color: var(--pb-ink-soft); }
	.chip.selected .chip-label { color: var(--pb-ink); }
	.swatch { width: 42px; height: 42px; border-radius: 12px; border: 2px solid; }
	.filter-prev {
		width: 42px; height: 42px; border-radius: 12px;
		background:
			radial-gradient(circle at 30% 28%, #ffd6a8, transparent 52%),
			radial-gradient(circle at 72% 72%, #c9b3ff, transparent 52%),
			linear-gradient(135deg, #ffb8d6, #8ec8f4);
	}
	.frame-prev { width: 44px; height: 44px; display: grid; place-items: center; }

	.sticker-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(54px, 1fr));
		gap: 8px;
	}
	.add-sticker {
		aspect-ratio: 1;
		display: grid;
		place-items: center;
		padding: 7px;
		border-radius: 16px;
		background: white;
		border: 2px solid transparent;
		box-shadow: 0 2px 8px rgba(2, 62, 138, 0.08);
		cursor: pointer;
		transition: transform 0.14s ease, border-color 0.14s ease;
	}
	.add-sticker svg { width: 100%; height: 100%; display: block; }
	.add-sticker:hover { transform: translateY(-2px) rotate(-3deg); border-color: var(--pb-pink-300); }
	.add-sticker:active { transform: scale(0.92); }

	.actions {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
		justify-content: center;
		width: 100%;
		max-width: 440px;
	}
	.btn {
		flex: 1 1 110px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 14px 18px;
		border-radius: 999px;
		font-weight: 700;
		font-size: 15px;
		border: none;
		cursor: pointer;
		font-family: inherit;
		transition: transform 0.12s ease, box-shadow 0.18s ease;
	}
	.btn:hover:not(:disabled) { box-shadow: var(--pb-shadow-lg); }
	.btn:active:not(:disabled) { transform: scale(0.96); }
	.btn:disabled { opacity: 0.6; cursor: not-allowed; }
	.btn.primary { background: linear-gradient(135deg, var(--pb-pink-400), var(--pb-pink-500)); color: white; box-shadow: var(--pb-shadow-md); }
	.btn.ghost { background: white; color: var(--pb-ink); box-shadow: var(--pb-shadow-sm); }

	@media (max-width: 420px) {
		.tab span { display: none; }
	}
	@media (prefers-reduced-motion: reduce) {
		.chip, .add-sticker, .btn, .tab { transition: none; }
		.loader { animation: none; }
	}
</style>
