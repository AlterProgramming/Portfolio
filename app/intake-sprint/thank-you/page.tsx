import type { Metadata } from 'next'
import styles from '../page.module.css'

const activationEnabled =
  process.env.NEXT_PUBLIC_COMMERCIAL_ACTIVATION_ENABLED === 'true'
const paymentLink = process.env.NEXT_PUBLIC_PAYMENT_LINK_URL

export const metadata: Metadata = {
  title: 'Request Received | BrightEngine',
  robots: 'noindex, nofollow',
}

export default function IntakeThankYouPage() {
  return (
    <main className={styles.page}>
      <header className={styles.siteHeader}>
        <a className={styles.brand} href="/">
          BrightEngine
        </a>
        <a className={styles.navCta} href="/intake-sprint/">
          Return to the sprint
        </a>
      </header>

      <section className={styles.section}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Request received</p>
          <h1>We have the starting point.</h1>
          <p>
            Your website and intake problem will be reviewed before any scope or payment request is sent. The next message should confirm fit, required access, the bounded deliverable, and the acceptance checks.
          </p>
        </div>

        <div className={styles.comparisonGrid}>
          <article className={styles.comparisonAfter}>
            <p className={styles.comparisonLabel}>What happens next</p>
            <h2>Scope review</h2>
            <div className={styles.answerRow}><span>1</span><strong>Review the current inquiry path</strong></div>
            <div className={styles.answerRow}><span>2</span><strong>Confirm the smallest useful build</strong></div>
            <div className={styles.answerRow}><span>3</span><strong>Send scope and acceptance checks</strong></div>
            <div className={styles.answerRow}><span>4</span><strong>Reserve the build only after approval</strong></div>
          </article>

          <article className={styles.comparisonBefore}>
            <p className={styles.comparisonLabel}>Prepare these items</p>
            <h2>Faster review</h2>
            <p>A prompt scope is easier when the following are ready.</p>
            <div className={styles.fakeField}>Website access or deployment contact</div>
            <div className={styles.fakeField}>Logo, colors, and service photos</div>
            <div className={styles.fakeField}>The questions you ask before quoting</div>
            <div className={styles.fakeField}>The inbox or workflow that receives inquiries</div>
          </article>
        </div>

        <div className={styles.heroActions} style={{ marginTop: '2rem' }}>
          {activationEnabled && paymentLink ? (
            <a className={styles.primaryButton} href={paymentLink} rel="noreferrer">
              Reserve the approved slot — $350
            </a>
          ) : null}
          <a className={styles.secondaryButton} href="/">
            Return to the project hub
          </a>
        </div>
      </section>
    </main>
  )
}
