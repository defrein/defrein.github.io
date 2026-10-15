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
npm run test:content
npm run build
npm run preview
```

Browser tests build and verify the production output using an installed Google Chrome. They start a separate preview on port 4331, so an open development server does not affect the results. Set `PLAYWRIGHT_PORT` to override that port. To use Playwright's Chromium instead, install it with `npx playwright install chromium` and remove `channel: 'chrome'` from the Playwright configuration.

## Content

- Shared resume facts: `../portfolio/src/lib/data/resume.js` (imported at build time).
- Project metadata and detail copy: Markdown files in `src/content/projects/`.
- Blog articles: Markdown files in `src/content/blog/`, validated by `src/content.config.ts`.
- Original project imagery: copied from `../projects/` into `public/images/projects/`.
- Downloadable CV: copied from `../assets/documents/` into `public/documents/`.
- Asset source provenance: `public/images/ORIGINS.md`.
- Personal logo: black in `public/brand/logo.svg` for navbar and footer, white in `public/favicon.svg` for the browser tab. Recreate both from the original supplied image with `node scripts/sync-brand.mjs`; the script preserves their separate colors.

The source resume includes present/current markers and education dates as originally provided; review these when updating the profile. The downloadable CV is the existing supplied PDF, retaining its original filename.

## Maintaining the Tools directory

The **Tools** menu opens `/wave/tools/`, grouped into **Fun**, **Productivity**, and **Portfolio Archive**. Each directory entry opens its destination in a new browser tab. Edit `src/data/tools.ts` to add, remove, or reorder entries. Each entry contains `title`, `description`, `href`, `icon`, and `category`; import an icon from `@lucide/svelte` at the top of the same file and reference it directly. Set `category` to `fun`, `productivity`, or `portfolio-archive`. The page places the entry under its category automatically, without images or additional page templates. Category labels and display order live in `toolCategories` in the same file; categories without entries are omitted.

```typescript
{
  title: 'My tool',
  description: 'A short explanation of what the tool helps you do.',
  href: '/others/my-tool/',
  icon: CalendarDays,
  category: 'productivity',
},
```

The eight original destinations are preserved exactly, including domain-root paths outside `/wave/`. The Wave-only development/preview server does not host these separate applications. `/photobooth/` is in the original menu but its files are absent from this checkout; its link is retained as requested.

## Writing a project

Create a `.md` file in `src/content/projects/`. The filename determines the existing-style URL, for example `my-project.md` becomes `/wave/projects/my-project/`. All seven original projects have been migrated without changing their URLs or factual copy.

```markdown
---
title: "My project"
subtitle: "A short introduction."
summary: "The description shown in the project gallery."
order: 8
categories: ["web"]
label: "WEB APPLICATION"
color: "purple-soft"
technologies: ["Astro", "Svelte"]
isPhoto: false
draft: false
images:
  - src: "images/projects/my-project/overview.png"
    alt: "An overview of the application"
    caption: "The main workspace."
  - src: "images/projects/my-project/detail.png"
    alt: "The application detail screen"
    caption: "A closer look at the workflow."
---

## The idea

Explain the problem and context.

## The work

- Describe your actual contribution.
```

Replace the example image paths with your own files under `public/`; write paths without a leading slash or `/wave/`. The first image is the gallery thumbnail. Add more entries under `images` to enable slider controls on the detail page. Images need meaningful `alt` text; `caption` is optional. One-image projects display their cover without extra controls. Multiple images support previous/next, numbered selection, keyboard arrows/Home/End, and native touch scrolling. They do not autoplay. The existing source projects currently have one image each.

Categories are `ai`, `web`, and/or `robotics`; `order` sorts projects ascending. Color is `purple-soft` or `cyan-soft`. Set `isPhoto: true` for edge-to-edge photography and omit it for contained interface screenshots. An optional `link` adds the external website action. Drafts are excluded from both the gallery and detail routes. Shared resume facts and skills remain in the original resume file; project content is now maintained in these Markdown files.

The homepage shows six projects in three columns above 1100px, six in two columns at 701–1100px, and five in one column up to 700px. The final page shows the remaining items. Filtering returns to page one; `discipline` and `projectPage` query parameters preserve selection through reload and browser history. Responsive changes keep the first visible item within the newly selected page. Without JavaScript all project links remain available in the gallery, while filters and pagination require hydration.

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

## Writing a blog post

The blog index is `/wave/blog/`. Each Markdown file in `src/content/blog/` generates an article at `/wave/blog/<filename>/` using a shared layout. For example, `building-a-rubiks-cube.md` is the first article. Content, code blocks, and the table of contents are rendered at build time; the Rubik demo hydrates when visible.

Create a new `.md` file with frontmatter:

```markdown
---
title: "Your article title"
description: "A short summary for the blog index and search engines."
pubDate: 2026-10-15
tags: ["Svelte", "CSS"]
draft: false
---

Your introduction goes here.

## Your first section

Write with normal Markdown: paragraphs, lists, images, links, and code fences.
```

The filename determines the URL. Posts are sorted by publication date, newest first. Set `draft: true` to exclude an article from both the index and generated routes, including local previews. Set it to `false` when ready to preview or publish. The optional `demo: rubik` field adds the existing interactive cube above the article; omit it for ordinary posts. Other metadata and the page template are shared, so no page code needs to be copied.

The blog shows five articles per page at every viewport. Page one stays at `/wave/blog/`; further pages are generated at `/wave/blog/page/2/`, `/wave/blog/page/3/`, and so on when needed. Pagination uses native links and works without JavaScript.

Use `npm run dev` to preview writing. Changes go live after a fresh build and deployment; the repository's existing deployment still targets `portfolio/`, as described above. This setup uses Astro's built-in [Content Collections](https://docs.astro.build/en/guides/content-collections/) and plain Markdown; MDX is not installed.

`npm run test:content` builds an isolated fixture site to check a two-image slider and six-post blog pagination on desktop/mobile. Its content lives under `tests/fixture-site/`, and generated output stays in `node_modules/.cache/`; these test entries are never added to the production collections or `dist/`.

## Rubik hero animation

The hero uses `src/components/RubiksCube.svelte`, `RubikCubie.svelte`, and the integer state model in `src/lib/rubiks-cube.ts`. It performs **R U R′ U′ × 6**, rests solved, and repeats. CSS 3D renders the cube without a WebGL dependency or external assets. Play/Pause and Restart are available. Playback stops offscreen and in hidden tabs; reduced motion starts it paused.

`npm run test:cube` verifies physical move direction, stickers, inverse moves, and the exact six-repetition return of every piece and orientation. It uses native TypeScript support in Node.js 24. The browser tests also verify full loops, reduced motion, pause, and restart.
