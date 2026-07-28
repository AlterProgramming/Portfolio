# BrightEngine Lawn Care Quote Intake Sprint

## Commercial objective

Sell one bounded implementation for lawn-care and landscaping businesses with existing websites: a useful quote-request path that collects the property and job information the owner needs before responding.

**Offer:** In 72 hours after complete client intake, BrightEngine adds one focused quote page, a structured lawn-service request, measurement hooks, and a tested handoff into the owner's approved inbox or workflow.

This is not generic web development, a promise of more leads, or a chatbot-first service. The product is a complete quote-request path for an already-operating lawn-care business.

## Initial customer

Prioritize lawn-care and landscaping companies that:

1. already provide defined services;
2. have an existing website or public business page;
3. use a generic contact form, email link, or phone-only quote path;
4. repeatedly ask customers for property, timing, condition, and photo details;
5. have one person, inbox, CRM, or workflow that can receive and respond to requests;
6. can approve copy and access promptly.

Do not say the business is losing leads unless its own analytics or operating records support that conclusion. Public inspection can establish visible friction and a testable hypothesis, not a conversion diagnosis.

## Commercial ladder

### Intake Review — $250

Deliver:

- observed public quote-path review;
- field map based on the business's actual services;
- page wireframe;
- routing and measurement requirements;
- written implementation brief and acceptance checks.

The $250 fee is credited toward the full sprint when implementation proceeds.

### Quote Intake Sprint — $950

- reservation after written scope approval: **$350**;
- completion payment after acceptance checks: **$600**;
- optional monitoring and small updates: **$79/month**;
- founding capacity: first four businesses.

Do not discount below the published pilot price. Reduce scope or begin with the review instead.

## Included sprint scope

1. One focused lawn-care quote page.
2. Custom service and property questions mapped to the owner's actual qualification process.
3. Customer photo selection, up to the approved file limit.
4. Form validation and spam protection.
5. Owner-facing request summary.
6. Delivery through an approved webhook, inbox, CRM, or automation route.
7. Branded confirmation state and request reference.
8. Mobile and accessibility pass.
9. Events for page view, form start, step completion, submission, and delivery failure.
10. One revision round against the approved scope.
11. Deployment, rollback, payload, and handoff notes.

Anything outside this list requires a separate written scope.

## Delivery workflow

### 1. Public inspection

Review the current website and record only what can be observed:

- how a customer requests a quote;
- what fields or instructions are present;
- whether the route works on mobile;
- whether confirmation and fallback behavior are visible;
- which lawn services are publicly offered;
- what access and routing must be confirmed with the owner.

Do not infer form abandonment, close rate, response time, booked revenue, or customer intent from the public page.

### 2. Field map

Ask the owner:

- which services can be selected;
- which property details affect quoting;
- which conditions require photos or a site visit;
- whether work is one-time, recurring, or both;
- what service-area constraints apply;
- which questions the team asks repeatedly;
- where a complete request should be delivered.

### 3. Written work brief

Before payment, send a brief containing:

- target customer and service;
- page route;
- approved field map;
- photo rules;
- notification destination;
- analytics events;
- supplied assets and access;
- exclusions;
- acceptance checks;
- 72-hour start condition.

### 4. Reservation and build

After the client approves the work brief, collect the $350 reservation when commercial activation is legally permitted. Work begins only when required access, routing, assets, and a responsive reviewer are available.

Use the existing site stack when practical. Otherwise deploy a standalone static route. Keep the payload explicit and avoid storing customer data unless storage is part of the approved scope.

### 5. Acceptance

The client tests:

- route loads on mobile and desktop;
- every approved service option is present;
- required fields and step validation work;
- photo rules work;
- the owner preview matches the customer answers;
- the final payload reaches the approved destination once;
- delivery failure shows a visible fallback;
- analytics exclude customer address, phone, email, photos, and job description;
- confirmation and request reference appear;
- links, service area, and contact information are correct.

### 6. Handoff

Collect the $600 completion payment after acceptance. Deliver source, configuration, field map, payload contract, deployment notes, analytics event map, and rollback instructions.

## Sales motion

Begin with 20 lawn-care or landscaping businesses where the public quote path can be inspected directly.

For each business, record:

- business and owner or manager name;
- website and quote route;
- publicly offered services;
- observable request-path limitation;
- one proposed field-map improvement;
- public business contact route;
- outreach status and next action.

### First message

Lead with an observed fact, not a claim about lost leads:

> I reviewed the quote path on your website. The current form lets a customer leave contact information and a message, but it does not collect the lawn service, property size, timing, current condition, or photos your team may need before responding. I built a focused lawn-care quote system that adds those questions to an existing site and turns each submission into a readable job brief. I can send you the working demonstration and a one-page review of how it could fit your current site.

### Follow-up

> I mapped a possible quote path for your services: requested work, property type and size, address, one-time or recurring intent, preferred timing, job details, photos, and response method. The intake review is $250 and is credited toward the $950 implementation if you proceed. Would a short review of the working demo be useful?

Do not create a personalized branded preview using a prospect's logo or trademarks without permission. Use the neutral Prairie & Pine demonstration until the prospect agrees to a scoped review.

## Revenue model

Founding stage examples:

- 1 review: $250 revenue;
- 4 reviews with no implementation: $1,000 revenue;
- 1 sprint: $950 total revenue, including a credited review when applicable;
- 2 sprints: $1,900 revenue;
- 4-sprint capacity: $3,800 revenue;
- 4 optional care plans: $316 monthly recurring revenue.

After four completed pilots and permission to use real evidence, reassess pricing. A later implementation range of $1,400–$1,800 may be justified by complexity while preserving the bounded outcome.

## Activation and immigration gate

The repository may be built and reviewed as a non-transactional preview. Do not publish it as an active commercial solicitation, accept payments, contract with clients, or begin delivery unless the operator has confirmed applicable authorization with UNO International Advising or has separate valid employment authorization that covers this work.

Set `NEXT_PUBLIC_COMMERCIAL_ACTIVATION_ENABLED=true` only after that confirmation is documented. Add a payment link only after the same gate is cleared.

## Routes and deployment

The Portfolio repository uses Next.js static export. Current routes:

- `/intake-sprint/` — commercial offer;
- `/intake-sprint/thank-you/` — commercial inquiry confirmation;
- `/lawn-quote/` — fictional Prairie & Pine customer and owner demonstration.

Configure variables from `.env.client-intake.example` before building. The commercial inquiry webhook expects JSON. The lawn quote demonstration sends `multipart/form-data` with a JSON `payload` field and uploaded `photos` when `NEXT_PUBLIC_LAWNCARE_DEMO_WEBHOOK_URL` is configured.

The detailed payload, analytics, acceptance, and migration contract is in `docs/lawn-quote-delivery-template.md`.
