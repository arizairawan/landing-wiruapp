
export interface Template {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: 'Website' | 'Application' | 'UI Kit';
  tags: string[];
  image: string;
  dataAiHint?: string;
  basic_price: number;
  features: string[];
  preview_link?: string;
  gridSpanDesktop?: number; 
  gridSpanMobile?: number; 
}

export const categories = ['All', 'Website', 'Application', 'UI Kit'] as const;
export type Category = typeof categories[number];

export const technologies = ['All', 'NextJS', 'React', 'VueJS', 'TailwindCSS', 'Figma', 'Firebase', 'Gatsby', 'Online Store', 'SaaS', 'Portfolio', 'Mobile', 'Productivity', 'Blog'] as const;
export type Technology = typeof technologies[number];
