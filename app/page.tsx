import { Header } from '@/components/Header'
import { FeaturedProjects } from '@/components/FeaturedProjects'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="container pageFlow">
        <section id="home" className="hero" aria-labelledby="hero-title">
          <p className="type-meta">Software Engineer</p>
          <h1 id="hero-title" className="type-h1 heroTitle">
            Building practical AI and web experiences.
          </h1>
          <p className="type-body-lg muted heroSummary">
            I design and ship thoughtful products with strong foundations in accessibility,
            clarity, and measurable outcomes.
          </p>
          <div className="heroActions">
            <a href="#projects" className="actionPrimary">
              View Projects
            </a>
            <a href="#contact" className="actionLink">
              Contact
            </a>
          </div>
        </section>

        <section id="projects"  aria-labelledby="projects-title">
          <header className="sectionHeader">
            <p className="type-meta">Curated Workspace</p>
            {/* <h2 id="projects-title" className="type-h2 sectionTitle">
              Featured Project Viewer
            </h2> */}
          </header>
          <FeaturedProjects />
        </section>

        <section className="sectionSplit" aria-label="About and contact">
          <article id="about" className="infoPanel" aria-labelledby="about-title">
            <p className="type-meta">Profile</p>
            <h2 id="about-title" className="type-h2 sectionTitle">
              About
            </h2>
            <p className="type-body muted infoBody">
              I focus on intelligent systems and polished interfaces that solve real
              problems. My workflow blends model experimentation with careful front-end
              execution.
            </p>
          </article>

          <article id="contact" className="infoPanel" aria-labelledby="contact-title">
            <p className="type-meta">Open status</p>
            <h2 id="contact-title" className="type-h2 sectionTitle">
              Contact
            </h2>
            <p className="type-body muted infoBody">Available for internships and collaboration.</p>
            <a className="type-body-lg link" href="mailto:hello@example.com">
              hello@example.com
            </a>
          </article>
        </section>
      </main>
    </>
  )
}
