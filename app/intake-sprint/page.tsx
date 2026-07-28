import type { Metadata } from 'next'
import { IntakeForm } from './IntakeForm'
import styles from './page.module.css'

const activationEnabled =
  process.env.NEXT_PUBLIC_COMMERCIAL_ACTIVATION_ENABLED === 'true'

export const metadata: Metadata = {
  title: 'Lawn Care Quote Intake Sprint | BrightEngine',
  description:
    'A focused 72-hour quote-request page and owner handoff for lawn-care and landscaping businesses.',
  robots: activationEnabled ? 'index, follow' : 'noindex, nofollow',
}

const deliverables = [
  {
    title: 'A lawn-care quote page',
    body: 'A mobile-first route added to the existing website without requiring a full redesign.',
  },
  {
    title: 'Questions that match the job',
    body: 'Service, property, timing, frequency, job details, photos, and preferred contact method.',
  },
  {
    title: 'A clean owner brief',
    body: 'Every request is transformed into a readable job summary and routed to the approved inbox or workflow.',
  },
  {
    title: 'Measurement from launch',
    body: 'Page views, form starts, successful submissions, and delivery failures can be measured from day one.',
  },
]

const steps = [
  ['01', 'Inspect', 'We review the public quote path and identify visible friction without claiming access to conversion data we have not seen.'],
  ['02', 'Map', 'We document the questions your team already asks before quoting, scheduling, or visiting a property.'],
  ['03', 'Build', 'We implement the page, structured request, owner handoff, confirmation state, and measurement hooks.'],
  ['04', 'Approve', 'You test the full path against written acceptance checks before anything replaces the current process.'],
]

const faqs = [
  {
    question: 'Do I need a new website?',
    answer:
      'No. The sprint can add one quote route to your existing site or ship as a standalone page linked from your current website and business profiles.',
  },
  {
    question: 'How do you know where leads are being lost?',
    answer:
      'We do not pretend to know from the public website alone. We identify visible friction, establish a hypothesis, and add measurement for page visits, form starts, submissions, and delivery failures. Operational results require access to the business’s response and quote data.',
  },
  {
    question: 'Can this include an AI chatbot?',
    answer:
      'Only when it improves the intake path. The default sprint prioritizes a reliable page and structured form; an FAQ assistant can be scoped as an add-on after the core path works.',
  },
  {
    question: 'What does the 72-hour clock mean?',
    answer:
      'It begins after the written scope is approved and we receive the required website access, brand assets, service questions, routing destination, and deployment path.',
  },
]

export default function ClientIntakeSprintPage() {
  return (
    <main className={styles.page}>
      <header className={styles.siteHeader}>
        <a className={styles.brand} href="/">
          BrightEngine
        </a>
        <nav className={styles.nav} aria-label="Page navigation">
          <a href="#deliverables">What you get</a>
          <a href="#process">Process</a>
          <a href="#pricing">Pricing</a>
          <a className={styles.navCta} href="#apply">
            Request a review
          </a>
        </nav>
      </header>

      {!activationEnabled ? (
        <aside className={styles.previewNotice}>
          <strong>Commercial preview.</strong> This build is intentionally non-transactional until activation is approved.
        </aside>
      ) : null}

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>BrightEngine Lawn Care Quote Intake Sprint</p>
          <h1>Stop trying to quote lawn jobs from three-line contact forms.</h1>
          <p className={styles.heroLead}>
            We add a focused quote-request page to your existing website that collects the property, service, timing, photos, and contact details you need before responding.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="/lawn-quote/">
              Try the complete demo
            </a>
            <a className={styles.secondaryButton} href="#apply">
              Request an intake review
            </a>
          </div>
          <p className={styles.microcopy}>
            Built first for lawn care and landscaping companies. No full website rebuild required.
          </p>
        </div>

        <div className={styles.heroSystem} aria-label="Lawn-care quote request pipeline">
          <div className={styles.systemTopline}>
            <span>Typical website inquiry</span>
            <span className={styles.statusDot}>Needs follow-up</span>
          </div>
          <div className={styles.systemCard}>
            <p className={styles.systemLabel}>Customer sends</p>
            <strong>“The yard needs cleanup. Can I get a quote?”</strong>
          </div>
          <div className={styles.pipelineArrow}>↓</div>
          <div className={styles.systemCardAccent}>
            <p className={styles.systemLabel}>Focused quote intake</p>
            <ul>
              <li>Mowing, cleanup, trimming, mulch, or other work</li>
              <li>Property type, approximate size, and service address</li>
              <li>One-time or recurring intent and preferred timing</li>
              <li>Job condition, photos, and response preference</li>
            </ul>
          </div>
          <div className={styles.pipelineArrow}>↓</div>
          <div className={styles.systemResult}>
            <span>Owner receives</span>
            <strong>A complete job brief ready for an informed response.</strong>
          </div>
        </div>
      </section>

      <section className={styles.proofStrip} aria-label="Offer summary">
        <div><strong>72 hours</strong><span>after complete client intake</span></div>
        <div><strong>Lawn-care specific</strong><span>not generic agency copy</span></div>
        <div><strong>Existing website</strong><span>one focused route</span></div>
        <div><strong>Measured path</strong><span>from visit through delivery</span></div>
      </section>

      <section className={styles.section} id="deliverables">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>What you receive</p>
          <h2>The actual quote experience your customers and crew will use.</h2>
          <p>
            The sprint does not sell an abstract chatbot or a disconnected widget. It builds one complete path from a customer choosing lawn work to the owner receiving a structured request.
          </p>
        </div>
        <div className={styles.cardGrid}>
          {deliverables.map((item) => (
            <article className={styles.featureCard} key={item.title}>
              <span className={styles.cardMark} aria-hidden="true">↗</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} id="example">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Working demonstration</p>
          <h2>See both sides of the request before buying anything.</h2>
          <p>
            The demonstration shows the customer’s four-step quote form and the live job brief the owner receives as each answer is entered.
          </p>
        </div>
        <div className={styles.comparisonGrid}>
          <article className={styles.comparisonBefore}>
            <p className={styles.comparisonLabel}>Generic contact form</p>
            <h3>Name. Email. Message.</h3>
            <p>The owner still has to ask what service, which property, how large, how soon, and what condition it is in.</p>
            <div className={styles.fakeField}>Name</div>
            <div className={styles.fakeField}>Email</div>
            <div className={`${styles.fakeField} ${styles.fakeFieldTall}`}>“Need yard cleanup. Please call.”</div>
          </article>
          <article className={styles.comparisonAfter}>
            <p className={styles.comparisonLabel}>BrightEngine quote brief</p>
            <h3>The job arrives already shaped.</h3>
            <p>The owner can decide how to respond instead of beginning with another information-gathering loop.</p>
            <div className={styles.answerRow}><span>Service</span><strong>Seasonal cleanup + final mow</strong></div>
            <div className={styles.answerRow}><span>Property</span><strong>West Omaha · medium yard</strong></div>
            <div className={styles.answerRow}><span>Timing</span><strong>Within two weeks</strong></div>
            <div className={styles.answerRow}><span>Photos</span><strong>4 attached</strong></div>
          </article>
        </div>
        <div className={styles.heroActions} style={{ marginTop: '1.4rem' }}>
          <a className={styles.primaryButton} href="/lawn-quote/">Open the interactive demo</a>
        </div>
      </section>

      <section className={styles.section} id="process">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Delivery process</p>
          <h2>Four bounded steps from visible friction to tested launch.</h2>
        </div>
        <ol className={styles.stepGrid}>
          {steps.map(([number, title, body]) => (
            <li key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.pricingSection} id="pricing">
        <div className={styles.pricingCopy}>
          <p className={styles.eyebrow}>Start with evidence or implementation</p>
          <h2>A smaller first decision, then a complete build.</h2>
          <p>
            The review is available when a business wants a concrete field map and implementation plan before committing to the full sprint. Its fee is credited when the sprint proceeds.
          </p>
          <ul>
            <li>Public quote-path review without invented conversion claims</li>
            <li>Lawn-service field map and page wireframe</li>
            <li>Routing, measurement, access, and deployment requirements</li>
            <li>Written acceptance checks before implementation</li>
          </ul>
        </div>
        <div className={styles.pricingStack}>
          <aside className={styles.reviewCard}>
            <p>Intake Review</p>
            <div className={styles.reviewPrice}>$250</div>
            <span>credited toward the full sprint</span>
            <ul>
              <li>Observed-path review</li>
              <li>Field map and wireframe</li>
              <li>Written implementation brief</li>
            </ul>
            <a className={styles.secondaryButton} href="#apply">Request the review</a>
          </aside>
          <aside className={styles.priceCard}>
            <p>Lawn Care Quote Intake Sprint</p>
            <div className={styles.price}>$950</div>
            <span>fixed founding-pilot price</span>
            <div className={styles.paymentSplit}>
              <div><strong>$350</strong><span>after scope approval</span></div>
              <div><strong>$600</strong><span>after acceptance</span></div>
            </div>
            <a className={styles.primaryButton} href="#apply">Request one of four slots</a>
            <small>Optional monitoring and small updates: $79/month after launch.</small>
          </aside>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Best fit</p>
          <h2>This works when the lawn-care service is defined and the request path is weak.</h2>
        </div>
        <div className={styles.fitGrid}>
          <article>
            <h3>Strong fit</h3>
            <ul>
              <li>You already provide defined lawn-care or landscaping services.</li>
              <li>Your current form collects little more than contact information and a message.</li>
              <li>Your team asks the same property and timing questions before quoting.</li>
              <li>You have a clear inbox, CRM, or workflow that should receive requests.</li>
            </ul>
          </article>
          <article>
            <h3>Needs a different scope</h3>
            <ul>
              <li>You need a full brand, ecommerce store, dispatch platform, or crew-management system.</li>
              <li>Your services, coverage area, or target customer are still undefined.</li>
              <li>You expect guaranteed lead volume without an acquisition plan or measurement baseline.</li>
              <li>You need ongoing sales staffing rather than a better intake path.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Questions</p>
          <h2>What lawn-care businesses usually need to know first.</h2>
        </div>
        <div className={styles.faqList}>
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.applySection} id="apply">
        <div className={styles.applyIntro}>
          <p className={styles.eyebrow}>Request a review or build slot</p>
          <h2>Show us the current quote path and the questions your crew still has to ask.</h2>
          <p>
            We will inspect the public website, confirm whether the offer fits, and return the appropriate next scope before any reservation payment.
          </p>
        </div>
        <IntakeForm />
      </section>

      <footer className={styles.footer}>
        <div>
          <strong>BrightEngine</strong>
          <span>Focused digital systems for bounded business outcomes.</span>
        </div>
        <a href="mailto:jeanjacquesakpakoun@gmail.com">jeanjacquesakpakoun@gmail.com</a>
      </footer>
    </main>
  )
}
