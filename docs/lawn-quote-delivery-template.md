# Lawn Care Quote Intake Delivery Template

## Product boundary

This template delivers one complete quote-request path for a lawn-care or landscaping business. It is not a CRM, dispatch platform, lead-generation campaign, or full website redesign.

The customer-facing result is a mobile-first quote page that collects:

1. requested services;
2. property type and approximate size;
3. service address;
4. one-time or recurring intent;
5. preferred timing;
6. job details and current condition;
7. up to six photos;
8. customer contact information and response preference.

The owner-facing result is a readable job brief delivered to an approved inbox, CRM, webhook, or automation route.

## Reusable implementation

The working demonstration is located at `/lawn-quote/`.

Primary files:

- `app/lawn-quote/config.ts` — business identity, brand copy, service choices, property options, timelines, and contact methods;
- `app/lawn-quote/QuoteExperience.tsx` — multi-step intake, live owner summary, file collection, delivery, and analytics events;
- `app/lawn-quote/page.tsx` — fictional lawn-company website and product demonstration;
- `app/lawn-quote/page.module.css` — responsive presentation and quote-flow styling.

A client installation should begin by copying the module and replacing configuration before changing the underlying flow.

## Configuration checklist

### Business identity

- legal or public business name;
- short brand name;
- service city and coverage area;
- public phone and email;
- truthful response-time language.

### Service map

For every selectable service, confirm:

- label customers recognize;
- short description;
- whether it supports one-time work, recurring work, or both;
- any service-specific follow-up questions;
- any disqualifying conditions.

### Property map

Confirm the property types and approximate-size choices the estimator actually uses. Do not collect fields merely because competitors collect them.

### Routing

Choose one approved delivery route:

- shared quote inbox;
- CRM intake endpoint;
- n8n webhook;
- BrightEngine-owned bounded endpoint;
- another documented system with client permission.

The current component submits `multipart/form-data` when a webhook is configured. The `payload` field contains JSON, and each uploaded image is appended under `photos`.

## Payload contract

```json
{
  "reference": "PP-20260728-ABCDE",
  "source": "prairie-pine-lawn-quote-demo",
  "submittedAt": "2026-07-28T18:30:00.000Z",
  "customer": {
    "firstName": "Jordan",
    "lastName": "Example",
    "email": "jordan@example.com",
    "phone": "+1 402 555 0100",
    "preferredContactMethod": "Text message"
  },
  "request": {
    "services": ["Seasonal cleanup", "Mowing & edging"],
    "propertyType": "Single-family home",
    "propertySize": "Medium — 5,000 to 10,000 sq. ft.",
    "address": "Omaha, Nebraska service address",
    "frequency": "One-time service",
    "timeline": "Within two weeks",
    "details": "Customer-supplied job description",
    "photoCount": 4,
    "photoNames": ["front-yard.jpg", "back-fence.jpg"]
  }
}
```

Do not log image contents, customer addresses, phone numbers, or full payloads to public analytics systems.

## Analytics contract

The client component emits the following browser events through `window.dataLayer` and the `brightengine:analytics` custom event:

- `quote_page_view`;
- `quote_form_started`;
- `quote_form_step_completed` with the completed step number;
- `quote_photos_selected` with count only;
- `quote_form_submitted` with reference, selected service IDs, photo count, and delivery mode;
- `quote_delivery_failed`;
- `quote_demo_restarted`.

When `NEXT_PUBLIC_LAWNCARE_ANALYTICS_URL` is configured, the same event envelope is sent with `navigator.sendBeacon`.

The initial measurable funnel is:

1. quote-page views;
2. form starts;
3. step-one completion;
4. step-two completion;
5. step-three completion;
6. successful submissions;
7. delivery failures.

Operational outcomes such as response time, quote issuance, booked work, revenue, and close rate require the client's systems or manual reporting. Do not infer those outcomes from website events alone.

## Acceptance tests

### Customer route

- [ ] Route loads on current mobile and desktop browsers.
- [ ] Every service option can be selected and deselected.
- [ ] A customer cannot leave step one without selecting a service.
- [ ] Property type, size, and address are required before step three.
- [ ] Timing and job details are required before contact information.
- [ ] No more than six image files are prepared for delivery.
- [ ] Contact information and permission are required before submission.
- [ ] The success state contains a unique request reference.
- [ ] The client can restart the demonstration without reloading.

### Owner route

- [ ] The live preview reflects every customer answer accurately.
- [ ] The final payload uses the approved field names.
- [ ] Uploaded files reach only the approved destination.
- [ ] Delivery failure produces a visible customer fallback.
- [ ] The owner receives no duplicate request from one submission.
- [ ] The submission timestamp and reference are preserved.

### Measurement

- [ ] Page-view event fires once per page load.
- [ ] Form-start event fires once per interaction session.
- [ ] Step-completion events report the correct step.
- [ ] Successful and failed delivery events are distinguishable.
- [ ] Analytics payloads exclude address, phone, email, and job description.

### Handoff

- [ ] Client approves business identity, services, coverage area, and response language.
- [ ] Client approves every form question.
- [ ] Client confirms the routing destination.
- [ ] Client receives configuration, payload map, deployment notes, and rollback instructions.

## 72-hour start condition

The delivery clock begins only after all of the following are present:

- written scope approval;
- business identity and brand assets;
- approved service and question map;
- website or deployment access;
- approved routing destination;
- one available reviewer who can respond within the delivery window;
- reservation payment when commercial activation is legally permitted.

Missing inputs pause the clock. Scope additions require a new written decision rather than silently expanding the sprint.

## Migration to the Lawncare repository

`AlterProgramming/Lawncare` is currently empty and cannot receive its first commit through the connected GitHub contents API. Until it is initialized through GitHub or a local authenticated Git client, the template remains isolated in the Portfolio feature branch.

After initialization:

1. create a minimal Next.js application in `Lawncare`;
2. copy `app/lawn-quote/` and the relevant environment sample;
3. replace the route with the application root if the repository will serve only this product;
4. add build, lint, and accessibility checks;
5. deploy a preview route;
6. update the Portfolio sales page to point to that canonical demonstration.
