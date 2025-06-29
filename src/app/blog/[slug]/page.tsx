
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogBySlug, getAllBlogSlugs } from '@/services/blogService';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Twitter, Facebook, Linkedin } from 'lucide-react';

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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wiru.app';
  const postUrl = `${baseUrl}/blog/${params.slug}`;
  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(blog.title);

  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`;

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
            />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-headline font-bold text-primary mb-3">
            {blog.title}
          </h1>
          <p className="text-muted-foreground text-sm">
            Published on {blog.created.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </header>
        
        <div
          className="prose prose-lg max-w-none text-foreground prose-headings:text-primary prose-headings:font-headline prose-a:text-primary hover:prose-a:underline prose-strong:text-foreground prose-blockquote:border-primary prose-blockquote:text-muted-foreground prose-li:marker:text-primary"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />
      </article>

      <div className="max-w-4xl mx-auto mt-12 pt-8 border-t">
        <h3 className="text-lg font-semibold text-center mb-4 text-foreground">Share this article</h3>
        <div className="flex justify-center gap-4">
          <Button variant="outline" asChild>
            <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter" className="flex items-center gap-2">
              <Twitter className="h-5 w-5" />
              <span className="hidden sm:inline">Twitter</span>
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" className="flex items-center gap-2">
              <Facebook className="h-5 w-5" />
               <span className="hidden sm:inline">Facebook</span>
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn" className="flex items-center gap-2">
              <Linkedin className="h-5 w-5" />
               <span className="hidden sm:inline">LinkedIn</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
