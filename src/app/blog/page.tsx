
import type { Metadata } from 'next';
import Link from 'next/link';
import { mockBlogs } from '@/data/blogs';
import BlogGrid from '@/components/blog/BlogGrid';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

export const metadata: Metadata = {
  title: 'Blog | Wiru.app',
  description: 'Explore articles, tips, and tutorials on web development, design, and technology from the Wiru.app team.',
};

export default function BlogListPage() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Blog</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="text-center mb-12">
            <h1 className="text-4xl font-headline font-bold text-primary mb-4">Our Blog</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Insights, tutorials, and updates from the world of web development and digital solutions.
            </p>
        </div>
        
        <BlogGrid blogs={mockBlogs} />
      </div>
    </section>
  );
}
