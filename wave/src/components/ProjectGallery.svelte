<script lang="ts">
  import { ArrowUpRight } from '@lucide/svelte';
  import { onMount } from 'svelte';
  import { categories, projects, type Category } from '../data/portfolio';
  import { withBase } from '../lib/paths';

  let selected = $state<Category>('all');
  let ready = $state(false);
  let visible = $derived(projects.filter(project => selected === 'all' || (project.categories as readonly string[]).includes(selected)));

  onMount(() => {
    const initial = new URL(window.location.href).searchParams.get('discipline');
    if (categories.some(item => item.id === initial)) selected = initial as Category;
    ready = true;
    const select = (event: Event) => {
      const category = (event as CustomEvent<Category>).detail;
      if (categories.some(item => item.id === category)) selected = category;
    };
    window.addEventListener('portfolio:filter', select);
    return () => window.removeEventListener('portfolio:filter', select);
  });
</script>

<div class="gallery-toolbar">
  <div class="filters" role="group" aria-label="Filter projects by discipline">
    {#each categories as category}
      <button type="button" disabled={!ready} class:active={selected === category.id} aria-pressed={selected === category.id} onclick={() => selected = category.id}>{category.label}</button>
    {/each}
  </div>
  <span class="project-count" role="status" aria-live="polite">{visible.length} projects</span>
</div>

<div class="project-grid">
  {#each visible as project (project.slug)}
    <article class="project">
      <a class="project-image {project.color}" href={withBase(`projects/${project.slug}/`)} aria-label={`Explore ${project.title}`}>
        <img src={withBase(project.image)} alt={project.slug.includes('robot') ? `${project.title} in the competition field` : `Interface of ${project.title}`} width="800" height="500" loading="lazy" decoding="async" />
        <span class="image-action" aria-hidden="true"><ArrowUpRight size={22} strokeWidth={1.7} /></span>
      </a>
      <div class="project-meta"><span>{project.label}</span><span>{project.technologies.slice(0, 2).join(' / ')}</span></div>
      <h3><a href={withBase(`projects/${project.slug}/`)}>{project.title}<ArrowUpRight size={22} strokeWidth={1.7} /></a></h3>
      <p>{project.summary}</p>
    </article>
  {/each}
</div>

<style>
  .gallery-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 2rem; }
  .filters { display: flex; flex-wrap: wrap; gap: .5rem; }
  .filters button { background: transparent; border: 1px solid var(--line); color: var(--muted); border-radius: 4px; font: inherit; font-size: .78rem; font-weight: 600; padding: .7rem 1rem; min-height: 44px; cursor: pointer; transition: background 180ms, color 180ms, border-color 180ms; }
  .filters button:hover { border-color: var(--teal); color: var(--teal); }
  .filters button:disabled { cursor: wait; }
  .filters button.active { background: var(--petrol); color: white; border-color: var(--petrol); }
  .project-count { font-size: .75rem; color: var(--muted); white-space: nowrap; font-variant-numeric: tabular-nums; }
  .project-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 3.5rem 2rem; }
  .project { min-width: 0; }
  .project-image { display: block; position: relative; aspect-ratio: 1.65; overflow: hidden; padding: 1.65rem; }
  .project-image img { width: 100%; height: 100%; object-fit: contain; transition: transform 300ms var(--ease); }
  .project-image.peach, .project-image.sand { padding: 0; }
  .project-image.peach img, .project-image.sand img { object-fit: cover; }
  .project-image:hover img { transform: scale(1.035); }
  .image-action { position: absolute; bottom: 1rem; right: 1rem; background: var(--paper); color: var(--petrol); width: 42px; height: 42px; display: grid; place-items: center; transition: background 180ms, color 180ms; }
  .project-image:hover .image-action { color: white; background: var(--teal); }
  .project-meta { margin-top: 1.2rem; display: flex; justify-content: space-between; gap: .7rem; color: var(--muted); font-size: .6rem; font-weight: 700; letter-spacing: .065em; }
  .project-meta span:last-child { font-weight: 500; text-align: right; letter-spacing: 0; }
  h3 { font-size: 1.45rem; margin: .55rem 0 .6rem; letter-spacing: -.035em; }
  h3 a { display: flex; align-items: center; justify-content: space-between; gap: .75rem; }
  h3 :global(svg) { flex-shrink: 0; }
  h3 a:hover { color: var(--teal); }
  .project p { max-width: 60ch; font-size: .88rem; color: var(--muted); line-height: 1.75; margin: 0; }
  @media (max-width: 700px) {
    .gallery-toolbar { align-items: start; flex-direction: column; gap: .9rem; }
    .filters { gap: .4rem; }
    .filters button { padding: .6rem .75rem; font-size: .7rem; }
    .project-grid { grid-template-columns: 1fr; gap: 2.5rem; }
    .project-image { padding: 1rem; }
    h3 { font-size: 1.3rem; }
    .project-meta { font-size: .55rem; }
  }
</style>
