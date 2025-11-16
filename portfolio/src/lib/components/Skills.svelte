<script>
	import { Code, Database, Brain, Wrench, Cpu, Users } from 'lucide-svelte';
	import { resumeData } from '$lib/data/resume.js';
	
	const skillCategories = [
		{ 
			title: 'Languages', 
			icon: Code, 
			skills: resumeData.skills.languages,
			color: 'secondary'
		},
		{ 
			title: 'AI & ML', 
			icon: Brain, 
			skills: resumeData.skills.aiml,
			color: 'highlight'
		},
		{ 
			title: 'Frameworks', 
			icon: Code, 
			skills: resumeData.skills.frameworks,
			color: 'accent'
		},
		{ 
			title: 'Database', 
			icon: Database, 
			skills: resumeData.skills.database,
			color: 'secondary'
		},
		{ 
			title: 'Tools & APIs', 
			icon: Wrench, 
			skills: resumeData.skills.tools,
			color: 'highlight'
		},
		{ 
			title: 'Robotics', 
			icon: Cpu, 
			skills: resumeData.skills.robotics,
			color: 'accent'
		}
	];
</script>

<section id="skills" class="py-20 px-4 sm:px-6 lg:px-8 bg-primary/50">
	<div class="max-w-7xl mx-auto">
		<!-- Section Header -->
		<div class="text-center mb-16">
			<h2 class="text-4xl sm:text-5xl font-heading font-bold text-gradient mb-4">Skills & Technologies</h2>
			<div class="w-24 h-1 bg-gradient-to-r from-secondary via-highlight to-accent mx-auto mb-8"></div>
			<p class="text-lg text-text-muted max-w-2xl mx-auto">
				A comprehensive toolkit for building intelligent systems
			</p>
		</div>
		
		<!-- Skills Grid -->
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
			{#each skillCategories as category}
				<div class="glass-effect rounded-xl p-6 border border-border card-hover">
					<!-- Category Header -->
					<div class="flex items-center gap-3 mb-4">
						<div 
							class="p-3 rounded-lg {category.color === 'secondary' ? 'bg-secondary/20' : category.color === 'highlight' ? 'bg-highlight/20' : 'bg-accent/20'}"
						>
							<svelte:component 
								this={category.icon} 
								class="w-6 h-6 {category.color === 'secondary' ? 'text-secondary' : category.color === 'highlight' ? 'text-highlight' : 'text-accent'}"
							/>
						</div>
						<h3 class="text-xl font-heading font-bold text-text">{category.title}</h3>
					</div>
					
					<!-- Skills List -->
					<div class="flex flex-wrap gap-2">
						{#each category.skills as skill}
							<span 
								class="px-3 py-2 text-sm rounded-lg border transition-all duration-300 hover:scale-105 {
									category.color === 'secondary' 
										? 'bg-secondary/10 text-secondary border-secondary/20 hover:border-secondary' 
										: category.color === 'highlight' 
										? 'bg-highlight/10 text-highlight border-highlight/20 hover:border-highlight'
										: 'bg-accent/10 text-accent border-accent/20 hover:border-accent'
								}"
							>
								{skill}
							</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>
		
		<!-- Competencies Section -->
		<div class="glass-effect rounded-xl p-8 border border-border">
			<div class="flex items-center gap-3 mb-6">
				<div class="p-3 bg-accent/20 rounded-lg">
					<Users class="w-6 h-6 text-accent" />
				</div>
				<h3 class="text-2xl font-heading font-bold text-text">Core Competencies</h3>
			</div>
			
			<div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
				{#each resumeData.competencies as competency}
					<div class="flex items-center gap-2 p-3 bg-surface/50 rounded-lg border border-border hover:border-accent/50 transition-colors">
						<div class="w-2 h-2 bg-accent rounded-full"></div>
						<span class="text-text-muted">{competency}</span>
					</div>
				{/each}
			</div>
		</div>
		
		<!-- Languages Section -->
		<div class="mt-6 grid md:grid-cols-2 gap-6">
			{#each Object.entries(resumeData.languages) as [lang, level]}
				<div class="glass-effect rounded-xl p-6 border border-border hover:border-secondary/50 transition-colors">
					<div class="flex items-center justify-between">
						<div>
							<h4 class="text-lg font-heading font-bold text-text mb-1">{lang}</h4>
							<p class="text-sm text-text-muted">{level}</p>
						</div>
						<div class="w-3 h-3 bg-accent rounded-full"></div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
