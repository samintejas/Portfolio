import { getPostBySlug, getPostSlugs } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrism from 'rehype-prism-plus';
import 'prismjs/themes/prism-tomorrow.css';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import path from 'path';

export async function generateStaticParams() {
  return getPostSlugs().map(slug => ({ slug: slug.replace(/\.md$/, '').replace(/\\/g, '/').split('/') }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const slugPath = resolvedParams.slug.join('/');
  const post = getPostBySlug(`${slugPath}.md`);
  return {
    title: post?.frontmatter?.title || 'Blog',
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  const slugPath = resolvedParams.slug.join('/');
  const post = getPostBySlug(`${slugPath}.md`);
  if (!post) return notFound();

  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-12 max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold mb-6">{post.frontmatter?.title}</h1>
      <p className="text-muted-foreground mb-10">{post.frontmatter?.date} • {post.frontmatter?.readTime || '5 min read'}</p>
      <article className="prose prose-headings:font-semibold prose-headings:text-foreground dark:prose-invert prose-code:text-sm max-w-none">
        <MDXRemote source={post.content} options={{ mdxOptions: { rehypePlugins: [rehypePrism] } }} />
      </article>
    </div>
  );
}