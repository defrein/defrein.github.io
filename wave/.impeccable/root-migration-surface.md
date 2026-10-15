# Root publication and Portfolio v4 archive

Mode: Operate for wayfinding; preserve the existing Wave and legacy portfolio visual systems.

The user requested Wave as the default at `https://defrein.github.io/`, with the existing SvelteKit source in `../portfolio` preserved at `/portfolio/` as Portfolio v4, and cleanup of repository-root build clutter.

The repository root build assembles one `../dist/` artifact. Wave builds with `/`; its standalone development base remains `/wave/`. Portfolio v4 builds with its own `/portfolio` SvelteKit base and retains its presentation, content, hydration, image assets, and CV. The Tools Portfolio Archive gains one entry for v4 using the existing item component, native new-tab behavior, icon, and responsive grid. No visual-world change is requested.

Preserve v1–v3, tools, and root shared asset URLs. The existing `/photobooth/` entry resolves through a compatibility document to `/portfolio/photobooth/`; its route is part of the original SvelteKit application. The optional `/v.4/` alias points to `/portfolio/`, and `/wave/` points to `/`. Root custom 404 comes from Wave with root recovery links.

Clean up generated root HTML/bundles only after the assembled site is verified. Retain the historical backup under `../archive/landing/`. Keep original app sources, supplied documents/images, and earlier portfolio sources in place. Use allowlisted staging to exclude application source, dependencies, and caches. Document GitHub Actions artifact publishing; a local build does not mean the public site has been deployed.
