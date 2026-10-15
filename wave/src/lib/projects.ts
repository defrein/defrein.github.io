import { getCollection, type CollectionEntry } from 'astro:content';
import type { ProjectCard } from './project-types';

export async function getProjects() {
  const projects = await getCollection('projects', ({ data }) => !data.draft);
  return projects.sort((a, b) => a.data.order - b.data.order || a.id.localeCompare(b.id));
}

export function projectCards(projects: CollectionEntry<'projects'>[]): ProjectCard[] {
  return projects.map(({ id, data }) => ({
    slug: id, title: data.title, summary: data.summary, categories: data.categories,
    label: data.label, color: data.color, technologies: data.technologies,
    isPhoto: data.isPhoto, image: data.images[0],
  }));
}
