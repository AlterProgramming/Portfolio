'use client'

import { FormEvent, useState } from 'react'
import styles from './page.module.css'

type SubmissionState = 'idle' | 'submitting' | 'sent' | 'error'

const activationEnabled =
  process.env.NEXT_PUBLIC_COMMERCIAL_ACTIVATION_ENABLED === 'true'
const webhookUrl = process.env.NEXT_PUBLIC_INTAKE_WEBHOOK_URL
const contactEmail =
  process.env.NEXT_PUBLIC_INTAKE_EMAIL ?? 'jeanjacquesakpakoun@gmail.com'

function buildEmailBody(data: Record<string, string>) {
  return [
    'BrightEngine Lawn Care Quote Intake inquiry',
    '',
    `Requested starting point: ${data.requestType}`,
    `Business: ${data.businessName}`,
    `Contact: ${data.contactName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || 'Not provided'}`,
    `Website: ${data.website}`,
    `Service area: ${data.serviceArea}`,
    `Current quote path: ${data.currentQuotePath}`,
    `Approximate monthly website inquiries: ${data.monthlyInquiries || 'Not sure'}`,
    `Preferred timing: ${data.launchWindow || 'Flexible'}`,
    '',
    'Services offered:',
    data.servicesOffered || 'Not provided',
    '',
    'Questions the team still asks before quoting:',
    data.repeatedQuestions || 'Not provided',
    '',
    'Available website or workflow access:',
    data.availableAccess || 'Not provided',
    '',
    'Additional context:',
    data.context || 'None provided',
  ].join('\n')
}

export function IntakeForm() {
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!activationEnabled) {
      setSubmissionState('error')
      setMessage('This preview is not accepting commercial inquiries yet.')
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)
    const honeypot = String(formData.get('companyWebsite') ?? '')

    if (honeypot) {
      setSubmissionState('sent')
      setMessage('Thank you. Your request has been received.')
      return
    }

    const payload = Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => [key, String(value)]),
    ) as Record<string, string>

    setSubmissionState('submitting')
    setMessage('Sending your request…')

    try {
      if (webhookUrl) {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            source: 'brightengine-lawn-care-intake-sprint',
            submittedAt: new Date().toISOString(),
            ...payload,
          }),
        })

        if (!response.ok) {
          throw new Error(`Intake endpoint returned ${response.status}`)
        }

        window.location.assign('/intake-sprint/thank-you/')
        return
      }

      const subject = encodeURIComponent(
        `Lawn Care Intake ${payload.requestType || 'request'} — ${payload.businessName || 'new inquiry'}`,
      )
      const body = encodeURIComponent(buildEmailBody(payload))
      window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`
      setSubmissionState('sent')
      setMessage('Your email app should open with the inquiry prepared.')
    } catch {
      setSubmissionState('error')
      setMessage(
        `The form could not send. Email ${contactEmail} with the business website and the questions your team asks before quoting.`,
      )
    }
  }

  return (
    <form className={styles.intakeForm} onSubmit={handleSubmit}>
      <fieldset className={styles.fieldset} disabled={!activationEnabled || submissionState === 'submitting'}>
        <legend className={styles.srOnly}>Request a lawn-care intake review or sprint</legend>

        <div className={styles.formGrid}>
          <label className={`${styles.field} ${styles.fieldWide}`}>
            <span>Where would you like to start?</span>
            <select name="requestType" required defaultValue="Intake Review — $250">
              <option>Intake Review — $250</option>
              <option>Full Quote Intake Sprint — $950</option>
              <option>Not sure — recommend the smallest useful scope</option>
            </select>
          </label>

          <label className={styles.field}>
            <span>Business name</span>
            <input name="businessName" autoComplete="organization" required />
          </label>

          <label className={styles.field}>
            <span>Your name</span>
            <input name="contactName" autoComplete="name" required />
          </label>

          <label className={styles.field}>
            <span>Work email</span>
            <input name="email" type="email" autoComplete="email" required />
          </label>

          <label className={styles.field}>
            <span>Phone</span>
            <input name="phone" type="tel" autoComplete="tel" />
          </label>

          <label className={`${styles.field} ${styles.fieldWide}`}>
            <span>Current website</span>
            <input
              name="website"
              type="url"
              inputMode="url"
              placeholder="https://yourlawncompany.com"
              required
            />
          </label>

          <label className={styles.field}>
            <span>Primary service area</span>
            <input
              name="serviceArea"
              placeholder="Example: Omaha, Elkhorn, and Papillion"
              required
            />
          </label>

          <label className={styles.field}>
            <span>Current quote path</span>
            <select name="currentQuotePath" required defaultValue="">
              <option value="" disabled>Select one</option>
              <option>Generic website contact form</option>
              <option>Phone or text only</option>
              <option>Email link only</option>
              <option>Existing quote form that needs improvement</option>
              <option>Third-party booking or CRM form</option>
              <option>Not sure</option>
            </select>
          </label>

          <label className={`${styles.field} ${styles.fieldWide}`}>
            <span>Which lawn-care or landscaping services do you offer?</span>
            <textarea
              name="servicesOffered"
              rows={3}
              placeholder="Example: recurring mowing, spring and fall cleanup, hedge trimming, mulch installation, and overgrowth cleanup."
              required
            />
          </label>

          <label className={`${styles.field} ${styles.fieldWide}`}>
            <span>What questions does your team still ask before quoting?</span>
            <textarea
              name="repeatedQuestions"
              rows={5}
              placeholder="Example: address, lot size, service type, one-time or recurring, current grass height, gate width, preferred timing, and whether photos are available."
              required
            />
          </label>

          <label className={`${styles.field} ${styles.fieldWide}`}>
            <span>What access or routing is currently available?</span>
            <textarea
              name="availableAccess"
              rows={3}
              placeholder="Example: WordPress administrator, website developer contact, shared quote inbox, Jobber, Housecall Pro, HubSpot, or an n8n webhook."
            />
          </label>

          <label className={styles.field}>
            <span>Monthly website inquiries</span>
            <select name="monthlyInquiries" defaultValue="Not sure">
              <option>0–5</option>
              <option>6–20</option>
              <option>21–50</option>
              <option>More than 50</option>
              <option>Not sure</option>
            </select>
          </label>

          <label className={styles.field}>
            <span>Preferred timing</span>
            <select name="launchWindow" defaultValue="Within two weeks">
              <option>As soon as possible</option>
              <option>Within two weeks</option>
              <option>This month</option>
              <option>Flexible</option>
            </select>
          </label>

          <label className={`${styles.field} ${styles.fieldWide}`}>
            <span>Anything else we should know?</span>
            <textarea name="context" rows={3} />
          </label>
        </div>

        <label className={styles.honeypot} aria-hidden="true">
          Company website confirmation
          <input name="companyWebsite" tabIndex={-1} autoComplete="off" />
        </label>

        <div className={styles.formFooter}>
          <button className={styles.primaryButton} type="submit">
            {activationEnabled ? 'Request the appropriate next scope' : 'Preview only — activation pending'}
          </button>
          <p>
            No payment is collected here. A review or build begins only after written scope approval.
          </p>
        </div>
      </fieldset>

      {message ? (
        <p
          className={submissionState === 'error' ? styles.formError : styles.formStatus}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  )
}
