import Image from "next/image"

interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
}

interface ProjectPreviewProps {
  project: Project
}

export function ProjectPreview({ project }: ProjectPreviewProps) {
  return (
    <div className="overflow-hidden rounded-lg">
      <Image
        src={project.image || "/placeholder.svg"}
        alt={project.title}
        width={600}
        height={400}
        className="w-full h-auto object-cover aspect-[3/2]"
      />
    </div>
  )
}
