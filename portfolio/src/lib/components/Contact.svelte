<script>
	import { Mail, Phone, MapPin, Linkedin, Github, Send, Copy, Check } from 'lucide-svelte';
	import { resumeData } from '$lib/data/resume.js';
	
	let emailCopied = $state(false);
	let formData = $state({
		name: '',
		email: '',
		message: ''
	});
	let isSubmitting = $state(false);
	
	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(resumeData.personal.email);
			emailCopied = true;
			setTimeout(() => emailCopied = false, 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}
	
	/**
	 * @param {Event} e
	 */
	async function handleSubmit(e) {
		e.preventDefault();
		isSubmitting = true;
		
		// Simulate form submission
		await new Promise(resolve => setTimeout(resolve, 1500));
		
		// Reset form
		formData = { name: '', email: '', message: '' };
		isSubmitting = false;
		
		alert('Thank you for your message! I will get back to you soon.');
	}
</script>

<section id="contact" class="py-20 px-4 sm:px-6 lg:px-8 bg-primary/50">
	<div class="max-w-5xl mx-auto">
		<!-- Section Header -->
		<div class="text-center mb-12">
			<h2 class="text-4xl sm:text-5xl font-heading font-bold text-gradient mb-4">Get In Touch</h2>
			<div class="w-24 h-1 bg-gradient-to-r from-secondary via-highlight to-accent mx-auto mb-8"></div>
			<p class="text-lg text-text-muted max-w-2xl mx-auto">
				Have a project in mind or want to collaborate? Feel free to reach out!
			</p>
		</div>
		
		<!-- Availability Badge -->
		<div class="flex justify-center mb-12">
			<div class="inline-flex items-center gap-2 px-6 py-3 glass-effect rounded-lg border-l-4 border-accent">
				<div class="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
				<span class="text-text font-medium text-lg">{resumeData.personal.availability}</span>
			</div>
		</div>
		
		<div class="grid md:grid-cols-2 gap-8">
			<!-- Contact Information -->
			<div class="space-y-6">
				<h3 class="text-2xl font-heading font-bold text-text mb-6">Contact Information</h3>
				
				<!-- Email -->
				<div class="glass-effect rounded-xl p-4 border border-border hover:border-accent/50 transition-colors group">
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-4">
							<div class="p-3 bg-accent/20 rounded-lg group-hover:bg-accent/30 transition-colors">
								<Mail class="w-5 h-5 text-accent" />
							</div>
							<div>
								<p class="text-sm text-text-muted mb-1">Email</p>
								<a href="mailto:{resumeData.personal.email}" class="text-text hover:text-accent transition-colors">
									{resumeData.personal.email}
								</a>
							</div>
						</div>
						<button
							onclick={copyEmail}
							class="p-2 hover:bg-surface rounded-lg transition-colors"
							aria-label="Copy email"
						>
							{#if emailCopied}
								<Check class="w-5 h-5 text-accent" />
							{:else}
								<Copy class="w-5 h-5 text-text-muted" />
							{/if}
						</button>
					</div>
				</div>
				
				<!-- Phone -->
				<div class="glass-effect rounded-xl p-4 border border-border hover:border-secondary/50 transition-colors group">
					<div class="flex items-center gap-4">
						<div class="p-3 bg-secondary/20 rounded-lg group-hover:bg-secondary/30 transition-colors">
							<Phone class="w-5 h-5 text-secondary" />
						</div>
						<div>
							<p class="text-sm text-text-muted mb-1">Phone</p>
							<a href="tel:{resumeData.personal.phone}" class="text-text hover:text-secondary transition-colors">
								{resumeData.personal.phone}
							</a>
						</div>
					</div>
				</div>
				
				<!-- Location -->
				<div class="glass-effect rounded-xl p-4 border border-border hover:border-highlight/50 transition-colors group">
					<div class="flex items-center gap-4">
						<div class="p-3 bg-highlight/20 rounded-lg group-hover:bg-highlight/30 transition-colors">
							<MapPin class="w-5 h-5 text-highlight" />
						</div>
						<div>
							<p class="text-sm text-text-muted mb-1">Location</p>
							<p class="text-text">{resumeData.personal.location}</p>
						</div>
					</div>
				</div>
				
				<!-- Social Links -->
				<div class="pt-6">
					<h4 class="text-lg font-heading font-bold text-text mb-4">Connect with me</h4>
					<div class="flex gap-4">
						<a
							href="https://{resumeData.personal.linkedin}"
							target="_blank"
							rel="noopener noreferrer"
							class="p-4 glass-effect rounded-lg border border-border hover:border-secondary/50 transition-all duration-300 hover:scale-110 group"
							aria-label="LinkedIn"
						>
							<Linkedin class="w-6 h-6 text-text-muted group-hover:text-secondary transition-colors" />
						</a>
						<a
							href="https://{resumeData.personal.github}"
							target="_blank"
							rel="noopener noreferrer"
							class="p-4 glass-effect rounded-lg border border-border hover:border-secondary/50 transition-all duration-300 hover:scale-110 group"
							aria-label="GitHub"
						>
							<Github class="w-6 h-6 text-text-muted group-hover:text-secondary transition-colors" />
						</a>
					</div>
				</div>
			</div>
			
			<!-- Contact Form -->
			<div class="glass-effect rounded-xl p-6 border border-border">
				<h3 class="text-2xl font-heading font-bold text-text mb-6">Send a Message</h3>
				
				<form onsubmit={handleSubmit} class="space-y-4">
					<!-- Name -->
					<div>
						<label for="name" class="block text-sm font-medium text-text-muted mb-2">
							Your Name
						</label>
						<input
							type="text"
							id="name"
							bind:value={formData.name}
							required
							class="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text focus:outline-none focus:border-secondary transition-colors"
							placeholder="John Doe"
						/>
					</div>
					
					<!-- Email -->
					<div>
						<label for="email" class="block text-sm font-medium text-text-muted mb-2">
							Your Email
						</label>
						<input
							type="email"
							id="email"
							bind:value={formData.email}
							required
							class="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text focus:outline-none focus:border-secondary transition-colors"
							placeholder="john@example.com"
						/>
					</div>
					
					<!-- Message -->
					<div>
						<label for="message" class="block text-sm font-medium text-text-muted mb-2">
							Message
						</label>
						<textarea
							id="message"
							bind:value={formData.message}
							required
							rows="5"
							class="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text focus:outline-none focus:border-secondary transition-colors resize-none"
							placeholder="Tell me about your project..."
						></textarea>
					</div>
					
					<!-- Submit Button -->
					<button
						type="submit"
						disabled={isSubmitting}
						class="w-full px-6 py-4 bg-accent text-white font-medium rounded-lg hover:bg-accent/90 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
					>
						{#if isSubmitting}
							<div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
							<span>Sending...</span>
						{:else}
							<Send class="w-5 h-5" />
							<span>Send Message</span>
						{/if}
					</button>
				</form>
			</div>
		</div>
	</div>
</section>
