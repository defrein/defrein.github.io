---
title: "Better JATS Viewer"
subtitle: "Structured XML. A better reading experience."
summary: "An interactive JATS XML reader with article navigation, contributor details, figures, tables, and CSL-based citation rendering."
order: 4
categories: ["web"]
label: "SCHOLARLY PUBLISHING + READER"
color: "purple-soft"
technologies: ["JavaScript", "JATS XML", "Tailwind CSS", "Citation.js", "CSL", "esbuild"]
isPhoto: false
draft: false
link: "https://github.com/openjournalteam/jats-viewer"
linkLabel: "View source"
images:
  - src: "images/projects/showcase/jats-viewer-article.webp"
    alt: "Better JATS Viewer displaying an example article with contextual navigation."
    caption: "Local reader with the repository’s bundled demonstration article."
  - src: "images/projects/showcase/jats-viewer-references.webp"
    alt: "Better JATS Viewer reference panel alongside the article."
    caption: "CSL reference rendering and article navigation."
---

## The idea

JATS XML provides rich structure for scientific articles. Better JATS Viewer turns that structure into a browser reading experience, built by the OJT team for JATS Editor and its OJS integration.

## The implementation

- Presents article metadata, authors, affiliations, sections, figures, and tables with contextual navigation.
- Converts JATS references to CSL-JSON and renders citations through Citation.js and citeproc, with APA, IEEE, and Vancouver styles.
- Supports translation based on tagged content and the reader's browser language.
- Uses esbuild code splitting to load the citation renderer separately from the main reader.

The screenshots show the repository's included sample XML, rather than a publisher's production article.

[View the OJT team repository](https://github.com/openjournalteam/jats-viewer).
