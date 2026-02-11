import type { Project } from '@/data/projects'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card" aria-labelledby={`${project.id}-title`}>
      <header>
        <h3 id={`${project.id}-title`} className="type-h3 cardTitle">
          {project.title}
        </h3>
      </header>

      <p className="type-body muted" style={{ margin: 0 }}>
        {project.outcome}
      </p>

      <div className="tags" aria-label="Frameworks used">
        {project.tags.map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>

      {project.links?.length ? (
        <nav className="actions" aria-label={`${project.title} links`}>
          {project.links.map((l) => (
            <a
              key={`${project.id}-${l.label}`}
              className="actionLink"
              href={l.href}
              target="_blank"
              rel="noreferrer"
            >
              {l.label}
            </a>
          ))}
        </nav>
      ) : null}
    </article>
  )
}
