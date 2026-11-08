---
title: "ENEXRE Knowledge Graph"
subtitle: "From biomedical text to connected evidence."
summary: "A biomedical NLP research project connecting chemical–disease entity extraction, relation classification, and an interactive knowledge graph."
order: 2
categories: ["ai", "web"]
label: "BIOMEDICAL NLP + KNOWLEDGE GRAPH"
color: "purple-soft"
technologies: ["Python", "Flask", "PubMedBERT", "BC5CDR", "Neo4j"]
isPhoto: false
draft: false
link: "https://enexre.chew.my.id"
images:
  - src: "images/projects/showcase/enexre-graph.webp"
    alt: "Interactive ENEXRE graph showing chemical–disease relationships from built-in example abstracts."
    caption: "Local application capture with built-in demonstration abstracts."
  - src: "images/projects/showcase/enexre-library.webp"
    alt: "ENEXRE case library for exploring chemical–disease evidence."
    caption: "Case library from the repository graph data."
---

## The idea

Biomedical abstracts contain relationships that are difficult to explore as plain text. ENEXRE investigates chemical and disease entity recognition and Chemical-Induced Disease relation extraction on the BC5CDR dataset, using PubMedBERT and a graph representation of the results.

## The implementation

- Research scripts cover dataset validation, NER and relation-extraction training, pipeline evaluation, and graph export.
- Chemical and disease nodes connect through CID edges, with CSV exports and Neo4j import and validation queries.
- A Flask interface provides abstract analysis examples, connected and disconnected cases, and a case library for inspecting graph evidence.

## About the preview

The screenshots show the repository's local Flask application and included graph data. Its interactive abstract examples use the prototype's matching logic; they do not represent a live call to the trained PubMedBERT models.

[Explore the source on GitHub](https://github.com/defrein/enexre).
