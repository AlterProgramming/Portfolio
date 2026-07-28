# BrightEngine Client Intake Sprint

## Commercial objective

Sell a small, bounded website conversion service that can be explained in one sentence, delivered quickly, and turned into a repeatable implementation system.

**Offer:** In 72 hours after complete intake, BrightEngine adds one focused conversion page, a structured client-intake flow, and a tested handoff into the business owner's existing inbox or workflow.

This is not positioned as generic web development. The product is a better inquiry path for an already-operating local service business.

## Initial customer

Prioritize appointment- and quote-based local businesses with an existing website:

- lawn care and landscaping;
- cleaning services;
- repair and installation businesses;
- photographers and event services;
- small professional practices that do not handle regulated data in this flow.

Strong evidence of fit:

1. The business has a real, defined service.
2. Its site uses a vague contact form or only a phone number.
3. The owner repeatedly asks the same questions before quoting or booking.
4. One person or inbox can receive and respond to inquiries.
5. The owner can approve copy and access within one business day.

## Founding-pilot price

- Total: **$950**
- Reservation after written scope approval: **$350**
- Completion payment after acceptance checks: **$600**
- Optional monitoring and small updates after launch: **$79/month**
- Capacity: first four founding-pilot businesses

Do not discount below the published pilot price. Reduce scope instead.

## Included scope

1. One focused conversion page.
2. Custom intake questions mapped to the business's actual qualification process.
3. Form validation and spam honeypot.
4. Lead delivery through a configured webhook or prepared email fallback.
5. Branded confirmation state.
6. Mobile and accessibility pass.
7. Analytics event hooks when the host site already has analytics.
8. One revision round against the approved scope.
9. Deployment and handoff notes.

Anything outside this list requires a separate written scope.

## Delivery workflow

### 1. Fit review

Review the current website and answer:

- What service should this page convert?
- What information does the owner need before responding?
- Where should the inquiry be delivered?
- What access is available?
- Is the task possible without regulated or sensitive data?

Reject or rescope work that requires a full rebrand, ecommerce build, custom account system, regulated-data workflow, or undefined service strategy.

### 2. Written work brief

Before payment, send a one-page brief containing:

- target visitor;
- target action;
- page route;
- intake fields;
- notification destination;
- supplied assets;
- exclusions;
- acceptance checks;
- 72-hour start condition.

### 3. Reservation

After the client approves the written work brief, send the $350 reservation link. Work begins only when the reservation is received and required access/assets are complete.

### 4. Build

Use the existing site stack when practical. Otherwise deploy a standalone static route. Keep the form payload explicit and avoid storing personal data unless storage is part of the approved scope.

### 5. Acceptance

The client tests:

- route loads on mobile and desktop;
- required fields and validation behave correctly;
- inquiry payload reaches the approved destination;
- confirmation state appears;
- links and contact information are correct;
- supplied brand assets render correctly.

### 6. Handoff

Collect the $600 completion payment after acceptance. Deliver source, field map, deployment notes, and the rollback route.

## Sales motion

Do not begin with mass outreach. Build a list of 20 local businesses where the inquiry problem can be observed directly on the public website.

For each business, record:

- business and owner/manager name;
- current website route;
- observed inquiry weakness;
- one concrete improvement;
- public business contact route;
- outreach status;
- next action.

### First message

Lead with the observed problem, not AI or web-development terminology:

> I looked at the request path on your website. A customer can send a message, but the form does not collect the information you would need to quote or schedule the work. I build a focused intake page around the questions you already ask, connect it to your current inbox, and deliver it as a fixed 72-hour sprint. I can send a one-page example based on your current site.

### Follow-up

> I mapped a possible intake path for your site: service type, location, preferred timing, job details, and photos before the request reaches you. The founding pilot is $950 total, split into $350 after scope approval and $600 after the finished path passes the agreed checks. Would a ten-minute review be useful?

## Revenue model

Founding stage:

- 1 sprint: $950 revenue
- 2 sprints: $1,900 revenue
- 4-sprint capacity: $3,800 revenue
- 4 optional care plans: $316 monthly recurring revenue

After four completed pilots and permission to use evidence, reassess price. The intended next price is $1,400–$1,800 based on complexity, while preserving a bounded deliverable.

## Activation and immigration gate

The repository may be built and reviewed as a non-transactional preview. Do not publish it as an active commercial solicitation, accept reservations, contract with clients, or begin delivery unless the operator has confirmed applicable authorization with UNO International Advising or has separate valid employment authorization that covers this work.

Set `NEXT_PUBLIC_COMMERCIAL_ACTIVATION_ENABLED=true` only after that confirmation is documented. Add a payment link only after the same gate is cleared.

## Deployment

The Portfolio repository uses Next.js static export. The landing page is available at:

- `/intake-sprint/`
- `/intake-sprint/thank-you/`

Configure variables from `.env.client-intake.example` before building. For reliable submission delivery, point `NEXT_PUBLIC_INTAKE_WEBHOOK_URL` to a controlled n8n or BrightEngine endpoint that accepts JSON and returns a successful HTTP status.
