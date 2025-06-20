
import { type MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wiru.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '', // Homepage
    '/templates', // All templates page
    '/#services',
    '/#about',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly', 
    priority: route === '' ? 1 : (route === '/templates' ? 0.9 : 0.8),
  }));

  // Jika Anda memiliki rute dinamis, misalnya untuk halaman pratinjau template individual, Anda akan menambahkannya di sini.
  // Contoh:
  // import { mockTemplates } from '@/data/templates'; // Pastikan path ini benar
  // const templatePreviews = mockTemplates.map((template) => ({
  //   url: `${siteUrl}/preview/${template.id}`, // Sesuaikan dengan struktur URL pratinjau Anda
  //   lastModified: new Date(),
  //   changeFrequency: 'monthly',
  //   priority: 0.7,
  // }));
  // sitemapEntries.push(...templatePreviews);

  return sitemapEntries;
}

