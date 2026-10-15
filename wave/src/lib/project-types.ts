export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectCard {
  slug: string;
  title: string;
  summary: string;
  categories: ('ai' | 'web' | 'robotics')[];
  label: string;
  color: 'purple-soft' | 'cyan-soft';
  technologies: string[];
  isPhoto: boolean;
  image: ProjectImage;
}
