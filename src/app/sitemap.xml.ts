
import { type MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wiru.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '', // Homepage
    '/#templates',
    '/#services',
    '/#about',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly', // Or 'monthly', 'yearly' depending on how often content changes
    priority: route === '' ? 1 : 0.8, // Homepage usually gets highest priority
  }));

  // If you had dynamic routes, for example for individual template preview pages, you would add them here.
  // Example:
  // const templatePreviews = mockTemplates.map((template) => ({
  //   url: `${siteUrl}/preview/${template.id}`,
  //   lastModified: new Date(),
  //   changeFrequency: 'monthly',
  //   priority: 0.7,
  // }));
  // sitemapEntries.push(...templatePreviews);

  return sitemapEntries;
}
