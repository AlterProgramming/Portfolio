export type LawnServiceOption = {
  id: string
  label: string
  description: string
}

export type LawnQuoteConfig = {
  business: {
    name: string
    shortName: string
    city: string
    serviceArea: string
    phoneDisplay: string
    phoneHref: string
    email: string
    responsePromise: string
  }
  brand: {
    eyebrow: string
    headline: string
    subheadline: string
  }
  services: LawnServiceOption[]
  propertyTypes: string[]
  propertySizes: string[]
  timelines: string[]
  contactMethods: string[]
}

export const lawnQuoteConfig: LawnQuoteConfig = {
  business: {
    name: 'Prairie & Pine Lawn Co.',
    shortName: 'Prairie & Pine',
    city: 'Omaha, Nebraska',
    serviceArea: 'Omaha, Elkhorn, Papillion, La Vista, and nearby neighborhoods',
    phoneDisplay: '(402) 555-0148',
    phoneHref: 'tel:+14025550148',
    email: 'quotes@prairieandpinelawn.example',
    responsePromise: 'Most complete requests receive a response within one business day.',
  },
  brand: {
    eyebrow: 'Straightforward lawn care in the Omaha metro',
    headline: 'Show us the property. Tell us the job. Get a useful response.',
    subheadline:
      'Request mowing, cleanup, trimming, mulch, or recurring service without playing phone tag. The form asks for the details our crew needs before we quote or schedule.',
  },
  services: [
    {
      id: 'mowing',
      label: 'Mowing & edging',
      description: 'One-time or recurring mowing, edging, and cleanup.',
    },
    {
      id: 'seasonal-cleanup',
      label: 'Seasonal cleanup',
      description: 'Leaves, debris, final cuts, spring reset, or fall cleanup.',
    },
    {
      id: 'trimming',
      label: 'Shrub & hedge trimming',
      description: 'Shaping, cutback, and debris removal.',
    },
    {
      id: 'mulch',
      label: 'Mulch & bed refresh',
      description: 'Bed cleanup, edging, mulch installation, and touchups.',
    },
    {
      id: 'overgrowth',
      label: 'Overgrowth reset',
      description: 'Tall grass, neglected areas, brush, or heavy cleanup.',
    },
    {
      id: 'other',
      label: 'Something else',
      description: 'Describe the property work and attach helpful photos.',
    },
  ],
  propertyTypes: [
    'Single-family home',
    'Rental property',
    'Townhome or HOA property',
    'Small commercial property',
    'Other',
  ],
  propertySizes: [
    'Small — under 5,000 sq. ft.',
    'Medium — 5,000 to 10,000 sq. ft.',
    'Large — 10,000 to 20,000 sq. ft.',
    'Very large — over 20,000 sq. ft.',
    'Not sure',
  ],
  timelines: [
    'As soon as possible',
    'Within one week',
    'Within two weeks',
    'This month',
    'Planning ahead',
  ],
  contactMethods: ['Text message', 'Phone call', 'Email'],
}
