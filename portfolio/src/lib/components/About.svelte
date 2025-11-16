<script>
	import { Briefcase, Code, Award, CheckCircle2 } from 'lucide-svelte';
	import { resumeData } from '$lib/data/resume.js';
	
	let sectionRef = $state(/** @type {HTMLElement | undefined} */ (undefined));
	let isVisible = $state(false);
	
	$effect(() => {
		if (typeof window === 'undefined' || !sectionRef) return;
		
		const observer = new IntersectionObserver(
			([entry]) => {
				isVisible = entry.isIntersecting;
			},
			{ threshold: 0.1 }
		);
		
		observer.observe(sectionRef);
		
		return () => observer.disconnect();
	});
</script>

<section id="about" bind:this={sectionRef} class="py-20 px-4 sm:px-6 lg:px-8 bg-background">
	<div class="max-w-7xl mx-auto">
		<!-- Section Header -->
		<div class="text-center mb-16">
			<h2 class="text-4xl sm:text-5xl font-heading font-bold text-gradient mb-4">About Me</h2>
			<div class="w-24 h-1 bg-gradient-to-r from-secondary via-highlight to-accent mx-auto"></div>
		</div>
		
		<div class="grid md:grid-cols-2 gap-12 items-start">
			<!-- Left Column - Summary -->
			<div class="space-y-6" class:animate-slide-in-left={isVisible}>
				<p class="text-lg text-text-muted leading-relaxed">
					{resumeData.personal.summary}
				</p>
				
				<div class="space-y-4">
					<h3 class="text-2xl font-heading font-bold text-text mb-4">What I Do</h3>
					<div class="space-y-3">
						<div class="flex items-start gap-3">
							<CheckCircle2 class="w-6 h-6 text-accent flex-shrink-0 mt-1" />
							<p class="text-text-muted">Build intelligent AI-driven systems using ML, NLP, and LLMs</p>
						</div>
						<div class="flex items-start gap-3">
							<CheckCircle2 class="w-6 h-6 text-accent flex-shrink-0 mt-1" />
							<p class="text-text-muted">Design and develop full-stack web applications with modern frameworks</p>
						</div>
						<div class="flex items-start gap-3">
							<CheckCircle2 class="w-6 h-6 text-accent flex-shrink-0 mt-1" />
							<p class="text-text-muted">Create autonomous robotics systems with computer vision capabilities</p>
						</div>
						<div class="flex items-start gap-3">
							<CheckCircle2 class="w-6 h-6 text-accent flex-shrink-0 mt-1" />
							<p class="text-text-muted">Optimize algorithms and data processing pipelines for production systems</p>
						</div>
					</div>
				</div>
				
				<!-- Availability Status -->
				<div class="inline-flex items-center gap-2 px-4 py-2 glass-effect rounded-lg border-l-4 border-accent">
					<div class="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
					<span class="text-text font-medium">{resumeData.personal.availability}</span>
				</div>
			</div>
			
			<!-- Right Column - Stats -->
			<div class="grid grid-cols-2 gap-6" class:animate-slide-in-right={isVisible}>
				<!-- Years of Experience -->
				<div class="glass-effect rounded-xl p-6 card-hover border border-border">
					<div class="flex items-center justify-center w-12 h-12 bg-secondary/20 rounded-lg mb-4">
						<Briefcase class="w-6 h-6 text-secondary" />
					</div>
					<h4 class="text-3xl font-heading font-bold text-text mb-2">{resumeData.stats.yearsExperience}</h4>
					<p class="text-text-muted">Years Experience</p>
				</div>
				
				<!-- Projects Completed -->
				<div class="glass-effect rounded-xl p-6 card-hover border border-border">
					<div class="flex items-center justify-center w-12 h-12 bg-accent/20 rounded-lg mb-4">
						<Code class="w-6 h-6 text-accent" />
					</div>
					<h4 class="text-3xl font-heading font-bold text-text mb-2">{resumeData.stats.projectsCompleted}</h4>
					<p class="text-text-muted">Projects Completed</p>
				</div>
				
				<!-- Technologies -->
				<div class="glass-effect rounded-xl p-6 card-hover border border-border">
					<div class="flex items-center justify-center w-12 h-12 bg-highlight/20 rounded-lg mb-4">
						<Code class="w-6 h-6 text-highlight" />
					</div>
					<h4 class="text-3xl font-heading font-bold text-text mb-2">{resumeData.stats.technologiesMastered}</h4>
					<p class="text-text-muted">Technologies</p>
				</div>
				
				<!-- Competitions Won -->
				<div class="glass-effect rounded-xl p-6 card-hover border border-border">
					<div class="flex items-center justify-center w-12 h-12 bg-accent/20 rounded-lg mb-4">
						<Award class="w-6 h-6 text-accent" />
					</div>
					<h4 class="text-3xl font-heading font-bold text-text mb-2">{resumeData.stats.competitionsWon}</h4>
					<p class="text-text-muted">Awards Won</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes slide-in-left {
		from {
			opacity: 0;
			transform: translateX(-50px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}
	
	@keyframes slide-in-right {
		from {
			opacity: 0;
			transform: translateX(50px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}
	
	.animate-slide-in-left {
		animation: slide-in-left 0.8s ease-out;
	}
	
	.animate-slide-in-right {
		animation: slide-in-right 0.8s ease-out;
	}
</style>
