import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  root: fileURLToPath(new URL('./', import.meta.url)),
  base: '/wave',
  site: 'https://example.test',
  trailingSlash: 'always',
  integrations: [svelte()],
  publicDir: fileURLToPath(new URL('../../public/', import.meta.url)),
  outDir: fileURLToPath(new URL('../../node_modules/.cache/content-fixture-dist/', import.meta.url)),
  cacheDir: fileURLToPath(new URL('../../node_modules/.cache/content-fixture-astro/', import.meta.url)),
  devToolbar: { enabled: false },
});
