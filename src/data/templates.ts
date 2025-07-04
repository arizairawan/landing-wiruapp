
export interface Template {
  id: string;
  slug: string;
  name: string;
  description: string;
  tags: string[];
  image: string;
  dataAiHint?: string;
  basic_price: number;
  features: string[];
  preview_link?: string;
  gridSpanDesktop?: number; 
  gridSpanMobile?: number; 
}

export const technologies = ['All', 'NextJS', 'React', 'VueJS', 'TailwindCSS', 'Figma', 'Firebase', 'Gatsby', 'Online Store', 'SaaS', 'Portfolio', 'Mobile', 'Productivity', 'Blog'] as const;
export type Technology = typeof technologies[number];
