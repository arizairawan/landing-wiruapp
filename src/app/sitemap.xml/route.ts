
import { type NextRequest } from 'next/server';
import { getAllBlogsForSitemap } from '@/services/blogService';

export async function GET(request: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wiru.app';
  const currentDate = new Date().toISOString();

  // Define your static pages here
  const staticPages = [
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/templates', priority: '0.9', changefreq: 'weekly' },
    { path: '/clients', priority: '0.7', changefreq: 'weekly' },
    { path: '/blog', priority: '0.9', changefreq: 'weekly' },
    { path: '/privacy-policy', priority: '0.3', changefreq: 'monthly' },
    { path: '/terms-of-service', priority: '0.3', changefreq: 'monthly' },
  ];

  const staticUrls = staticPages
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

  const blogs = await getAllBlogsForSitemap();
  const blogUrls = blogs
    .map((blog) => {
      return `
  <url>
    <loc>${baseUrl}/blog/${blog.slug}</loc>
    <lastmod>${blog.created.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
    .join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrls}
  ${blogUrls}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
