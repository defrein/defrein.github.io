<script>
	import { onMount } from 'svelte';
	import { Linkedin, Github, Mail, ArrowDown, Sparkles, Zap, Code2, Download, FileText } from 'lucide-svelte';
	import { resumeData } from '$lib/data/resume.js';
	
	let currentRoleIndex = $state(0);
	let mouseX = $state(0);
	let mouseY = $state(0);
	let letterAnimations = $state([]);
	
	const roles = ['AI Engineer', 'Software Engineer', 'Robotics Enthusiast'];
	const name = "WAHNI ADNANI";
	const letters = name.split('');
	
	onMount(() => {
		// Initialize letter animations
		letterAnimations = letters.map(() => ({ y: 0, rotation: 0 }));
		
		// Role cycling
		const roleInterval = setInterval(() => {
			currentRoleIndex = (currentRoleIndex + 1) % roles.length;
		}, 3000);
		
		// Mouse movement tracking for parallax
		const handleMouseMove = (e) => {
			mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
			mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
		};
		
		window.addEventListener('mousemove', handleMouseMove);
		
		// Animate letters continuously
		const animateLetters = () => {
			letterAnimations = letters.map((_, i) => ({
				y: Math.sin(Date.now() / 500 + i * 0.5) * 5,
				rotation: Math.sin(Date.now() / 800 + i * 0.3) * 2
			}));
			requestAnimationFrame(animateLetters);
		};
		animateLetters();
		
		return () => {
			clearInterval(roleInterval);
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});
	
	/**
	 * @param {string} id
	 */
	function scrollToSection(id) {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<section id="hero" class="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-16">
	<!-- Dynamic background layers -->
	<div class="absolute inset-0 bg-gradient-to-br from-background via-primary to-background">
		<div class="absolute inset-0 bg-gradient-radial opacity-30"></div>
	</div>
	
	<!-- Animated ocean wave background - Lighter on mobile -->
	<div class="absolute inset-0 ocean-waves lighter-animation"></div>
	
	<!-- Ocean depth gradient overlay -->
	<div class="absolute inset-0 ocean-gradient lighter-animation"></div>
	
	<!-- Animated light rays from surface - Reduced to 3 rays -->
	<div class="absolute inset-0 overflow-hidden pointer-events-none hidden-on-mobile">
		{#each Array(3) as _, i}
			<div 
				class="light-ray"
				style="
					left: {i * 30 - 5}%;
					animation-delay: {i * 2}s;
					opacity: {0.4 + (i % 2) * 0.1};
					transform: rotate({-5 + i * 3}deg);
				"
			></div>
		{/each}
	</div>
	
	<!-- Floating water bubbles - Reduced and hidden on mobile -->
	<div class="absolute inset-0 overflow-hidden pointer-events-none hidden-on-mobile">
		<div 
			class="absolute w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float-slow"
			style="top: 20%; left: 10%;"
		></div>
		<div 
			class="absolute w-80 h-80 bg-highlight/10 rounded-full blur-3xl animate-float-slow"
			style="top: 60%; right: 10%; animation-delay: 3s;"
		></div>
	</div>
	
	<!-- Floating bubbles - Reduced to 8 -->
	<div class="absolute inset-0 overflow-hidden pointer-events-none hidden-on-mobile">
		{#each Array(8) as _, i}
			<div 
				class="absolute bubble"
				style="
					left: {Math.random() * 100}%;
					top: {Math.random() * 100}%;
					width: {4 + Math.random() * 6}px;
					height: {4 + Math.random() * 6}px;
					animation: bubble-rise {10 + Math.random() * 10}s ease-in infinite;
					animation-delay: {Math.random() * 10}s;
					opacity: {0.3 + Math.random() * 0.4};
				"
			></div>
		{/each}
	</div>
	
	<!-- Swimming sea creatures - Reduced and hidden on mobile -->
	<div class="absolute inset-0 overflow-hidden pointer-events-none z-20 hidden-on-mobile">
		<!-- Fish swimming left to right - Reduced to 2 -->
		{#each Array(2) as _, i}
			<div 
				class="sea-creature"
				style="
					top: {25 + i * 30}%;
					animation: swim-right {18 + i * 6}s linear infinite;
					animation-delay: -{i * 8}s;
					font-size: {1.8 + i * 0.4}rem;
				"
			>
				𓆟
			</div>
		{/each}
		
		<!-- Fish swimming right to left - Only 1 -->
		<div 
			class="sea-creature"
			style="
				top: 50%;
				animation: swim-left 20s linear infinite;
				animation-delay: -5s;
				font-size: 1.5rem;
			"
		>
			𓆝
		</div>
		
		<!-- One turtle -->
		<div 
			class="sea-creature"
			style="
				top: 65%;
				animation: swim-right 28s linear infinite;
				animation-delay: -10s;
				font-size: 2rem;
			"
		>
			𓆟
		</div>
		
		<!-- Visible fish swimming across the hero -->
		<div 
			class="sea-creature"
			style="
				top: 25%;
				animation: swim-right 15s linear infinite;
				font-size: 2.5rem;
			"
		>
			𓆟
		</div>
		
		<div 
			class="sea-creature"
			style="
				top: 40%;
				animation: swim-right 20s linear infinite;
				animation-delay: 5s;
				font-size: 2.2rem;
			"
		>
			𓆉
		</div>
		
		<!-- More swimming fish at different levels -->
		<div 
			class="sea-creature"
			style="
				top: 35%;
				animation: swim-left 14s linear infinite;
				animation-delay: 7s;
				font-size: 2.3rem;
			"
		>
			𓆝
		</div>
		
		<div 
			class="sea-creature"
			style="
				top: 60%;
				animation: swim-right 22s linear infinite;
				animation-delay: 4s;
				font-size: 1.9rem;
			"
		>
			𓆉
		</div>
		
		<!-- Decorative shells floating -->
		<div 
			class="sea-creature shell"
			style="
				top: 70%;
				left: 20%;
				animation: float-shell 8s ease-in-out infinite;
				font-size: 1.5rem;
			"
		>
			𓇼
		</div>
	</div>
	
	<!-- Light rays from surface -->
	<div class="light-rays"></div>
	
	<div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8">
		<!-- Decorative top element -->
		<div class="flex items-center justify-center gap-4 mb-8 animate-fade-in-down">
			<div class="h-px w-12 bg-gradient-to-r from-transparent via-secondary to-transparent"></div>
			<Sparkles class="w-5 h-5 text-secondary animate-pulse" />
			<div class="h-px w-12 bg-gradient-to-r from-transparent via-secondary to-transparent"></div>
		</div>
		
		<!-- Name with advanced animations -->
		<div class="mb-8 perspective-container">
			<h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-wider name-title">
				{#each letters as letter, i}
					{#if letter === ' '}
						<span class="inline-block w-3 sm:w-4 md:w-6"></span>
					{:else}
						<span 
							class="inline-block holographic-text letter-float"
							style="
								transform: translateY({letterAnimations[i]?.y || 0}px) rotate({letterAnimations[i]?.rotation || 0}deg);
								animation-delay: {i * 0.1}s;
							"
						>
							{letter}
						</span>
					{/if}
				{/each}
			</h1>
			
			<!-- Glowing underline effect -->
			<div class="mx-auto w-3/4 h-1 mt-6 relative overflow-hidden rounded-full">
				<div class="absolute inset-0 bg-linear-to-r from-secondary via-highlight to-accent"></div>
			</div>
		</div>
		
		<!-- Animated role subtitle with tech icons -->
		<div class="h-20 sm:h-24 flex flex-col items-center justify-center mb-8 animate-fade-in-up">
			<div class="flex items-center gap-3 mb-2">
				<Code2 class="w-5 h-5 text-secondary animate-pulse" />
				<h2 class="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-transparent bg-clip-text bg-linear-to-r from-secondary via-highlight to-accent role-change">
					{roles[currentRoleIndex]}
				</h2>
				<Zap class="w-5 h-5 text-accent animate-pulse" style="animation-delay: 0.5s;" />
			</div>
			<div class="flex gap-1">
				{#each roles as _, i}
					<div 
						class="h-1 w-8 rounded-full transition-all duration-500"
						class:bg-secondary={i === currentRoleIndex}
						class:bg-border={i !== currentRoleIndex}
					></div>
				{/each}
			</div>
		</div>
		
		<!-- Tagline with typewriter effect -->
		<p class="text-lg sm:text-xl text-text-muted max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in glass-effect px-6 py-4 rounded-lg border border-secondary/20">
			<span class="text-secondary font-semibold">{'>'}</span> {resumeData.personal.summary.split('.')[0]}.
			<span class="animate-blink text-accent">_</span>
		</p>
		
		<!-- CTA Buttons with enhanced effects -->
		<div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up" style="animation-delay: 0.4s;">
			<button
				onclick={() => scrollToSection('projects')}
				class="group relative px-8 py-4 bg-secondary text-white font-bold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-secondary/50 glow-button"
			>
				<span class="relative z-10 flex items-center gap-2">
					<Sparkles class="w-4 h-4" />
					View Projects
				</span>
				<div class="absolute inset-0 bg-linear-to-r from-secondary to-highlight opacity-0 group-hover:opacity-100 transition-opacity"></div>
			</button>
			<a
				href="/assets/documents/WAHNI_ADNANI_NOVEMBER_2025.pdf"
				data-fancybox
				data-caption="CV Wahni Adnani - November 2025"
				class="group relative px-8 py-4 bg-accent text-white font-bold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-accent/50 glow-button"
			>
				<span class="relative z-10 flex items-center gap-2">
					<FileText class="w-4 h-4" />
					View CV
				</span>
				<div class="absolute inset-0 bg-linear-to-r from-accent to-highlight opacity-0 group-hover:opacity-100 transition-opacity"></div>
			</a>
		</div>
		
		<!-- Social Links with enhanced animations -->
		<div class="flex items-center justify-center gap-6 mb-12 animate-fade-in-up" style="animation-delay: 0.6s;">
			<a
				href="https://{resumeData.personal.linkedin}"
				target="_blank"
				rel="noopener noreferrer"
				class="group relative p-4 glass-effect rounded-xl hover:bg-secondary/20 transition-all duration-300 border border-border hover:border-secondary cyber-border"
				aria-label="LinkedIn"
			>
				<Linkedin class="w-6 h-6 text-text-muted group-hover:text-secondary transition-colors group-hover:scale-110 transform" />
				<div class="absolute inset-0 rounded-xl bg-secondary/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>
			</a>
			<a
				href="https://{resumeData.personal.github}"
				target="_blank"
				rel="noopener noreferrer"
				class="group relative p-4 glass-effect rounded-xl hover:bg-highlight/20 transition-all duration-300 border border-border hover:border-highlight cyber-border"
				aria-label="GitHub"
			>
				<Github class="w-6 h-6 text-text-muted group-hover:text-highlight transition-colors group-hover:scale-110 transform" />
				<div class="absolute inset-0 rounded-xl bg-highlight/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>
			</a>
			<a
				href="mailto:{resumeData.personal.email}"
				class="group relative p-4 glass-effect rounded-xl hover:bg-accent/20 transition-all duration-300 border border-border hover:border-accent cyber-border"
				aria-label="Email"
			>
				<Mail class="w-6 h-6 text-text-muted group-hover:text-accent transition-colors group-hover:scale-110 transform" />
				<div class="absolute inset-0 rounded-xl bg-accent/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>
			</a>
		</div>
		
		<!-- Scroll indicator with animation -->
		<div class="animate-fade-in-up" style="animation-delay: 0.8s;">
			<button
				onclick={() => scrollToSection('about')}
				class="group relative inline-flex flex-col items-center gap-2 text-text-muted hover:text-secondary transition-colors"
				aria-label="Scroll down"
			>
				<span class="text-sm font-medium tracking-wider uppercase">Scroll Down</span>
				<div class="relative">
					<ArrowDown class="w-8 h-8 animate-bounce-slow" />
					<div class="absolute inset-0 w-8 h-8 bg-secondary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
				</div>
			</button>
		</div>
	</div>
</section>

<style>
	/* Ocean shimmer text effect - Custom for WAHNI ADNANI */
	.holographic-text {
		background: linear-gradient(
			135deg,
			#0466c8 0%,
			#0077b6 20%,
			#00b4d8 40%,
			#33d9ff 60%,
			#48cae4 80%,
			#0466c8 100%
		);
		background-size: 300% 300%;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		color: transparent;
		animation: ocean-shimmer 6s ease-in-out infinite;
	}
	
	/* Light theme adjustments */
	:global(.light) .holographic-text {
		background: linear-gradient(
			135deg,
			#001d3d 0%,
			#023e8a 20%,
			#0353a4 40%,
			#0466c8 60%,
			#0077b6 80%,
			#001d3d 100%
		);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		color: transparent;
		filter: brightness(1.1) contrast(1.2);
	}
	
	@keyframes ocean-shimmer {
		0%, 100% { 
			background-position: 0% 50%;
			filter: brightness(1);
		}
		33% { 
			background-position: 50% 0%;
			filter: brightness(1.15);
		}
		66% { 
			background-position: 100% 50%;
			filter: brightness(1.05);
		}
	}
	
	/* Letter floating animation */
	.letter-float {
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}
	
	.letter-float:hover {
		transform: translateY(-10px) scale(1.15) !important;
		filter: brightness(1.3);
	}
	
	/* Ocean waves background - Enhanced visibility */
	.ocean-waves {
		background: 
			linear-gradient(
				180deg,
				rgba(0, 100, 150, 0.15) 0%,
				rgba(4, 102, 200, 0.12) 30%,
				rgba(0, 180, 216, 0.08) 60%,
				rgba(0, 20, 40, 0.3) 100%
			);
		animation: wave-motion 15s ease-in-out infinite;
	}
	
	:global(.light) .ocean-waves {
		background: 
			linear-gradient(
				180deg,
				rgba(72, 202, 228, 0.15) 0%,
				rgba(0, 150, 199, 0.12) 30%,
				rgba(0, 119, 182, 0.1) 60%,
				rgba(3, 62, 138, 0.08) 100%
			);
	}
	
	@keyframes wave-motion {
		0%, 100% { 
			background-position: 0% 0%;
			transform: translateY(0);
		}
		50% { 
			background-position: 100% 100%;
			transform: translateY(-10px);
		}
	}
	
	/* Ocean depth gradient - Enhanced for light rays effect */
	.ocean-gradient {
		background: radial-gradient(
			ellipse at 50% -20%,
			rgba(51, 217, 255, 0.15) 0%,
			rgba(72, 202, 228, 0.1) 25%,
			rgba(4, 102, 200, 0.08) 50%,
			rgba(0, 50, 100, 0.1) 75%,
			transparent 100%
		);
		animation: depth-pulse 10s ease-in-out infinite;
	}
	
	:global(.light) .ocean-gradient {
		background: radial-gradient(
			ellipse at 50% -20%,
			rgba(144, 224, 239, 0.3) 0%,
			rgba(72, 202, 228, 0.2) 25%,
			rgba(0, 180, 216, 0.15) 50%,
			rgba(4, 102, 200, 0.1) 75%,
			transparent 100%
		);
	}
	
	@keyframes depth-pulse {
		0%, 100% { opacity: 0.6; }
		50% { opacity: 1; }
	}
	
	/* Bubble effect */
	.bubble {
		background: radial-gradient(
			circle at 30% 30%,
			rgba(51, 217, 255, 0.8),
			rgba(72, 202, 228, 0.4),
			rgba(4, 102, 200, 0.1)
		);
		border-radius: 50%;
		box-shadow: 
			inset -2px -2px 4px rgba(255, 255, 255, 0.3),
			0 0 10px rgba(51, 217, 255, 0.4);
	}
	
	:global(.light) .bubble {
		background: radial-gradient(
			circle at 30% 30%,
			rgba(144, 224, 239, 0.9),
			rgba(72, 202, 228, 0.6),
			rgba(0, 180, 216, 0.3)
		);
		box-shadow: 
			inset -2px -2px 4px rgba(255, 255, 255, 0.5),
			0 0 8px rgba(0, 180, 216, 0.5);
	}
	
	/* Bubble rising animation */
	@keyframes bubble-rise {
		0% {
			transform: translateY(0) translateX(0) scale(0.8);
			opacity: 0;
		}
		10% {
			opacity: 0.6;
		}
		50% {
			transform: translateY(-50vh) translateX(20px) scale(1);
			opacity: 0.8;
		}
		100% {
			transform: translateY(-100vh) translateX(-30px) scale(0.6);
			opacity: 0;
		}
	}
	
	/* Gentle floating animation */
	@keyframes float-slow {
		0%, 100% {
			transform: translate(0, 0) scale(1);
			opacity: 0.4;
		}
		50% {
			transform: translate(0, -20px) scale(1.05);
			opacity: 0.7;
		}
	}
	
	/* Sea creatures styling */
	.sea-creature {
		position: absolute;
		left: 0;
		color: rgba(51, 217, 255, 0.9);
		text-shadow: 
			0 0 15px rgba(51, 217, 255, 0.8),
			0 0 30px rgba(72, 202, 228, 0.6),
			0 0 45px rgba(4, 102, 200, 0.4);
		filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.5));
		will-change: transform, left;
		z-index: 5;
	}
	
	:global(.light) .sea-creature {
		color: rgba(4, 102, 200, 0.85);
		text-shadow: 
			0 0 10px rgba(0, 180, 216, 0.6),
			0 0 20px rgba(72, 202, 228, 0.5),
			0 0 30px rgba(4, 102, 200, 0.3);
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
	}
	
	.sea-creature.shell {
		animation: float-shell 8s ease-in-out infinite !important;
	}
	
	/* Fish swimming from right to left (reversed) */
	@keyframes -global-swim-right {
		0% {
			left: 110%;
			transform: translateY(0) rotate(0deg);
		}
		25% {
			left: 80%;
			transform: translateY(-15px) rotate(-2deg);
		}
		50% {
			left: 50%;
			transform: translateY(0) rotate(0deg);
		}
		75% {
			left: 20%;
			transform: translateY(15px) rotate(2deg);
		}
		100% {
			left: -10%;
			transform: translateY(0) rotate(0deg);
		}
	}
	
	/* Fish swimming from left to right (reversed) */
	@keyframes -global-swim-left {
		0% {
			left: -10%;
			transform: translateY(0) rotate(0deg) scaleX(-1);
		}
		25% {
			left: 20%;
			transform: translateY(-15px) rotate(2deg) scaleX(-1);
		}
		50% {
			left: 50%;
			transform: translateY(0) rotate(0deg) scaleX(-1);
		}
		75% {
			left: 80%;
			transform: translateY(15px) rotate(-2deg) scaleX(-1);
		}
		100% {
			left: 110%;
			transform: translateY(0) rotate(0deg) scaleX(-1);
		}
	}
	
	/* Gentle swimming in place */
	@keyframes gentle-swim {
		0%, 100% {
			transform: translate(0, 0) rotate(0deg) scale(1);
		}
		25% {
			transform: translate(20px, -20px) rotate(-5deg) scale(1.05);
		}
		50% {
			transform: translate(0, -30px) rotate(0deg) scale(1.1);
		}
		75% {
			transform: translate(-20px, -20px) rotate(5deg) scale(1.05);
		}
	}
	
	.animate-gentle-swim {
		animation: gentle-swim 5s ease-in-out infinite;
	}
	
	/* Shell floating in place */
	@keyframes float-shell {
		0%, 100% {
			transform: translateY(0) rotate(0deg);
			opacity: 0.5;
		}
		25% {
			transform: translateY(-10px) rotate(5deg);
			opacity: 0.7;
		}
		50% {
			transform: translateY(-5px) rotate(0deg);
			opacity: 0.6;
		}
		75% {
			transform: translateY(-15px) rotate(-5deg);
			opacity: 0.8;
		}
	}
	
	/* Test pulse animation */
	@keyframes pulse-creature {
		0%, 100% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(1.2);
			opacity: 0.8;
		}
	}
	
	/* Individual light ray from surface - More subtle and diffused */
	.light-ray {
		position: absolute;
		top: -20%;
		width: 200px;
		height: 180%;
		background: linear-gradient(
			to bottom,
			rgba(51, 217, 255, 0.12) 0%,
			rgba(72, 202, 228, 0.08) 15%,
			rgba(4, 102, 200, 0.05) 30%,
			rgba(0, 180, 216, 0.03) 50%,
			rgba(0, 100, 150, 0.02) 70%,
			transparent 100%
		);
		filter: blur(40px);
		transform-origin: top center;
		animation: light-ray-sway 18s ease-in-out infinite;
		pointer-events: none;
		mix-blend-mode: screen;
	}
	
	:global(.light) .light-ray {
		background: linear-gradient(
			to bottom,
			rgba(144, 224, 239, 0.25) 0%,
			rgba(72, 202, 228, 0.18) 15%,
			rgba(0, 180, 216, 0.12) 30%,
			rgba(0, 150, 199, 0.08) 50%,
			rgba(4, 102, 200, 0.05) 70%,
			transparent 100%
		);
		mix-blend-mode: overlay;
	}
	
	@keyframes light-ray-sway {
		0%, 100% { 
			transform: translateX(0) scaleY(1) scaleX(1) rotate(0deg);
			opacity: 0.4;
		}
		25% { 
			transform: translateX(25px) scaleY(1.08) scaleX(0.95) rotate(1deg);
			opacity: 0.6;
		}
		50% { 
			transform: translateX(0) scaleY(0.92) scaleX(1.05) rotate(0deg);
			opacity: 0.3;
		}
		75% { 
			transform: translateX(-25px) scaleY(1.08) scaleX(0.95) rotate(-1deg);
			opacity: 0.5;
		}
	}
	
	/* Old light rays (keep for backward compatibility if needed) */
	.light-rays {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		pointer-events: none;
	}
	
	/* Shimmer effect */
	@keyframes shimmer {
		0% { transform: translateX(-100%); }
		100% { transform: translateX(100%); }
	}
	
	.animate-shimmer {
		animation: shimmer 3s ease-in-out infinite;
	}
	
	/* Ocean pulse - slower and calmer */
	@keyframes pulse-slow {
		0%, 100% { opacity: 0.3; transform: scale(1); }
		50% { opacity: 0.5; transform: scale(1.02); }
	}
	
	.animate-pulse-slow {
		animation: pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}
	
	/* Floating slow for ocean effect */
	@keyframes animate-float-slow {
		0%, 100% { transform: translateY(0px); }
		50% { transform: translateY(-15px); }
	}
	
	.animate-float-slow {
		animation: animate-float-slow 6s ease-in-out infinite;
	}
	
	/* Fade in animations */
	@keyframes fade-in-down {
		from {
			opacity: 0;
			transform: translateY(-20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	
	@keyframes fade-in-up {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	
	.animate-fade-in-down {
		animation: fade-in-down 1s ease-out;
	}
	
	.animate-fade-in-up {
		animation: fade-in-up 1s ease-out;
	}
	
	.animate-fade-in {
		animation: fade-in-up 1s ease-out;
	}
	
	/* Role change animation - Ocean glow */
	.role-change {
		animation: ocean-glow 4s ease-in-out infinite;
	}
	
	@keyframes ocean-glow {
		0%, 100% { 
			filter: drop-shadow(0 0 15px rgba(4, 102, 200, 0.6));
		}
		50% { 
			filter: drop-shadow(0 0 25px rgba(51, 217, 255, 0.8));
		}
	}
	
	:global(.light) .role-change {
		filter: drop-shadow(0 0 8px rgba(4, 102, 200, 0.4));
	}
	
	/* Blinking cursor */
	@keyframes blink {
		0%, 50%, 100% { opacity: 1; }
		25%, 75% { opacity: 0; }
	}
	
	.animate-blink {
		animation: blink 1.5s step-start infinite;
	}
	
	/* Glow button */
	.glow-button {
		position: relative;
	}
	
	.glow-button::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: inherit;
		border-radius: inherit;
		filter: blur(15px);
		opacity: 0;
		transition: opacity 0.3s;
	}
	
	.glow-button:hover::before {
		opacity: 0.7;
		animation: pulse-glow 1.5s ease-in-out infinite;
	}
	
	@keyframes pulse-glow {
		0%, 100% { transform: scale(0.95); opacity: 0.5; }
		50% { transform: scale(1.05); opacity: 0.8; }
	}
	
	/* Cyber border effect */
	.cyber-border {
		position: relative;
	}
	
	.cyber-border::before {
		content: '';
		position: absolute;
		inset: -2px;
		border-radius: inherit;
		padding: 2px;
		background: linear-gradient(45deg, transparent 30%, currentColor 50%, transparent 70%);
		-webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		opacity: 0;
		transition: opacity 0.3s;
	}
	
	.cyber-border:hover::before {
		opacity: 1;
		animation: border-rotate 2s linear infinite;
	}
	
	@keyframes border-rotate {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
	
	/* Bounce slow */
	@keyframes bounce-slow {
		0%, 100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}
	
	.animate-bounce-slow {
		animation: bounce-slow 2s ease-in-out infinite;
	}
	
	/* Fancy CV Button Styles */
	.fancy-cv-button {
		position: relative;
		background: linear-gradient(135deg, #48cae4 0%, #00b4d8 50%, #0096c7 100%);
		box-shadow: 
			0 4px 15px rgba(72, 202, 228, 0.4),
			0 0 30px rgba(0, 180, 216, 0.3),
			inset 0 1px 0 rgba(255, 255, 255, 0.2);
		border: 2px solid rgba(255, 255, 255, 0.2);
	}
	
	.fancy-cv-button:hover {
		box-shadow: 
			0 6px 25px rgba(72, 202, 228, 0.6),
			0 0 50px rgba(0, 180, 216, 0.5),
			inset 0 1px 0 rgba(255, 255, 255, 0.3);
		border-color: rgba(255, 255, 255, 0.4);
	}
	
	.fancy-cv-button::before {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		background: linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%);
		opacity: 0;
		transition: opacity 0.3s;
	}
	
	.fancy-cv-button:hover::before {
		opacity: 1;
	}
	
	/* Shine effect animation */
	.shine-effect {
		pointer-events: none;
	}
	
	/* Light theme adjustments for CV button */
	:global(.light) .fancy-cv-button {
		background: linear-gradient(135deg, #0096c7 0%, #0077b6 50%, #023e8a 100%);
		box-shadow: 
			0 4px 15px rgba(0, 119, 182, 0.4),
			0 0 30px rgba(4, 102, 200, 0.3),
			inset 0 1px 0 rgba(255, 255, 255, 0.3);
	}
	
	:global(.light) .fancy-cv-button:hover {
		box-shadow: 
			0 6px 25px rgba(0, 119, 182, 0.6),
			0 0 50px rgba(4, 102, 200, 0.5),
			inset 0 1px 0 rgba(255, 255, 255, 0.4);
	}
	
	/* Perspective for 3D effects */
	.perspective-container {
		perspective: 1000px;
	}
	
	/* Mobile & Tablet Optimization - Performance improvements */
	@media (max-width: 1024px) {
		/* Hide heavy animations on mobile and tablet */
		.hidden-on-mobile {
			display: none !important;
		}
		
		/* Disable all animations */
		* {
			animation: none !important;
			transition: none !important;
		}
		
		/* Remove animation from ocean backgrounds */
		.ocean-waves,
		.ocean-gradient,
		.lighter-animation {
			animation: none !important;
		}
		
		/* Fix WAHNI ADNANI text display on mobile */
		.name-title {
			display: block !important;
		}
		
		/* Simplify text - no animation, ensure visibility */
		.holographic-text {
			animation: none !important;
			background: linear-gradient(135deg, #0466c8 0%, #00b4d8 100%) !important;
			-webkit-background-clip: text !important;
			-webkit-text-fill-color: transparent !important;
			background-clip: text !important;
			color: transparent !important;
			display: inline-block !important;
		}
		
		:global(.light) .holographic-text {
			background: linear-gradient(135deg, #023e8a 0%, #0466c8 100%) !important;
			-webkit-background-clip: text !important;
			-webkit-text-fill-color: transparent !important;
			background-clip: text !important;
			color: transparent !important;
			display: inline-block !important;
		}
		
		/* No letter animations - reset transform */
		.letter-float {
			animation: none !important;
			transition: none !important;
			transform: none !important;
		}
		
		.letter-float:hover {
			transform: none !important;
		}
		
		/* No fade animations */
		.animate-fade-in,
		.animate-fade-in-up,
		.animate-fade-in-down {
			animation: none !important;
			opacity: 1 !important;
		}
		
		/* Ensure role text is visible */
		.role-change {
			animation: none !important;
			filter: none !important;
		}
		
		/* Disable icon animations */
		.animate-pulse {
			animation: none !important;
		}
	}
	
	/* Extra optimization for small mobile devices */
	@media (max-width: 640px) {
		/* Ensure everything is static */
		*, *::before, *::after {
			animation: none !important;
			transition: none !important;
		}
		
		/* Force static text display */
		.holographic-text {
			animation: none !important;
			background: linear-gradient(135deg, #0466c8 0%, #00b4d8 100%) !important;
			-webkit-background-clip: text !important;
			-webkit-text-fill-color: transparent !important;
			background-clip: text !important;
			color: transparent !important;
			transform: none !important;
		}
		
		:global(.light) .holographic-text {
			background: linear-gradient(135deg, #023e8a 0%, #0466c8 100%) !important;
			-webkit-background-clip: text !important;
			-webkit-text-fill-color: transparent !important;
			background-clip: text !important;
			color: transparent !important;
			display: inline-block !important;
		}
		
		/* No ocean animations */
		.ocean-waves,
		.ocean-gradient {
			animation: none !important;
			opacity: 0.5;
		}
		
		/* Reduce font size for very small screens */
		.name-title {
			font-size: 2rem !important;
		}
	}
</style>
