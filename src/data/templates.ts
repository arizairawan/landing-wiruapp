export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'Website' | 'Application' | 'UI Kit';
  tags: string[];
  imageUrl: string;
  dataAiHint?: string;
  priceSourceCode: number;
  features: string[];
  previewUrl?: string;
  gridSpanDesktop?: number; 
  gridSpanMobile?: number; 
}

export const mockTemplates: Template[] = [
  {
    id: 't1',
    name: 'Modern E-commerce Platform',
    description: 'A sleek and responsive e-commerce template built with Next.js and Tailwind CSS.',
    category: 'Website',
    tags: ['E-commerce', 'NextJS', 'Online Store', 'TailwindCSS'],
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'online shopping',
    priceSourceCode: 99,
    features: ['User authentication', 'Product listings', 'Shopping cart', 'Admin Dashboard'],
    previewUrl: '#',
    gridSpanDesktop: 2,
    gridSpanMobile: 1,
  },
  {
    id: 't2',
    name: 'SaaS Landing Page',
    description: 'High-converting landing page template for SaaS products.',
    category: 'Website',
    tags: ['SaaS', 'Landing Page', 'Marketing', 'React'],
    imageUrl: 'https://placehold.co/400x300.png',
    dataAiHint: 'software service',
    priceSourceCode: 49,
    features: ['Responsive design', 'Testimonial section', 'Pricing table', 'Contact form'],
    previewUrl: '#',
    gridSpanDesktop: 1,
    gridSpanMobile: 1,
  },
  {
    id: 't3',
    name: 'Mobile App UI Kit',
    description: 'Comprehensive UI kit for designing modern mobile applications.',
    category: 'UI Kit',
    tags: ['Mobile', 'iOS', 'Android', 'Figma'],
    imageUrl: 'https://placehold.co/400x300.png',
    dataAiHint: 'mobile interface',
    priceSourceCode: 79,
    features: ['100+ Screens', 'Dark & Light Mode', 'Editable components', 'Style guide'],
    previewUrl: '#',
    gridSpanDesktop: 1,
    gridSpanMobile: 1,
  },
  {
    id: 't4',
    name: 'Creative Portfolio Website',
    description: 'Minimalist portfolio template for creatives, photographers, and designers.',
    category: 'Website',
    tags: ['Portfolio', 'Creative', 'React'],
    imageUrl: 'https://placehold.co/400x600.png',
    dataAiHint: 'artist showcase',
    priceSourceCode: 39,
    features: ['Project showcase', 'About me section', 'Contact form', 'Blog integration'],
    previewUrl: '#',
    gridSpanDesktop: 1,
    gridSpanMobile: 1,
  },
  {
    id: 't5',
    name: 'Task Management Application',
    description: 'Full-featured task management application source code with collaboration tools.',
    category: 'Application',
    tags: ['Productivity', 'VueJS', 'Firebase', 'Project Management'],
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'todo list',
    priceSourceCode: 129,
    features: ['Task creation & assignment', 'Project boards', 'User collaboration', 'Notifications'],
    previewUrl: '#',
    gridSpanDesktop: 2,
    gridSpanMobile: 1,
  },
  {
    id: 't6',
    name: 'Modern Blog Template',
    description: 'Clean and fast blog template with SEO optimization and Markdown support.',
    category: 'Website',
    tags: ['Blog', 'Content', 'Gatsby', 'SEO'],
    imageUrl: 'https://placehold.co/400x300.png',
    dataAiHint: 'writing platform',
    priceSourceCode: 29,
    features: ['Markdown support', 'Tagging system', 'Author pages', 'Disqus integration'],
    previewUrl: '#',
    gridSpanDesktop: 1,
    gridSpanMobile: 1,
  },
];

export const categories = ['All', 'Website', 'Application', 'UI Kit'] as const;
export type Category = typeof categories[number];

export const technologies = ['All', 'NextJS', 'React', 'VueJS', 'TailwindCSS', 'Figma', 'Firebase', 'Gatsby', 'Online Store', 'SaaS', 'Portfolio', 'Mobile', 'Productivity', 'Blog'] as const;
export type Technology = typeof technologies[number];
