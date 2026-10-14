// French UI strings. Same shape as en.js.
// French typography: a no-break space (U+00A0) before ":" and a narrow one (U+202F) before "?"; they are invisible here.
const fr = {
  meta: {
    name: 'Français',
    locale: 'fr',
  },

  nav: {
    services: 'Services',
    about: 'À propos',
    address: 'Adresse',
    reviews: 'Avis',
    book: 'Rendez-vous',
  },

  header: {
    cta: 'Prendre rendez-vous',
    mainNav: 'Principale',
    language: 'Langue',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
  },

  hero: {
    eyebrow: 'Un accompagnement notarial fiable',
    title: 'Des services notariaux professionnels pour les moments importants de la vie et vos actes juridiques.',
    lead: 'Nous accompagnons particuliers et familles pour les formalités de mariage, les contrats, l’enregistrement foncier et les autres démarches officielles, avec clarté, confidentialité et attention.',
    primaryCta: 'Demander un rendez-vous',
    secondaryCta: 'Trouver notre étude',
    highlights: [
      { title: 'Fiable', text: 'Un service confidentiel et professionnel' },
      { title: 'Clair', text: 'Des conseils simples à chaque étape' },
      { title: 'Proche', text: 'Une étude facile d’accès, à votre écoute' },
    ],
    help: {
      eyebrow: 'Accompagnement à l’étude',
      title: 'Comment nous pouvons vous aider',
      chip: 'Rendez-vous disponibles',
      items: {
        weddings: {
          title: 'Formalités de mariage',
          text: 'Aide à la validation des documents et aux démarches liées au mariage civil et aux déclarations officielles.',
        },
        contracts: {
          title: 'Contrats et certifications',
          text: 'Préparation, authentification et certification de contrats, déclarations, procurations et signatures.',
        },
        land: {
          title: 'Enregistrement foncier',
          text: 'Conseils pour les titres de propriété, les dossiers d’enregistrement foncier, les formalités de propriété et les dépôts officiels.',
        },
      },
      consultationTitle: 'Besoin d’un conseil rapide ?',
      consultationText: 'Envoyez-nous vos coordonnées et nous vous contacterons pour confirmer votre rendez-vous.',
      consultationCta: 'Réserver',
    },
  },

  services: {
    eyebrow: 'Nos services',
    title: 'Des services notariaux essentiels, traités avec soin et précision',
    subtitle: 'Nous vous apportons un accompagnement juridique concret pour vos affaires personnelles et immobilières, afin que vous meniez vos démarches officielles en toute confiance.',
    items: {
      weddings: {
        title: 'Mariages',
        text: 'Accompagnement pour les formalités juridiques du mariage, les déclarations certifiées, la vérification d’identité et la préparation des documents officiels.',
        bullets: [
          'Préparation des documents juridiques requis',
          'Certification et vérification d’identité',
          'Conseils sur les démarches officielles',
        ],
      },
      contracts: {
        title: 'Contrats',
        text: 'Rédaction, relecture, authentification et certification de contrats pour vos affaires personnelles, professionnelles ou familiales.',
        bullets: [
          'Authentification de contrats et légalisation de signatures',
          'Copies certifiées conformes et déclarations officielles',
          'Un accompagnement fiable pour vos accords privés',
        ],
      },
      land: {
        title: 'Enregistrement foncier',
        text: 'Accompagnement pour les titres de propriété, les dossiers d’enregistrement, les transferts de biens et les démarches foncières officielles.',
        bullets: [
          'Vérification des documents avant dépôt',
          'Conseils sur les formalités de titre et d’enregistrement',
          'Explication claire des étapes à suivre',
        ],
      },
    },
  },

  about: {
    eyebrow: 'Pourquoi nous choisir',
    title: 'Une étude de confiance pour vos documents personnels, familiaux et immobiliers',
    subtitle: 'Notre étude mise sur la clarté, la confiance et le traitement rigoureux des documents officiels. Qu’il s’agisse d’une démarche de mariage, d’un contrat à signer ou de l’enregistrement d’un bien foncier, vous bénéficiez d’un accompagnement professionnel à chaque étape.',
    reasons: [
      { title: 'Des explications claires', text: 'Nous vous indiquons les documents nécessaires et vous aidons à éviter les retards dans votre démarche.' },
      { title: 'Un suivi professionnel', text: 'Chaque dossier est traité avec attention, discrétion et dans le respect des formalités légales.' },
      { title: 'Une étude accessible', text: 'Retrouvez facilement l’étude grâce à la carte et à la section de prise de rendez-vous ci-dessous.' },
      { title: 'Une réponse rapide', text: 'Envoyez vos nom, prénom et numéro de téléphone, et nous vous contacterons pour organiser votre visite.' },
    ],
    process: {
      eyebrow: 'En toute confiance',
      title: 'Une démarche simple',
      steps: [
        { title: 'Envoyez votre demande', text: 'Indiquez vos nom, prénom, numéro de téléphone et le service souhaité.' },
        { title: 'Nous vous contactons', text: 'Notre étude confirme les détails et vous propose un créneau de rendez-vous.' },
        { title: 'Rendez-vous à l’étude', text: 'Apportez les documents demandés et finalisez votre démarche en toute sérénité.' },
      ],
      tip: 'Pour mieux vous servir, précisez lors de votre demande s’il s’agit d’un mariage, d’un contrat ou d’un enregistrement foncier.',
    },
  },

  location: {
    eyebrow: 'Nous trouver facilement',
    title: 'Adresse de l’étude et plan',
    subtitle: 'Utilisez la carte ci-dessous pour trouver l’étude et obtenir l’itinéraire.',
    address: 'Adresse',
    phone: 'Téléphone',
    hours: 'Horaires d’ouverture',
    directions: 'Voir l’itinéraire',
    openInMaps: 'Ouvrir dans Maps',
    mapTitle: 'Carte indiquant l’emplacement de {name}',
  },

  reviews: {
    eyebrow: 'Avis Google',
    title: 'Découvrez ce que nos clients disent de leur expérience',
    subtitle: 'Nos clients partagent régulièrement leur expérience avec notre étude sur Google Maps.',
    summary: {
      eyebrow: 'Vérifié sur Google',
      title: 'La confiance de nos clients',
      averageRating: 'Note moyenne',
      text: 'Nos clients soulignent souvent notre professionnalisme, la clarté de nos explications, la ponctualité des rendez-vous et la confiance qu’ils accordent à notre gestion des documents sensibles et des démarches officielles.',
      publicReviews: 'Avis publics',
      localValue: 'Locale',
      mapsPresence: 'Présence sur Google Maps',
      viewOnGoogle: 'Voir sur Google Maps',
      writeReview: 'Laisser un avis',
    },
    source: 'Avis Google · {timeAgo}',
  },

  booking: {
    eyebrow: 'Prendre rendez-vous',
    title: 'Envoyez vos coordonnées et demandez un rendez-vous',
    subtitle: 'Remplissez le formulaire avec vos nom, prénom, numéro de téléphone et le service souhaité. L’étude vous contactera pour confirmer un horaire.',
    tips: [
      'Précisez le type de service : mariage, contrat ou enregistrement foncier.',
      'Indiquez un numéro de téléphone valide pour que l’étude puisse vous rappeler.',
      'Vous pouvez aussi mentionner le jour ou l’horaire qui vous convient le mieux.',
    ],
    formLabel: 'Formulaire de demande de rendez-vous',
    fields: {
      name: { label: 'Prénom', placeholder: 'Votre prénom' },
      surname: { label: 'Nom', placeholder: 'Votre nom de famille' },
      phone: { label: 'Numéro de téléphone', placeholder: '+1 234 567 890' },
      service: { label: 'Service souhaité', placeholder: 'Choisissez un service' },
      date: { label: 'Date souhaitée' },
      time: { label: 'Heure souhaitée' },
      message: { label: 'Informations complémentaires', placeholder: 'Décrivez brièvement votre besoin.' },
    },
    serviceOptions: {
      weddings: 'Mariages',
      contracts: 'Contrats',
      land: 'Enregistrement foncier',
      other: 'Autre',
    },
    consent: 'J’accepte d’être contacté(e) au sujet de ma demande de rendez-vous.',
    submit: 'Envoyer ma demande de rendez-vous',
    errors: {
      name: 'Veuillez indiquer votre prénom.',
      surname: 'Veuillez indiquer votre nom.',
      phoneRequired: 'Veuillez indiquer votre numéro de téléphone.',
      phoneInvalid: 'Veuillez indiquer un numéro de téléphone valide.',
      service: 'Veuillez choisir le service souhaité.',
      consent: 'Veuillez accepter d’être contacté(e) afin que l’étude puisse vous répondre.',
    },
    success: 'Demande préparée. Veuillez envoyer l’e-mail qui vient de s’ouvrir.',
    failure: 'Un problème est survenu lors de la préparation de votre demande. Veuillez réessayer ou appeler l’étude.',
  },

  footer: {
    description: 'Un accompagnement professionnel pour les mariages, les contrats et l’enregistrement foncier.',
    nav: 'Pied de page',
    links: {
      services: 'Services',
      address: 'Adresse',
      reviews: 'Avis',
      book: 'Prendre rendez-vous',
    },
    copyright: '© {year} {name}. Tous droits réservés.',
  },
};

export default fr;
