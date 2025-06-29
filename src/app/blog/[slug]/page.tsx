
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogBySlug, getAllBlogSlugs } from '@/services/blogService';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

type Props = {
  params: { slug: string };
};

// This function generates the metadata for the page
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wiru.app';
  const ogImageUrl = blog.image;

  return {
    title: `${blog.title} | Wiru.app Blog`,
    description: blog.metadesc,
    keywords: blog.keyword,
    authors: [{ name: 'Wiru.app Team', url: siteUrl }],
    creator: 'Wiru.app Team',
    alternates: {
        canonical: `${siteUrl}/blog/${blog.slug}`,
    },
    openGraph: {
      type: 'article',
      url: `${siteUrl}/blog/${blog.slug}`,
      title: blog.title,
      description: blog.metadesc,
      publishedTime: blog.created.toISOString(),
      authors: ['Wiru.app Team'],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      siteName: 'Wiru.app',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@wiruapp',
      creator: '@wiruapp_team',
      title: blog.title,
      description: blog.metadesc,
      images: [ogImageUrl],
    },
  };
}

// This function generates the static paths for all blogs at build time
export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs;
}

export default async function BlogDetailPage({ params }: Props) {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <Breadcrumb className="mb-8">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild><Link href="/">Home</Link></BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink asChild><Link href="/blog">Blog</Link></BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage className="truncate max-w-xs md:max-w-md">{blog.title}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <div className="relative w-full aspect-[2/1] rounded-lg overflow-hidden mb-6">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
              priority
              data-ai-hint={blog.dataAiHint}
            />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-headline font-bold text-primary mb-3">
            {blog.title}
          </h1>
          <p className="text-muted-foreground text-sm">
            Published on {blog.created.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </header>
        
        <div className="prose prose-lg max-w-none text-foreground prose-headings:text-primary prose-headings:font-headline prose-a:text-primary hover:prose-a:underline prose-strong:text-foreground prose-blockquote:border-primary prose-blockquote:text-muted-foreground prose-li:marker:text-primary">
          {blog.description.split('\\n').map((paragraph, index) => {
            if (paragraph.startsWith('### ')) {
                return <h3 key={index} className="text-2xl font-headline font-semibold mt-6 mb-3">{paragraph.substring(4)}</h3>;
            }
            if (paragraph.startsWith('#### ')) {
                return <h4 key={index} className="text-xl font-headline font-semibold mt-5 mb-2">{paragraph.substring(5)}</h4>;
            }
            if (paragraph.trim().startsWith('```')) {
                const codeLines = blog.description.split('```')[1].trim().split('\\n').slice(1);
                return (
                    <pre key={index} className="bg-muted/50 p-4 rounded-md overflow-x-auto">
                        <code>{codeLines.join('\n')}</code>
                    </pre>
                )
            }
            if (paragraph.trim().startsWith('*   **')) { // Basic list parsing
                return <li key={index} className="ml-5">{paragraph.replace('*   **', '').replace('**', '')}</li>
            }
            return <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>;
          })}
        </div>
      </article>
    </div>
  );
}
