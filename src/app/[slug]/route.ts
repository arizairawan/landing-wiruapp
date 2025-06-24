
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  
  // This dynamic route redirects any given slug to the corresponding path
  // on the link.wiru.app domain.
  // For example, a request to /my-profile will redirect to https://link.wiru.app/my-profile.
  // Specific routes like /sitemap.xml are handled by their own dedicated route handlers,
  // and Next.js will prioritize those over this dynamic route.

  const targetUrl = `https://link.wiru.app/${slug}`;

  // A 307 (Temporary Redirect) is used to preserve the original request method (e.g., GET).
  // For a permanent move, you could use a 301 (Moved Permanently) or 308 (Permanent Redirect).
  return NextResponse.redirect(targetUrl, 307);
}
