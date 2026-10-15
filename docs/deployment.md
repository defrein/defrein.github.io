# GitHub Pages deployment

The single `.github/workflows/deploy.yml` builds both applications on pushes to `main` or a manual workflow run. It uploads only the generated root `dist/` directory. This follows GitHub's [custom Pages workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) model: build an artifact, then deploy that artifact through the `github-pages` environment.

## Public paths

- Wave is built with `PUBLIC_BASE_PATH=/` and placed at the site root.
- Portfolio v4 uses SvelteKit `paths.base='/portfolio'` and is staged at `/portfolio/`. Its original source remains in `portfolio/`, and its projects/CV use that base.
- The original Photobooth route is `/portfolio/photobooth/`. The preserved `/photobooth/` entry redirects there; JavaScript preserves query strings/fragments and a native meta refresh/link provides a fallback.
- `/v.4/` redirects to `/portfolio/`. `/wave/` redirects to `/`.
- Existing `/others/`, `/v.1/`, `/v.2/`, `/v.3/`, `/assets/`, and image URLs under `/projects/` remain available. Wave's project detail directories coexist with the original project image files.
- Wave supplies the root `404.html`, with native recovery links that point to the root site.

## First publish

1. Build and verify the complete artifact locally using the root README commands.
2. In repository **Settings → Pages**, use **GitHub Actions** as the publishing source.
3. Commit and push the reviewed changes to `main`, or run the deployment workflow after the changes reach that branch.
4. Confirm the Pages deployment job succeeds before checking the public domain.

A local build alone does not update the public site. Do not deploy `wave/dist/` or `portfolio/build/` separately; upload the combined root `dist/`.

## Maintenance

The root build requires Node.js 24 and installs application dependencies through `npm run setup`. It builds Wave and v4 before clearing and assembling the fixed root `dist/` output. File collisions fail the build rather than silently replacing a route. GitHub Pages output contains `.nojekyll`; an optional nonempty root `CNAME` is included only when a real custom domain is configured. The default `defrein.github.io` domain needs no CNAME file.

`npm test` starts an isolated HTTP server and checks root/v4 identity, routes, base-prefixed assets, the custom 404, compatibility entries, and output hygiene. `npm run test:browser` adds desktop/mobile checks with installed Google Chrome. Application-specific development and tests stay in their own folders. Wave's standalone development base remains `/wave/`; the root deployment command overrides that base automatically. Portfolio v4's standalone development path is `/portfolio/`.

The historical root build (`index.html` and `_app/`) is archived under `archive/generated-root/` and replaced by reproducible output from the applications. The older `index.html.backup` landing page is retained under `archive/landing/index.html`. Neither archive is staged into the deployment artifact. Empty root host-marker files are archived; `.nojekyll` is generated for each deployment. Shared resume source, supplied documents, original project images, and v1–v3 sources remain in place.
