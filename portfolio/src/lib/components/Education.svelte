<script>
	import { GraduationCap, Calendar, TrendingUp } from 'lucide-svelte';
	import { resumeData } from '$lib/data/resume.js';
</script>

<section id="education" class="py-20 px-4 sm:px-6 lg:px-8 bg-background">
	<div class="max-w-5xl mx-auto">
		<!-- Section Header -->
		<div class="text-center mb-12">
			<h2 class="text-4xl sm:text-5xl font-heading font-bold text-gradient mb-4">Education</h2>
			<div class="w-24 h-1 bg-linear-to-r from-secondary via-highlight to-accent mx-auto"></div>
		</div>
		
		<!-- Education Cards -->
		<div class="grid md:grid-cols-2 gap-6">
			{#each resumeData.education as edu}
				<div class="glass-effect rounded-xl p-6 border border-border hover:border-secondary/50 transition-all duration-300 card-hover">
					<!-- Header -->
					<div class="flex items-start justify-between mb-4">
						<div class="flex items-center gap-3">
							<div class="p-3 bg-secondary/20 rounded-lg">
								<GraduationCap class="w-6 h-6 text-secondary" />
							</div>
							{#if edu.current}
								<span class="px-3 py-1 bg-accent/20 text-accent text-xs rounded-full border border-accent/30">
									Current
								</span>
							{/if}
						</div>
					</div>
					
					<!-- Institution -->
					<h3 class="text-xl font-heading font-bold text-text mb-2">
						{edu.institution}
					</h3>
					
					<!-- Degree -->
					<p class="text-text-muted mb-3">{edu.degree}</p>
					
					<!-- Period & GPA -->
					<div class="flex flex-wrap items-center gap-4 text-sm">
						<div class="flex items-center gap-2 text-text-muted">
							<Calendar class="w-4 h-4" />
							<span>{edu.period}</span>
						</div>
						<div class="flex items-center gap-2 text-accent">
							<TrendingUp class="w-4 h-4" />
							<span class="font-medium">GPA: {edu.gpa}</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
