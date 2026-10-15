<script lang="ts">
  import { Copy, Check, ArrowUpRight } from '@lucide/svelte';
  import { onDestroy } from 'svelte';
  let { email }: { email: string } = $props();
  let copied = $state(false);
  let message = $state('');
  let timer: ReturnType<typeof setTimeout>;
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      copied = true;
      message = 'Email copied to clipboard.';
      clearTimeout(timer);
      timer = setTimeout(() => { copied = false; message = ''; }, 3000);
    } catch {
      message = `Copy unavailable. You can select the email address above or use the email link.`;
    }
  }
  onDestroy(() => clearTimeout(timer));
</script>

<div class="contact-actions">
  <a href={`mailto:${email}`} class="button button-light">Say hello <ArrowUpRight size={19} /></a>
  <button class="copy-button" type="button" onclick={copyEmail}>
    {#if copied}<Check size={17} />{:else}<Copy size={17} />{/if}
    {copied ? 'Copied!' : 'Copy email'}
  </button>
</div>
<p class="copy-status" role="status" aria-live="polite">{message}</p>

<style>
  .contact-actions { display: flex; gap: 1.2rem; align-items: center; flex-wrap: wrap; }
  .copy-button { display: flex; align-items: center; gap: .5rem; min-height: 44px; padding: .6rem .2rem; border: 0; background: transparent; color: white; font: inherit; font-size: .82rem; cursor: pointer; text-underline-offset: 5px; }
  .copy-button:hover { text-decoration: underline; }
  .copy-status { min-height: 1.5rem; max-width: 50ch; margin: .6rem 0 0; color: var(--mint); font-size: .75rem; }
</style>
