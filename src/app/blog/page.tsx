
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Blog } from '@/data/blogs';
import { getBlogs } from '@/services/blogService';
import type { DocumentSnapshot } from 'firebase/firestore';

import BlogGrid from '@/components/blog/BlogGrid';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchInitialBlogs = async () => {
      setIsLoading(true);
      const { blogs: initialBlogs, lastVisible: newLastVisible, hasMore: newHasMore } = await getBlogs();
      setBlogs(initialBlogs);
      setLastVisible(newLastVisible);
      setHasMore(newHasMore);
      setIsLoading(false);
    };
    fetchInitialBlogs();
  }, []);

  const handleLoadMore = async () => {
    if (!hasMore || isLoadingMore) return;
    
    setIsLoadingMore(true);
    const { blogs: newBlogs, lastVisible: newLastVisible, hasMore: newHasMore } = await getBlogs(lastVisible);
    setBlogs(prevBlogs => [...prevBlogs, ...newBlogs]);
    setLastVisible(newLastVisible);
    setHasMore(newHasMore);
    setIsLoadingMore(false);
  };
  
  const BlogSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-[200px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );

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
        
        {isLoading ? (
          <BlogSkeleton />
        ) : (
          <BlogGrid blogs={blogs} />
        )}
        
        <div className="text-center mt-12">
            {hasMore && !isLoading && (
                 <Button
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    size="lg"
                    variant="outline"
                    className="text-primary hover:bg-primary/10 hover:text-primary border-primary"
                >
                    {isLoadingMore ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Loading...
                        </>
                    ) : (
                        "Load More"
                    )}
                </Button>
            )}
            {!hasMore && !isLoading && blogs.length > 0 && (
                <p className="text-muted-foreground">You've reached the end.</p>
            )}
        </div>
      </div>
    </section>
  );
}
