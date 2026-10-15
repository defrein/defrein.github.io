---
name: Wave — Wahni Adnani
description: A flat maker portfolio connecting intelligent software with the physical world.
colors:
  paper: "#ffffff"
  white: "#ffffff"
  ink: "#000000"
  purple: "#d780ff"
  purple-strong: "#7424a3"
  cyan: "#00f5e9"
  surface-purple: "#f2eff8"
  surface-cyan: "#f0f7f7"
  surface-soft: "#f7f7fa"
  muted: "#5c5965"
  line: "#e5e3e9"
  line-dark: "#45424a"
typography:
  display:
    fontFamily: "'Manrope Variable', sans-serif"
    fontSize: "clamp(3rem, 5.6vw, 5.4rem)"
    fontWeight: 800
    lineHeight: 1.035
    letterSpacing: "-.04em"
  display-mobile:
    fontFamily: "'Manrope Variable', sans-serif"
    fontSize: "clamp(2.9rem, 11vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 1.035
    letterSpacing: "-.04em"
  headline:
    fontFamily: "'Manrope Variable', sans-serif"
    fontSize: "clamp(2rem, 3.6vw, 3.35rem)"
    fontWeight: 750
    lineHeight: 1.13
    letterSpacing: "-.04em"
  project-headline:
    fontFamily: "'Manrope Variable', sans-serif"
    fontSize: "clamp(2.4rem, 5vw, 4.8rem)"
    fontWeight: 750
    lineHeight: 1.13
    letterSpacing: "-.04em"
  title:
    fontFamily: "'Manrope Variable', sans-serif"
    fontSize: "1.5rem"
    fontWeight: 750
    lineHeight: 1.25
    letterSpacing: "-.025em"
  body:
    fontFamily: "'Manrope Variable', sans-serif"
    fontSize: "1rem"
    lineHeight: 1.7
  lead:
    fontFamily: "'Manrope Variable', sans-serif"
    fontSize: "1.125rem"
    lineHeight: 1.75
  subtitle:
    fontFamily: "'Manrope Variable', sans-serif"
    fontSize: "1.25rem"
    fontWeight: 650
    lineHeight: 1.35
  project-body:
    fontFamily: "'Manrope Variable', sans-serif"
    fontSize: "1rem"
    lineHeight: 1.75
  label:
    fontFamily: "'Manrope Variable', sans-serif"
    fontSize: "1rem"
    fontWeight: 600
  project-meta:
    fontFamily: "'Manrope Variable', sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.5
rounded:
  button: "3px"
  filter: "4px"
  status-label: "2px"
  circle: "50%"
spacing:
  gutter: "clamp(1.25rem, 5.5vw, 5.5rem)"
  section: "clamp(4rem, 7vw, 7rem)"
  half: ".5rem"
  one: "1rem"
  one-and-half: "1.5rem"
  two: "2rem"
  three: "3rem"
  five: "5rem"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.button}"
    padding: ".95rem 1.35rem"
  button-primary-hover:
    backgroundColor: "{colors.purple-strong}"
    textColor: "{colors.white}"
  button-small:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.button}"
    padding: ".65rem 1rem"
  button-light:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    padding: ".95rem 1.35rem"
  button-light-hover:
    backgroundColor: "{colors.cyan}"
    textColor: "{colors.ink}"
  text-link:
    textColor: "{colors.ink}"
  text-link-hover:
    textColor: "{colors.purple-strong}"
  navigation:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  filter:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    rounded: "{rounded.filter}"
    padding: ".7rem 1rem"
  filter-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  skill-tag:
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    padding: ".4rem .7rem"
  project-card:
    textColor: "{colors.ink}"
  tool-link:
    textColor: "{colors.ink}"
    padding: "2rem 0 2.5rem"
  tool-link-hover:
    textColor: "{colors.purple-strong}"
  pagination-control:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    padding: ".5rem .75rem"
  pagination-control-current:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  pagination-control-disabled:
    textColor: "{colors.muted}"
  slider-control:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    padding: ".5rem"
  slider-control-current:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  slider-control-disabled:
    textColor: "{colors.muted}"
  contact-copy:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    padding: ".6rem .2rem"
---

# Design System: Wave — Wahni Adnani

## Overview

**Creative North Star: "Useful things, made with curiosity."**

Wave is a modern, simple maker portfolio with the flat composition of the user's Arduino reference and a restrained purple, cyan, white, and black palette. White and near-white reading surfaces carry black typography; a single purple word emphasizes the hero. The hero uses a small CSS 3D Rubik animation; actual software and robotics imagery leads the project gallery. The same visual language accommodates AI, software engineering, and robotics without assigning one discipline greater visual importance.

The material is flat: broad color fields, rectangular artifacts, sparse rules, and no shadows or gradients. Manrope provides both strong, tightly spaced headings and compact functional labels. Small arrow icons connect navigation, project exploration, and contact actions. Cyan is limited to the availability dot, feedback, and transient contact hover. It does not fill large regions or sit behind headlines.

**Key Characteristics:**

- Real project artifacts on near-neutral fields with faint purple/cyan tints.
- Bold Manrope headings with compact supporting labels.
- Flat rectangles, small control radii, and sparse one-pixel rules.
- Black actions, deep-purple type and hover, small cyan accents, and visible keyboard focus.
- Open desktop grids that become a single reading column on mobile.

This document records the implementation in `src/styles/global.css`, `src/components/*.svelte`, `src/pages/index.astro`, and `src/pages/projects/[slug].astro`. Tokens above preserve the source values; `.impeccable/design.json` holds interaction, responsive, and preview extensions.

## Colors

Use purple and cyan as accents within a predominantly white-and-black composition. The user rejected the preceding saturated-purple hero with the large cyan headline block. Current fields are near-white, image backdrops are only faintly tinted, and bright color occupies small details.

### Primary

- **Ink** is black: primary text, buttons, selected filters, the utility bar, and the contact field.
- **Purple Strong** emphasizes the final hero word, selected heading phrases, links, hover text, and focus on light surfaces. Primary buttons use this darker purple with white text on hover.
- **Purple** retains the original bright reference swatch as a brand primitive; the current page does not use it as a large field.
- **Cyan** is reserved for the small availability dot, clipboard feedback, contact focus, and contact-action hover.

### Secondary

- **Surface Purple** and **Surface Cyan** are near-neutral tints behind project screenshots and compact status details.
- **Surface Soft** is the light neutral hero, about, and experience field.

### Neutral

- **Paper** and **White** provide pure-white reading surfaces, header/footer, artifact frames, and text against black.
- **Muted** is a neutral supporting text color.
- **Line** and **Line Dark** are quiet separators on light and black fields respectively.

**The Field Rule.** Neutral surfaces lead. Keep purple/cyan as measured accents, preserve readable text contrast, and let real project imagery lead the page. No saturated full-width hero, large text highlight rectangle, gradients, or decorative shadows.

## Typography

**Display and body font:** Manrope Variable, with a sans-serif fallback. `Layout.astro` imports the self-hosted `@fontsource-variable/manrope` package. There is no separate mono or serif family.

The default root size is 16px (`100%`, preserving the visitor's browser font preference). Ordinary text, navigation, buttons, filters, metadata, tags, captions, and footer text use the shared `--text-body: 1rem` floor on every device. Lead copy uses `--text-lead: 1.125rem` (18px); subheadings use `--text-subtitle: 1.25rem` (20px); card and role titles use `--text-title: 1.5rem` (24px). Fluid display and section sizes retain the existing identity. Hierarchy comes from weight, spacing, and tone as well as size.

- **Display** is the home hero title. The mobile variant takes over at the small-screen breakpoint.
- **Headline** is the shared section-heading role. The about heading adjusts its leading to (1.16), and contact uses a narrower fluid size and leading of (1.2).
- **Project headline** is the detail-page title, limited to (17ch).
- **Title** is the project-gallery and experience-role heading, retained at (1.5rem) on mobile.
- **Body** is the base document style with (1.7) leading. Gallery summaries use the project-body role and a maximum of (60ch). About and project-story copy use a maximum of (65ch) with (1.75) leading.
- **Label** is the filter-control role at the same 16px floor. Project metadata uses (600) weight and (1.5) leading; technology text uses (500) weight. Metadata and toolbars wrap rather than shrinking on narrow screens.

**The One Family Rule.** Use Manrope for interface text and editorial headings; hierarchy comes from size, weight, tracking, and spacing.

## Layout

The shared container is centered, capped at (1280px), and inset by the fluid gutter token on both sides. Section padding uses the section token. Standard layouts combine two columns, generous inter-column gaps, and open space rather than boxed text panels.

The home hero uses equal columns; about, skills, and experience use a (.9fr / 1.1fr) split; contact uses (1.3fr / 1fr). The project gallery has three equal columns above (1100px), two columns from (701px) through (1100px), and one column up to (700px). Hydrated pages contain six projects on desktop and tablet and five on mobile, with only the remaining items on the final page. Gallery gaps are (3.5rem vertically / 2rem horizontally), reduced to (2.5rem) between mobile cards. Detail pages place a narrow technology aside beside a larger story column using (1fr / 2fr) and a (6rem) gap. Images retain their own visual space: gallery image fields use an aspect ratio of (1.65), contain software screenshots, and cover robotics photography without inner padding.

At widths up to (700px), navigation becomes a disclosure; gallery, content grids, discipline links, and education become single-column layouts. Toolbars and section headings stack. The project-detail aside follows the story and gains a top rule. The header height changes from (68px) to (60px); the utility bar has a (36px) minimum height with vertical padding. Anchor offsets remain (108px).

Between (701px) and (1000px), the hero and major content gaps narrow while those content layouts remain in two columns; the gallery uses its separate (1100px) breakpoint. The Rubik figure has a minimum height of (440px) on desktop, (470px) from (1440px), (380px) up to (1000px), and (350px) on mobile. Its height grows with the caption; the toolbar wraps as text is enlarged. Cubies reduce from (62px) to (54px) and (48px) at those smaller breakpoints, with (3px) gaps. These values preserve perspective and leave space for playback controls.

Blog listings contain five articles per static page at every viewport. Their pager follows the article rows and preserves the open reading layout. Project detail image tracks use rectangular (16:9) frames, with fluid inner padding for software interfaces and edge-to-edge photography when the entry enables its photo treatment.

## Elevation & Depth

Interface surfaces remain flat, with no box shadows, gradients, or glass layers. Depth in the hero comes from the requested geometric CSS 3D Rubik object, perspective, visible faces, and a subtle blurred ground ellipse. This local object treatment does not apply to cards or navigation. The sticky header remains an opaque white field with a bottom rule.

Gallery imagery scales to (1.035) over (300ms), and filled-control color changes use (180ms). The Rubik uses sine easing for exact (580ms) quarter turns, holds (150ms) between moves, and rests solved for (1100ms) between loops. Animation stops offscreen or when the document is hidden. Reduced-motion preference starts the cube paused; explicit Play remains available. Other nonessential CSS transitions and smooth scrolling are disabled under reduced motion.

**The Flat Field Rule.** Preserve depth through color, line, and artifact overlap; do not add shadows or gradients to cards or controls.

## Shapes

Project image fields, artifact panels, and image action tiles are rectangular. Buttons and technology tags share the button radius; filter controls have the slightly larger filter radius. The current-role label uses the smallest radius. The availability dot is circular. The Rubik has small rounded sticker corners as part of the physical object; the interface and project-image fields retain their flat rectangular language.

Rules are generally (1px), including filter borders, tags, section separators, and header dividers. Filled buttons retain a black one-pixel border. Lucide line icons use strokes. The supplied personal logo is rendered in solid black with its original transparency and proportions.

## Components

### Buttons and text links

Filled buttons are compact rectangles with a black ground, white text, a minimum height of (48px), and (700) weight at (1rem), with (1.5) leading. The small navigation variant uses a (43px) minimum height and grows with its content. Hover uses deep purple with white text. The contact variant uses white and black and changes to cyan on hover. No pressed transform or disabled visual variant is implemented for these links.

Text links have a visible underline offset by (5px), an inline arrow or download icon, and a minimum height of (44px). Hover changes to strong purple. Keyboard focus uses the shared outline: (3px solid strong purple), offset by (5px). The neutral hero uses the shared purple focus, and the black contact section uses cyan focus. Native links retain their destination behavior.

### Navigation

The identity uses the user's supplied logo in black for the header and footer, and white for the browser-tab favicon. The shared `public/brand/logo.svg` preserves the original PNG and alpha, with an SVG color matrix rendering its visible pixels black. The header logo is (64px) wide on desktop and (56px) on mobile, with automatic height and a (44px) minimum link target; the footer logo is (100px) wide. The favicon centers the same mark in a transparent square and applies a white color matrix, independently of the black page logo. Rebuild these assets with `node scripts/sync-brand.mjs`. Functional and social icons keep their original symbols. Desktop links are open, with generous spacing; hover adds a strong-purple underline. The header is sticky. At the mobile breakpoint, the toggle reveals a paper menu below it, reports its open state with `aria-expanded`, closes when a link is chosen, and closes on Escape while returning focus to the toggle. The toggle is disabled until the component mounts. Tools is a native link to `/wave/tools/`; on that route it uses a strong-purple underline and `aria-current="page"`. Between (701px) and (1000px), navigation gaps narrow to (1.2rem) and the header gap to (1.25rem) to accommodate the extra entry.

### Tools directory

Tools entries are open, image-free cells separated by a top rule. Each cell is one full-card native link containing a (30px) Lucide line icon, a muted (22px) arrow, a title at the existing title size, and muted body copy. Hover turns the icon, title, and arrow strong purple and underlines the title; keyboard focus uses the shared outline and purple treatment. No fill, radius, shadow, nested action, or additional image is introduced.

The directory uses three columns above (1100px), two from (701px) through (1100px), and one up to (700px), with (2rem) column gaps. Link padding is (2rem 0 2.5rem), reduced to (1.75rem 0 2rem) on mobile. Entries render statically from `src/data/tools.ts` and work without JavaScript. Preserve each destination's domain-root path and casing rather than applying Wave's base prefix.

### Discipline filters

Unselected filter buttons have a transparent ground, muted text, and a line-colored border. Hover makes the text and border strong purple. The selected filter has a black ground, white text, and black border; `aria-pressed` exposes selection. Buttons are disabled until the gallery mounts, using the wait cursor without a separate faded style. The adjacent project count uses tabular numerals; the pager announces the visible range as a polite live status. Choosing a discipline resets pagination to page one. Small screens reduce filter padding while keeping (1rem) type and the (44px) minimum height.

### Tags

Skill and project-technology tags are outlined labels with a tiny corner radius, no fill, and no interaction states. Both use (1rem) type and wrap when space is limited. The current-role badge uses the same text floor with a separate pale-cyan-and-black status treatment; it is not an interactive filter.

### Project cards and covers

Gallery cards use an unboxed image, metadata, linked title, and muted summary. There is no outer border, corner rounding, shadow, or full-card click target. Both the image and title link to the project page. Image hover gently scales the artifact and changes its square arrow tile from white/black to strong-purple/white; title hover changes to strong purple. Images are lazy-loaded in the gallery. The first image in each Markdown entry supplies the gallery thumbnail. Detail image tracks retain the same faint purple/cyan tint assignment, with fluid padding for interfaces and edge-to-edge photo treatment.

### Pagination

Project and blog pagers share flat outlined controls, a one-pixel line border, the button radius, and minimum (44px) width and height. Text remains at the body size. Hover makes the border and text strong purple; the current page uses black with white text. Disabled boundaries use muted text, a line-colored border, and the default cursor. Keyboard focus retains the shared purple outline. A quiet tabular range label sits opposite the controls; the layout stacks up to (700px), and control rows wrap.

Project pagination uses buttons after hydration. The selected discipline and page are restored from `discipline` and `projectPage` query parameters; filter changes return to page one, browser history restores the selection, and a page-size change retains the formerly first visible item within its new page. Page selection scrolls to the work section and focuses the results region. Before hydration and without JavaScript, all non-draft project links remain visible and the pager is absent.

Blog pagination uses native links: page one is `/wave/blog/`, and subsequent pages use `/wave/blog/page/<number>/`. The current link exposes `aria-current="page"`; unavailable previous/next actions are non-link elements with `aria-disabled="true"`. These static pages work without JavaScript.

### Project image slider

The image track uses native horizontal scrolling with mandatory snap alignment. Images are full-width figures; optional captions use muted body text. Multiple images add a wrapping toolbar below the track, with a polite image-count status, previous/next arrows, and numbered buttons. Controls use the same flat border, body size, button radius, selected black/white state, strong-purple hover, visible keyboard focus, and (44px) minimum targets as the pager.

Previous and next actions stop at the boundaries and are disabled there. The focused track supports Left/Right, Home, and End; numbered buttons select directly, touch scrolling updates the selected number, and resize preserves the current image. Programmatic selection is immediate. There is no autoplay. A single image has no extra controls or focusable track. Without JavaScript, the native image scroller remains available while the toolbar is absent. Each of the seven supplied projects currently contains one image; multi-image states are verified with an isolated test fixture rather than invented project assets.

### Rubik hero

`RubiksCube.svelte` renders 26 cubies and 54 visible stickers using CSS perspective and matrix transforms, with no 3D library or downloaded model. The standard six sticker colors are local to the cube, not additions to the UI palette. Only the right or upper layer turns at each step. The sequence is **R U R? U?**, repeated exactly six times; all piece positions and orientations then return to solved before the next loop. Integer matrices track the physical state, so there is no reset jump.

A compact caption shows the current move, repetition (1?6), Play/Pause, and Restart. Controls have (44px) targets and the shared keyboard focus. A static solved cube is server-rendered. Motion preference, intersection visibility, and document visibility govern playback; animation-frame callbacks and listeners are cleaned up on unmount. Explicit playback overrides the initial reduced-motion pause.

### Contact actions and feedback

The white email link with black text is paired with a transparent white-text copy control on the black contact field. Hover underlines the copy label. Success changes the icon from copy to check and the label to “Copied!”, announces “Email copied to clipboard.”, and resets after (3000ms). Failure announces the available selection and email-link alternatives. The polite status paragraph reserves vertical space. This surface has no input fields or forms, and no input component is specified.

**The Visible State Rule.** Preserve the implemented focus outlines, selected filter/page/image contrast, and announced copy, project-range, and image-count feedback when reusing these controls.

## Do's and Don'ts

### Do:

- **Do** use the source palette and self-hosted Manrope family.
- **Do** place real screenshots and robotics photos on the established flat artifact fields.
- **Do** keep textual cards open and separate sections with sparse one-pixel rules.
- **Do** retain visible keyboard focus, semantic links and buttons, live feedback, and reduced-motion support.
- **Do** allow filters, tags, long email addresses, and content columns to wrap at narrow widths.

### Don't:

- **Don't** add gradients, decorative shadows, or glass effects to this flat visual system.
- **Don't** turn rectangular project artifacts into rounded floating cards.
- **Don't** use the quiet artifact-backdrop colors as invented semantic status colors.
- **Don't** replace real project imagery with generic illustrations or invented application screenshots.
- **Don't** make essential content depend on an entrance animation.
