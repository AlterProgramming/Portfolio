import type { Metadata } from 'next'
import styles from '../page.module.css'

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
          <h1>The review starts with the current quote path.</h1>
          <p>
            The public website and the information you supplied will be reviewed before any scope or payment request is sent. The next message should confirm observed friction, required access, the smallest useful deliverable, and the acceptance checks.
          </p>
        </div>

        <div className={styles.comparisonGrid}>
          <article className={styles.comparisonAfter}>
            <p className={styles.comparisonLabel}>What happens next</p>
            <h2>Fit and scope review</h2>
            <div className={styles.answerRow}><span>1</span><strong>Inspect the public lawn-care quote path</strong></div>
            <div className={styles.answerRow}><span>2</span><strong>Map the questions your crew still asks</strong></div>
            <div className={styles.answerRow}><span>3</span><strong>Recommend the review or full sprint</strong></div>
            <div className={styles.answerRow}><span>4</span><strong>Send written scope before payment</strong></div>
          </article>

          <article className={styles.comparisonBefore}>
            <p className={styles.comparisonLabel}>Prepare these items</p>
            <h2>Faster review</h2>
            <p>A prompt decision is easier when the following are ready.</p>
            <div className={styles.fakeField}>Website access or a deployment contact</div>
            <div className={styles.fakeField}>Logo, colors, services, and coverage area</div>
            <div className={styles.fakeField}>The questions asked before quoting</div>
            <div className={styles.fakeField}>The inbox, CRM, or workflow that receives requests</div>
          </article>
        </div>

        <div className={styles.heroActions} style={{ marginTop: '2rem' }}>
          <a className={styles.primaryButton} href="/lawn-quote/">
            Reopen the working demo
          </a>
          <a className={styles.secondaryButton} href="/">
            Return to the project hub
          </a>
        </div>
      </section>
    </main>
  )
}
