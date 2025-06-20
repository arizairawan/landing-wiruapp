
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wiru.app';
  const currentDate = new Date().toISOString();

  // Define your static pages here
  const staticPages = [
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/templates', priority: '0.9', changefreq: 'weekly' },
    // Add other static pages if needed.
    // For dynamic pages (e.g., individual template pages), you would fetch them
    // from your data source and map them here.
  ];

  const sitemapContent = staticPages
    .map((page) => {
      const url = `${baseUrl}${page.path === '/' ? '' : page.path}`;
      return `
  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    })
    .join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemapContent}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
