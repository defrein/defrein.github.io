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
    fontSize: "1.45rem"
    fontWeight: 750
    lineHeight: 1.13
    letterSpacing: "-.035em"
  body:
    fontFamily: "'Manrope Variable', sans-serif"
    fontSize: "1rem"
    lineHeight: 1.65
  project-body:
    fontFamily: "'Manrope Variable', sans-serif"
    fontSize: ".88rem"
    lineHeight: 1.75
  label:
    fontFamily: "'Manrope Variable', sans-serif"
    fontSize: ".78rem"
    fontWeight: 600
  project-meta:
    fontFamily: "'Manrope Variable', sans-serif"
    fontSize: ".6rem"
    fontWeight: 700
    letterSpacing: ".065em"
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

The hierarchy uses fluid display and section sizes rather than a single fixed scale ratio. Balanced headings and tight negative tracking create the strong voice; smaller summaries use a looser reading rhythm.

- **Display** is the home hero title. The mobile variant takes over at the small-screen breakpoint.
- **Headline** is the shared section-heading role. The about heading adjusts its leading to (1.16), and contact uses a narrower fluid size and leading of (1.2).
- **Project headline** is the detail-page title, limited to (17ch).
- **Title** is the project-gallery heading, reduced to (1.3rem) on mobile.
- **Body** is the base document style. Gallery summaries use the project-body role and a maximum of (60ch). About and project-story copy use a maximum of (65ch), with their locally defined reading sizes and leading.
- **Label** is the filter-control role. Project metadata uses a smaller, tracked label; the technology string removes that tracking and uses a lighter weight.

**The One Family Rule.** Use Manrope for interface text and editorial headings; hierarchy comes from size, weight, tracking, and spacing.

## Layout

The shared container is centered, capped at (1280px), and inset by the fluid gutter token on both sides. Section padding uses the section token. Standard layouts combine two columns, generous inter-column gaps, and open space rather than boxed text panels.

The home hero uses equal columns; about, skills, and experience use a (.9fr / 1.1fr) split; contact uses (1.3fr / 1fr). The gallery has two equal columns with gaps of (3.5rem vertically / 2rem horizontally). Detail pages place a narrow technology aside beside a larger story column using (1fr / 2fr) and a (6rem) gap. Images retain their own visual space: gallery image fields use an aspect ratio of (1.65), contain software screenshots, and cover robotics photography without inner padding.

At widths up to (700px), navigation becomes a disclosure; gallery, content grids, discipline links, and education become single-column layouts. Toolbars and section headings stack. The project-detail aside follows the story and gains a top rule. The header height changes from (68px) to (60px); the utility bar changes from (34px) to (30px). Anchor offsets remain (108px).

Between (701px) and (1000px), the hero and major content gaps narrow while the two-column structure remains. The Rubik figure is (440px) high on desktop, (470px) from (1440px), (380px) up to (1000px), and (350px) on mobile. Cubies reduce from (62px) to (54px) and (48px) at those smaller breakpoints, with (3px) gaps. These values preserve perspective and leave space for playback controls.

## Elevation & Depth

Interface surfaces remain flat, with no box shadows, gradients, or glass layers. Depth in the hero comes from the requested geometric CSS 3D Rubik object, perspective, visible faces, and a subtle blurred ground ellipse. This local object treatment does not apply to cards or navigation. The sticky header remains an opaque white field with a bottom rule.

Gallery imagery scales to (1.035) over (300ms), and filled-control color changes use (180ms). The Rubik uses sine easing for exact (580ms) quarter turns, holds (150ms) between moves, and rests solved for (1100ms) between loops. Animation stops offscreen or when the document is hidden. Reduced-motion preference starts the cube paused; explicit Play remains available. Other nonessential CSS transitions and smooth scrolling are disabled under reduced motion.

**The Flat Field Rule.** Preserve depth through color, line, and artifact overlap; do not add shadows or gradients to cards or controls.

## Shapes

Project image fields, artifact panels, and image action tiles are rectangular. Buttons and technology tags share the button radius; filter controls have the slightly larger filter radius. The current-role label uses the smallest radius. The availability dot is circular. The Rubik has small rounded sticker corners as part of the physical object; the interface and project-image fields retain their flat rectangular language.

Rules are generally (1px), including filter borders, tags, section separators, and header dividers. Filled buttons retain a black one-pixel border. Lucide line icons use strokes. The supplied personal logo is rendered in solid black with its original transparency and proportions.

## Components

### Buttons and text links

Filled buttons are compact rectangles with a black ground, white text, a minimum height of (48px), and (700) weight at (.82rem). The small navigation variant uses a (43px) minimum height. Hover uses deep purple with white text. The contact variant uses white and black and changes to cyan on hover. No pressed transform or disabled visual variant is implemented for these links.

Text links have a visible underline offset by (5px), an inline arrow or download icon, and a minimum height of (44px). Hover changes to strong purple. Keyboard focus uses the shared outline: (3px solid strong purple), offset by (5px). The neutral hero uses the shared purple focus, and the black contact section uses cyan focus. Native links retain their destination behavior.

### Navigation

The identity uses the user's supplied black logo in the header, footer, and favicon. The shared `public/brand/logo.svg` preserves the original PNG and alpha, with an SVG color matrix rendering its visible pixels black. The header logo is (64px) wide on desktop and (56px) on mobile, with automatic height and a (44px) minimum link target; the footer logo is (100px) wide. The favicon centers the same mark in a transparent square. Rebuild these assets with `node scripts/sync-brand.mjs`. Functional and social icons keep their original symbols. Desktop links are open, with generous spacing; hover adds a strong-purple underline. The header is sticky. At the mobile breakpoint, the toggle reveals a paper menu below it, reports its open state with `aria-expanded`, closes when a link is chosen, and closes on Escape while returning focus to the toggle. The toggle is disabled until the component mounts. No active-section treatment is implemented.

### Discipline filters

Unselected filter buttons have a transparent ground, muted text, and a line-colored border. Hover makes the text and border strong purple. The selected filter has a black ground, white text, and black border; `aria-pressed` exposes selection. Buttons are disabled until the gallery mounts, using the wait cursor without a separate faded style. The adjacent project count is a polite live status with tabular numerals. Small screens reduce filter padding and type size while retaining the (44px) minimum height.

### Tags

Skill and project-technology tags are small outlined labels with a tiny corner radius, no fill, and no interaction states. Skill tags use (.72rem) type and project-detail technology tags use (.7rem). The current-role badge is a separate pale-cyan-and-black status treatment; it is not an interactive filter.

### Project cards and covers

Gallery cards use an unboxed image, metadata, linked title, and muted summary. There is no outer border, corner rounding, shadow, or full-card click target. Both the image and title link to the project page. Image hover gently scales the artifact and changes its square arrow tile from white/black to strong-purple/white; title hover changes to strong purple. Images are lazy-loaded in the gallery. Detail-page covers use the same faint purple/cyan tint assignment with fluid padding for interfaces and edge-to-edge robotics images.

### Rubik hero

`RubiksCube.svelte` renders 26 cubies and 54 visible stickers using CSS perspective and matrix transforms, with no 3D library or downloaded model. The standard six sticker colors are local to the cube, not additions to the UI palette. Only the right or upper layer turns at each step. The sequence is **R U R? U?**, repeated exactly six times; all piece positions and orientations then return to solved before the next loop. Integer matrices track the physical state, so there is no reset jump.

A compact caption shows the current move, repetition (1?6), Play/Pause, and Restart. Controls have (44px) targets and the shared keyboard focus. A static solved cube is server-rendered. Motion preference, intersection visibility, and document visibility govern playback; animation-frame callbacks and listeners are cleaned up on unmount. Explicit playback overrides the initial reduced-motion pause.

### Contact actions and feedback

The white email link with black text is paired with a transparent white-text copy control on the black contact field. Hover underlines the copy label. Success changes the icon from copy to check and the label to “Copied!”, announces “Email copied to clipboard.”, and resets after (3000ms). Failure announces the available selection and email-link alternatives. The polite status paragraph reserves vertical space. This surface has no input fields or forms, and no input component is specified.

**The Visible State Rule.** Preserve the implemented focus outlines, selected filter contrast, and announced copy/filter feedback when reusing these controls.

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
