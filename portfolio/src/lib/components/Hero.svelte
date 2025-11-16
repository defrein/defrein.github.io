<script>
	import { onMount } from 'svelte';
	import { Linkedin, Github, Mail, ArrowDown, Sparkles, Zap, Code2 } from 'lucide-svelte';
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
	
	<!-- Animated grid background -->
	<div class="absolute inset-0 cyber-grid"></div>
	
	<!-- Parallax orbs -->
	<div class="absolute inset-0 overflow-hidden pointer-events-none">
		<div 
			class="absolute w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow"
			style="top: 20%; left: 10%; transform: translate({mouseX}px, {mouseY}px);"
		></div>
		<div 
			class="absolute w-80 h-80 bg-highlight/20 rounded-full blur-3xl animate-pulse-slow"
			style="top: 60%; right: 10%; animation-delay: 1s; transform: translate({-mouseX}px, {-mouseY}px);"
		></div>
		<div 
			class="absolute w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse-slow"
			style="top: 40%; left: 50%; animation-delay: 2s; transform: translate({mouseX * 0.5}px, {mouseY * 0.5}px);"
		></div>
	</div>
	
	<!-- Floating particles with varied effects -->
	<div class="absolute inset-0 overflow-hidden pointer-events-none">
		{#each Array(30) as _, i}
			<div 
				class="absolute particle-glow"
				style="
					left: {Math.random() * 100}%;
					top: {Math.random() * 100}%;
					width: {2 + Math.random() * 4}px;
					height: {2 + Math.random() * 4}px;
					animation: float-complex {5 + Math.random() * 10}s linear infinite;
					animation-delay: {Math.random() * 5}s;
					opacity: {0.3 + Math.random() * 0.7};
				"
			></div>
		{/each}
	</div>
	
	<!-- Scanning line effect -->
	<div class="scan-line"></div>
	
	<div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8">
		<!-- Decorative top element -->
		<div class="flex items-center justify-center gap-4 mb-8 animate-fade-in-down">
			<div class="h-px w-12 bg-gradient-to-r from-transparent via-secondary to-transparent"></div>
			<Sparkles class="w-5 h-5 text-secondary animate-pulse" />
			<div class="h-px w-12 bg-gradient-to-r from-transparent via-secondary to-transparent"></div>
		</div>
		
		<!-- Name with advanced animations -->
		<div class="mb-8 perspective-container">
			<h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-wider">
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
			<button
				onclick={() => scrollToSection('contact')}
				class="group relative px-8 py-4 bg-accent text-white font-bold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-accent/50 glow-button"
			>
				<span class="relative z-10 flex items-center gap-2">
					<Zap class="w-4 h-4" />
					Contact Me
				</span>
				<div class="absolute inset-0 bg-linear-to-r from-accent to-highlight opacity-0 group-hover:opacity-100 transition-opacity"></div>
			</button>
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
	/* Holographic text effect - Custom for WAHNI ADNANI */
	.holographic-text {
		background: linear-gradient(
			135deg,
			#60a5fa 0%,
			#a78bfa 20%,
			#c084fc 40%,
			#e879f9 60%,
			#60a5fa 80%,
			#a78bfa 100%
		);
		background-size: 300% 300%;
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: holographic-shift 4s ease-in-out infinite;
	}
	
	@keyframes holographic-shift {
		0%, 100% { 
			background-position: 0% 50%;
			filter: brightness(1);
		}
		33% { 
			background-position: 50% 0%;
			filter: brightness(1.1);
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
	
	/* Cyber grid background */
	.cyber-grid {
		background-image: 
			linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
			linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px);
		background-size: 50px 50px;
		animation: grid-move 20s linear infinite;
	}
	
	@keyframes grid-move {
		0% { transform: translate(0, 0); }
		100% { transform: translate(50px, 50px); }
	}
	
	/* Radial gradient */
	.bg-gradient-radial {
		background: radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1), transparent 70%);
		animation: pulse-radial 4s ease-in-out infinite;
	}
	
	@keyframes pulse-radial {
		0%, 100% { opacity: 0.3; transform: scale(1); }
		50% { opacity: 0.6; transform: scale(1.1); }
	}
	
	/* Particle glow */
	.particle-glow {
		background: radial-gradient(circle, rgba(59, 130, 246, 0.8), rgba(139, 92, 246, 0.4), transparent);
		border-radius: 50%;
	}
	
	/* Complex floating animation */
	@keyframes float-complex {
		0%, 100% {
			transform: translate(0, 0) rotate(0deg);
			opacity: 0.3;
		}
		25% {
			transform: translate(30px, -40px) rotate(90deg);
			opacity: 0.8;
		}
		50% {
			transform: translate(-20px, -80px) rotate(180deg);
			opacity: 0.4;
		}
		75% {
			transform: translate(-40px, -40px) rotate(270deg);
			opacity: 0.7;
		}
	}
	
	/* Scanning line effect */
	.scan-line {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 2px;
		background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.8), transparent);
		animation: scan 4s linear infinite;
		pointer-events: none;
	}
	
	@keyframes scan {
		0% { transform: translateY(0); opacity: 0; }
		10% { opacity: 1; }
		90% { opacity: 1; }
		100% { transform: translateY(100vh); opacity: 0; }
	}
	
	/* Shimmer effect */
	@keyframes shimmer {
		0% { transform: translateX(-100%); }
		100% { transform: translateX(100%); }
	}
	
	.animate-shimmer {
		animation: shimmer 3s ease-in-out infinite;
	}
	
	/* Pulse slow */
	@keyframes pulse-slow {
		0%, 100% { opacity: 0.15; transform: scale(1); }
		50% { opacity: 0.25; transform: scale(1.05); }
	}
	
	.animate-pulse-slow {
		animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
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
	
	/* Role change animation */
	.role-change {
		animation: role-glow 3s ease-in-out infinite;
	}
	
	@keyframes role-glow {
		0%, 100% { 
			filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.5));
		}
		50% { 
			filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.8));
		}
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
	
	/* Perspective for 3D effects */
	.perspective-container {
		perspective: 1000px;
	}
</style>
