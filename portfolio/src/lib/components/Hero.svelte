<script>
	import { onMount } from 'svelte';
	import { Linkedin, Github, Mail, ArrowDown } from 'lucide-svelte';
	import { resumeData } from '$lib/data/resume.js';
	
	let currentRoleIndex = $state(0);
	const roles = ['AI Engineer', 'Software Engineer', 'Robotics Specialist', 'ML Developer'];
	
	onMount(() => {
		const interval = setInterval(() => {
			currentRoleIndex = (currentRoleIndex + 1) % roles.length;
		}, 3000);
		
		return () => clearInterval(interval);
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

<section id="hero" class="min-h-screen flex items-center justify-center relative overflow-hidden grid-pattern pt-20 pb-16">
	<!-- Animated background gradient -->
	<div class="absolute inset-0 bg-gradient-to-br from-background via-primary to-background opacity-50"></div>
	
	<!-- Floating particles effect -->
	<div class="absolute inset-0 overflow-hidden">
		{#each Array(20) as _, i}
			<div 
				class="absolute w-2 h-2 bg-secondary/20 rounded-full animate-float"
				style="
					left: {Math.random() * 100}%;
					top: {Math.random() * 100}%;
					animation-delay: {Math.random() * 5}s;
					animation-duration: {5 + Math.random() * 10}s;
				"
			></div>
		{/each}
	</div>
	
	<div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8">
		<!-- Name with gradient animation -->
		<h1 class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 animate-fade-in">
			<span class="text-gradient">{resumeData.personal.name}</span>
		</h1>
		
		<!-- Animated role subtitle -->
		<div class="h-16 sm:h-20 flex items-center justify-center mb-6">
			<h2 class="text-2xl sm:text-3xl md:text-4xl font-heading text-text-muted transition-all duration-500">
				{roles[currentRoleIndex]}
			</h2>
		</div>
		
		<!-- Tagline -->
		<p class="text-lg sm:text-xl text-text-muted max-w-3xl mx-auto mb-12 leading-relaxed">
			{resumeData.personal.summary.split('.')[0]}.
		</p>
		
		<!-- CTA Buttons -->
		<div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
			<button
				onclick={() => scrollToSection('projects')}
				class="px-8 py-4 bg-secondary text-white font-medium rounded-lg hover:bg-secondary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-secondary/50"
			>
				View Projects
			</button>
			<button
				onclick={() => scrollToSection('contact')}
				class="px-8 py-4 bg-accent text-white font-medium rounded-lg hover:bg-accent/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/50"
			>
				Contact Me
			</button>
		</div>
		
		<!-- Social Links -->
		<div class="flex items-center justify-center gap-6 mb-12">
			<a
				href="https://{resumeData.personal.linkedin}"
				target="_blank"
				rel="noopener noreferrer"
				class="p-3 glass-effect rounded-lg hover:bg-secondary/20 transition-all duration-300 group"
				aria-label="LinkedIn"
			>
				<Linkedin class="w-6 h-6 text-text-muted group-hover:text-secondary transition-colors" />
			</a>
			<a
				href="https://{resumeData.personal.github}"
				target="_blank"
				rel="noopener noreferrer"
				class="p-3 glass-effect rounded-lg hover:bg-secondary/20 transition-all duration-300 group"
				aria-label="GitHub"
			>
				<Github class="w-6 h-6 text-text-muted group-hover:text-secondary transition-colors" />
			</a>
			<a
				href="mailto:{resumeData.personal.email}"
				class="p-3 glass-effect rounded-lg hover:bg-accent/20 transition-all duration-300 group"
				aria-label="Email"
			>
				<Mail class="w-6 h-6 text-text-muted group-hover:text-accent transition-colors" />
			</a>
		</div>
		
		<!-- Scroll indicator -->
		<button
			onclick={() => scrollToSection('about')}
			class="animate-bounce text-text-muted hover:text-secondary transition-colors"
			aria-label="Scroll down"
		>
			<ArrowDown class="w-8 h-8" />
		</button>
	</div>
</section>

<style>
	@keyframes float {
		0%, 100% {
			transform: translateY(0) translateX(0);
		}
		25% {
			transform: translateY(-20px) translateX(10px);
		}
		50% {
			transform: translateY(-40px) translateX(-10px);
		}
		75% {
			transform: translateY(-20px) translateX(5px);
		}
	}
	
	.animate-float {
		animation: float linear infinite;
	}
	
	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	
	.animate-fade-in {
		animation: fade-in 1s ease-out;
	}
</style>
