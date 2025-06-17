import type { Metadata } from "next"
import { RotatingBackground } from "@/components/rotating-background"
import { ArrowDown } from "lucide-react"

export const metadata: Metadata = {
  title: "About",
  description: "Backend engineer crafting resilient, modular systems in Go and Java.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      
      {/* <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <RotatingBackground />

        <div className="container relative z-10 text-center">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-8 leading-none">
              about
              <br />
              <span className="text-muted-foreground">me</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              Backend engineer crafting resilient, modular systems and electronic music.
            </p>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </section> */}

      {/* Content Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="md:col-span-1">
              <h2 className="text-3xl font-bold tracking-tight mb-6">Who am i ?</h2>
            </div>
            <div className="md:col-span-2 space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                I'm Samin Tejas. I write fast backend systems,modern CLI applications, build my own tools, and customize everything to suit my need.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                By profession, I'm a backend engineer who crafts resilient, modular systems in Go and Java — shipping
                production-grade microservices for real-world scale. But that's just the surface.
                I don't just code, I engineer ecosystems. I've built static site generators, AI powered task managers, markdown-based note
                systems, custom Linux environments, and productivity-first tooling from scratch. I automate what others
                tolerate. I tweak pixels,fix irrelevant errors, write my own shell scripts, and customize everyday tools to fit my workflow like a
                glove.
                Outside of code, I produce electronic music as Stellarmantra, because good systems
                should sound as smooth as they run.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                No fluff. Just clean code, efficient systems, and a deep love for the craft.
              </p>

              <h2 className="text-2xl font-bold tracking-tight mt-12 mb-6">Experience</h2>

              <div className="space-y-8">
                <div className="border-l-2 border-muted pl-6 relative">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                  <h3 className="text-lg font-bold">Senior Backend Engineer</h3>
                  <p className="text-sm text-muted-foreground mb-2">*secret for now* • 2025 - Present</p>
                  <p className="text-muted-foreground">
                    Top secret mission for now :)
                  </p>
                </div>

                <div className="border-l-2 border-muted pl-6 relative">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                  <h3 className="text-lg font-bold">Software Engineer</h3>
                  <p className="text-sm text-muted-foreground mb-2">6D Technologies • 2021 - 2025</p>
                  <p className="text-muted-foreground">
                  Backend development enabling high-performance and scalable telecom BSS (Billing and Payment) systems, with a focus on microservices architecture, real-time transaction processing, secure API integrations, and optimized data flow across distributed systems.
                   Experience in building robust billing engines, payments and collections systems, and customer management modules tailored to enterprise environments.
                  </p>
                </div>

                <div className="border-l-2 border-muted pl-6 relative">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                  <h3 className="text-lg font-bold">Lifelong Digital Wizard</h3>
                  <p className="text-sm text-muted-foreground mb-2">Tinkering with tech, code, and sound • 2014 – present</p>
                  <p className="text-muted-foreground">
                  From building small games and mods as a teen to crafting scalable backend systems and producing audio experiences,
                  my journey has always been about exploring the intersection of creativity and technology.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
