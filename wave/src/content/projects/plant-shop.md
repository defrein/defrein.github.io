---
title: "Plant Shop Management"
subtitle: "A growing business, organized."
summary: "A public storefront and plant catalog backed by an operations dashboard for inventory, purchases, sales, customer memberships, and reporting."
order: 3
categories: ["web"]
label: "RETAIL OPERATIONS + DASHBOARD"
color: "cyan-soft"
technologies: ["PHP", "Laravel 11", "Filament 3", "MySQL", "Tailwind CSS"]
isPhoto: false
draft: false
images:
  - src: "images/projects/showcase/plant-storefront.webp"
    alt: "Redesigned Plant Shop homepage with a curated hero, catalog call to action, and service highlights."
    caption: "Redesigned public storefront from the redesign-and-catalog-photo branch."
  - src: "images/projects/showcase/plant-catalog.webp"
    alt: "Redesigned plant catalog with species photographs, prices, stock, categories, ratings, and care-level filters."
    caption: "Customer-facing catalog with real species photographs and expanded filtering."
  - src: "images/projects/showcase/plant-detail.webp"
    alt: "Plant detail page for Monstera Deliciosa with a species photograph, price, stock, care details, and customer rating."
    caption: "Product detail view with plant care information and review summary."
  - src: "images/projects/showcase/plant-about.webp"
    alt: "Plant Shop about page with a seedling photograph, company story, and experience callout."
    caption: "Redesigned about page presenting the shop's story and service promise."
---

## The idea

Running a plant shop involves more than maintaining a product catalog. Stock, suppliers, customer memberships, transactions, and plant care information need to work together.

## The implementation

- Laravel and Filament resources organize plants, categories, suppliers, purchases, customers, transactions, reviews, and care tips.
- Purchase and sale detail models update stock, while customer membership logic tracks points and tiers.
- Dashboard widgets summarize revenue, recent transactions, top-selling plants, customer membership, and low-stock alerts.
- Role and permission management controls access to the administration interface.
- A public storefront introduces the shop, while the catalog presents plant photographs, pricing, stock, and care information.

## About the preview

These captures use an isolated local database populated by the repository's seeders. They show commit `aadff1b` from the `redesign-and-catalog-photo` branch (12 November 2026). All displayed records are demonstration data. The catalog uses the species photographs configured by that branch; the source repository is private.
