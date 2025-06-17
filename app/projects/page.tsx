"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ArrowDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { RotatingBackground } from "@/components/rotating-background"

// Sample project data
const projects = [
 
  {
    id: 1,
    title: "mmtm",
    description:
      "A mood aware and AI powered task manager",
    image: "https://images.unsplash.com/photo-1551389326-9875cb21594c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    technologies: ["Go", "Typescript", "Next.js","PostgreSQL"],
    github: "https://github.com",
    featured: true,
  },
  {
    id: 2,
    title: "Chilanka",
    description:
      "Chilanka.in is the official website for chilanka natyakalakshetra , it is made possible using next.js and deployed using vercel",
    image: "https://images.unsplash.com/photo-1738609179465-f6fe04418cad?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    technologies: ["TypeScript", "Next.js", "Business Analysis"],
    demo: "https://www.chilanka.in/",
    featured: false,
  },
  {
    id: 3,
    title: "Spaciery",
    description: "Im a founding member of Spaciery ! Spaciery is a collective of passionate individuals who believe in creating functional and useful software solutions that prioritize improving lives over profits. Our mission is to build tools and platforms that make the world a better place, one line of code at a time.We envision a future where technology serves humanity in meaningful ways, enhancing daily life, fostering connections, and empowering individuals. Our projects are driven by a commitment to social good, sustainability, and innovation.",
    image: "https://images.unsplash.com/photo-1711409664431-4e7914ac2370?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    technologies: ["Go", "Redis", "Protocol Buffers"],
    github: "https://github.com/spaciery",
    featured: false,
  },
  {
    id: 4,
    title: "MindMirror",
    description:
      "Mindmirror is a minimal static site generator intented to use as a note taking/sharing application.It is customizable and can support standard markdown with various features like code blocks and math.Mindmirror is a CLI application written in go !",
    image: "https://images.unsplash.com/photo-1519163219899-21d2bb723b3e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    technologies: ["Go", "Linux"],
    github: "https://github.com/spaciery/mindmirror",
    featured: true,
  },
  {
    id: 5,
    title: "Zen OS",
    description: "A riced version of arch linux with various productivity oriented features without sacrifcing aestetics",
    image: "https://images.unsplash.com/photo-1714846200875-006da50cb5b0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    technologies: ["Lua", "Linux"],
    github: "https://github.com/samintejas/dots",
    featured: false,
  },
]

export default function ProjectsPage() {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  const featuredProjects = projects.filter((project) => project.featured)
  const otherProjects = projects.filter((project) => !project.featured)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProjectIndex((prev) => (prev + 1) % featuredProjects.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [featuredProjects.length])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      {/* <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <RotatingBackground />

        <div className="container relative z-10 text-center">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-8 leading-none">
              Projects
              <br />
             
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              A collection of backend systems, developer tools, and creative experiments.
            </p>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </section> */}

      {/* Featured Project Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-6xl font-bold tracking-tight mb-8">
              Featured Projects
              <br />
              <span className="text-2xl md:text-4xl  text-muted-foreground">A collection of backend systems, developer tools, and creative experiments.</span>
            </h2>
          </div>

          <div className="relative max-w-6xl mx-auto mb-16 md:mb-24">
            <div className="relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden group">
              <Image
                src={featuredProjects[currentProjectIndex].image || "/placeholder.svg"}
                alt={featuredProjects[currentProjectIndex].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Project Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                <div className="max-w-2xl">
                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">
                    {featuredProjects[currentProjectIndex].title}
                  </h3>
                  <p className="text-white/80 text-base md:text-lg mb-6">
                    {featuredProjects[currentProjectIndex].description}
                  </p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {featuredProjects[currentProjectIndex].technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    {featuredProjects[currentProjectIndex].github && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      >
                        <Link href={featuredProjects[currentProjectIndex].github!} target="_blank" rel="noreferrer">
                          GitHub
                        </Link>
                      </Button>
                    )}
                    {featuredProjects[currentProjectIndex].demo && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      >
                        <Link href={featuredProjects[currentProjectIndex].demo!} target="_blank" rel="noreferrer">
                          Live Demo
                        </Link>
                      </Button>
                    )}
                    <Link
                      href={`/projects/${featuredProjects[currentProjectIndex].id}`}
                      className="group inline-flex items-center text-white font-medium hover:text-white/80 transition-colors sm:ml-auto"
                    >
                      View Details
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Project Navigation */}
              <div className="absolute top-6 md:top-8 right-6 md:right-8 flex gap-2">
                {featuredProjects.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentProjectIndex ? "bg-white" : "bg-white/40"
                    }`}
                    onClick={() => setCurrentProjectIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Other Projects Grid */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-4xl font-bold tracking-tight mb-8">
              Other Projects
              <br />
              {/* <span className="text-muted-foreground">Projects</span> */}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {otherProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs font-normal">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex gap-3">
                    {project.github && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={project.github} target="_blank" rel="noreferrer">
                          GitHub
                        </Link>
                      </Button>
                    )}
                    {project.demo && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={project.demo} target="_blank" rel="noreferrer">
                          Demo
                        </Link>
                      </Button>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/projects/${project.id}`}>
                      Details <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
