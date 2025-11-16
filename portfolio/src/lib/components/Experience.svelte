<script>
	import { ChevronDown, ChevronUp, MapPin, Calendar, Briefcase } from 'lucide-svelte';
	import { resumeData } from '$lib/data/resume.js';
	
	let expandedJobs = $state(/** @type {Record<number, boolean>} */ ({}));
	
	/**
	 * @param {number} index
	 */
	function toggleJob(index) {
		expandedJobs[index] = !expandedJobs[index];
	}
</script>

<section id="experience" class="py-20 px-4 sm:px-6 lg:px-8 bg-primary/50">
	<div class="max-w-6xl mx-auto">
		<!-- Section Header -->
		<div class="text-center mb-16">
			<h2 class="text-4xl sm:text-5xl font-heading font-bold text-gradient mb-4">Experience</h2>
			<div class="w-24 h-1 bg-gradient-to-r from-secondary via-highlight to-accent mx-auto"></div>
		</div>
		
		<!-- Timeline -->
		<div class="relative">
			<!-- Vertical line -->
			<div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>
			<div class="md:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
			
			<div class="space-y-12">
				{#each resumeData.experience as job, index}
					<div class="relative">
						<!-- Timeline dot - centered on line -->
						<div class="absolute left-8 md:left-1/2 top-6 w-4 h-4 bg-secondary rounded-full border-4 border-background -translate-x-1/2 z-10">
							{#if job.current}
								<div class="absolute inset-0 bg-secondary rounded-full animate-ping"></div>
							{/if}
						</div>
						
						<!-- Content -->
						<div class="ml-20 md:ml-0">
							<div class="md:grid md:grid-cols-2 md:gap-8">
								<!-- Even index (0, 2, 4...) = Left side, Odd index (1, 3, 5...) = Right side -->
								{#if index % 2 === 0}
									<!-- Left side content -->
									<div class="md:pr-8">
										<div class="glass-effect rounded-xl p-6 border border-border hover:border-secondary/50 transition-all duration-300">
											<div class="flex items-start justify-between mb-4">
												<div class="flex-1">
													<h3 class="text-2xl font-heading font-bold text-text mb-2">{job.title}</h3>
													<div class="flex items-center gap-2 text-secondary mb-2">
														<Briefcase class="w-4 h-4" />
														<span class="font-medium">{job.company}</span>
													</div>
													<div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-text-muted">
														<div class="flex items-center gap-1">
															<Calendar class="w-4 h-4" />
															<span>{job.period}</span>
														</div>
														{#if job.location}
															<div class="flex items-center gap-1">
																<MapPin class="w-4 h-4" />
																<span>{job.location}</span>
															</div>
														{/if}
													</div>
												</div>
												{#if !job.isFreelance}
													<button
														onclick={() => toggleJob(index)}
														class="ml-4 p-2 hover:bg-surface rounded-lg transition-colors"
														aria-label="Toggle details"
													>
														{#if expandedJobs[index]}
															<ChevronUp class="w-5 h-5 text-text-muted" />
														{:else}
															<ChevronDown class="w-5 h-5 text-text-muted" />
														{/if}
													</button>
												{/if}
											</div>
											
											{#if !job.isFreelance && expandedJobs[index]}
												<div class="mt-4 space-y-2 border-t border-border pt-4">
													{#each job.responsibilities as responsibility}
														<div class="flex items-start gap-2">
															<div class="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
															<p class="text-text-muted text-sm">{responsibility}</p>
														</div>
													{/each}
													
													{#if job.technologies}
														<div class="flex flex-wrap gap-2 mt-4">
															{#each job.technologies as tech}
																<span class="px-3 py-1 bg-secondary/10 text-secondary text-xs rounded-full border border-secondary/20">
																	{tech}
																</span>
															{/each}
														</div>
													{/if}
												</div>
											{/if}
											
											{#if job.isFreelance}
												<div class="mt-4 space-y-4">
													{#each job.projects as project}
														<div class="p-4 bg-surface/50 rounded-lg border border-border/50">
															<div class="flex items-start justify-between mb-2">
																<h4 class="font-heading font-bold text-text">{project.name}</h4>
																{#if project.achievement}
																	<span class="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full border border-accent/30">
																		{project.achievement}
																	</span>
																{/if}
															</div>
															<p class="text-sm text-text-muted mb-3">{project.description}</p>
															<div class="flex flex-wrap gap-2">
																{#each project.technologies as tech}
																	<span class="px-2 py-1 bg-highlight/10 text-highlight text-xs rounded-full border border-highlight/20">
																		{tech}
																	</span>
																{/each}
															</div>
														</div>
													{/each}
												</div>
											{/if}
										</div>
									</div>
									<!-- Empty right side for even indices -->
									<div class="hidden md:block"></div>
								{:else}
									<!-- Empty left side for odd indices -->
									<div class="hidden md:block"></div>
									<!-- Right side content -->
									<div class="md:pl-8">
										<div class="glass-effect rounded-xl p-6 border border-border hover:border-secondary/50 transition-all duration-300">
											<div class="flex items-start justify-between mb-4">
												<div class="flex-1">
													<h3 class="text-2xl font-heading font-bold text-text mb-2">{job.title}</h3>
													<div class="flex items-center gap-2 text-secondary mb-2">
														<Briefcase class="w-4 h-4" />
														<span class="font-medium">{job.company}</span>
													</div>
													<div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-text-muted">
														<div class="flex items-center gap-1">
															<Calendar class="w-4 h-4" />
															<span>{job.period}</span>
														</div>
														{#if job.location}
															<div class="flex items-center gap-1">
																<MapPin class="w-4 h-4" />
																<span>{job.location}</span>
															</div>
														{/if}
													</div>
												</div>
												{#if !job.isFreelance}
													<button
														onclick={() => toggleJob(index)}
														class="ml-4 p-2 hover:bg-surface rounded-lg transition-colors"
														aria-label="Toggle details"
													>
														{#if expandedJobs[index]}
															<ChevronUp class="w-5 h-5 text-text-muted" />
														{:else}
															<ChevronDown class="w-5 h-5 text-text-muted" />
														{/if}
													</button>
												{/if}
											</div>
											
											{#if !job.isFreelance && expandedJobs[index]}
												<div class="mt-4 space-y-2 border-t border-border pt-4">
													{#each job.responsibilities as responsibility}
														<div class="flex items-start gap-2">
															<div class="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
															<p class="text-text-muted text-sm">{responsibility}</p>
														</div>
													{/each}
													
													{#if job.technologies}
														<div class="flex flex-wrap gap-2 mt-4">
															{#each job.technologies as tech}
																<span class="px-3 py-1 bg-secondary/10 text-secondary text-xs rounded-full border border-secondary/20">
																	{tech}
																</span>
															{/each}
														</div>
													{/if}
												</div>
											{/if}
											
											{#if job.isFreelance}
												<div class="mt-4 space-y-4">
													{#each job.projects as project}
														<div class="p-4 bg-surface/50 rounded-lg border border-border/50">
															<div class="flex items-start justify-between mb-2">
																<h4 class="font-heading font-bold text-text">{project.name}</h4>
																{#if project.achievement}
																	<span class="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full border border-accent/30">
																		{project.achievement}
																	</span>
																{/if}
															</div>
															<p class="text-sm text-text-muted mb-3">{project.description}</p>
															<div class="flex flex-wrap gap-2">
																{#each project.technologies as tech}
																	<span class="px-2 py-1 bg-highlight/10 text-highlight text-xs rounded-full border border-highlight/20">
																		{tech}
																	</span>
																{/each}
															</div>
														</div>
													{/each}
												</div>
											{/if}
										</div>
									</div>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
