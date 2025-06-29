
import type { Blog } from '@/data/blogs';
import BlogCard from './BlogCard';

interface BlogGridProps {
  blogs: Blog[];
}

const BlogGrid: React.FC<BlogGridProps> = ({ blogs }) => {
  if (!blogs || blogs.length === 0) {
    return <p className="text-center text-muted-foreground py-10">No blog posts found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
      {blogs.map((blog) => (
        <BlogCard key={blog.slug} blog={blog} />
      ))}
    </div>
  );
};

export default BlogGrid;
