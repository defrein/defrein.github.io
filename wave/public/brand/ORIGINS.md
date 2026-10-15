# Logo source

The site logo and favicon use the owner's supplied image, already present at `v.2/img/d8p.png` in the repository root.

`scripts/sync-brand.mjs` embeds the original PNG, preserves its alpha, removes only transparent display padding with an SVG viewBox, and renders the visible shape in pure black using an SVG color matrix. The original raster file is not modified. No generated logo or substitute shape is used.

The same logo is used for navbar, footer, and favicon. Functional and social icons are outside this replacement, as confirmed by the user.
