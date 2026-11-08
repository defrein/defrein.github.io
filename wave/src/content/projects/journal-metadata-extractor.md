---
title: "Journal Metadata Extractor"
subtitle: "From PDF pages to structured metadata."
summary: "A Flask application that extracts scientific article metadata from PDFs through layout analysis, rules, and optional CRF and spaCy enrichment."
order: 6
categories: ["ai", "web"]
label: "DOCUMENT PROCESSING + NLP"
color: "purple-soft"
technologies: ["Python", "Flask", "PyMuPDF", "CRF", "spaCy", "Tailwind CSS"]
isPhoto: false
draft: false
link: "https://github.com/defrein/metadata_extractor"
linkLabel: "View source"
images:
  - src: "images/projects/showcase/metadata-upload.webp"
    alt: "Journal Metadata Extractor upload interface showing its hybrid extraction pipeline."
    caption: "Local application capture."
  - src: "images/projects/showcase/metadata-result.webp"
    alt: "Journal Metadata Extractor results for a synthetic demonstration PDF."
    caption: "Extraction from a synthetic sample PDF; optional CRF and spaCy models were not loaded for this capture."
---

## The idea

Scientific article metadata is often trapped in PDF layouts. This application turns a PDF upload into a structured record that can be inspected in the browser or downloaded as JSON.

## The implementation

- PyMuPDF reads layout information such as font size, position, and emphasis.
- Regex rules identify DOI, ISSN, dates, email, ORCID, and other structured fields.
- Optional CRF sequence labeling and spaCy NER enrich title, author, affiliation, and entity extraction, with heuristic fallbacks when models are unavailable.
- A Flask upload interface, results page, JSON download, and extraction API expose the pipeline.

## About the preview

The result screenshot was produced from a synthetic demonstration article. This local capture uses the application's documented heuristic fallback without the optional trained CRF or spaCy models; extracted fields remain subject to review.

[Explore the source on GitHub](https://github.com/defrein/metadata_extractor).
