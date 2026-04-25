'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { projects } from '@/data/projects'

function normalizeIndex(index: number, length: number) {
  return (index + length) % length
}

function isExternalHref(href: string) {
  return href.startsWith('http')
}

export function FeaturedProjects() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')

  const activeProject = useMemo(() => projects[activeIndex], [activeIndex])

  const goToPrevious = useCallback(() => {
    setDirection('prev')
    setActiveIndex((current) => normalizeIndex(current - 1, projects.length))
  }, [])

  const goToNext = useCallback(() => {
    setDirection('next')
    setActiveIndex((current) => normalizeIndex(current + 1, projects.length))
  }, [])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goToPrevious()
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        goToNext()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [goToNext, goToPrevious])

  useEffect(() => {
    const hash = window.location.hash.replace('#project-', '')
    if (!hash) return
    const found = projects.findIndex((project) => project.id === hash)
    if (found >= 0) setActiveIndex(found)
  }, [])

  useEffect(() => {
    history.replaceState(null, '', `#project-${activeProject.id}`)
  }, [activeProject.id])

  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  function onTouchStart(clientX: number) {
    setTouchEnd(null)
    setTouchStart(clientX)
  }

  function onTouchMove(clientX: number) {
    setTouchEnd(clientX)
  }

  function onTouchEnd() {
    if (touchStart === null || touchEnd === null) return
    const delta = touchStart - touchEnd
    if (delta > 45) goToNext()
    if (delta < -45) goToPrevious()
  }

  return (
    <div className="featuredWrap">
      <div className="viewerControls" role="group" aria-label="Project controls">
        <button type="button" className="viewerButton" onClick={goToPrevious} aria-label="Previous project">
          Prev
        </button>
        <p className="type-meta viewerMeta" aria-live="polite">
          {activeIndex + 1} / {projects.length}
        </p>
        <button type="button" className="viewerButton" onClick={goToNext} aria-label="Next project">
          Next
        </button>
      </div>

      <article className="viewer" aria-labelledby={`${activeProject.id}-title`}>
        <div className="viewerMedia mobileOnly">
          <div
            className={`artifactFrame ${direction}`}
            style={{
              background: `linear-gradient(140deg, ${activeProject.artifactGradient[0]}, ${activeProject.artifactGradient[1]})`,
            }}
            onTouchStart={(event) => onTouchStart(event.changedTouches[0].clientX)}
            onTouchMove={(event) => onTouchMove(event.changedTouches[0].clientX)}
            onTouchEnd={onTouchEnd}
          >
            <div className="artifactContent">
              <p className="type-meta">Artifact</p>
              <h4 className="artifactTitle">{activeProject.artifactLabel}</h4>
            </div>
          </div>
        </div>

        <div className="viewerText">
          <header>
            <h3 id={`${activeProject.id}-title`} className="type-h3 viewerTitle" aria-live="polite">
              {activeProject.title}
            </h3>
          </header>
          <p className="type-body-lg muted viewerOutcome">{activeProject.outcome}</p>

          <ul className="viewerHighlights">
            {activeProject.highlights.slice(0, 3).map((highlight) => (
              <li key={highlight} className="type-body muted">
                {highlight}
              </li>
            ))}
          </ul>

          <div className="viewerMetaRow">
            <div className="tags" aria-label="Frameworks used">
              {activeProject.tags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>
            {activeProject.status ? <span className="statusChip">{activeProject.status}</span> : null}
          </div>

          {activeProject.links?.length ? (
            <nav className="viewerActions" aria-label={`${activeProject.title} links`}>
              {activeProject.links.map((link, index) => (
                <a
                  key={`${activeProject.id}-${link.label}`}
                  className={index === 0 ? 'actionPrimary' : 'actionLink'}
                  href={link.href}
                  target={isExternalHref(link.href) ? '_blank' : undefined}
                  rel={isExternalHref(link.href) ? 'noreferrer' : undefined}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          ) : null}

          {activeProject.artifactNote ? (
            <p className="artifactNote" role="note">
              {activeProject.artifactNote}
            </p>
          ) : null}
        </div>

        <div className="viewerMedia desktopOnly">
          <div
            className={`artifactFrame ${direction}`}
            style={{
              background: `linear-gradient(140deg, ${activeProject.artifactGradient[0]}, ${activeProject.artifactGradient[1]})`,
            }}
          >
            <div className="artifactContent">
              <p className="type-meta">Artifact</p>
              <h4 className="artifactTitle">{activeProject.artifactLabel}</h4>
            </div>
          </div>
        </div>
      </article>

      <div className="miniGrid" role="tablist" aria-label="Jump to project">
        {projects.map((project, index) => (
          <button
            key={project.id}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            className={`miniCard ${index === activeIndex ? 'active' : ''}`}
            onClick={() => {
              setDirection(index > activeIndex ? 'next' : 'prev')
              setActiveIndex(index)
            }}
          >
            <span className="miniTitle">{project.title}</span>
            <span className="miniOutcome">{project.outcome}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
