<script>
	import { Camera as CameraIcon, Heart, Image as ImageIcon } from 'lucide-svelte';
	import Camera from '$lib/components/photobooth/Camera.svelte';
	import ControlTabs from '$lib/components/photobooth/ControlTabs.svelte';
	import ResultView from '$lib/components/photobooth/ResultView.svelte';
	import { FILTERS, FRAMES, LAYOUTS, TEMPLATES } from '$lib/components/photobooth/config.js';

	let template = $state(TEMPLATES[0]);
	let layout   = $state(LAYOUTS.find((l) => l.id === template.layoutId) || LAYOUTS[0]);
	let filter   = $state(FILTERS[0]);
	let frame    = $state(FRAMES[0]);
	let countdown = $state(3);
	let mirrored = $state(true);

	let photos = $state([]);
	let stage = $state('capture'); // 'capture' | 'between' | 'result'
	let busy = $state(false);

	let prevTemplateId;
	$effect(() => {
		const id = template.id;
		if (prevTemplateId !== undefined && prevTemplateId !== id) {
			const next = LAYOUTS.find((l) => l.id === template.layoutId);
			if (next) layout = next;
		}
		prevTemplateId = id;
	});

	let prevLayoutId;
	$effect(() => {
		const id = layout.id;
		if (prevLayoutId !== undefined && prevLayoutId !== id) {
			photos = [];
			stage = 'capture';
		}
		prevLayoutId = id;
	});

	function handleCapture(e) {
		const { dataUrl } = e;
		photos = [...photos, dataUrl];
		if (photos.length >= layout.count) {
			stage = 'result';
		} else {
			stage = 'between';
			busy = true;
			setTimeout(() => {
				stage = 'capture';
				busy = false;
			}, 800);
		}
	}

	function retake() {
		photos = [];
		stage = 'capture';
	}
</script>

<svelte:head>
	<title>Photobooth · Wahni Adnani</title>
	<meta name="description" content="Photobooth lucu — pilih tema, filter, bingkai, dan kolase." />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap" />
</svelte:head>

<div class="pb-root">
	<header class="topbar">
		<div class="brand">
			<span class="logo">
				<CameraIcon size={22} color="white" />
			</span>
			<div>
				<h1>Photobooth</h1>
				<p class="tag">cute moments, pretty memories</p>
			</div>
		</div>
	</header>

	<main class="main">
		{#if stage === 'result'}
			<ResultView {photos} {layout} {frame} {template} onretake={retake} />
		{:else}
			<div class="capture-area">
				<Camera
					filterCss={filter.css}
					cellAspect={layout.cellAspect}
					countdownSeconds={countdown}
					shotIndex={photos.length}
					totalShots={layout.count}
					{busy}
					{mirrored}
					oncapture={handleCapture}
				/>

				{#if photos.length > 0}
					<div class="thumb-row" aria-label="Foto yang sudah diambil">
						{#each Array(layout.count) as _, i (i)}
							<div class="thumb" class:filled={photos[i]} class:current={i === photos.length}>
								{#if photos[i]}
									<img src={photos[i]} alt="Foto {i + 1}" />
								{:else if i === photos.length}
									<CameraIcon size={16} color="var(--pb-pink-500)" />
								{/if}
							</div>
						{/each}
					</div>
				{/if}
			</div>

			<ControlTabs
				bind:filter
				bind:frame
				bind:layout
				bind:template
				bind:countdown
			/>
		{/if}
	</main>

	<footer class="foot">
		<span>
			Made with
			<Heart size={14} color="var(--pb-pink-500)" fill="var(--pb-pink-200)" />
			for frosty selfies
		</span>
	</footer>
</div>

<style>
	.pb-root {
		/* Frost Ice palette — matches portfolio light theme (Deep Ocean) */
		--pb-pink-50:  #f5fbff;
		--pb-pink-100: #e0f4ff;
		--pb-pink-200: #d9f0ff;
		--pb-pink-300: #b8e3f4;
		--pb-pink-400: #48cae4;
		--pb-pink-500: #00b4d8;
		--pb-pink-600: #0466c8;
		--pb-purple-200: #cae9ff;
		--pb-purple-300: #9bd1ed;
		--pb-purple-500: #023e8a;
		--pb-yellow-200: #d6f4ff;
		--pb-mint-200:   #c8efff;
		--pb-cream:      #f0f9ff;
		--pb-ink:        #001d3d;
		--pb-ink-soft:   #023e8a;

		--pb-shadow-sm: 0 2px 6px rgba(4, 102, 200, 0.10);
		--pb-shadow-md: 0 6px 20px rgba(0, 180, 216, 0.18);
		--pb-shadow-lg: 0 12px 32px rgba(2, 62, 138, 0.22);

		--pb-radius-sm: 12px;
		--pb-radius-md: 18px;
		--pb-radius-lg: 28px;

		--pb-font: 'Quicksand', system-ui, sans-serif;

		position: fixed;
		inset: 0;
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		min-height: 100dvh;
		background:
			radial-gradient(at 10% 0%,   var(--pb-pink-200)   0%, transparent 45%),
			radial-gradient(at 90% 10%,  var(--pb-purple-200) 0%, transparent 50%),
			radial-gradient(at 50% 100%, var(--pb-mint-200)   0%, transparent 55%),
			var(--pb-cream);
		color: var(--pb-ink);
		font-family: var(--pb-font);
		font-weight: 500;
		letter-spacing: 0.01em;
		-webkit-font-smoothing: antialiased;
		overflow-y: auto;
	}

	.topbar {
		padding: 18px 18px 6px;
		display: flex;
		justify-content: center;
	}
	.brand {
		display: flex;
		align-items: center;
		gap: 12px;
	}
	.logo {
		width: 42px;
		height: 42px;
		border-radius: 14px;
		background: linear-gradient(135deg, var(--pb-pink-400), var(--pb-pink-600));
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: var(--pb-shadow-md);
		animation: pb-float 4s ease-in-out infinite;
	}
	h1 {
		font-size: 22px;
		color: var(--pb-ink);
		line-height: 1;
		font-family: var(--pb-font);
		font-weight: 700;
		margin: 0;
	}
	.tag {
		margin: 2px 0 0;
		font-size: 11px;
		color: var(--pb-ink-soft);
		font-style: italic;
	}

	.main {
		flex: 1;
		width: 100%;
		max-width: 600px;
		margin: 0 auto;
		padding: 14px 16px 24px;
		display: flex;
		flex-direction: column;
		gap: 18px;
		align-items: center;
	}

	.capture-area {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 14px;
		width: 100%;
	}

	.thumb-row {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
		justify-content: center;
	}
	.thumb {
		width: 44px;
		height: 44px;
		border-radius: 10px;
		background: white;
		border: 2px dashed var(--pb-pink-200);
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: var(--pb-shadow-sm);
	}
	.thumb.filled {
		border-style: solid;
		border-color: var(--pb-pink-300);
	}
	.thumb.current {
		border-color: var(--pb-pink-500);
		animation: pb-wiggle 1.4s ease-in-out infinite;
	}
	.thumb img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.foot {
		text-align: center;
		padding: 10px 16px 18px;
		font-size: 12px;
		color: var(--pb-ink-soft);
	}
	.foot span {
		display: inline-flex;
		align-items: center;
		gap: 4px;
	}

	@media (min-width: 720px) {
		.topbar { padding-top: 24px; }
		h1 { font-size: 26px; }
		.tag { font-size: 12px; }
	}

	@keyframes pb-float {
		0%, 100% { transform: translateY(0); }
		50%      { transform: translateY(-6px); }
	}
	@keyframes pb-wiggle {
		0%, 100% { transform: rotate(-2deg); }
		50%      { transform: rotate(2deg); }
	}
</style>
