import styles from './pricing-options.module.css'

export function PricingOptions() {
  return (
    <div className={styles.stack}>
      <aside className={styles.reviewCard}>
        <div className={styles.cardTopline}>
          <p>Intake Review</p>
          <span>Smaller first step</span>
        </div>
        <div className={styles.reviewPrice}>$250</div>
        <p className={styles.priceNote}>Credited toward the full sprint when implementation proceeds.</p>
        <ul>
          <li>Observed public quote-path review</li>
          <li>Lawn-service field map and page wireframe</li>
          <li>Routing and measurement requirements</li>
          <li>Written implementation brief</li>
        </ul>
        <a className={styles.secondaryAction} href="#apply">Request the review</a>
      </aside>

      <aside className={styles.sprintCard}>
        <div className={styles.cardTopline}>
          <p>Lawn Care Quote Intake Sprint</p>
          <span>Founding pilot</span>
        </div>
        <div className={styles.sprintPrice}>$950</div>
        <p className={styles.priceNote}>One fixed build with written acceptance checks.</p>
        <div className={styles.paymentSplit}>
          <div><strong>$350</strong><span>after scope approval</span></div>
          <div><strong>$600</strong><span>after acceptance</span></div>
        </div>
        <a className={styles.primaryAction} href="#apply">Request one of four slots</a>
        <small>Optional monitoring and small updates: $79/month after launch.</small>
      </aside>
    </div>
  )
}
