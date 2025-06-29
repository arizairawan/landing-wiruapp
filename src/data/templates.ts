
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

export const categories = ['All', 'Website', 'Application', 'UI Kit'] as const;
export type Category = typeof categories[number];

export const technologies = ['All', 'NextJS', 'React', 'VueJS', 'TailwindCSS', 'Figma', 'Firebase', 'Gatsby', 'Online Store', 'SaaS', 'Portfolio', 'Mobile', 'Productivity', 'Blog'] as const;
export type Technology = typeof technologies[number];
