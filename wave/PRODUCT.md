# Wave portfolio

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro and Svelte, explicitly requested by the user. Static output for hosting under `/wave/` with an optional build-time base override.

## Users

A general audience exploring Wahni Adnani's work. AI, software engineering, and robotics receive balanced attention, as confirmed by the user.

## Product Purpose

Present real projects, professional experience, skills, education, and an accessible route to contact Wahni or download his existing CV.

## Capabilities and Constraints

English interface, confirmed by the user. Build directly in code. This is a separate local application in `wave`; other portfolio versions and the existing deployment stay intact.

Typography uses a 16px default base, explicitly requested by the user. Body text, controls, metadata, and captions retain a 1rem minimum on desktop and mobile, while respecting the visitor's browser text preference.

The hero uses a 3D Rubik animation of R U R′ U′ repeated six times per loop, explicitly requested by the user. It returns to solved after every six repetitions, with pause/restart controls and a reduced-motion alternative.

The blog uses local Markdown through Astro Content Collections. The first article explains this portfolio's Rubik implementation using its own code, without client-project material. A shared index, article template, and automatically generated table of contents support future posts. Drafts are excluded from public routes.

## Brand Commitments

Flat, simple, modern, engaging design inspired by https://www.arduino.cc/. Preserve the person's name, real project imagery, source resume facts, and contact details. The user subsequently chose a purple, cyan, white, and black palette based on the supplied code-highlight image; this palette supersedes the original teal colors. The user rejected the saturated rendition; preserve the flat, simple brief when applying these colors.

Use the supplied personal logo in black for the favicon, navbar, and footer. The original image is `../v.2/img/d8p.png`. The user explicitly limited this replacement to site identity; functional and social icons keep their existing symbols.

## Evidence on Hand

- `../portfolio/src/lib/data/resume.js`: personal details, experience, education, skills, seven projects.
- `../projects/`: original project screenshots and robotics photos.
- `../assets/documents/WAHNI_ADNANI_NOVEMBER_2025.pdf`: downloadable CV, retaining the supplied filename.

## Product Principles

- Let actual work demonstrate expertise.
- Keep all three practice areas easy to explore.
- Make content readable and contact actions straightforward.
- Keep the portfolio lightweight and functional without a backend.
