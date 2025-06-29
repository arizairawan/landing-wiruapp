
import Image from 'next/image';
import Link from 'next/link';
import type { Blog } from '@/data/blogs';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const excerpt = blog.description.split('\n').find(p => p.trim() !== '' && !p.startsWith('#'))?.substring(0, 120) + '...';

  return (
    <Card className="overflow-hidden h-full flex flex-col group">
      <CardHeader className="p-0 relative">
        <Link href={`/blog/${blog.slug}`} className="block aspect-[2/1] w-full overflow-hidden">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <p className="text-sm text-muted-foreground mb-2">
          {blog.created.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <CardTitle className="text-xl font-headline mb-2 line-clamp-2">
          <Link href={`/blog/${blog.slug}`} className="hover:text-primary transition-colors">
            {blog.title}
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-3">{excerpt}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="link" asChild className="p-0 h-auto text-primary">
          <Link href={`/blog/${blog.slug}`}>
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
