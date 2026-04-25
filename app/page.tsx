import { Header } from '@/components/Header'
import { FeaturedProjects } from '@/components/FeaturedProjects'

type LiveRoute = {
  href: string
  label: string
  eyebrow: string
  summary: string
  emphasis?: boolean
}

const liveRoutes: LiveRoute[] = [
  {
    href: 'https://battle.jakpakoun.com',
    label: 'battle.jakpakoun.com',
    eyebrow: 'Primary App',
    summary: 'Main public route for the Pokemon product experience.',
    emphasis: true,
  },
  {
    href: 'https://jakpakoun.com/kitoko/',
    label: 'jakpakoun.com/kitoko',
    eyebrow: 'Archive Route',
    summary: 'Secondary route for the Kitoko static archive.',
  },
  {
    href: '#projects',
    label: 'Project Workspace',
    eyebrow: 'Build Surface',
    summary: 'Current workstream map and active product tracks.',
  },
]

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="container pageFlow">
        <section id="home" className="hero" aria-labelledby="hero-title">
          <div className="heroGrid">
            <div className="heroLead">
              <p className="type-meta">Portfolio Hub</p>
              <h1 id="hero-title" className="type-h1 heroTitle">
                Central launch surface for products and projects
              </h1>
              <p className="type-body-lg muted heroSummary">
                One root view for the live Pokemon app, route map, and project workspace.
              </p>
              <div className="heroActions">
                <a href="https://battle.jakpakoun.com" className="actionPrimary">
                  Open Pokemon App
                </a>
                <a href="#projects" className="actionLink">
                  Browse projects
                </a>
              </div>
            </div>

            <aside className="heroDock" aria-label="Current hub map">
              <p className="type-meta">Quick Navigation</p>
              <ul className="dockList">
                <li>
                  <a href="#routes" className="dockLink">
                    Live routes
                  </a>
                </li>
                <li>
                  <a href="#projects" className="dockLink">
                    Featured projects
                  </a>
                </li>
                <li>
                  <a href="#contact" className="dockLink">
                    Access and contact
                  </a>
                </li>
              </ul>
            </aside>
          </div>
        </section>

        <section id="routes" aria-labelledby="routes-title">
          <header className="sectionHeader">
            <p className="type-meta">Launch Map</p>
            <h2 id="routes-title" className="type-h2 sectionTitle">
              Live Routes
            </h2>
          </header>
          <div className="routeGrid">
            {liveRoutes.map((route) => (
              <a
                key={route.href}
                className={`routeTile ${route.emphasis ? 'routeTilePrimary' : ''}`}
                href={route.href}
              >
                <span className="type-meta">{route.eyebrow}</span>
                <strong>{route.label}</strong>
                <span>{route.summary}</span>
                {route.emphasis ? <span className="routeBadge">Primary launch</span> : null}
              </a>
            ))}
          </div>
        </section>

        <section id="projects" aria-labelledby="projects-title">
          <header className="sectionHeader">
            <p className="type-meta">Workspace</p>
            <h2 id="projects-title" className="type-h2 sectionTitle">
              Projects
            </h2>
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
              This root is intentionally navigation-first. Each project keeps its own route
              while the hub stays focused on clear launch points.
            </p>
          </article>

          <article id="contact" className="infoPanel" aria-labelledby="contact-title">
            <p className="type-meta">Contact</p>
            <h2 id="contact-title" className="type-h2 sectionTitle">
              Access
            </h2>
            <p className="type-body muted infoBody">
              For route updates, project access, and collaboration.
            </p>
            <a className="type-body-lg link" href="mailto:jeanjacquesakpakoun@gmail.com">
              jeanjacquesakpakoun@gmail.com
            </a>
            <p className="operatorAccess muted">
              Approved operators only:{' '}
              <a className="operatorLink" href="/admin">
                admin gateway
              </a>
            </p>
          </article>
        </section>
      </main>
    </>
  )
}
