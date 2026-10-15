<script lang="ts">
  import { ArrowUpRight, ArrowLeft, ArrowRight } from '@lucide/svelte';
  import { onMount, tick } from 'svelte';
  import { categories, type Category } from '../data/portfolio';
  import type { ProjectCard } from '../lib/project-types';
  import { PROJECTS_PER_PAGE, MOBILE_PROJECTS_PER_PAGE, pageCount, clampPage, pageNumbers, pageSlice } from '../lib/pagination';
  import { withBase } from '../lib/paths';
  import '../styles/pagination.css';

  let { projects }: { projects: ProjectCard[] } = $props();
  let selected = $state<Category>('all');
  let ready = $state(false);
  let size = $state(PROJECTS_PER_PAGE);
  let page = $state(1);
  let results: HTMLDivElement;
  const filtered = $derived(projects.filter(project => selected === 'all' || (project.categories as string[]).includes(selected)));
  const pages = $derived(pageCount(filtered.length, size));
  const visible = $derived(ready ? pageSlice(filtered, page, size) : filtered);

  function writeLocation(replace = false, anchor = false) {
    const url = new URL(window.location.href);
    if (selected === 'all') url.searchParams.delete('discipline');
    else url.searchParams.set('discipline', selected);
    if (page === 1) url.searchParams.delete('projectPage');
    else url.searchParams.set('projectPage', String(page));
    if (anchor) url.hash = 'work';
    if (url.href !== window.location.href) {
      if (replace) history.replaceState(null, '', url);
      else history.pushState(null, '', url);
    }
  }

  function selectCategory(category: Category) {
    selected = category;
    page = 1;
    writeLocation(false, true);
  }

  async function goToPage(number: number) {
    page = clampPage(number, pages);
    writeLocation(false, true);
    await tick();
    document.getElementById('work')?.scrollIntoView({ block: 'start' });
    results.focus({ preventScroll: true });
  }

  onMount(() => {
    const media = window.matchMedia('(max-width: 700px)');
    size = media.matches ? MOBILE_PROJECTS_PER_PAGE : PROJECTS_PER_PAGE;
    const readLocation = () => {
      const params = new URL(window.location.href).searchParams;
      const category = params.get('discipline');
      selected = categories.some(item => item.id === category) ? category as Category : 'all';
      page = clampPage(Number(params.get('projectPage') ?? 1), pages);
    };
    readLocation();
    ready = true;
    const select = (event: Event) => {
      const category = (event as CustomEvent<Category>).detail;
      if (categories.some(item => item.id === category)) selectCategory(category);
    };
    const resize = () => {
      const first = (page - 1) * size;
      size = media.matches ? MOBILE_PROJECTS_PER_PAGE : PROJECTS_PER_PAGE;
      page = clampPage(Math.floor(first / size) + 1, pages);
      writeLocation(true);
    };
    window.addEventListener('portfolio:filter', select);
    window.addEventListener('popstate', readLocation);
    media.addEventListener('change', resize);
    return () => {
      window.removeEventListener('portfolio:filter', select);
      window.removeEventListener('popstate', readLocation);
      media.removeEventListener('change', resize);
    };
  });
</script>

<div class="gallery-toolbar">
  <div class="filters" role="group" aria-label="Filter projects by discipline">
    {#each categories as category}
      <button type="button" disabled={!ready} class:active={selected === category.id} aria-pressed={selected === category.id} onclick={() => selectCategory(category.id)}>{category.label}</button>
    {/each}
  </div>
  <span class="project-count">{filtered.length} {filtered.length === 1 ? 'project' : 'projects'}</span>
</div>

<div class="project-grid" bind:this={results} tabindex="-1" role="region" aria-label="Project results">
  {#each visible as project (project.slug)}
    <article class="project">
      <a class="project-image {project.color}" class:photo={project.isPhoto} href={withBase(`projects/${project.slug}/`)} aria-label={`Explore ${project.title}`}>
        <img src={withBase(project.image.src)} alt={project.image.alt} width="800" height="500" loading="lazy" decoding="async" />
        <span class="image-action" aria-hidden="true"><ArrowUpRight size={22} strokeWidth={1.7} /></span>
      </a>
      <div class="project-meta"><span>{project.label}</span><span>{project.technologies.slice(0, 2).join(' / ')}</span></div>
      <h3><a href={withBase(`projects/${project.slug}/`)}>{project.title}<ArrowUpRight size={22} strokeWidth={1.7} /></a></h3>
      <p>{project.summary}</p>
    </article>
  {/each}
  {#if !filtered.length}<div class="no-results"><p>No projects in this discipline yet.</p><button class="button" type="button" onclick={() => selectCategory('all')}>View all work</button></div>{/if}
</div>

{#if ready}
  <nav class="pagination" aria-label="Project pagination">
    <p class="pagination-info" role="status" aria-live="polite">{filtered.length ? (page - 1) * size + 1 : 0}–{Math.min(page * size, filtered.length)} of {filtered.length} projects</p>
    <div class="page-links">
      <button class="page-control" type="button" aria-label="Previous project page" disabled={page === 1} onclick={() => goToPage(page - 1)}><ArrowLeft size={18} /><span>Previous</span></button>
      {#each pageNumbers(page, pages) as number, index (index)}
        {#if number === 'ellipsis'}<span class="page-ellipsis" aria-hidden="true">…</span>
        {:else}<button class="page-control" type="button" aria-label={`Project page ${number}`} aria-current={number === page ? 'page' : undefined} onclick={() => goToPage(number)}>{number}</button>{/if}
      {/each}
      <button class="page-control" type="button" aria-label="Next project page" disabled={page === pages} onclick={() => goToPage(page + 1)}><span>Next</span><ArrowRight size={18} /></button>
    </div>
  </nav>
{/if}

<style>
  .gallery-toolbar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 2rem; }
  .filters { display: flex; flex-wrap: wrap; gap: .5rem; }
  .filters button { background: transparent; border: 1px solid var(--line); color: var(--muted); border-radius: 4px; font: inherit; font-size: var(--text-body); font-weight: 600; padding: .7rem 1rem; min-height: 44px; cursor: pointer; transition: background 180ms, color 180ms, border-color 180ms; }
  .filters button:hover { border-color: var(--purple-strong); color: var(--purple-strong); }
  .filters button:disabled { cursor: wait; }
  .filters button.active { background: var(--ink); color: white; border-color: var(--ink); }
  .project-count { font-size: var(--text-body); color: var(--muted); white-space: nowrap; font-variant-numeric: tabular-nums; }
  .project-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 3.5rem 2rem; }
  .no-results { grid-column: 1 / -1; }
  .project { min-width: 0; }
  .project-image { display: block; position: relative; aspect-ratio: 1.65; overflow: hidden; padding: 1.65rem; }
  .project-image img { width: 100%; height: 100%; object-fit: contain; transition: transform 300ms var(--ease); }
  .project-image.photo { padding: 0; }
  .project-image.photo img { object-fit: cover; }
  .project-image:hover img { transform: scale(1.035); }
  .image-action { position: absolute; bottom: 1rem; right: 1rem; background: var(--paper); color: var(--ink); width: 42px; height: 42px; display: grid; place-items: center; transition: background 180ms, color 180ms; }
  .project-image:hover .image-action { color: white; background: var(--purple-strong); }
  .project-meta { margin-top: 1.2rem; display: flex; flex-wrap: wrap; justify-content: space-between; gap: .25rem 1rem; color: var(--muted); font-size: var(--text-body); line-height: 1.5; font-weight: 600; }
  .project-meta span:last-child { font-weight: 500; }
  h3 { font-size: var(--text-title); line-height: 1.25; margin: .65rem 0 .75rem; letter-spacing: -.025em; }
  h3 a { display: flex; align-items: center; justify-content: space-between; gap: .75rem; }
  h3 :global(svg) { flex-shrink: 0; }
  h3 a:hover { color: var(--purple-strong); }
  .project p { max-width: 60ch; font-size: var(--text-body); color: var(--muted); line-height: 1.75; margin: 0; }
  @media (min-width: 701px) and (max-width: 1100px) { .project-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (max-width: 700px) {
    .gallery-toolbar { align-items: start; flex-direction: column; gap: .9rem; }
    .filters { gap: .4rem; }
    .filters button { padding: .6rem .75rem; }
    .project-grid { grid-template-columns: 1fr; gap: 2.5rem; }
    .project-image { padding: 1rem; }
  }
</style>
