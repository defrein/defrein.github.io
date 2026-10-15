# Wave portfolio

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro and Svelte, explicitly requested by the user. The repository's combined production build publishes Wave at `/` and the previous SvelteKit site at `/portfolio/` as Portfolio v4. Standalone Wave development retains `/wave/`; the root build explicitly overrides the base to `/`.

## Users

A general audience exploring Wahni Adnani's work. AI, software engineering, and robotics receive balanced attention, as confirmed by the user.

## Product Purpose

Present real projects, professional experience, skills, education, and an accessible route to contact Wahni or download his existing CV.

## Capabilities and Constraints

English interface, confirmed by the user. Build directly in code. Source remains in `wave`. The user subsequently requested making Wave the default public homepage and preserving the original `portfolio` application as Portfolio v4 at `/portfolio/`; this supersedes the initial unchanged-deployment constraint. Older versions and public tools retain their URLs through the combined artifact.

Typography uses a 16px default base, explicitly requested by the user. Body text, controls, metadata, and captions retain a 1rem minimum on desktop and mobile, while respecting the visitor's browser text preference.

Geographic mentions of Banjarmasin and Indonesia are omitted from the interface and page metadata except within the Experience section, as requested by the user. This includes removing the header location, About location badge, and Contact location line; the footer retains only "Made with curiosity." The Experience section includes the existing education entries and preserves their institution names.

The hero uses a 3D Rubik animation of R U R′ U′ repeated six times per loop, explicitly requested by the user. It returns to solved after every six repetitions, with pause/restart controls and a reduced-motion alternative.

The blog uses local Markdown through Astro Content Collections. The first article explains this portfolio's Rubik implementation using its own code, without client-project material. A shared index, article template, and automatically generated table of contents support future posts. Drafts are excluded from public routes.

The Tools menu opens a responsive directory of icons, titles, and descriptions, grouped into the user-approved Fun, Productivity, and Portfolio Archive sections. Its five utilities retain the original destinations; the four portfolio entries include v4 at `/portfolio/`. All open in new browser tabs. The original `/photobooth/` link redirects to the SvelteKit route at `/portfolio/photobooth/`. Entries and their categories are maintained in `src/data/tools.ts`; no cover images are needed.

Projects also use local Markdown collections. Each entry supplies its gallery metadata, detail prose, and one or more hero images. The first image is the gallery cover; multi-image detail pages support a keyboard- and touch-accessible slider without autoplay. The original seven projects retain their routes and supplied content.

Project pagination shows six cards in a 3-column desktop grid, six cards in a 2-column tablet grid, and five cards in a single mobile column. Blog pagination shows five articles per page on all devices. Project filters reset pagination and preserve selection in the URL; static blog pagination works without JavaScript.

The custom 404 provides a clear missing-page message, a static Rubik-inspired graphic, and native recovery links to home, Projects, Blog, and Tools. It works without JavaScript and opts out of search indexing. Its source is `src/pages/404.astro`; generated `dist/404.html` is refreshed by the build.

## Brand Commitments

Flat, simple, modern, engaging design inspired by https://www.arduino.cc/. Preserve the person's name, real project imagery, source resume facts, and contact details. The user subsequently chose a purple, cyan, white, and black palette based on the supplied code-highlight image; this palette supersedes the original teal colors. The user rejected the saturated rendition; preserve the flat, simple brief when applying these colors.

Use the supplied personal logo in black for the navbar and footer, and in white for the browser-tab favicon, as subsequently requested by the user. The original image is `../v.2/img/d8p.png`. The user explicitly limited this replacement to site identity; functional and social icons keep their existing symbols.

## Evidence on Hand

- `../portfolio/src/lib/data/resume.js`: personal details, experience, education, skills, seven projects.
- `../projects/`: original project screenshots and robotics photos.
- `../assets/documents/WAHNI_ADNANI_NOVEMBER_2025.pdf`: downloadable CV, retaining the supplied filename.

## Product Principles

- Let actual work demonstrate expertise.
- Keep all three practice areas easy to explore.
- Make content readable and contact actions straightforward.
- Keep the portfolio lightweight and functional without a backend.
