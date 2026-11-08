---
title: "DeffRenn — Content Publishing Platform"
subtitle: "A home for stories and the people who publish them."
summary: "A Laravel publishing platform combining a themed reading experience with role-based content management, article engagement, and application caching."
order: 9
categories: ["web"]
label: "PUBLISHING PLATFORM + CONTENT OPERATIONS"
color: "cyan-soft"
technologies: ["PHP", "Laravel 12", "Filament 3", "Livewire", "Tailwind CSS", "MySQL"]
isPhoto: false
draft: false
images:
  - src: "images/projects/showcase/deffrenn-home.webp"
    alt: "DeffRenn homepage with themed featured articles and recent posts."
    caption: "Local application with seed articles and illustrative demo covers."
  - src: "images/projects/showcase/deffrenn-admin.webp"
    alt: "DeffRenn administrative dashboard with publishing statistics and content tools."
    caption: "Administration view using the repository seed data."
---

## The idea

DeffRenn combines a public reading experience with tools for the people managing a publication. Its visual identity, author roles, and content workflows form a broader publishing platform.

## The implementation

- A public homepage, article listing, and article detail pages with light and dark themes.
- Filament resources for posts, categories, comments, and users.
- Role and permission management for publishing access.
- Livewire components for comments, likes, and view tracking.
- A cache service and cache maintenance commands for article lists and related application data.

## The preview

The captures show a local installation with the repository's seed articles and demonstration cover illustrations. The source repository is private. Framework details follow the inspected source and dependency manifest, which uses Laravel 12.
