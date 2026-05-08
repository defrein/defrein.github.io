<script>
	import { onMount, onDestroy } from 'svelte';
	import { Camera as CameraIcon, RefreshCw, X, Image as ImageIcon } from 'lucide-svelte';

	let {
		filterCss = 'none',
		mirrored = true,
		cellAspect = 4 / 3,
		countdownSeconds = 3,
		shotIndex = 0,
		totalShots = 1,
		busy = false,
		oncapture = (_e) => {}
	} = $props();

	let video = $state(null);
	let stream = $state(null);
	let permissionState = $state('idle'); // idle | requesting | ready | denied | error | insecure
	let errorMessage = $state('');
	let countdown = $state(0);
	let flashing = $state(false);
	let facing = $state('user');
	let switchingCamera = $state(false);

	let requestTimeout = null;

	async function startCamera() {
		permissionState = 'requesting';
		errorMessage = '';
		clearTimeout(requestTimeout);
		requestTimeout = setTimeout(() => {
			if (permissionState === 'requesting') {
				permissionState = 'error';
				errorMessage = 'Permintaan kamera nggak direspons. Cek izin browser, atau tutup tab lain yang lagi pakai kamera.';
			}
		}, 10000);

		if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
			permissionState = 'insecure';
			const isSecure = typeof window !== 'undefined' && window.isSecureContext;
			const host = typeof window !== 'undefined' ? window.location.hostname : '';
			errorMessage = !isSecure && host !== 'localhost' && host !== '127.0.0.1'
				? `Kamera butuh HTTPS atau localhost. Sekarang aksesnya lewat ${host} (HTTP) jadi browser blokir. Buka via http://localhost di laptop, atau pakai HTTPS.`
				: 'Browser ini nggak support akses kamera.';
			return;
		}

		try {
			if (stream) stream.getTracks().forEach((t) => t.stop());
			stream = await navigator.mediaDevices.getUserMedia({
				video: {
					facingMode: facing,
					width: { ideal: 1280 },
					height: { ideal: 960 }
				},
				audio: false
			});
			clearTimeout(requestTimeout);
			permissionState = 'ready';
		} catch (err) {
			clearTimeout(requestTimeout);
			console.error(err);
			permissionState = err?.name === 'NotAllowedError' ? 'denied' : 'error';
			errorMessage = err?.message || 'Tidak bisa membuka kamera';
		}
	}

	async function flipCamera() {
		if (switchingCamera) return;
		switchingCamera = true;
		facing = facing === 'user' ? 'environment' : 'user';
		await startCamera();
		switchingCamera = false;
	}

	function captureFrame() {
		if (!video || !video.videoWidth) return null;
		const vw = video.videoWidth;
		const vh = video.videoHeight;

		const videoAspect = vw / vh;
		let sx, sy, sw, sh;
		if (videoAspect > cellAspect) {
			sh = vh;
			sw = vh * cellAspect;
			sx = (vw - sw) / 2;
			sy = 0;
		} else {
			sw = vw;
			sh = vw / cellAspect;
			sx = 0;
			sy = (vh - sh) / 2;
		}

		const outW = 1200;
		const outH = Math.round(outW / cellAspect);

		const canvas = document.createElement('canvas');
		canvas.width = outW;
		canvas.height = outH;
		const ctx = canvas.getContext('2d');

		if (mirrored) {
			ctx.translate(outW, 0);
			ctx.scale(-1, 1);
		}
		ctx.filter = filterCss && filterCss !== 'none' ? filterCss : 'none';
		ctx.drawImage(video, sx, sy, sw, sh, 0, 0, outW, outH);

		return canvas.toDataURL('image/jpeg', 0.92);
	}

	async function takeShot() {
		if (busy || permissionState !== 'ready' || countdown > 0) return;
		if (countdownSeconds > 0) {
			countdown = countdownSeconds;
			await new Promise((res) => {
				const tick = setInterval(() => {
					countdown -= 1;
					if (countdown <= 0) {
						clearInterval(tick);
						res();
					}
				}, 1000);
			});
		}

		flashing = true;
		setTimeout(() => (flashing = false), 350);

		const dataUrl = captureFrame();
		if (dataUrl) oncapture({ dataUrl });
	}

	onMount(() => {
		startCamera();
	});

	onDestroy(() => {
		if (stream) stream.getTracks().forEach((t) => t.stop());
	});

	// Attach stream to <video> as soon as both exist.
	$effect(() => {
		if (video && stream && video.srcObject !== stream) {
			video.srcObject = stream;
			video.play().catch(() => {});
		}
	});
</script>

<div class="cam-wrap">
	<div class="cam-stage" style="aspect-ratio: {cellAspect};">
		{#if permissionState === 'ready'}
			<!-- svelte-ignore a11y_media_has_caption -->
			<video
				bind:this={video}
				autoplay
				muted
				playsinline
				style="filter: {filterCss}; transform: {mirrored ? 'scaleX(-1)' : 'none'};"
			></video>
		{:else if permissionState === 'requesting'}
			<div class="state">
				<div class="loader"></div>
				<p>Membuka kamera…</p>
			</div>
		{:else if permissionState === 'denied'}
			<div class="state">
				<CameraIcon size={42} color="#0466c8" />
				<p><strong>Izinkan kamera</strong> dulu ya</p>
				<button class="retry" onclick={startCamera}>Coba lagi</button>
			</div>
		{:else if permissionState === 'error'}
			<div class="state">
				<X size={36} color="#0466c8" />
				<p>{errorMessage}</p>
				<button class="retry" onclick={startCamera}>Coba lagi</button>
			</div>
		{:else if permissionState === 'insecure'}
			<div class="state">
				<X size={36} color="#0466c8" />
				<p><strong>Akses tidak aman</strong></p>
				<p style="font-size: 13px; opacity: 0.85;">{errorMessage}</p>
			</div>
		{/if}

		{#if countdown > 0}
			{#key countdown}
				<div class="countdown">{countdown}</div>
			{/key}
		{/if}

		{#if flashing}
			<div class="flash"></div>
		{/if}

		<button
			class="flip-btn"
			type="button"
			onclick={flipCamera}
			aria-label="Balik kamera"
			disabled={permissionState !== 'ready'}
		>
			<RefreshCw size={20} />
		</button>

		<div class="counter-pill">
			<ImageIcon size={14} />
			<span>{shotIndex + 1} / {totalShots}</span>
		</div>
	</div>

	<button
		class="shutter"
		type="button"
		onclick={takeShot}
		disabled={busy || permissionState !== 'ready' || countdown > 0}
		aria-label="Ambil foto"
	>
		<span class="ring"></span>
		<span class="dot"></span>
	</button>
</div>

<style>
	.cam-wrap {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 18px;
		width: 100%;
	}
	.cam-stage {
		position: relative;
		width: 100%;
		max-width: 480px;
		background: #2a1830;
		border-radius: var(--pb-radius-lg);
		overflow: hidden;
		box-shadow: var(--pb-shadow-md);
		border: 4px solid white;
	}
	video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
	.state {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 10px;
		color: white;
		text-align: center;
		padding: 24px;
	}
	.state p { margin: 0; opacity: 0.95; }
	.loader {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		border: 4px solid rgba(255, 255, 255, 0.25);
		border-top-color: white;
		animation: pb-spin 0.8s linear infinite;
	}
	@keyframes pb-spin { to { transform: rotate(360deg); } }
	.retry {
		margin-top: 6px;
		padding: 8px 16px;
		border-radius: 999px;
		background: white;
		color: var(--pb-pink-600);
		font-weight: 700;
		border: none;
		cursor: pointer;
	}
	.countdown {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-family: var(--pb-font);
		font-size: clamp(96px, 30vw, 180px);
		font-weight: 700;
		text-shadow: 0 6px 30px rgba(0, 0, 0, 0.45);
		animation: pb-pop 0.85s ease;
		pointer-events: none;
	}
	.flash {
		position: absolute;
		inset: 0;
		background: white;
		animation: pb-flash 0.35s ease;
		pointer-events: none;
	}
	.flip-btn {
		position: absolute;
		top: 12px;
		right: 12px;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.85);
		color: var(--pb-ink);
		display: flex;
		align-items: center;
		justify-content: center;
		backdrop-filter: blur(6px);
		box-shadow: var(--pb-shadow-sm);
		border: none;
		cursor: pointer;
	}
	.flip-btn:disabled { opacity: 0.5; }

	.counter-pill {
		position: absolute;
		top: 12px;
		left: 12px;
		background: rgba(255, 255, 255, 0.85);
		color: var(--pb-ink);
		padding: 6px 12px;
		border-radius: 999px;
		font-size: 12px;
		font-weight: 700;
		display: inline-flex;
		align-items: center;
		gap: 6px;
		backdrop-filter: blur(6px);
		box-shadow: var(--pb-shadow-sm);
	}

	.shutter {
		position: relative;
		width: 78px;
		height: 78px;
		border-radius: 50%;
		background: white;
		box-shadow: var(--pb-shadow-md);
		transition: transform 0.15s ease;
		border: none;
		cursor: pointer;
	}
	.shutter:active:not(:disabled) { transform: scale(0.92); }
	.shutter:disabled { opacity: 0.5; cursor: not-allowed; }
	.shutter .ring {
		position: absolute;
		inset: 4px;
		border-radius: 50%;
		border: 3px solid var(--pb-pink-300);
	}
	.shutter .dot {
		position: absolute;
		inset: 12px;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--pb-pink-400), var(--pb-pink-500));
	}

	@keyframes pb-pop {
		0% { transform: scale(0.6); opacity: 0; }
		60% { transform: scale(1.1); opacity: 1; }
		100% { transform: scale(1); opacity: 1; }
	}
	@keyframes pb-flash {
		0% { opacity: 0; }
		50% { opacity: 0.95; }
		100% { opacity: 0; }
	}
</style>
