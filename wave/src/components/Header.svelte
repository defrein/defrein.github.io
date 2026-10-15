<script lang="ts">
  import { ArrowUpRight, Menu, X } from '@lucide/svelte';
  import { onMount } from 'svelte';
  import { withBase } from '../lib/paths';

  let { home = false, activeSection }: { home?: boolean; activeSection?: 'blog' | 'tools' } = $props();
  let open = $state(false);
  let ready = $state(false);
  onMount(() => { ready = true; });
  let trigger: HTMLButtonElement;
  const links = [{ id: 'work', label: 'Work' }, { id: 'about', label: 'About' }, { id: 'experience', label: 'Experience' }];
  const section = (id: string) => `${home ? '' : withBase()}#${id}`;

  function closeOnEscape(event: KeyboardEvent) {
    if (event.key === 'Escape' && open) {
      open = false;
      trigger?.focus();
    }
  }
</script>

<svelte:window onkeydown={closeOnEscape} />

<div class="utility-bar">
  <div class="container utility-inner">
    <span class="availability"><span class="status-dot"></span> Available for opportunities</span>
  </div>
</div>
<header class="site-header">
  <div class="container header-inner">
    <a class="wordmark" href={withBase()} aria-label="Wahni Adnani — home">
      <img src={withBase('brand/logo.svg')} width="1029" height="549" alt="" />
    </a>
    <nav id="main-navigation" class:menu-open={open} aria-label="Main navigation">
      {#each links as link}
        <a href={section(link.id)} onclick={() => open = false}>{link.label}</a>
      {/each}
      <a href={withBase('blog/')} class:active={activeSection === 'blog'} aria-current={activeSection === 'blog' ? 'location' : undefined} onclick={() => open = false}>Blog</a>
      <a href={withBase('tools/')} class:active={activeSection === 'tools'} aria-current={activeSection === 'tools' ? 'page' : undefined} onclick={() => open = false}>Tools</a>
      <a href={section('contact')} class="button button-small">Let's talk <ArrowUpRight size={17} strokeWidth={1.8} /></a>
    </nav>
    <button bind:this={trigger} class="menu-toggle" disabled={!ready} type="button" aria-controls="main-navigation" aria-expanded={open} aria-label={open ? 'Close navigation' : 'Open navigation'} onclick={() => open = !open}>
      {#if open}<X size={25} />{:else}<Menu size={25} />{/if}
    </button>
  </div>
</header>

<style>
  .utility-bar { background: var(--ink); color: var(--white); font-size: var(--text-body); }
  .utility-inner { min-height: 36px; padding-block: .25rem; display: flex; justify-content: center; align-items: center; }
  .availability { display: flex; align-items: center; gap: .55rem; }
  .status-dot { width: 6px; height: 6px; background: var(--cyan); border-radius: 50%; }
  .site-header { background: var(--paper); border-bottom: 1px solid var(--line); position: sticky; top: 0; z-index: 30; }
  .header-inner { min-height: 68px; display: flex; align-items: center; justify-content: space-between; gap: 2rem; }
  .wordmark { display: inline-flex; align-items: center; min-height: 44px; flex-shrink: 0; }
  .wordmark img { width: 64px; height: auto; }
  nav { display: flex; gap: 2.4rem; align-items: center; font-size: var(--text-body); font-weight: 600; }
  nav > a:not(.button) { padding-block: .7rem; text-decoration-color: transparent; text-underline-offset: 6px; }
  nav > a:not(.button):hover { color: var(--purple-strong); text-decoration: underline; }
  nav > a.active { color: var(--purple-strong); text-decoration: underline; }
  .menu-toggle { display: none; color: var(--ink); background: transparent; border: 0; padding: .6rem; cursor: pointer; }
  @media (min-width: 701px) and (max-width: 1000px) {
    nav { gap: 1.2rem; }
    .header-inner { gap: 1.25rem; }
  }
  @media (max-width: 700px) {
    .header-inner { min-height: 60px; }
    .wordmark img { width: 56px; }
    .menu-toggle { display: grid; place-items: center; }
    nav { display: none; position: absolute; top: 100%; left: 0; width: 100%; padding: 1.2rem var(--gutter) 1.5rem; background: var(--paper); border-bottom: 1px solid var(--line); gap: .35rem; align-items: stretch; }
    nav.menu-open { display: flex; flex-direction: column; }
    nav > a:not(.button) { padding: .8rem 0; }
    nav .button { margin-top: .5rem; justify-content: space-between; }
  }
</style>
