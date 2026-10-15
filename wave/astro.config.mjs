import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

export default defineConfig({
  site: 'https://defrein.github.io',
  base: process.env.PUBLIC_BASE_PATH || '/wave',
  trailingSlash: 'always',
  integrations: [svelte()],
  output: 'static',
  devToolbar: { enabled: false },
});
