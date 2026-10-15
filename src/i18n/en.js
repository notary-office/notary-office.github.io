// English UI strings. fr.js and ar.js mirror this shape exactly; missing keys fall back to English.
// `{name}` placeholders are filled in by t(key, { name }).
const en = {
  meta: {
    name: 'English',
    // Locale used for number formatting.
    locale: 'en',
  },

  nav: {
    services: 'Services',
    about: 'About',
    address: 'Address',
    reviews: 'Reviews',
    book: 'Book',
  },

  header: {
    cta: 'Book appointment',
    mainNav: 'Main',
    language: 'Language',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    darkMode: 'Switch to dark mode',
    lightMode: 'Switch to light mode',
  },

  hero: {
    eyebrow: 'Reliable notarial assistance',
    title: 'Professional notary services for life’s important moments and legal documents.',
    lead: 'We help individuals and families with wedding paperwork, contracts, land registration, and other official procedures with clarity, confidentiality, and care.',
    primaryCta: 'Request an appointment',
    secondaryCta: 'Find our office',
    highlights: [
      { title: 'Trusted', text: 'Confidential and professional service' },
      { title: 'Clear', text: 'Simple guidance for every process' },
      { title: 'Local', text: 'Easy-to-reach office and support' },
    ],
    help: {
      eyebrow: 'Office assistance',
      title: 'How we can help',
      chip: 'Appointments available',
      items: {
        weddings: {
          title: 'Wedding paperwork support',
          text: 'Support for document validation and formal procedures related to civil marriage and official declarations.',
        },
        contracts: {
          title: 'Contracts and certifications',
          text: 'Preparation, notarization, and certification of contracts, declarations, authorizations, and signatures.',
        },
        land: {
          title: 'Land registration assistance',
          text: 'Guidance for property records, land registration documents, ownership formalities, and official filing steps.',
        },
      },
      consultationTitle: 'Need a quick consultation?',
      consultationText: 'Send your details and we will contact you to confirm your appointment.',
      consultationCta: 'Book now',
    },
  },

  services: {
    eyebrow: 'Our services',
    title: 'Essential notary services handled with care and precision',
    subtitle: 'We provide practical legal support for personal and property matters, helping you complete official procedures with confidence.',
    items: {
      weddings: {
        title: 'Weddings',
        text: 'Support for marriage-related legal formalities, certified declarations, identity verification, and official document preparation.',
        bullets: [
          'Preparation of required legal documents',
          'Certification and identity verification',
          'Guidance on official procedures',
        ],
      },
      contracts: {
        title: 'Contracts',
        text: 'Drafting, reviewing, notarizing, and certifying contracts for personal, business, or family matters.',
        bullets: [
          'Contract notarization and signature witnessing',
          'Certified copies and legal declarations',
          'Reliable support for private agreements',
        ],
      },
      land: {
        title: 'Land registration',
        text: 'Support for ownership documents, registration files, property transfers, and land-related official procedures.',
        bullets: [
          'Document review before submission',
          'Guidance for title and registration formalities',
          'Clear explanation of required steps',
        ],
      },
    },
  },

  about: {
    eyebrow: 'Why choose us',
    title: 'A dependable office for personal, family, and property documents',
    subtitle: 'Our office focuses on clarity, trust, and careful handling of official paperwork. Whether you need help with a wedding procedure, a signed contract, or registering land documents, you will receive professional support at every step.',
    reasons: [
      { title: 'Clear guidance', text: 'We explain what documents are needed and help you avoid delays in your procedure.' },
      { title: 'Professional care', text: 'Every file is handled with attention, privacy, and respect for legal formalities.' },
      { title: 'Accessible office', text: 'Clients can easily locate the office using the map and appointment contact section below.' },
      { title: 'Fast communication', text: 'Send your name, surname, and phone number, and we will contact you to arrange your visit.' },
    ],
    process: {
      eyebrow: 'Client confidence',
      title: 'Simple process',
      steps: [
        { title: 'Send your request', text: 'Fill in your name, surname, phone number, and service needed.' },
        { title: 'We contact you', text: 'Our office confirms the details and proposes an appointment time.' },
        { title: 'Visit the office', text: 'Bring the requested documents and complete your procedure smoothly.' },
      ],
      tip: 'For the best experience, please mention if your request concerns weddings, contracts, or land registration when booking.',
    },
  },

  location: {
    eyebrow: 'Find us easily',
    title: 'Office address and map',
    subtitle: 'Use the map below to find the office and get directions.',
    address: 'Address',
    phone: 'Phone',
    hours: 'Office hours',
    directions: 'Open directions',
    openInMaps: 'Open in Maps',
    mapTitle: 'Map showing the location of {name}',
  },

  reviews: {
    eyebrow: 'Google reviews',
    title: 'See what clients say about their experience',
    subtitle: 'Clients regularly share their experience with our office on Google Maps.',
    summary: {
      eyebrow: 'Verified on Google',
      title: 'Trusted by local clients',
      averageRating: 'Average rating',
      text: 'Clients often highlight professionalism, clear explanations, punctual appointments, and confidence when handling sensitive documents and official procedures.',
      publicReviews: 'Public reviews',
      localValue: 'Local',
      mapsPresence: 'Google Maps presence',
      viewOnGoogle: 'View on Google Maps',
      writeReview: 'Write a review',
    },
    source: 'Google review · {timeAgo}',
  },

  booking: {
    eyebrow: 'Book an appointment',
    title: 'Send your details and request a visit',
    subtitle: 'Fill in the form with your name, surname, phone number, and the service you need. The office will contact you to confirm a time.',
    tips: [
      'Include the service type: weddings, contracts, or land registration.',
      'Provide a valid phone number so the office can call you back.',
      'You can also mention your preferred day or time for the appointment.',
    ],
    formLabel: 'Appointment request form',
    fields: {
      name: { label: 'Name', placeholder: 'Your first name' },
      surname: { label: 'Surname', placeholder: 'Your last name' },
      phone: { label: 'Phone number', placeholder: '+1 234 567 890' },
      service: { label: 'Service needed', placeholder: 'Select a service' },
      date: { label: 'Preferred date' },
      time: { label: 'Preferred time' },
      message: { label: 'Additional information', placeholder: 'Tell us briefly what you need help with.' },
    },
    serviceOptions: {
      weddings: 'Weddings',
      contracts: 'Contracts',
      land: 'Land registration',
      other: 'Other',
    },
    consent: 'I agree to be contacted regarding my appointment request.',
    submit: 'Send appointment request',
    errors: {
      name: 'Please enter your name.',
      surname: 'Please enter your surname.',
      phoneRequired: 'Please enter your phone number.',
      phoneInvalid: 'Please enter a valid phone number.',
      service: 'Please choose the service you need.',
      consent: 'Please agree to be contacted so the office can reply.',
    },
    success: 'Request prepared. Please send the email that just opened.',
    failure: 'Something went wrong while preparing your request. Please try again or call the office.',
  },

  footer: {
    description: 'Professional assistance for weddings, contracts, and land registration.',
    nav: 'Footer',
    links: {
      services: 'Services',
      address: 'Address',
      reviews: 'Reviews',
      book: 'Book appointment',
    },
    copyright: '© {year} {name}. All rights reserved.',
  },
};

export default en;
