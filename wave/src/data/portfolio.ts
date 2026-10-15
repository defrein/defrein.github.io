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

const editorial = [
  {
    slug: 'jats-editor',
    title: 'JATS Editor',
    subtitle: 'Less formatting. More publishing.',
    summary: 'Making scientific publishing simpler with an intelligent platform for creating, editing, and converting JATS/XML documents.',
    categories: ['ai', 'web'],
    label: 'AI + WEB PLATFORM',
    color: 'mint',
    context: 'Scientific publishers need structured, publication-ready XML. JATS Editor brings document editing, conversion, and publication workflows into one platform.',
    contributions: [
      'Built the platform for creating and editing JATS/XML files for scientific publications.',
      'Designed AI services for document conversion and automated processing.',
      'Integrated machine learning, NLP, and large language models into publication workflows.',
    ],
  },
  {
    slug: 'autonomous-robot-2024',
    title: 'Autonomous Robot',
    subtitle: 'A little vision. A lot of precision.',
    summary: 'An autonomous robot built to pick up colored balls and place them into silos for the Abu Robocon 2024 challenge.',
    categories: ['robotics', 'ai'],
    label: 'ROBOTICS + COMPUTER VISION',
    color: 'peach',
    context: 'The Abu Robocon 2024 challenge asks a robot to navigate a competition field, collect balls of specific colors, and place them into the correct silos.',
    contributions: [
      'Worked on autonomous navigation for the competition environment.',
      'Used Raspberry Pi, Python, and OpenCV in the robotics stack.',
      'Combined computer vision and machine learning with physical robot behavior.',
    ],
  },
  {
    slug: 'rescue-robot-2023',
    title: 'Rescue Robot',
    subtitle: 'Engineering for the real world.',
    summary: 'Sensor-driven navigation for a robot simulating rescue missions in earthquake and landslide scenarios at KRI 2023.',
    categories: ['robotics'],
    label: 'ROBOTICS + AUTONOMOUS NAVIGATION',
    color: 'sand',
    context: 'This KRI National 2023 project simulates rescue missions following earthquakes and landslides, with obstacle courses and multiple physical tasks.',
    contributions: [
      'Engineered autonomous navigation using compass and distance sensors.',
      'Developed custom algorithms for complex obstacle courses.',
      'Integrated sensor input and multi-stage task execution with Arduino and C++.',
    ],
  },
  {
    slug: 'digital-printing',
    title: 'Digital Printing Platform',
    subtitle: 'From order to delivery, connected.',
    summary: 'A web platform that connects printing orders, job tracking, and real-time status updates in one clear workflow.',
    categories: ['web'],
    label: 'WEB APPLICATION',
    color: 'lavender',
    context: 'A printing business needs a clear view of incoming orders and production progress. This platform brings order management and employee access into one web application.',
    contributions: [
      'Implemented order management and detailed print job tracking.',
      'Created real-time order status updates and secure employee access.',
      'Designed interfaces for daily printing operations and customer engagement.',
    ],
  },
  {
    slug: 'fuzzy-production',
    title: 'Fuzzy Logic Forecasting',
    subtitle: 'Turning uncertainty into a plan.',
    summary: 'A production forecasting system that uses fuzzy logic to turn stock and demand data into book production estimates.',
    categories: ['ai', 'web'],
    label: 'APPLIED AI + DATA',
    color: 'yellow',
    context: 'Book production planning must balance existing inventory against demand. The system applies fuzzy logic to support those manufacturing decisions.',
    contributions: [
      'Developed a web-based book production prediction system.',
      'Applied fuzzy logic to remaining stock and demand data.',
      'Connected algorithmic forecasts with a practical production planning workflow.',
    ],
  },
  {
    slug: 'payment-management',
    title: 'Payment Management',
    subtitle: 'A clearer picture of every payment.',
    summary: 'An application for organizing and tracking installment-based payments using a structured management workflow.',
    categories: ['web'],
    label: 'BUSINESS SOFTWARE',
    color: 'blue',
    context: 'The Term Payment Management Application is designed to manage and track installment-based payments efficiently.',
    contributions: [
      'Developed a web application for managing installment-based payments.',
      'Used Laravel, PHP, MySQL, and JavaScript for the application stack.',
    ],
  },
  {
    slug: 'building-condition',
    title: 'Building Condition Analysis',
    subtitle: 'Better records. Informed decisions.',
    summary: 'Helping teams record, analyze, and manage building condition information for public facilities.',
    categories: ['web'],
    label: 'PUBLIC INFRASTRUCTURE SOFTWARE',
    color: 'mint',
    context: 'Building condition records help teams understand the state of public facilities. This application supports recording, analysis, and management of that information.',
    contributions: [
      'Built a web application for recording and analyzing building conditions.',
      'Organized information management for public facilities.',
      'Implemented the application with PHP, Laravel, MySQL, and JavaScript.',
    ],
  },
] as const;

export const projects = resume.featuredProjects.map((project, index) => ({
  ...project,
  ...editorial[index],
  image: project.image.replace('/projects/', 'images/projects/'),
  link: 'link' in project ? project.link : undefined,
}));

export type Project = (typeof projects)[number];

export const skillGroups = [
  { title: 'Intelligent systems', description: 'Making sense of data, documents, and the world around us.', skills: resume.skills.aiml },
  { title: 'Software that connects', description: 'From the interface to the API and the database behind it.', skills: [...resume.skills.languages, ...resume.skills.frameworks, 'MySQL', 'REST APIs', 'Git'] },
  { title: 'Code in the physical world', description: 'Bringing hardware, sensors, and software together.', skills: [...resume.skills.robotics, 'OpenCV', 'C++', 'Autonomous Navigation'] },
];
