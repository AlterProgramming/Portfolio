import type { Metadata } from 'next'
import { QuoteExperience } from './QuoteExperience'
import { lawnQuoteConfig } from './config'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: `${lawnQuoteConfig.business.name} | Omaha Lawn Care Quote Demo`,
  description:
    'A complete demonstration of a structured quote-request experience for an Omaha lawn-care business.',
  robots: 'noindex, nofollow',
}

const services = [
  ['Mowing & edging', 'Clean cuts, sharp edges, and reliable recurring schedules.'],
  ['Seasonal cleanup', 'Leaves, debris, final mowing, and property resets.'],
  ['Shrub trimming', 'Thoughtful shaping with the cleanup included.'],
  ['Mulch & bed refresh', 'Bed cleanup, edging, and fresh mulch installation.'],
]

const trustPoints = [
  'Clear request details before the first call',
  'Photo-supported estimates when appropriate',
  'No account or app required',
  'A real person reviews every request',
]

export default function LawnQuoteDemoPage() {
  return (
    <main className={styles.page}>
      <header className={styles.siteHeader}>
        <a className={styles.logo} href="#top" aria-label={`${lawnQuoteConfig.business.name} home`}>
          <span className={styles.logoMark} aria-hidden="true">P&amp;P</span>
          <span>
            <strong>Prairie &amp; Pine</strong>
            <small>Lawn Co.</small>
          </span>
        </a>
        <nav className={styles.nav} aria-label="Main navigation">
          <a href="#services">Services</a>
          <a href="#how-it-works">How it works</a>
          <a href="#quote">Request estimate</a>
        </nav>
        <a className={styles.phoneLink} href={lawnQuoteConfig.business.phoneHref}>
          <span>Questions?</span>
          <strong>{lawnQuoteConfig.business.phoneDisplay}</strong>
        </a>
      </header>

      <aside className={styles.demoBanner}>
        <span>BrightEngine demonstration</span>
        <p>
          Prairie &amp; Pine is fictional. This route demonstrates the actual customer and owner experience delivered by the Client Intake Sprint.
        </p>
        <a href="/intake-sprint/">View the implementation service</a>
      </aside>

      <section className={styles.hero} id="top">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{lawnQuoteConfig.brand.eyebrow}</p>
          <h1>{lawnQuoteConfig.brand.headline}</h1>
          <p className={styles.heroLead}>{lawnQuoteConfig.brand.subheadline}</p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="#quote">Request an estimate</a>
            <a className={styles.textLink} href="#how-it-works">See what we ask and why</a>
          </div>
          <p className={styles.responseNote}>
            <span aria-hidden="true">●</span> {lawnQuoteConfig.business.responsePromise}
          </p>
        </div>

        <div className={styles.heroVisual} aria-label="Illustrated lawn care property card">
          <div className={styles.sun} />
          <div className={styles.cloudOne} />
          <div className={styles.cloudTwo} />
          <div className={styles.house}>
            <div className={styles.roof} />
            <div className={styles.houseBody}>
              <div className={styles.window} />
              <div className={styles.door} />
            </div>
          </div>
          <div className={styles.tree}>
            <span />
            <span />
            <i />
          </div>
          <div className={styles.lawnLines} />
          <div className={styles.heroCard}>
            <p>Quote request ready</p>
            <strong>Seasonal cleanup</strong>
            <span>West Omaha · 4 photos · within two weeks</span>
          </div>
        </div>
      </section>

      <section className={styles.trustStrip} aria-label="Service promises">
        {trustPoints.map((point) => (
          <div key={point}>
            <span aria-hidden="true">✓</span>
            <p>{point}</p>
          </div>
        ))}
      </section>

      <section className={styles.section} id="services">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Property care without the guesswork</p>
          <h2>Common jobs, clearly scoped.</h2>
          <p>
            A useful estimate starts with the type of work, property context, timing, and current condition. The request form below collects those details before the crew follows up.
          </p>
        </div>
        <div className={styles.serviceCards}>
          {services.map(([title, description], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <a href="#quote">Request this service →</a>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.processSection} id="how-it-works">
        <div className={styles.processCopy}>
          <p className={styles.eyebrow}>A better first conversation</p>
          <h2>The form follows the same questions a good estimator would ask.</h2>
          <p>
            Instead of collecting only a name and message, the request establishes the job, property, timing, photos, and preferred response method. The owner receives a readable work brief immediately.
          </p>
          <a className={styles.secondaryButton} href="#quote">Try the complete flow</a>
        </div>
        <ol className={styles.processSteps}>
          <li>
            <span>01</span>
            <div>
              <h3>Choose the work</h3>
              <p>Select every service that applies instead of compressing the job into one vague message.</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>Describe the property</h3>
              <p>Property type, approximate size, address, and one-time or recurring intent establish scope.</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>Add timing and photos</h3>
              <p>The owner can understand urgency and current condition before calling back.</p>
            </div>
          </li>
          <li>
            <span>04</span>
            <div>
              <h3>Receive a useful response</h3>
              <p>The request arrives as a complete brief routed to the business’s existing workflow.</p>
            </div>
          </li>
        </ol>
      </section>

      <section className={styles.quoteSection} id="quote">
        <div className={styles.quoteIntro}>
          <p className={styles.eyebrow}>Interactive demonstration</p>
          <h2>Complete the same request a customer would use.</h2>
          <p>
            The owner preview updates as the form is completed. In a production installation, the final brief and photos are delivered by webhook or email routing.
          </p>
        </div>
        <QuoteExperience />
      </section>

      <section className={styles.serviceAreaSection}>
        <div>
          <p className={styles.eyebrow}>Service area</p>
          <h2>Local crews. Clear routes. Practical scheduling.</h2>
          <p>{lawnQuoteConfig.business.serviceArea}.</p>
        </div>
        <div className={styles.areaMap} aria-label="Abstract Omaha service area illustration">
          <span className={styles.areaCore}>Omaha</span>
          <span className={styles.areaPointOne}>Elkhorn</span>
          <span className={styles.areaPointTwo}>Papillion</span>
          <span className={styles.areaPointThree}>La Vista</span>
        </div>
      </section>

      <footer className={styles.footer}>
        <a className={styles.logo} href="#top">
          <span className={styles.logoMark} aria-hidden="true">P&amp;P</span>
          <span>
            <strong>Prairie &amp; Pine</strong>
            <small>Lawn Co.</small>
          </span>
        </a>
        <div>
          <span>Fictional business used for a BrightEngine implementation demo.</span>
          <a href="/intake-sprint/">Build this intake system for a real business</a>
        </div>
      </footer>
    </main>
  )
}
