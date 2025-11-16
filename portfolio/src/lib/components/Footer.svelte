<script>
	import { Heart, Linkedin, Github, Mail, ArrowUp } from 'lucide-svelte';
	import { resumeData } from '$lib/data/resume.js';
	
	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
	
	/**
	 * @param {string} id
	 */
	function scrollToSection(id) {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	}
	
	const currentYear = new Date().getFullYear();
</script>

<footer class="relative bg-primary border-t border-border">
	<!-- Scroll to top button -->
	<button
		onclick={scrollToTop}
		class="absolute -top-6 left-1/2 transform -translate-x-1/2 p-4 bg-secondary text-white rounded-full hover:bg-secondary/90 transition-all duration-300 hover:scale-110 shadow-lg"
		aria-label="Scroll to top"
	>
		<ArrowUp class="w-5 h-5" />
	</button>
	
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<div class="grid md:grid-cols-3 gap-8 mb-8">
			<!-- Brand Section -->
			<div>
				<h3 class="text-2xl font-heading font-bold text-gradient mb-4">
					{resumeData.personal.name}
				</h3>
				<p class="text-text-muted mb-4">
					{resumeData.personal.title}
				</p>
				<p class="text-sm text-text-muted">
					Building intelligent systems and innovative solutions.
				</p>
			</div>
			
			<!-- Quick Links -->
			<div>
				<h4 class="text-lg font-heading font-bold text-text mb-4">Quick Links</h4>
				<nav class="space-y-2">
					<button
						onclick={() => scrollToSection('about')}
						class="block text-text-muted hover:text-secondary transition-colors"
					>
						About
					</button>
					<button
						onclick={() => scrollToSection('experience')}
						class="block text-text-muted hover:text-secondary transition-colors"
					>
						Experience
					</button>
					<button
						onclick={() => scrollToSection('projects')}
						class="block text-text-muted hover:text-secondary transition-colors"
					>
						Projects
					</button>
					<button
						onclick={() => scrollToSection('skills')}
						class="block text-text-muted hover:text-secondary transition-colors"
					>
						Skills
					</button>
					<button
						onclick={() => scrollToSection('contact')}
						class="block text-text-muted hover:text-secondary transition-colors"
					>
						Contact
					</button>
				</nav>
			</div>
			
			<!-- Social & Contact -->
			<div>
				<h4 class="text-lg font-heading font-bold text-text mb-4">Connect</h4>
				<div class="flex gap-4 mb-6">
					<a
						href="https://{resumeData.personal.linkedin}"
						target="_blank"
						rel="noopener noreferrer"
						class="p-3 glass-effect rounded-lg hover:bg-secondary/20 transition-all duration-300 group"
						aria-label="LinkedIn"
					>
						<Linkedin class="w-5 h-5 text-text-muted group-hover:text-secondary transition-colors" />
					</a>
					<a
						href="https://{resumeData.personal.github}"
						target="_blank"
						rel="noopener noreferrer"
						class="p-3 glass-effect rounded-lg hover:bg-secondary/20 transition-all duration-300 group"
						aria-label="GitHub"
					>
						<Github class="w-5 h-5 text-text-muted group-hover:text-secondary transition-colors" />
					</a>
					<a
						href="mailto:{resumeData.personal.email}"
						class="p-3 glass-effect rounded-lg hover:bg-accent/20 transition-all duration-300 group"
						aria-label="Email"
					>
						<Mail class="w-5 h-5 text-text-muted group-hover:text-accent transition-colors" />
					</a>
				</div>
				<a 
					href="mailto:{resumeData.personal.email}"
					class="text-sm text-text-muted hover:text-accent transition-colors"
				>
					{resumeData.personal.email}
				</a>
			</div>
		</div>
		
		<!-- Bottom Bar -->
		<div class="border-t border-border pt-8">
			<div class="flex flex-col sm:flex-row justify-between items-center gap-4">
				<p class="text-sm text-text-muted text-center sm:text-left">
					© {currentYear} {resumeData.personal.name}. All rights reserved.
				</p>
				<div class="flex items-center gap-2 text-sm text-text-muted">
					<span>Built with</span>
					<Heart class="w-4 h-4 text-accent fill-accent animate-pulse" />
					<span>using</span>
					<span class="text-secondary font-medium">SvelteKit</span>
					<span>&</span>
					<span class="text-accent font-medium">TailwindCSS</span>
				</div>
			</div>
		</div>
	</div>
</footer>
