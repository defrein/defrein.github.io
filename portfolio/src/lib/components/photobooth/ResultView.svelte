<script>
	import { Download, RefreshCw, Sparkles } from 'lucide-svelte';

	let {
		photos = [],
		layout,
		frame,
		template,
		onretake = () => {}
	} = $props();

	let finalUrl = $state('');
	let building = $state(true);
	let canShare = $state(false);

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
		ctx.lineTo(x + w - rr, y);
		ctx.quadraticCurveTo(x + w, y, x + w, y + rr);
		ctx.lineTo(x + w, y + h - rr);
		ctx.quadraticCurveTo(x + w, y + h, x + w - rr, y + h);
		ctx.lineTo(x + rr, y + h);
		ctx.quadraticCurveTo(x, y + h, x, y + h - rr);
		ctx.lineTo(x, y + rr);
		ctx.quadraticCurveTo(x, y, x + rr, y);
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

	async function buildFinal() {
		building = true;

		const base = 1200;
		const pad = Math.round(base * 0.045);
		const hasCaption = !!template?.caption;
		const captionH = hasCaption ? Math.round(base * 0.1) : 0;
		const cellsW = base - pad * 2;
		const cellsH = cellsW / layout.aspect;
		const canvasW = base;
		const canvasH = pad * 2 + cellsH + captionH;

		const canvas = document.createElement('canvas');
		canvas.width = canvasW;
		canvas.height = canvasH;
		const ctx = canvas.getContext('2d');

		const bg = template?.bg || '#fff8f0';
		ctx.fillStyle = bg;
		ctx.fillRect(0, 0, canvasW, canvasH);

		const grad = ctx.createLinearGradient(0, 0, 0, canvasH);
		grad.addColorStop(0, 'rgba(255,255,255,0.35)');
		grad.addColorStop(1, 'rgba(255,255,255,0)');
		ctx.fillStyle = grad;
		ctx.fillRect(0, 0, canvasW, canvasH);

		for (let i = 0; i < layout.cells.length; i++) {
			const cell = layout.cells[i];
			const photo = photos[i];
			if (!photo) continue;

			const cx = pad + cell.x * cellsW;
			const cy = pad + cell.y * cellsH;
			const cw = cell.w * cellsW;
			const ch = cell.h * cellsH;
			const radius = Math.round(Math.min(cw, ch) * 0.04);

			ctx.save();
			ctx.shadowColor = 'rgba(80, 30, 60, 0.18)';
			ctx.shadowBlur = 18;
			ctx.shadowOffsetY = 6;
			ctx.fillStyle = '#000';
			roundRect(ctx, cx, cy, cw, ch, radius);
			ctx.fill();
			ctx.restore();

			try {
				const img = await loadImage(photo);
				ctx.save();
				roundRect(ctx, cx, cy, cw, ch, radius);
				ctx.clip();
				drawCover(ctx, img, cx, cy, cw, ch);
				ctx.restore();
			} catch (err) {
				console.warn('Failed to draw photo', err);
			}

			if (frame && frame.id !== 'none' && typeof frame.svg === 'function') {
				const inner = frame.svg(cw, ch);
				if (inner) {
					const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${cw}" height="${ch}" viewBox="0 0 ${cw} ${ch}">${inner}</svg>`;
					const url = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));
					try {
						const frameImg = await loadImage(url);
						ctx.save();
						roundRect(ctx, cx, cy, cw, ch, radius);
						ctx.clip();
						ctx.drawImage(frameImg, cx, cy, cw, ch);
						ctx.restore();
					} catch (err) {
						console.warn('Failed to draw frame', err);
					}
				}
			}
		}

		if (template?.border) {
			ctx.strokeStyle = template.border;
			ctx.lineWidth = 3;
			const r = Math.round(pad * 0.6);
			roundRect(ctx, pad - 8, pad - 8, cellsW + 16, cellsH + 16, r);
			ctx.stroke();
		}

		if (hasCaption) {
			ctx.fillStyle = template.caption.color;
			ctx.font = template.caption.font;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillText(template.caption.text, canvasW / 2, pad + cellsH + captionH / 2);

			ctx.fillStyle = template.caption.color;
			ctx.globalAlpha = 0.55;
			ctx.font = '500 14px Quicksand';
			const stamp = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
			ctx.fillText(stamp, canvasW / 2, pad + cellsH + captionH - 16);
			ctx.globalAlpha = 1;
		}

		finalUrl = canvas.toDataURL('image/png');
		building = false;
	}

	function download() {
		if (!finalUrl) return;
		const a = document.createElement('a');
		const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
		a.download = `photobooth-${stamp}.png`;
		a.href = finalUrl;
		document.body.appendChild(a);
		a.click();
		a.remove();
	}

	async function share() {
		if (!finalUrl || !navigator.share) {
			download();
			return;
		}
		try {
			const blob = await (await fetch(finalUrl)).blob();
			const file = new File([blob], 'photobooth.png', { type: 'image/png' });
			if (navigator.canShare?.({ files: [file] })) {
				await navigator.share({ files: [file], title: 'Photobooth' });
			} else {
				download();
			}
		} catch (err) {
			console.warn(err);
		}
	}

	$effect(() => {
		canShare = typeof navigator !== 'undefined' && !!navigator.share;
		buildFinal();
	});
</script>

<section class="result">
	<div class="result-stage">
		{#if building}
			<div class="building">
				<div class="loader"></div>
				<p>Lagi merangkai foto…</p>
			</div>
		{:else if finalUrl}
			<img src={finalUrl} alt="Hasil photobooth" class="final" />
		{/if}
	</div>

	<div class="actions">
		<button class="btn ghost" type="button" onclick={onretake}>
			<RefreshCw size={20} />
			<span>Ulang</span>
		</button>
		<button class="btn primary" type="button" onclick={download} disabled={building}>
			<Download size={20} color="white" />
			<span>Simpan</span>
		</button>
		{#if canShare}
			<button class="btn ghost" type="button" onclick={share} disabled={building}>
				<Sparkles size={20} />
				<span>Bagikan</span>
			</button>
		{/if}
	</div>
</section>

<style>
	.result {
		display: flex;
		flex-direction: column;
		gap: 18px;
		align-items: center;
		width: 100%;
	}
	.result-stage {
		width: 100%;
		max-width: 480px;
		min-height: 240px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.55);
		border-radius: var(--pb-radius-lg);
		padding: 14px;
		box-shadow: var(--pb-shadow-md);
		backdrop-filter: blur(6px);
	}
	.final {
		max-width: 100%;
		max-height: 70vh;
		border-radius: var(--pb-radius-md);
		box-shadow: var(--pb-shadow-lg);
		animation: pb-pop 0.4s ease;
	}
	.building {
		text-align: center;
		color: var(--pb-ink-soft);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 14px;
		padding: 30px;
	}
	.loader {
		width: 38px;
		height: 38px;
		border-radius: 50%;
		border: 4px solid var(--pb-pink-200);
		border-top-color: var(--pb-pink-500);
		animation: pb-spin 0.8s linear infinite;
	}
	@keyframes pb-spin { to { transform: rotate(360deg); } }
	@keyframes pb-pop {
		0% { transform: scale(0.6); opacity: 0; }
		60% { transform: scale(1.1); opacity: 1; }
		100% { transform: scale(1); opacity: 1; }
	}

	.actions {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
		justify-content: center;
		width: 100%;
		max-width: 480px;
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
		transition: transform 0.12s ease, box-shadow 0.18s ease;
		border: none;
		cursor: pointer;
		font-family: inherit;
	}
	.btn:active:not(:disabled) { transform: scale(0.96); }
	.btn:disabled { opacity: 0.6; cursor: not-allowed; }
	.btn.primary {
		background: linear-gradient(135deg, var(--pb-pink-400), var(--pb-pink-500));
		color: white;
		box-shadow: var(--pb-shadow-md);
	}
	.btn.ghost {
		background: white;
		color: var(--pb-ink);
		box-shadow: var(--pb-shadow-sm);
	}
</style>
