# defrein.github.io

This repository is configured to publish Wave at **https://defrein.github.io/** and preserve the previous SvelteKit portfolio as **Portfolio v4** at **https://defrein.github.io/portfolio/**. The combined layout has been built and verified locally; this migration has not been pushed or deployed. The public site changes after a successful deployment.

| Configured URL | Application |
| --- | --- |
| `/` | Wave: Astro + Svelte |
| `/blog/`, `/projects/<slug>/`, `/tools/` | Wave content |
| `/portfolio/` | Portfolio v4: previous SvelteKit site |
| `/portfolio/photobooth/` | Original Photobooth application |
| `/photobooth/` | Compatibility redirect to Photobooth |
| `/v.1/`, `/v.2/`, `/v.3/` | Original static portfolio versions |
| `/v.4/` | Alias for `/portfolio/` |
| `/others/...` | Existing standalone tools |
| `/wave/` | Compatibility redirect to the current homepage |

## Build and preview the complete site

Use Node.js 24 or newer. From this repository root:

```powershell
npm run setup
npm run build
npm test
npm run preview
```

Open **http://127.0.0.1:4173/**. This preview serves both applications and all staged legacy URLs, including the custom root 404. Optional `npm run test:browser` uses the installed Chrome and Wave's Playwright dependency to verify desktop/mobile navigation, v4 hydration/filtering, new-tab archive links, and the Photobooth redirect with a simulated camera.

## Repository layout

```text
.github/workflows/deploy.yml  Build and publish the combined dist artifact
wave/                       Current Astro/Svelte application source
portfolio/                  Portfolio v4 SvelteKit application source
others/, v.1/, v.2/, v.3/   Original public tools and portfolio versions
assets/, projects/          Supplied shared documents and project images
archive/                    Historical landing and former root build (not deployed)
scripts/                    Cross-platform build and local preview
tests/                      Combined-site route and asset checks
docs/deployment.md          Hosting and maintenance instructions
dist/                       Generated complete site (ignored by Git)
```

Generated HTML and hashed bundles belong in build output, rather than the repository root. Do not copy `portfolio/build/` into the root: it would replace Wave and reintroduce outdated generated files. The combined build explicitly stages public folders and excludes source, dependencies, and cache directories.

See [Wave's README](wave/README.md) for Markdown projects/blog posts and tools data, [Portfolio v4](portfolio/README.md) for the archived application, and [deployment instructions](docs/deployment.md) for GitHub Pages.
