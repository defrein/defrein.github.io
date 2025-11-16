<script>
	import { ExternalLink, Award } from 'lucide-svelte';
	import { resumeData } from '$lib/data/resume.js';
	
	let activeFilter = $state('all');
	let filteredProjects = $derived(
		activeFilter === 'all'
			? resumeData.featuredProjects
			: resumeData.featuredProjects.filter(p => p.category === activeFilter)
	);
	
	const categories = [
		{ id: 'all', label: 'All Projects' },
		{ id: 'ai', label: 'AI/ML' },
		{ id: 'robotics', label: 'Robotics' },
		{ id: 'web', label: 'Web Development' }
	];
</script>

<section id="projects" class="py-20 px-4 sm:px-6 lg:px-8 bg-background">
	<div class="max-w-7xl mx-auto">
		<!-- Section Header -->
		<div class="text-center mb-12">
			<h2 class="text-4xl sm:text-5xl font-heading font-bold text-gradient mb-4">Featured Projects</h2>
			<div class="w-24 h-1 bg-gradient-to-r from-secondary via-highlight to-accent mx-auto mb-8"></div>
			<p class="text-lg text-text-muted max-w-2xl mx-auto">
				A showcase of my work in AI, robotics, and software engineering
			</p>
		</div>
		
		<!-- Filter Buttons -->
		<div class="flex flex-wrap items-center justify-center gap-3 mb-12">
			{#each categories as category}
				<button
					onclick={() => activeFilter = category.id}
					class="px-6 py-3 rounded-lg font-medium transition-all duration-300"
					class:bg-secondary={activeFilter === category.id}
					class:text-white={activeFilter === category.id}
					class:glass-effect={activeFilter !== category.id}
					class:text-text-muted={activeFilter !== category.id}
				>
					{category.label}
				</button>
			{/each}
		</div>
		
		<!-- Projects Grid - Bento Style -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
			{#each filteredProjects as project, index}
				<div
					class="group glass-effect rounded-xl overflow-hidden border border-border hover:border-secondary/50 transition-all duration-300 flex flex-col
					{index === 0 ? 'md:col-span-2' : ''}
					{index === 1 ? 'md:col-span-1' : ''}
					{index === 2 ? 'md:col-span-1' : ''}
					{index === 3 ? 'md:col-span-2' : ''}"
				>
					<!-- Project Image -->
					<div class="relative overflow-hidden bg-gradient-to-br from-secondary/20 via-highlight/20 to-accent/20 h-48 flex-shrink-0"
					>
						{#if project.image}
							<img 
								src={project.image} 
								alt={project.title}
								class="w-full h-full object-cover"
								loading="lazy"
							/>
						{:else}
							<div class="absolute inset-0 flex items-center justify-center text-text-muted/20 text-6xl font-heading">
								{project.title.charAt(0)}
							</div>
						{/if}
						
						<!-- Overlay on hover -->
						<div class="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
							{#if project.link}
								<a
									href={project.link}
									target="_blank"
									rel="noopener noreferrer"
									class="px-6 py-3 bg-secondary text-white rounded-lg flex items-center gap-2 hover:bg-secondary/90 transition-colors"
								>
									<span>Visit Project</span>
									<ExternalLink class="w-4 h-4" />
								</a>
							{/if}
						</div>
						
						<!-- Featured Badge -->
						{#if project.featured}
							<div class="absolute top-4 right-4 px-3 py-1 bg-highlight/90 text-white text-sm font-medium rounded-full backdrop-blur-sm">
								Featured
							</div>
						{/if}
						
						<!-- Achievement Badge -->
						{#if project.achievement}
							<div class="absolute top-4 left-4 px-3 py-1 bg-accent/90 text-white text-sm font-medium rounded-full backdrop-blur-sm flex items-center gap-1">
								<Award class="w-4 h-4" />
								<span>{project.achievement}</span>
							</div>
						{/if}
					</div>
					
					<!-- Project Content -->
					<div class="p-6 flex-1 flex flex-col">
						<h3 class="text-xl font-heading font-bold text-text mb-3 group-hover:text-secondary transition-colors">
							{project.title}
						</h3>
						<p class="text-text-muted mb-4 line-clamp-3">
							{project.description}
						</p>
						
						<!-- Technologies -->
						<div class="flex flex-wrap gap-2 mt-auto">
							{#each project.technologies as tech}
								<span class="px-3 py-1 bg-surface/50 text-text-muted text-xs rounded-full border border-border hover:border-secondary/50 transition-colors">
									{tech}
								</span>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
		
		<!-- No projects message -->
		{#if filteredProjects.length === 0}
			<div class="text-center py-12">
				<p class="text-text-muted text-lg">No projects found in this category.</p>
			</div>
		{/if}
	</div>
</section>
