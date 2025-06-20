import { getAllPosts } from '@/lib/posts';
import { BlogPostCard } from '@/components/blog-post-card';
import { Input } from '@/components/ui/input';
import { RotatingBackground } from '@/components/rotating-background';

export default function BlogPage() {
  const posts = getAllPosts();
  const featuredPosts = posts.filter(post => post.frontmatter?.featured);
  const recentPosts = posts.filter(post => !post.frontmatter?.featured);

  return (
    <div className="min-h-screen bg-background">
      <div className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-bold mb-6 text-foreground">Latest Posts</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map(post => (
              <BlogPostCard
                key={post.slug}
                post={{
                  id: post.slug.length,
                  slug: post.slug,
                  title: post.frontmatter?.title || '',
                  excerpt: post.frontmatter?.description || '',
                  date: post.frontmatter?.date || '',
                  readTime: post.frontmatter?.readTime || '5 min read',
                  category: post.frontmatter?.category || 'General'
                }}
              />
            ))}
          </div>

          <h2 className="text-2xl font-semibold mt-12 mb-4 text-foreground">Recent Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map(post => (
              <BlogPostCard
                key={post.slug}
                post={{
                  id: post.slug.length,
                  slug: post.slug,
                  title: post.frontmatter?.title || '',
                  excerpt: post.frontmatter?.description || '',
                  date: post.frontmatter?.date || '',
                  readTime: post.frontmatter?.readTime || '5 min read',
                  category: post.frontmatter?.category || 'General'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}



