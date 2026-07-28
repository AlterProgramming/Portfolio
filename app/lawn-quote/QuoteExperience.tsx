'use client'

import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { lawnQuoteConfig } from './config'
import styles from './page.module.css'

type QuoteState = {
  services: string[]
  propertyType: string
  propertySize: string
  address: string
  frequency: string
  timeline: string
  details: string
  firstName: string
  lastName: string
  email: string
  phone: string
  contactMethod: string
  permission: boolean
}

type SubmissionState = 'idle' | 'sending' | 'success' | 'error'

type DataLayerWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>
}

const initialQuote: QuoteState = {
  services: [],
  propertyType: '',
  propertySize: '',
  address: '',
  frequency: '',
  timeline: '',
  details: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  contactMethod: 'Text message',
  permission: false,
}

const webhookUrl = process.env.NEXT_PUBLIC_LAWNCARE_DEMO_WEBHOOK_URL
const analyticsUrl = process.env.NEXT_PUBLIC_LAWNCARE_ANALYTICS_URL

function trackEvent(name: string, payload: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return

  const event = {
    event: name,
    source: 'prairie-pine-lawn-quote-demo',
    occurredAt: new Date().toISOString(),
    ...payload,
  }

  const target = window as DataLayerWindow
  target.dataLayer = target.dataLayer ?? []
  target.dataLayer.push(event)
  window.dispatchEvent(new CustomEvent('brightengine:analytics', { detail: event }))

  if (analyticsUrl && navigator.sendBeacon) {
    navigator.sendBeacon(
      analyticsUrl,
      new Blob([JSON.stringify(event)], { type: 'application/json' }),
    )
  }
}

function getServiceLabels(ids: string[]) {
  return ids
    .map((id) => lawnQuoteConfig.services.find((service) => service.id === id)?.label)
    .filter((label): label is string => Boolean(label))
}

export function QuoteExperience() {
  const [step, setStep] = useState(1)
  const [quote, setQuote] = useState<QuoteState>(initialQuote)
  const [photos, setPhotos] = useState<File[]>([])
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const [submittedReference, setSubmittedReference] = useState('')
  const startedRef = useRef(false)
  const formTopRef = useRef<HTMLDivElement>(null)

  const selectedServiceLabels = useMemo(
    () => getServiceLabels(quote.services),
    [quote.services],
  )

  const completeness = useMemo(() => {
    const checks = [
      quote.services.length > 0,
      Boolean(quote.propertyType),
      Boolean(quote.propertySize),
      Boolean(quote.address.trim()),
      Boolean(quote.timeline),
      Boolean(quote.details.trim()),
      Boolean(quote.firstName.trim()),
      Boolean(quote.email.trim()),
      Boolean(quote.phone.trim()),
      quote.permission,
    ]
    return Math.round((checks.filter(Boolean).length / checks.length) * 100)
  }, [quote])

  useEffect(() => {
    trackEvent('quote_page_view')
  }, [])

  function markStarted() {
    if (startedRef.current) return
    startedRef.current = true
    trackEvent('quote_form_started')
  }

  function updateQuote<K extends keyof QuoteState>(key: K, value: QuoteState[K]) {
    markStarted()
    setQuote((current) => ({ ...current, [key]: value }))
  }

  function toggleService(serviceId: string) {
    markStarted()
    setQuote((current) => ({
      ...current,
      services: current.services.includes(serviceId)
        ? current.services.filter((id) => id !== serviceId)
        : [...current.services, serviceId],
    }))
  }

  function handlePhotos(event: ChangeEvent<HTMLInputElement>) {
    markStarted()
    const nextPhotos = Array.from(event.target.files ?? []).slice(0, 6)
    setPhotos(nextPhotos)
    trackEvent('quote_photos_selected', { count: nextPhotos.length })
  }

  function validateStep(currentStep: number) {
    if (currentStep === 1 && quote.services.length === 0) {
      setStatusMessage('Choose at least one service to continue.')
      return false
    }

    if (
      currentStep === 2 &&
      (!quote.propertyType || !quote.propertySize || !quote.address.trim())
    ) {
      setStatusMessage('Add the property type, approximate size, and service address.')
      return false
    }

    if (currentStep === 3 && (!quote.timeline || !quote.details.trim())) {
      setStatusMessage('Choose a timeline and describe what the crew should know.')
      return false
    }

    return true
  }

  function goForward() {
    if (!validateStep(step)) return
    setStatusMessage('')
    trackEvent('quote_form_step_completed', { step })
    setStep((current) => Math.min(4, current + 1))
    formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function goBack() {
    setStatusMessage('')
    setStep((current) => Math.max(1, current - 1))
    formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (
      !quote.firstName.trim() ||
      !quote.email.trim() ||
      !quote.phone.trim() ||
      !quote.permission
    ) {
      setStatusMessage('Add your contact details and confirm permission to respond.')
      return
    }

    setSubmissionState('sending')
    setStatusMessage('Preparing your request…')

    const reference = `PP-${new Date().toISOString().slice(0, 10).replaceAll('-', '')}-${Math.random()
      .toString(36)
      .slice(2, 7)
      .toUpperCase()}`

    const payload = {
      reference,
      source: 'prairie-pine-lawn-quote-demo',
      submittedAt: new Date().toISOString(),
      customer: {
        firstName: quote.firstName,
        lastName: quote.lastName,
        email: quote.email,
        phone: quote.phone,
        preferredContactMethod: quote.contactMethod,
      },
      request: {
        services: selectedServiceLabels,
        propertyType: quote.propertyType,
        propertySize: quote.propertySize,
        address: quote.address,
        frequency: quote.frequency || 'Not specified',
        timeline: quote.timeline,
        details: quote.details,
        photoCount: photos.length,
        photoNames: photos.map((photo) => photo.name),
      },
    }

    try {
      if (webhookUrl) {
        const formData = new FormData()
        formData.append('payload', JSON.stringify(payload))
        photos.forEach((photo) => formData.append('photos', photo, photo.name))

        const response = await fetch(webhookUrl, {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          throw new Error(`Delivery returned ${response.status}`)
        }
      } else {
        await new Promise((resolve) => window.setTimeout(resolve, 650))
      }

      trackEvent('quote_form_submitted', {
        reference,
        services: quote.services,
        photoCount: photos.length,
        deliveryMode: webhookUrl ? 'webhook' : 'demonstration',
      })
      setSubmittedReference(reference)
      setSubmissionState('success')
      setStatusMessage('Your complete quote request is ready for the lawn-care owner.')
    } catch {
      trackEvent('quote_delivery_failed')
      setSubmissionState('error')
      setStatusMessage(
        'The request could not be delivered. Call the business directly and mention that the website form failed.',
      )
    }
  }

  if (submissionState === 'success') {
    return (
      <section className={styles.successPanel} aria-labelledby="quote-success-title">
        <div className={styles.successIcon} aria-hidden="true">✓</div>
        <p className={styles.kicker}>Request prepared</p>
        <h2 id="quote-success-title">The owner receives a complete job brief.</h2>
        <p>
          Demo reference <strong>{submittedReference}</strong>. In a client installation, this same payload is delivered to the approved inbox, CRM, or automation endpoint.
        </p>
        <div className={styles.successActions}>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => {
              setQuote(initialQuote)
              setPhotos([])
              setStep(1)
              setSubmissionState('idle')
              setStatusMessage('')
              setSubmittedReference('')
              startedRef.current = false
              trackEvent('quote_demo_restarted')
            }}
          >
            Start another example
          </button>
          <a className={styles.secondaryButton} href="/intake-sprint/">
            See the service behind this demo
          </a>
        </div>
      </section>
    )
  }

  return (
    <div className={styles.experienceGrid} ref={formTopRef}>
      <form className={styles.quoteForm} onSubmit={handleSubmit}>
        <div className={styles.formHeader}>
          <div>
            <p className={styles.kicker}>Request an estimate</p>
            <h2>Tell us enough to respond usefully.</h2>
          </div>
          <div className={styles.stepCount}>Step {step} of 4</div>
        </div>

        <div className={styles.progressTrack} aria-hidden="true">
          <span style={{ width: `${step * 25}%` }} />
        </div>

        {step === 1 ? (
          <fieldset className={styles.formSection}>
            <legend>What work do you need?</legend>
            <p className={styles.fieldHelp}>Choose every service that applies. You can explain the details later.</p>
            <div className={styles.serviceGrid}>
              {lawnQuoteConfig.services.map((service) => {
                const selected = quote.services.includes(service.id)
                return (
                  <label
                    key={service.id}
                    className={`${styles.serviceOption} ${selected ? styles.serviceOptionSelected : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleService(service.id)}
                    />
                    <span className={styles.serviceCheck} aria-hidden="true">{selected ? '✓' : '+'}</span>
                    <strong>{service.label}</strong>
                    <span>{service.description}</span>
                  </label>
                )
              })}
            </div>
          </fieldset>
        ) : null}

        {step === 2 ? (
          <fieldset className={styles.formSection}>
            <legend>What property are we looking at?</legend>
            <div className={styles.fieldGrid}>
              <label className={styles.field}>
                <span>Property type</span>
                <select
                  value={quote.propertyType}
                  onChange={(event) => updateQuote('propertyType', event.target.value)}
                  required
                >
                  <option value="">Select one</option>
                  {lawnQuoteConfig.propertyTypes.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>

              <label className={styles.field}>
                <span>Approximate property size</span>
                <select
                  value={quote.propertySize}
                  onChange={(event) => updateQuote('propertySize', event.target.value)}
                  required
                >
                  <option value="">Select one</option>
                  {lawnQuoteConfig.propertySizes.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>

              <label className={`${styles.field} ${styles.fieldWide}`}>
                <span>Service address</span>
                <input
                  value={quote.address}
                  onChange={(event) => updateQuote('address', event.target.value)}
                  autoComplete="street-address"
                  placeholder="1234 Example Street, Omaha, NE 681XX"
                  required
                />
                <small>Used only to understand the property and service area.</small>
              </label>

              <label className={`${styles.field} ${styles.fieldWide}`}>
                <span>Is this one-time or recurring work?</span>
                <div className={styles.choiceRow}>
                  {['One-time service', 'Recurring service', 'Not sure yet'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={quote.frequency === option ? styles.choiceActive : styles.choiceButton}
                      onClick={() => updateQuote('frequency', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </label>
            </div>
          </fieldset>
        ) : null}

        {step === 3 ? (
          <fieldset className={styles.formSection}>
            <legend>What should the crew know before responding?</legend>
            <div className={styles.fieldGrid}>
              <label className={styles.field}>
                <span>Preferred timing</span>
                <select
                  value={quote.timeline}
                  onChange={(event) => updateQuote('timeline', event.target.value)}
                  required
                >
                  <option value="">Select one</option>
                  {lawnQuoteConfig.timelines.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>

              <label className={`${styles.field} ${styles.fieldWide}`}>
                <span>Describe the work and current condition</span>
                <textarea
                  value={quote.details}
                  onChange={(event) => updateQuote('details', event.target.value)}
                  rows={6}
                  placeholder="Example: The back yard is overgrown around the fence. We need a one-time cleanup, final mow, and removal of leaves and small branches. The gate is about 42 inches wide."
                  required
                />
              </label>

              <label className={`${styles.field} ${styles.fieldWide}`}>
                <span>Helpful photos</span>
                <div className={styles.uploadBox}>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    onChange={handlePhotos}
                  />
                  <strong>{photos.length ? `${photos.length} photo${photos.length === 1 ? '' : 's'} selected` : 'Add up to six photos'}</strong>
                  <span>Wide property views and closeups of problem areas are most useful.</span>
                </div>
                {photos.length ? (
                  <ul className={styles.fileList}>
                    {photos.map((photo) => (
                      <li key={`${photo.name}-${photo.lastModified}`}>{photo.name}</li>
                    ))}
                  </ul>
                ) : null}
              </label>
            </div>
          </fieldset>
        ) : null}

        {step === 4 ? (
          <fieldset className={styles.formSection}>
            <legend>Where should we send the response?</legend>
            <div className={styles.fieldGrid}>
              <label className={styles.field}>
                <span>First name</span>
                <input
                  value={quote.firstName}
                  onChange={(event) => updateQuote('firstName', event.target.value)}
                  autoComplete="given-name"
                  required
                />
              </label>

              <label className={styles.field}>
                <span>Last name</span>
                <input
                  value={quote.lastName}
                  onChange={(event) => updateQuote('lastName', event.target.value)}
                  autoComplete="family-name"
                />
              </label>

              <label className={styles.field}>
                <span>Email</span>
                <input
                  type="email"
                  value={quote.email}
                  onChange={(event) => updateQuote('email', event.target.value)}
                  autoComplete="email"
                  required
                />
              </label>

              <label className={styles.field}>
                <span>Mobile phone</span>
                <input
                  type="tel"
                  value={quote.phone}
                  onChange={(event) => updateQuote('phone', event.target.value)}
                  autoComplete="tel"
                  required
                />
              </label>

              <div className={`${styles.field} ${styles.fieldWide}`}>
                <span>Preferred response method</span>
                <div className={styles.choiceRow}>
                  {lawnQuoteConfig.contactMethods.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={quote.contactMethod === option ? styles.choiceActive : styles.choiceButton}
                      onClick={() => updateQuote('contactMethod', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <label className={`${styles.consentField} ${styles.fieldWide}`}>
                <input
                  type="checkbox"
                  checked={quote.permission}
                  onChange={(event) => updateQuote('permission', event.target.checked)}
                  required
                />
                <span>
                  I authorize Prairie & Pine to contact me about this request. This demonstration does not send marketing messages.
                </span>
              </label>
            </div>
          </fieldset>
        ) : null}

        {statusMessage ? (
          <p
            className={submissionState === 'error' ? styles.formError : styles.formStatus}
            role="status"
          >
            {statusMessage}
          </p>
        ) : null}

        <div className={styles.formActions}>
          {step > 1 ? (
            <button type="button" className={styles.secondaryButton} onClick={goBack}>
              Back
            </button>
          ) : (
            <span />
          )}
          {step < 4 ? (
            <button type="button" className={styles.primaryButton} onClick={goForward}>
              Continue
            </button>
          ) : (
            <button
              type="submit"
              className={styles.primaryButton}
              disabled={submissionState === 'sending'}
            >
              {submissionState === 'sending' ? 'Sending…' : 'Send complete request'}
            </button>
          )}
        </div>
      </form>

      <aside className={styles.ownerPreview} aria-label="Live owner request preview">
        <div className={styles.previewHeader}>
          <div>
            <p className={styles.kicker}>Owner view</p>
            <h2>Incoming quote brief</h2>
          </div>
          <div className={styles.completeness}>
            <strong>{completeness}%</strong>
            <span>complete</span>
          </div>
        </div>

        <div className={styles.previewMeter} aria-hidden="true">
          <span style={{ width: `${completeness}%` }} />
        </div>

        <dl className={styles.summaryList}>
          <div>
            <dt>Services</dt>
            <dd>{selectedServiceLabels.length ? selectedServiceLabels.join(', ') : 'Waiting for selection'}</dd>
          </div>
          <div>
            <dt>Property</dt>
            <dd>
              {[quote.propertyType, quote.propertySize].filter(Boolean).join(' · ') || 'Not provided yet'}
            </dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>{quote.address || 'Not provided yet'}</dd>
          </div>
          <div>
            <dt>Service pattern</dt>
            <dd>{quote.frequency || 'Not provided yet'}</dd>
          </div>
          <div>
            <dt>Preferred timing</dt>
            <dd>{quote.timeline || 'Not provided yet'}</dd>
          </div>
          <div>
            <dt>Photos</dt>
            <dd>{photos.length ? `${photos.length} attached` : 'None attached yet'}</dd>
          </div>
          <div>
            <dt>Customer</dt>
            <dd>
              {[quote.firstName, quote.lastName].filter(Boolean).join(' ') || 'Not provided yet'}
            </dd>
          </div>
          <div>
            <dt>Respond by</dt>
            <dd>{quote.contactMethod || 'Not provided yet'}</dd>
          </div>
        </dl>

        <div className={styles.previewDetails}>
          <span>Job notes</span>
          <p>{quote.details || 'The customer’s description appears here as they complete the request.'}</p>
        </div>

        <div className={styles.previewFooter}>
          <span className={styles.previewBadge}>Structured request</span>
          <small>No CRM login required for the owner.</small>
        </div>
      </aside>
    </div>
  )
}
