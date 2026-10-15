# Tools directory

Mode: Operate. An extension of Wave's established flat visual system.

The user requested a Tools navigation item and a responsive grid of icons, titles, and descriptions. Preserve every destination from `../portfolio/src/lib/components/Nav.svelte`, including the five utilities and three previous portfolios. Use the existing Lucide icon system and no cover images. Keep the directory easy to extend through one local data file.

The user approved three categories: **Fun** (Roulette Wheel, Photobooth, Story), **Productivity** (NLM Viewer, MyJadwal), and **Portfolio Archive** (Portfolio v1, v2, v3, v4). The previous SvelteKit application is v4 at `/portfolio/`, added when Wave became the public homepage. Show these as consecutive named sections with a grid under each heading. Category headings use h2; entry titles use h3. Each entry's typed `category` field controls placement; labels and section order are maintained alongside the entries in `src/data/tools.ts`. Empty categories are omitted.

The production route is `/tools/`; standalone Wave development uses `/wave/tools/`. Reuse the shared header, footer, type scale, purple link/focus states, black icons, sparse rules, and white background. The grid uses three columns above 1100px, two from 701–1100px, and one up to 700px. Each entry is a single native link with a clear title and opens its destination in a new browser tab, explicitly requested by the user. No per-tool detail page, filters, or pagination is needed for this small directory.

Source: the original Tools menu has `/v.1/`, `/v.2/`, `/v.3/`, `/others/roulette-wheel/`, `/others/NLM_viewer/`, `/others/story/`, `/others/jadwal/`, and `/photobooth/`. Preserve root-relative paths and exact capitalization. Photobooth's source is `../portfolio/src/routes/photobooth/`; the combined build preserves its root entry through a redirect to `/portfolio/photobooth/`.

Descriptions follow local page content where available; archived versions are labeled as previous portfolios. Directory content renders statically and works without JavaScript. Tests should cover destination equality, desktop/mobile menu access, active-page feedback, responsive layout, keyboard focus, and no-JavaScript access.
