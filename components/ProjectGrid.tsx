import { projects } from '@/data/projects'
import { ProjectCard } from '@/components/ProjectCard'

export function ProjectGrid() {
  return (
    <div className="grid">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
