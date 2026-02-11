import { Header } from '@/components/Header'
import { ProjectGrid } from '@/components/ProjectGrid'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="container">
        <section id="home" className="section" aria-labelledby="hero-title">
          <p className="type-meta">Software Engineer</p>
          <h1 id="hero-title" className="type-h1" style={{ marginBottom: 12 }}>
            Building practical AI and web experiences.
          </h1>
          <p className="type-body-lg muted" style={{ maxWidth: 680, margin: 0 }}>
            I design and ship thoughtful products with strong foundations in accessibility,
            clarity, and measurable outcomes.
          </p>
        </section>

        <hr className="hr" />

        <section id="projects" className="section" aria-labelledby="projects-title">
          <h2 id="projects-title" className="type-h2" style={{ marginTop: 0 }}>
            Selected Projects
          </h2>
          <p className="type-body muted" style={{ marginTop: 0 }}>
            A curated snapshot of what I am currently building.
          </p>
          <ProjectGrid />
        </section>

        <hr className="hr" />

        <section id="about" className="section" aria-labelledby="about-title">
          <h2 id="about-title" className="type-h2" style={{ marginTop: 0 }}>
            About
          </h2>
          <p className="type-body muted" style={{ maxWidth: 760, marginBottom: 0 }}>
            I am focused on intelligent systems and polished interfaces that solve real
            problems. My work blends machine learning experimentation with disciplined
            front-end execution.
          </p>
        </section>

        <section id="contact" className="section" aria-labelledby="contact-title">
          <h2 id="contact-title" className="type-h2" style={{ marginTop: 0 }}>
            Contact
          </h2>
          <p className="type-body muted" style={{ marginTop: 0 }}>
            Open to collaboration and internships.
          </p>
          <a className="type-body-lg link" href="mailto:hello@example.com">
            hello@example.com
          </a>
        </section>
      </main>
    </>
  )
}
