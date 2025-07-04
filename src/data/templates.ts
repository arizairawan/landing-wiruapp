
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

export const technologies = ['All', 'Website', 'Mobile', 'UI Kit', 'NextJs', 'Flutter', 'Angular'] as const;
export type Technology = typeof technologies[number];
