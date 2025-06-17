import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Github, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"

// Sample project data
const projects = [
  {
    id: "1",
    title: "Resilient Microservices Framework",
    description:
      "A production-grade microservices framework built with Go that handles high-throughput workloads with built-in resilience patterns.",
    longDescription: `
      This framework provides a comprehensive solution for building and deploying microservices at scale. It includes:
      
      - Circuit breaker patterns for preventing cascading failures
      - Distributed tracing with OpenTelemetry integration
      - Automatic retry mechanisms with exponential backoff
      - Rate limiting and throttling capabilities
      - Service discovery and registration
      - Configurable health checks and graceful degradation
      
      The framework is designed to be lightweight yet powerful, with minimal dependencies and a focus on performance.
    `,
    image: "/placeholder.svg?height=600&width=1200",
    technologies: ["Go", "Docker", "Kubernetes", "gRPC", "Protocol Buffers", "etcd"],
    github: "https://github.com",
    demo: "https://example.com",
    featured: true,
  },
  {
    id: "2",
    title: "Custom Static Site Generator",
    description:
      "A lightning-fast static site generator built from scratch with TypeScript that converts markdown to optimized HTML with zero dependencies.",
    longDescription: `
      This static site generator was built to solve specific performance and customization needs that weren't addressed by existing solutions. Key features include:
      
      - Zero runtime dependencies in the generated output
      - Incremental builds that only process changed files
      - Custom templating system with inheritance and partials
      - Built-in image optimization and lazy loading
      - Markdown extensions for custom components
      - Automatic sitemap and RSS feed generation
      
      The generator is used to power several high-traffic websites and documentation portals.
    `,
    image: "/placeholder.svg?height=600&width=1200",
    technologies: ["TypeScript", "Node.js", "Markdown", "HTML", "CSS"],
    github: "https://github.com",
    demo: "https://example.com",
    featured: true,
  },
  // Add more projects as needed
]

interface ProjectPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = projects.find((p) => p.id === params.id)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: project.title,
    description: project.description,
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.id === params.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/projects"
          className="inline-flex items-center text-sm font-medium hover:underline underline-offset-4 mb-8"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Projects
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:gap-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{project.title}</h1>
            <p className="text-lg text-muted-foreground mb-6">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="font-normal">
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {project.github && (
                <Button asChild>
                  <Link href={project.github} target="_blank" rel="noreferrer">
                    <Github className="mr-2 h-4 w-4" /> View on GitHub
                  </Link>
                </Button>
              )}
              {project.demo && (
                <Button variant="outline" asChild>
                  <Link href={project.demo} target="_blank" rel="noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                  </Link>
                </Button>
              )}
            </div>
          </div>

          <div className="overflow-hidden rounded-lg">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            {project.longDescription.split("\n").map((paragraph, index) => (
              <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
