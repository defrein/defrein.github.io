# Missing-page recovery

Mode: Operate. Customize the existing 404 within Wave's established flat visual system; preserve shared identity, navigation, footer, type floor, and palette.

The user requested a customized 404 while viewing `dist/404.html`. Source lives in `src/pages/404.astro`; the build regenerates `dist/404.html`. Do not maintain generated HTML manually.

Explain that the page could not be found, provide a primary home link and separate native links to Projects, Blog, and Tools. Use the existing type, strong-purple emphasis, black text, white space, sparse rules, and small cyan accent. The static 404 graphic uses a square-tile zero with an empty center, echoing the portfolio's Rubik geometry; it is decorative and hidden from assistive technology. No image asset, animation, new dependency, history-based button, or redirect is required.

Desktop/tablet place copy and the graphic side by side, followed by three open recovery links. Mobile shows a compact graphic above the message and stacks the recovery links. Body and controls stay at least 1rem, and layout must fit at 320px and enlarged text. Recovery links use `withBase()` and work without JavaScript, including deeply nested missing URLs. The page opts out of search indexing through the shared layout's optional noindex metadata.

Verify actual 404 status/content in the static preview, direct 404.html access, nested missing paths, valid recovery destinations, keyboard focus, native content without JavaScript, responsive layout, and no change to normal page indexing. Hosting must serve the generated custom 404; deployment configuration is outside this local customization.
