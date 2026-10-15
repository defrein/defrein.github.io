<script lang="ts">
  import { ArrowLeft, ArrowRight } from '@lucide/svelte';
  import { onMount } from 'svelte';
  import { withBase } from '../lib/paths';
  import type { ProjectImage } from '../lib/project-types';

  let { images, title, color = 'purple-soft', isPhoto = false }: { images: ProjectImage[]; title: string; color?: string; isPhoto?: boolean } = $props();
  let current = $state(0);
  let ready = $state(false);
  let viewport: HTMLDivElement;

  function goTo(index: number) {
    current = Math.max(0, Math.min(images.length - 1, index));
    viewport.scrollTo({ left: current * viewport.clientWidth, behavior: 'instant' });
  }

  function syncPosition() {
    if (viewport.clientWidth) current = Math.max(0, Math.min(images.length - 1, Math.round(viewport.scrollLeft / viewport.clientWidth)));
  }

  function handleKey(event: KeyboardEvent) {
    if (images.length < 2 || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    goTo(event.key === 'Home' ? 0 : event.key === 'End' ? images.length - 1 : current + (event.key === 'ArrowRight' ? 1 : -1));
  }

  onMount(() => {
    ready = true;
    const observer = new ResizeObserver(() => goTo(current));
    observer.observe(viewport);
    return () => observer.disconnect();
  });
</script>

<section class="project-slider" aria-label={`${title} images`} aria-roledescription="carousel">
  <!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions (The native horizontal scroller needs keyboard focus and arrow-key navigation.) -->
  <div class="slide-viewport" bind:this={viewport} tabindex={images.length > 1 ? 0 : undefined} role="group" aria-label={images.length > 1 ? 'Project images. Use left and right arrow keys to navigate.' : 'Project image'} onkeydown={handleKey} onscroll={syncPosition}>
    {#each images as image, index}
      <figure class="slide" aria-hidden={ready && current !== index ? 'true' : undefined}>
        <div class="image-frame {color}" class:photo={isPhoto}><img src={withBase(image.src)} alt={image.alt} width="1280" height="720" loading={index === 0 ? 'eager' : 'lazy'} fetchpriority={index === 0 ? 'high' : 'auto'} decoding="async" /></div>
        {#if image.caption}<figcaption>{image.caption}</figcaption>{/if}
      </figure>
    {/each}
  </div>
  {#if images.length > 1 && ready}
    <div class="slider-toolbar">
      <p class="slide-count" role="status" aria-live="polite" aria-atomic="true">Image {current + 1} of {images.length}</p>
      <div class="slide-controls">
        <button type="button" disabled={!ready || current === 0} aria-label="Previous project image" onclick={() => goTo(current - 1)}><ArrowLeft size={20} /></button>
        {#each images as image, index}<button type="button" class:active={current === index} disabled={!ready} aria-label={`Show project image ${index + 1}`} aria-current={current === index ? 'true' : undefined} onclick={() => goTo(index)}>{index + 1}</button>{/each}
        <button type="button" disabled={!ready || current === images.length - 1} aria-label="Next project image" onclick={() => goTo(current + 1)}><ArrowRight size={20} /></button>
      </div>
    </div>
  {/if}
</section>

<style>
  .project-slider { min-width: 0; }
  .slide-viewport { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; overscroll-behavior-inline: contain; scrollbar-width: thin; }
  .slide { flex: 0 0 100%; min-width: 0; margin: 0; scroll-snap-align: start; }
  .image-frame { aspect-ratio: 16 / 9; padding: clamp(1rem, 4vw, 4rem); }
  .image-frame img { width: 100%; height: 100%; object-fit: contain; }
  .image-frame.photo { padding: 0; }
  .image-frame.photo img { object-fit: cover; }
  figcaption { color: var(--muted); font-size: var(--text-body); padding-top: .8rem; }
  .slider-toolbar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: .75rem 1.5rem; padding-top: 1rem; }
  .slide-count { margin: 0; color: var(--muted); font-variant-numeric: tabular-nums; }
  .slide-controls { display: flex; flex-wrap: wrap; gap: .4rem; }
  .slide-controls button { display: grid; place-items: center; min-width: 44px; min-height: 44px; padding: .5rem; border: 1px solid var(--line); border-radius: 3px; background: transparent; color: var(--ink); font: inherit; cursor: pointer; }
  .slide-controls button:hover { border-color: var(--purple-strong); color: var(--purple-strong); }
  .slide-controls button.active { background: var(--ink); border-color: var(--ink); color: var(--white); }
  .slide-controls button:disabled { color: var(--muted); border-color: var(--line); cursor: default; }
</style>
