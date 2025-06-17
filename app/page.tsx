"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ArrowDown } from "lucide-react"
import { ParticleBackground } from "@/components/particle-background"
import { TypewriterText } from "@/components/typewriter-text"

export default function Home() {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)

  const roles = [
    "Backend Engineer",
    "Sound Designer",
    "Systems Engineer",
  ]

  const featuredProjects = [
    {
      id: 1,
      title: "MindMirror",
      description: "Mindmirror is a minimal static site generator intented to use as a note taking/sharing application.It is customizable and can support standard markdown with various features like code blocks and math.Mindmirror is a CLI application written in go !",
      image: "https://images.unsplash.com/photo-1711409664431-4e7914ac2370?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      technologies: ["Go", "Linux", "Markdown", "Frontend"],
    },
    {
      id: 2,
      title: "mmtm",
      description: "MindMirror Task Manager - The Mood aware task manager , powered by AI mood detection",
      image: "https://images.unsplash.com/photo-1551389326-9875cb21594c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      technologies: ["TypeScript", "Go", "FullStack","Postgres","Docker"],
    },
    {
      id: 3,
      title: "Spaciery",
      description: "A value oriented collective focusing on productive software",
      image: "https://images.unsplash.com/photo-1568733873715-f9d497a47ea0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      technologies: ["Software Engineering", "Humanity", "Philosophy"],
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProjectIndex((prev) => (prev + 1) % featuredProjects.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [featuredProjects.length])

  const currentProject = featuredProjects[currentProjectIndex]

  return (
    <div className="min-h-screen bg-background">
      <ParticleBackground />

      {/* Hero Section - Keep original alignment */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-[800px] h-[800px] rounded-full border border-dotted border-foreground/20 animate-spin-slow"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-dotted border-foreground/30 animate-spin-reverse"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-dotted border-foreground/40"></div>
          </div>
        </div>

        <div className="container relative z-10 pl-8 md:pl-16 lg:pl-24">
          <div className="max-w-7xl">
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] xl:text-[12rem] font-bold tracking-tight mb-8 leading-none">
              <TypewriterText
                texts={roles}
                speed={120}
                deleteSpeed={20}
                pauseDuration={2500}
                className="whitespace-nowrap"
              />
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed">
              I write fast backend systems, build my own tools, and automate tasks that are tolarable for others.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <Link
                href="/projects"
                className="group inline-flex items-center text-lg font-medium hover:text-primary transition-colors"
              >
                View My Work
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center text-lg font-medium hover:text-primary transition-colors"
              >
                Get In Touch
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-24 left-8 md:left-16 lg:left-24 animate-bounce">
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </section>

      {/* Featured Project Section - Fixed Alignment */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-none">
              Featured Projects
            </h2>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden group">
              <Image
                src={currentProject.image || "/placeholder.svg"}
                alt={currentProject.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Project Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                <div className="max-w-2xl">
                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">{currentProject.title}</h3>
                  <p className="text-white/80 text-base md:text-lg mb-6">{currentProject.description}</p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {currentProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/projects/${currentProject.id}`}
                    className="group inline-flex items-center text-white font-medium hover:text-white/80 transition-colors"
                  >
                    View Project
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
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
        </div>
      </section>

      {/* Services/Skills Section - Fixed Alignment */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-none">
              What I Build
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6 md:p-8">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <div className="w-8 h-8 bg-primary rounded"></div>
              </div>
              <h3 className="text-xl font-bold mb-4">Backend Systems</h3>
              <p className="text-muted-foreground leading-relaxed">
                Resilient microservices, distributed systems, high-performance APIs and more, built with Go and Java.
              </p>
            </div>

            <div className="text-center p-6 md:p-8">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <div className="w-8 h-8 bg-primary rounded-full"></div>
              </div>
              <h3 className="text-xl font-bold mb-4">Developer Tools</h3>
              <p className="text-muted-foreground leading-relaxed">
                Custom tools and automation for enhanced workflows.
              </p>
            </div>

            <div className="text-center p-6 md:p-8">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <div className="w-8 h-8 bg-primary rounded-sm rotate-45"></div>
              </div>
              <h3 className="text-xl font-bold mb-4">Electronic Music</h3>
              <p className="text-muted-foreground leading-relaxed">
                Cross-genre electronic music compositions as Stellarmantra, blending undergound culture and sound.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Fixed Alignment */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-none">
              Let's Build Something
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Ready to discuss your next project? I'm always interested in challenging problems and innovative
              solutions.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center text-xl font-medium hover:text-primary transition-colors"
            >
              Start a Conversation
              <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
