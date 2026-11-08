---
title: "JATS Scholar"
subtitle: "Open research, easier to discover."
summary: "A research discovery platform for browsing publications, journals, and institutions, with structured article records and citation exports."
order: 5
categories: ["web"]
label: "RESEARCH DISCOVERY PLATFORM"
color: "cyan-soft"
technologies: ["Astro", "Svelte 5", "TypeScript", "Node.js", "MariaDB", "JATS XML"]
isPhoto: false
draft: false
link: "https://scholar.jatseditor.com"
images:
  - src: "images/projects/showcase/jats-scholar-home.webp"
    alt: "JATS Scholar homepage with publication search and the latest research articles."
    caption: "Public homepage captured at scholar.jatseditor.com."
  - src: "images/projects/showcase/jats-scholar-publications.webp"
    alt: "JATS Scholar publication catalog with search and filters."
    caption: "Public publication catalog."
---

## The idea

Structured publication metadata can make open research easier to find. JATS Scholar brings publication records, journals, and publishing institutions into a searchable public catalog.

## The implementation

- Server-rendered Astro pages serve the publication catalog, article details, browse pages, and sitemap.
- Node.js and MariaDB handle catalog data, migrations, and seeding; Svelte 5 provides administrative interactions.
- Manual JATS import supports upload and URL previews before publication.
- Administrative authentication includes sessions, CSRF protection, and login rate limiting.

## The public experience

Readers can search publications, browse journals and institutions, inspect article metadata, and export citations. The screenshots show the public JATS Scholar site. The repository also documents ongoing work on extended moderation and OJS ingestion workflows.
