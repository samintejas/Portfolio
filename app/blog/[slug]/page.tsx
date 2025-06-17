import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { PrismCode } from "@/components/prism-code"
import { notFound } from "next/navigation"
import type { JSX } from "react"

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
    content: [
      { type: "heading", level: 1, content: "Building Resilient Microservices with Go" },
      {
        type: "paragraph",
        content:
          "In the world of distributed systems, resilience is not just a feature—it's a necessity. This article explores how to build microservices in Go that can withstand the chaos of production environments.",
      },
      { type: "heading", level: 2, content: "Understanding Resilience Patterns" },
      {
        type: "paragraph",
        content:
          "Resilience in microservices is about designing systems that can recover from failures automatically. Some key patterns include:",
      },
      {
        type: "list",
        items: [
          "**Circuit Breakers**: Preventing cascading failures by failing fast",
          "**Retries with Backoff**: Intelligently retrying failed operations",
          "**Rate Limiting**: Protecting services from overwhelming load",
          "**Bulkheads**: Isolating failures to prevent system-wide outages",
        ],
      },
      { type: "heading", level: 2, content: "Implementing a Circuit Breaker in Go" },
      {
        type: "paragraph",
        content: "Here's a simple implementation of the circuit breaker pattern in Go:",
      },
      {
        type: "code",
        language: "go",
        content: `type CircuitBreaker struct {
    failures     int
    threshold    int
    timeout      time.Duration
    lastFailure  time.Time
    isOpen       bool
}

func NewCircuitBreaker(threshold int, timeout time.Duration) *CircuitBreaker {
    return &CircuitBreaker{
        threshold: threshold,
        timeout:   timeout,
    }
}

func (cb *CircuitBreaker) Execute(fn func() error) error {
    if cb.isOpen {
        if time.Since(cb.lastFailure) > cb.timeout {
            cb.isOpen = false
            cb.failures = 0
        } else {
            return errors.New("circuit breaker is open")
        }
    }

    err := fn()
    if err != nil {
        cb.failures++
        cb.lastFailure = time.Now()
        if cb.failures >= cb.threshold {
            cb.isOpen = true
        }
        return err
    }

    cb.failures = 0
    return nil
}`,
      },
      { type: "heading", level: 2, content: "Distributed Tracing" },
      {
        type: "paragraph",
        content:
          "Observability is crucial for resilient systems. Implementing distributed tracing helps you understand how requests flow through your microservices:",
      },
      {
        type: "code",
        language: "go",
        content: `func TracingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        ctx := r.Context()
        spanID := r.Header.Get("X-Span-ID")
        if spanID == "" {
            spanID = generateSpanID()
        }
        
        ctx = context.WithValue(ctx, "span-id", spanID)
        w.Header().Set("X-Span-ID", spanID)
        
        next.ServeHTTP(w, r.WithContext(ctx))
    })
}`,
      },
      { type: "heading", level: 2, content: "Conclusion" },
      {
        type: "paragraph",
        content:
          "Building resilient microservices requires both thoughtful architecture and careful implementation. By applying these patterns in your Go services, you can create systems that gracefully handle failures and continue to provide value even under adverse conditions.",
      },
    ],
  },
  {
    id: 2,
    title: "My Linux Development Environment",
    excerpt: "A detailed look at my custom Linux setup optimized for backend development.",
    date: "2023-04-02",
    readTime: "6 min read",
    category: "Tools",
    slug: "linux-development-environment",
    content: [
      { type: "heading", level: 1, content: "My Linux Development Environment" },
      {
        type: "paragraph",
        content:
          "After years of tweaking and optimizing, I've developed a Linux environment that maximizes my productivity as a backend developer. This post details my setup and configuration.",
      },
      { type: "heading", level: 2, content: "Base System" },
      {
        type: "paragraph",
        content:
          "I run Arch Linux with a custom-compiled kernel optimized for development workloads. The minimalist approach allows me to include only what I need and understand every component of my system.",
      },
      { type: "heading", level: 2, content: "Window Manager: i3-gaps" },
      {
        type: "paragraph",
        content:
          "I use i3-gaps as my window manager, with a custom fork that includes additional features I've implemented:",
      },
      {
        type: "list",
        items: [
          "Enhanced scratchpad functionality",
          "Custom workspace naming and organization",
          "Integrate with my terminal multiplexer setup",
        ],
      },
      { type: "heading", level: 2, content: "Automation Scripts" },
      {
        type: "paragraph",
        content: "I've written several shell scripts to automate common tasks:",
      },
      {
        type: "code",
        language: "bash",
        content: `#!/bin/bash
# dev-setup.sh - Initialize development environment

setup_project() {
    local project_name=$1
    mkdir -p ~/projects/$project_name
    cd ~/projects/$project_name
    
    # Initialize git repository
    git init
    
    # Create standard directory structure
    mkdir -p {cmd,internal,pkg,api,web,docs,scripts}
    
    # Create basic files
    touch README.md .gitignore Makefile
    
    echo "Project $project_name initialized"
}`,
      },
    ],
  },
]

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = posts.find((p) => p.slug === params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = posts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  const renderContent = (content: any) => {
    switch (content.type) {
      case "heading":
        const HeadingTag = `h${content.level}` as keyof JSX.IntrinsicElements
        const headingClasses = {
          1: "text-4xl font-bold tracking-tight mb-6 mt-8",
          2: "text-2xl font-bold tracking-tight mb-4 mt-8",
          3: "text-xl font-bold tracking-tight mb-3 mt-6",
        }
        return (
          <HeadingTag
            className={headingClasses[content.level as keyof typeof headingClasses] || "text-lg font-bold mb-2 mt-4"}
          >
            {content.content}
          </HeadingTag>
        )

      case "paragraph":
        return <p className="text-muted-foreground mb-6 leading-relaxed">{content.content}</p>

      case "list":
        return (
          <ul className="list-disc list-inside mb-6 space-y-2">
            {content.items.map((item: string, index: number) => (
              <li key={index} className="text-muted-foreground">
                <span
                  dangerouslySetInnerHTML={{
                    __html: item.replace(/\*\*(.*?)\*\*/g, "<strong class='text-foreground font-semibold'>$1</strong>"),
                  }}
                />
              </li>
            ))}
          </ul>
        )

      case "code":
        return (
          <div className="mb-8">
            <PrismCode code={content.content} language={content.language} />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm font-medium hover:underline underline-offset-4 mb-8"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Blog
        </Link>

        <article>
          <header className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Badge variant="secondary" className="font-normal">
                {post.category}
              </Badge>
              <span className="text-sm text-muted-foreground">{post.date}</span>
              <span className="text-sm text-muted-foreground">{post.readTime}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{post.title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">{post.excerpt}</p>
          </header>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            {post.content.map((content, index) => (
              <div key={index}>{renderContent(content)}</div>
            ))}
          </div>
        </article>
      </div>
    </div>
  )
}
