import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    demo: z.enum(['rubik']).optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    summary: z.string(),
    order: z.number().default(0),
    categories: z.array(z.enum(['ai', 'web', 'robotics'])).min(1),
    label: z.string(),
    color: z.enum(['purple-soft', 'cyan-soft']).default('purple-soft'),
    technologies: z.array(z.string()),
    isPhoto: z.boolean().default(false),
    draft: z.boolean().default(false),
    link: z.url().optional(),
    images: z.array(z.object({
      src: z.string().min(1),
      alt: z.string().min(1),
      caption: z.string().optional(),
    })).min(1),
  }),
});

export const collections = { blog, projects };
