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
  - src: "images/projects/showcase/plant-dashboard.webp"
    alt: "Plant Shop Management dashboard with revenue charts and inventory indicators."
    caption: "Local dashboard using the repository seed data, from commit 65028d1."
  - src: "images/projects/showcase/plant-inventory.webp"
    alt: "Plant Shop Management inventory with loaded plant photographs, categories, stock, and care levels."
    caption: "Plant inventory with demonstration records and representative plant photographs."
  - src: "images/projects/showcase/plant-storefront.webp"
    alt: "Public Plant Shop homepage with a peace lily photograph, catalog link, and shop services."
    caption: "Public storefront introducing the shop and its plant collection."
  - src: "images/projects/showcase/plant-catalog.webp"
    alt: "Public plant catalog with product photographs, prices, stock, categories, and care-level filters."
    caption: "Customer-facing catalog with plant photographs, product information, and filter controls."
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

These captures use an isolated local database populated by the repository's seeders. They show the latest inspected commit, `65028d1` (8 November 2026), including its updated menu seeder. All displayed records are demonstration data. Representative stock plant photographs were added to the local demo, including the homepage hero; they do not identify every listed cultivar. The source repository is private.
