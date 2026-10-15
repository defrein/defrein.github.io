// Source of truth: the original portfolio. Keep shared resume facts in one place.
import { resumeData } from '../../../portfolio/src/lib/data/resume.js';

export const resume = resumeData;
export const personal = resume.personal;
export const cvPath = 'documents/WAHNI_ADNANI_NOVEMBER_2025.pdf';

export type Category = 'all' | 'ai' | 'web' | 'robotics';
export const categories: { id: Category; label: string }[] = [
  { id: 'all', label: 'All work' },
  { id: 'ai', label: 'AI & Machine Learning' },
  { id: 'web', label: 'Web & Software' },
  { id: 'robotics', label: 'Robotics & IoT' },
];

export const skillGroups = [
  { title: 'Intelligent systems', description: 'Making sense of data, documents, and the world around us.', skills: resume.skills.aiml },
  { title: 'Software that connects', description: 'From the interface to the API and the database behind it.', skills: [...resume.skills.languages, ...resume.skills.frameworks, 'MySQL', 'REST APIs', 'Git'] },
  { title: 'Code in the physical world', description: 'Bringing hardware, sensors, and software together.', skills: [...resume.skills.robotics, 'OpenCV', 'C++', 'Autonomous Navigation'] },
];
