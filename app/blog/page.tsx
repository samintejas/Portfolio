import type { Metadata } from "next"
import { BlogPostCard } from "@/components/blog-post-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RotatingBackground } from "@/components/rotating-background"
import { ArrowDown } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on backend engineering, system design, and electronic music.",
}

// Sample blog posts data
const posts = [
  {
    id: 1,
    title: "Building Resilient Microservices with Go",
    excerpt: "Learn how to design and implement fault-tolerant microservices using Go and modern patterns.",
    date: "2023-05-15",
    readTime: "8 min read",
    category: "Backend",
    slug: "building-resilient-microservices",
    featured: true,
  },
  {
    id: 2,
    title: "My Linux Development Environment",
    excerpt: "A detailed look at my custom Linux setup optimized for backend development.",
    date: "2023-04-02",
    readTime: "6 min read",
    category: "Tools",
    slug: "linux-development-environment",
    featured: true,
  },
  {
    id: 3,
    title: "From Code to Sound: Programming Electronic Music",
    excerpt: "How my background in systems engineering influences my approach to creating electronic music.",
    date: "2023-03-10",
    readTime: "5 min read",
    category: "Music",
    slug: "code-to-sound",
    featured: false,
  },
  {
    id: 4,
    title: "The Art of Writing Clean Go Code",
    excerpt: "Principles and practices for writing maintainable and efficient Go code.",
    date: "2023-02-20",
    readTime: "7 min read",
    category: "Backend",
    slug: "clean-go-code",
    featured: false,
  },
  {
    id: 5,
    title: "Optimizing Database Queries for Scale",
    excerpt: "Techniques for improving database performance in high-traffic applications.",
    date: "2023-01-15",
    readTime: "9 min read",
    category: "Backend",
    slug: "optimizing-database-queries",
    featured: false,
  },
  {
    id: 6,
    title: "Building a Custom Mechanical Keyboard",
    excerpt: "My journey in designing and building a custom mechanical keyboard optimized for coding.",
    date: "2022-12-05",
    readTime: "6 min read",
    category: "Tools",
    slug: "custom-mechanical-keyboard",
    featured: false,
  },
  {
    id: 7,
    title: "Distributed Systems Observability",
    excerpt: "Implementing effective monitoring and tracing in distributed architectures.",
    date: "2022-11-20",
    readTime: "8 min read",
    category: "Backend",
    slug: "distributed-systems-observability",
    featured: false,
  },
]

const categories = ["All", "Backend", "Tools", "Music"]

export default function BlogPage() {
  const featuredPosts = posts.filter((post) => post.featured)
  const recentPosts = posts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen bg-background">

      <div className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Featured Posts */}
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Featured Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          </section>

          {/* Category Filters */}
          <section className="mb-8">
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button key={category} variant={category === "All" ? "default" : "outline"} size="sm">
                  {category}
                </Button>
              ))}
            </div>
          </section>

          {/* Recent Posts */}
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Recent Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          </section>

          {/* Newsletter Signup */}
          <section className="bg-muted p-6 md:p-8 rounded-lg">
            <div className="max-w-md mx-auto text-center">
              <h2 className="text-xl font-bold mb-2">Subscribe to my newsletter</h2>
              <p className="text-muted-foreground mb-4">Get notified when I publish new articles and projects.</p>
              <form className="flex gap-2">
                <Input type="email" placeholder="Enter your email" className="flex-1" />
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
