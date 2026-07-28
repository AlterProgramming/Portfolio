import type { Metadata } from 'next'
import { IntakeForm } from './IntakeForm'
import styles from './page.module.css'

const activationEnabled =
  process.env.NEXT_PUBLIC_COMMERCIAL_ACTIVATION_ENABLED === 'true'

export const metadata: Metadata = {
  title: 'Client Intake Sprint | BrightEngine',
  description:
    'A focused 72-hour website conversion sprint for local service businesses that need better-qualified inquiries and faster follow-up.',
  robots: activationEnabled ? 'index, follow' : 'noindex, nofollow',
}

const deliverables = [
  {
    title: 'One focused conversion page',
    body: 'A mobile-first page built around the service you most need to sell—not a full website rebuild.',
  },
  {
    title: 'A useful intake flow',
    body: 'Questions shaped around how you quote, schedule, qualify, or route a real customer request.',
  },
  {
    title: 'Immediate handoff',
    body: 'New inquiries are sent into the email or workflow endpoint you already monitor.',
  },
  {
    title: 'Acceptance-tested launch',
    body: 'You approve the page, form behavior, mobile layout, and lead payload before it goes live.',
  },
]

const steps = [
  ['01', 'Diagnose', 'We review the current site and identify one measurable point where inquiries stall.'],
  ['02', 'Shape', 'We turn your quoting or booking questions into a short, structured intake flow.'],
  ['03', 'Build', 'We implement the page, notifications, confirmation state, and analytics hooks.'],
  ['04', 'Approve', 'You test the full path. We launch only after the agreed acceptance checks pass.'],
]

const faqs = [
  {
    question: 'Do I need a new website?',
    answer:
      'No. The sprint can add one focused route to an existing site or ship as a standalone page linked from your current website and business profiles.',
  },
  {
    question: 'What does the 72-hour clock mean?',
    answer:
      'It begins after we receive your approved scope, website access or deployment route, brand assets, and the information needed to build the intake questions.',
  },
  {
    question: 'Can this include an AI chatbot?',
    answer:
      'Only when it improves the intake path. The default sprint prioritizes a reliable page and structured form; an FAQ assistant can be scoped as an add-on after the core path works.',
  },
  {
    question: 'Who owns the finished page?',
    answer:
      'You receive the completed page, field map, deployment notes, and handoff materials after final payment.',
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
            Request a slot
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
          <p className={styles.eyebrow}>BrightEngine Client Intake Sprint</p>
          <h1>Turn a weak website inquiry into a qualified client request.</h1>
          <p className={styles.heroLead}>
            In 72 hours, we add one focused conversion page, a structured intake flow, and a clean handoff into the inbox or workflow you already use.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="#apply">
              Request a build slot
            </a>
            <a className={styles.secondaryButton} href="#example">
              See the intake flow
            </a>
          </div>
          <p className={styles.microcopy}>
            Built for lawn care, cleaning, repair, installation, and other appointment-based local services.
          </p>
        </div>

        <div className={styles.heroSystem} aria-label="Example client intake pipeline">
          <div className={styles.systemTopline}>
            <span>Example inquiry</span>
            <span className={styles.statusDot}>Ready to qualify</span>
          </div>
          <div className={styles.systemCard}>
            <p className={styles.systemLabel}>Customer request</p>
            <strong>“Can someone give me a quote?”</strong>
          </div>
          <div className={styles.pipelineArrow}>↓</div>
          <div className={styles.systemCardAccent}>
            <p className={styles.systemLabel}>Structured intake</p>
            <ul>
              <li>Service and property type</li>
              <li>Location and preferred timing</li>
              <li>Photos or relevant details</li>
              <li>Best contact method</li>
            </ul>
          </div>
          <div className={styles.pipelineArrow}>↓</div>
          <div className={styles.systemResult}>
            <span>Owner receives</span>
            <strong>A usable request, not a vague notification.</strong>
          </div>
        </div>
      </section>

      <section className={styles.proofStrip} aria-label="Offer summary">
        <div><strong>72 hours</strong><span>after complete intake</span></div>
        <div><strong>One fixed scope</strong><span>designed to finish</span></div>
        <div><strong>Existing site</strong><span>no rebuild required</span></div>
        <div><strong>Human approval</strong><span>before launch</span></div>
      </section>

      <section className={styles.section} id="deliverables">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>What you receive</p>
          <h2>A complete intake path, not another disconnected widget.</h2>
          <p>
            The sprint focuses on one business outcome: helping the right customer give you enough information to respond quickly.
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
          <p className={styles.eyebrow}>Example transformation</p>
          <h2>From “contact us” to a request your team can act on.</h2>
        </div>
        <div className={styles.comparisonGrid}>
          <article className={styles.comparisonBefore}>
            <p className={styles.comparisonLabel}>Before</p>
            <h3>Name. Email. Message.</h3>
            <p>The owner still has to chase the customer for service, location, timing, budget, and photos.</p>
            <div className={styles.fakeField}>Name</div>
            <div className={styles.fakeField}>Email</div>
            <div className={`${styles.fakeField} ${styles.fakeFieldTall}`}>Message</div>
          </article>
          <article className={styles.comparisonAfter}>
            <p className={styles.comparisonLabel}>After</p>
            <h3>Questions that match the actual job.</h3>
            <p>The request arrives already shaped for a quote, appointment, or informed follow-up.</p>
            <div className={styles.answerRow}><span>Service</span><strong>Seasonal cleanup</strong></div>
            <div className={styles.answerRow}><span>Location</span><strong>West Omaha</strong></div>
            <div className={styles.answerRow}><span>Timing</span><strong>Within two weeks</strong></div>
            <div className={styles.answerRow}><span>Photos</span><strong>3 attached</strong></div>
          </article>
        </div>
      </section>

      <section className={styles.section} id="process">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Delivery process</p>
          <h2>Four bounded steps from website review to launch.</h2>
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
          <p className={styles.eyebrow}>Founding pilot offer</p>
          <h2>One fixed price. One useful launch.</h2>
          <p>
            The pilot price is for the first four businesses while the delivery system is being established and documented.
          </p>
          <ul>
            <li>Focused conversion page</li>
            <li>Custom intake questions and routing</li>
            <li>Mobile, accessibility, and form validation pass</li>
            <li>Owner handoff and deployment notes</li>
            <li>One revision round against the approved scope</li>
          </ul>
        </div>
        <aside className={styles.priceCard}>
          <p>Client Intake Sprint</p>
          <div className={styles.price}>$950</div>
          <span>fixed founding-pilot price</span>
          <div className={styles.paymentSplit}>
            <div><strong>$350</strong><span>to reserve the build</span></div>
            <div><strong>$600</strong><span>after acceptance</span></div>
          </div>
          <a className={styles.primaryButton} href="#apply">Request one of four slots</a>
          <small>Optional monitoring and small updates: $79/month after launch.</small>
        </aside>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Best fit</p>
          <h2>This works when the business is real and the website path is the problem.</h2>
        </div>
        <div className={styles.fitGrid}>
          <article>
            <h3>Strong fit</h3>
            <ul>
              <li>You already provide a defined local service.</li>
              <li>Customers visit your site but send incomplete inquiries.</li>
              <li>You can approve copy and questions quickly.</li>
              <li>You have a clear person or inbox that should receive leads.</li>
            </ul>
          </article>
          <article>
            <h3>Needs a different scope</h3>
            <ul>
              <li>You need a full brand, ecommerce store, or custom internal platform.</li>
              <li>The service itself, pricing, or target customer is still undefined.</li>
              <li>The project requires regulated data or complex account access.</li>
              <li>You need ongoing sales staffing rather than a better intake path.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Questions</p>
          <h2>What businesses usually need to know first.</h2>
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
          <p className={styles.eyebrow}>Request a slot</p>
          <h2>Show us where your current inquiry path breaks.</h2>
          <p>
            We will review the website, confirm whether the sprint fits, and return a short written scope before any reservation payment.
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
