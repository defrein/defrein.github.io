---
name: Wave — Wahni Adnani
description: A flat maker portfolio connecting intelligent software with the physical world.
colors:
  paper: "#fcfdfb"
  white: "#ffffff"
  petrol: "#173e41"
  teal: "#006b70"
  teal-hover: "#00545a"
  mint: "#d8eeeb"
  mint-light: "#edf5f1"
  orange: "#e99760"
  peach: "#f4dfcf"
  sand: "#e8e8d4"
  lavender: "#e6e4ef"
  yellow: "#f2e6b6"
  blue: "#dfeaf1"
  muted: "#52676a"
  line: "#d5e0dc"
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
    backgroundColor: "{colors.teal}"
    textColor: "{colors.white}"
    rounded: "{rounded.button}"
    padding: ".95rem 1.35rem"
  button-primary-hover:
    backgroundColor: "{colors.teal-hover}"
  button-small:
    backgroundColor: "{colors.teal}"
    textColor: "{colors.white}"
    rounded: "{rounded.button}"
    padding: ".65rem 1rem"
  button-light:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.petrol}"
    rounded: "{rounded.button}"
    padding: ".95rem 1.35rem"
  button-light-hover:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.petrol}"
  text-link:
    textColor: "{colors.petrol}"
  text-link-hover:
    textColor: "{colors.teal}"
  navigation:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.petrol}"
  filter:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    rounded: "{rounded.filter}"
    padding: ".7rem 1rem"
  filter-selected:
    backgroundColor: "{colors.petrol}"
    textColor: "{colors.white}"
  skill-tag:
    textColor: "{colors.petrol}"
    rounded: "{rounded.button}"
    padding: ".4rem .7rem"
  project-card:
    textColor: "{colors.petrol}"
  contact-copy:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    padding: ".6rem .2rem"
---

# Design System: Wave — Wahni Adnani

## Overview

**Creative North Star: "Useful things, made with curiosity."**

Wave is a modern, simple maker portfolio inspired by the user's Arduino reference. White and pale mint grounds, dark petrol text, teal actions, and real software and robotics imagery create an open, approachable presentation. The same visual language accommodates AI, software engineering, and robotics without assigning one discipline greater visual importance.

The material is flat: broad color fields, rectangular artifacts, sparse rules, and no shadows or gradients. Manrope provides both strong, tightly spaced headings and compact functional labels. Small arrow icons connect navigation, project exploration, and contact actions. The orange counterpoint is limited to the small decorative plus in the implemented hero.

**Key Characteristics:**

- Real project artifacts on quiet pastel fields.
- Bold Manrope headings with compact supporting labels.
- Flat rectangles, small control radii, and sparse one-pixel rules.
- Teal interaction states and visible keyboard focus.
- Open desktop grids that become a single reading column on mobile.

This document records the implementation in `src/styles/global.css`, `src/components/*.svelte`, `src/pages/index.astro`, and `src/pages/projects/[slug].astro`. Tokens above preserve the source values; `.impeccable/design.json` holds interaction, responsive, and preview extensions.

## Colors

The palette combines cool maker-workshop greens with gentle artifact backdrops. Frontmatter names match the existing CSS custom properties. The sidecar?s synthesized tonal ramps are panel previews, not additional CSS tokens.

### Primary

- **Teal** supplies primary buttons, inline emphasis, link hover, icons, selection, and the full contact field.
- **Deep Teal Hover** darkens filled teal buttons on hover.
- **Petrol** supplies the main text, identity, utility bar, selected filters, and robot caption field.

### Secondary

- **Mint** supplies the hero field, pale button hover, image grounds, and text against darker fields.
- **Light Mint** supplies the about section and footer.

### Tertiary

- **Orange** is the small hero plus accent.
- **Peach** and **Sand** frame the robotics project photographs.
- **Lavender**, **Yellow**, and **Blue** differentiate software and applied-AI project image grounds. These are artifact backdrops, not status meanings.

### Neutral

- **Paper** is the principal canvas, sticky navigation ground, and image action tile.
- **White** supplies artifact panels and text against teal or petrol.
- **Muted** supports summaries, dates, descriptions, and metadata.
- **Line** separates navigation, disciplines, skills, project continuations, and footer content.

**The Field Rule.** Use the named palette for large flat fields and sparse separators; the implemented system does not use gradients or decorative shadows.

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

Between (701px) and (1000px), the hero and major content gaps narrow while the two-column structure remains. The software artifact caption is hidden at all widths up to (1000px), preventing the overlapping robot artifact from occluding it. At widths from (1440px), the hero art grows from (440px) to (470px) high. These are observed responsive decisions for this implementation, not new universal device classes.

## Elevation & Depth

There are no box shadows, gradients, or translucent blur layers. Depth comes from contrasting color fields, one-pixel borders, real images, and the deliberate overlap of two slightly rotated hero artifacts. The sticky header remains an opaque paper field with a bottom rule.

Interactive image movement is restrained but present: gallery imagery scales to (1.035); hero artifacts reduce their rotation and rise by (3px). Those transforms use the source ease curve over (300ms). Filled-control color changes use (180ms). Reduced-motion preference removes animations and transitions and disables document-level smooth scrolling.

**The Flat Field Rule.** Preserve depth through color, line, and artifact overlap; do not add shadows or gradients to cards or controls.

## Shapes

Project image fields, artifact panels, and image action tiles are rectangular. Buttons and technology tags share the button radius; filter controls have the slightly larger filter radius. The current-role label uses the smallest radius. Circles are reserved for the small availability and artifact dots and the orange plus marker. These exceptions do not change the rectangular panel language.

Rules are generally (1px), including filter borders, tags, section separators, and header dividers. Filled buttons retain a transparent one-pixel border. Lucide line icons use strokes. The supplied personal logo is rendered in solid black with its original transparency and proportions.

## Components

### Buttons and text links

Filled buttons are compact, confident rectangles with the teal ground, white text, a minimum height of (48px), and (700) weight at (.82rem). The small navigation variant uses a (43px) minimum height. Hover darkens the ground; the light contact variant uses paper and petrol and changes to mint on hover. No pressed transform or disabled visual variant is implemented for these links.

Text links have a visible underline offset by (5px), an inline arrow or download icon, and a minimum height of (44px). Hover changes to teal. Keyboard focus uses the shared outline: (3px solid teal), offset by (5px). Inside the teal contact section, the outline changes to the observed warm focus color. Native links retain their destination behavior.

### Navigation

The identity uses the user's supplied black logo in the header, footer, and favicon. The shared `public/brand/logo.svg` preserves the original PNG and alpha, with an SVG color matrix rendering its visible pixels black. The header logo is (64px) wide on desktop and (56px) on mobile, with automatic height and a (44px) minimum link target; the footer logo is (100px) wide. The favicon centers the same mark in a transparent square. Rebuild these assets with `node scripts/sync-brand.mjs`. Functional and social icons keep their original symbols. Desktop links are open, with generous spacing; hover adds a teal underline. The header is sticky. At the mobile breakpoint, the toggle reveals a paper menu below it, reports its open state with `aria-expanded`, closes when a link is chosen, and closes on Escape while returning focus to the toggle. The toggle is disabled until the component mounts. No active-section treatment is implemented.

### Discipline filters

Unselected filter buttons have a transparent ground, muted text, and a line-colored border. Hover makes the text and border teal. The selected filter has a petrol ground, white text, and petrol border; `aria-pressed` exposes selection. Buttons are disabled until the gallery mounts, using the wait cursor without a separate faded style. The adjacent project count is a polite live status with tabular numerals. Small screens reduce filter padding and type size while retaining the (44px) minimum height.

### Tags

Skill and project-technology tags are small outlined labels with a tiny corner radius, no fill, and no interaction states. Skill tags use (.72rem) type and project-detail technology tags use (.7rem). The current-role badge is a separate pale-green status treatment; it is not an interactive filter.

### Project cards and covers

Gallery cards use an unboxed image, metadata, linked title, and muted summary. There is no outer border, corner rounding, shadow, or full-card click target. Both the image and title link to the project page. Image hover gently scales the artifact and changes its square arrow tile from paper/petrol to teal/white; title hover changes to teal. Images are lazy-loaded in the gallery. Detail-page covers use the same pastel assignment with fluid padding for interfaces and edge-to-edge robotics images.

### Hero artifact pair

The software artifact has a white frame, a small labeled bar, screenshot field, and caption; its default rotation is (-3deg). The robot artifact overlaps it with a petrol caption strip and default rotation of (4deg). Hover reduces the respective angles to (-1deg) and (2deg) with a slight lift. These are real linked project artifacts. The caption-hiding rule described in Layout belongs to this overlapping composition.

### Contact actions and feedback

The light email link is paired with a transparent white-text copy control. Hover underlines the copy label. Success changes the icon from copy to check and the label to “Copied!”, announces “Email copied to clipboard.”, and resets after (3000ms). Failure announces the available selection and email-link alternatives. The polite status paragraph reserves vertical space. This surface has no input fields or forms, and no input component is specified.

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
