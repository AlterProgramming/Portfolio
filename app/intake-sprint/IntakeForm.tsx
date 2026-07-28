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
    'BrightEngine Client Intake Sprint inquiry',
    '',
    `Business: ${data.businessName}`,
    `Contact: ${data.contactName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || 'Not provided'}`,
    `Website: ${data.website}`,
    `Business type: ${data.businessType}`,
    `Primary lead problem: ${data.leadProblem}`,
    `Approximate monthly inquiries: ${data.monthlyInquiries || 'Not sure'}`,
    `Preferred launch window: ${data.launchWindow || 'Flexible'}`,
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
            source: 'brightengine-client-intake-sprint',
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
        `Client Intake Sprint — ${payload.businessName || 'new inquiry'}`,
      )
      const body = encodeURIComponent(buildEmailBody(payload))
      window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`
      setSubmissionState('sent')
      setMessage('Your email app should open with the inquiry prepared.')
    } catch {
      setSubmissionState('error')
      setMessage(
        `The form could not send. Email ${contactEmail} with your website and primary lead problem.`,
      )
    }
  }

  return (
    <form className={styles.intakeForm} onSubmit={handleSubmit}>
      <fieldset className={styles.fieldset} disabled={!activationEnabled || submissionState === 'submitting'}>
        <legend className={styles.srOnly}>Request a Client Intake Sprint</legend>

        <div className={styles.formGrid}>
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
              placeholder="https://yourbusiness.com"
              required
            />
          </label>

          <label className={styles.field}>
            <span>Business type</span>
            <select name="businessType" required defaultValue="">
              <option value="" disabled>
                Select one
              </option>
              <option>Lawn care or landscaping</option>
              <option>Cleaning service</option>
              <option>Repair or installation</option>
              <option>Professional service</option>
              <option>Other local service</option>
            </select>
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

          <label className={`${styles.field} ${styles.fieldWide}`}>
            <span>Where are leads getting lost?</span>
            <textarea
              name="leadProblem"
              rows={4}
              placeholder="Example: people ask for quotes, but the form gives us too little information to respond quickly."
              required
            />
          </label>

          <label className={styles.field}>
            <span>Preferred launch window</span>
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
            {activationEnabled ? 'Request a build slot' : 'Preview only — activation pending'}
          </button>
          <p>
            No payment is collected here. A slot is reserved only after scope review and written approval.
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
