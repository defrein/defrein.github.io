# Wave — Wahni Adnani

A modern, flat portfolio inspired by Arduino, using the requested purple, cyan, white, and black palette. Built with Astro and Svelte 5, with self-hosted Manrope typography and Lucide icons.

## Run locally

```powershell
cd "D:\Code\Pemrograman Web\defrein.github.io\wave"
npm install
npm run dev
```

Open **http://127.0.0.1:4321/wave/**.

## Verify and build

```powershell
npm run check
npm run test:cube
npm test
npm run build
npm run preview
```

Browser tests build and verify the production output using an installed Google Chrome. They start a separate preview on port 4331, so an open development server does not affect the results. Set `PLAYWRIGHT_PORT` to override that port. To use Playwright's Chromium instead, install it with `npx playwright install chromium` and remove `channel: 'chrome'` from the Playwright configuration.

## Content

- Shared resume facts: `../portfolio/src/lib/data/resume.js` (imported at build time).
- Project summaries, categories, and detail copy: `src/data/portfolio.ts`.
- Original project imagery: copied from `../projects/` into `public/images/projects/`.
- Downloadable CV: copied from `../assets/documents/` into `public/documents/`.
- Asset source provenance: `public/images/ORIGINS.md`.
- Black personal logo: `public/brand/logo.svg`, shared by navbar and footer, with the same mark in `public/favicon.svg`. Recreate both from the original supplied image with `node scripts/sync-brand.mjs`.

The source resume includes present/current markers and education dates as originally provided; review these when updating the profile. The downloadable CV is the existing supplied PDF, retaining its original filename.

## Deployment

`npm run build` produces static files in `dist/`. The default base path is `/wave/`. To host at that path, place the contents of `dist/` under the host's `wave/` directory. For a standalone domain at `/`, build with:

```powershell
$env:PUBLIC_BASE_PATH = '/'
npm run build
Remove-Item Env:PUBLIC_BASE_PATH
```

The existing repository workflow still deploys the original `portfolio/` application. Publishing this new app requires staging the Wave build at the desired path; no existing deployment configuration has been changed.

## Features

Responsive navigation, category filters, seven static project detail pages, accessible keyboard controls, working email and social links, email copy with failure feedback, CV download, per-page SEO metadata, and a custom 404 page. Core content and project links are server-rendered; Svelte hydrates the navigation, gallery filters, and copy action.

## Rubik hero animation

The hero uses `src/components/RubiksCube.svelte`, `RubikCubie.svelte`, and the integer state model in `src/lib/rubiks-cube.ts`. It performs **R U R′ U′ × 6**, rests solved, and repeats. CSS 3D renders the cube without a WebGL dependency or external assets. Play/Pause and Restart are available. Playback stops offscreen and in hidden tabs; reduced motion starts it paused.

`npm run test:cube` verifies physical move direction, stickers, inverse moves, and the exact six-repetition return of every piece and orientation. It uses native TypeScript support in Node.js 24. The browser tests also verify full loops, reduced motion, pause, and restart.
