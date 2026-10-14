// Single source of truth for all business facts. Edit here to update the whole site.
//
// Text fields can be a plain string (shown as-is in every language) or { en, fr, ar }. A missing
// language falls back to `en`. Real Google reviews can stay plain strings in their original language.
export const business = {
  name: "Notary Office",
  tagline: {
    en: "Trusted legal services",
    fr: "Services juridiques de confiance",
    ar: "خدمات قانونية موثوقة",
  },
  address: "Houmt Souk, Djerba, Tunisia",
  mapQuery: "123 Legal Avenue, City Center, Your City",
  phone: "+12 345  678",
  email: "notary@example.com",
  hours: {
    en: "Monday to Friday, 9:00 AM – 6:00 PM",
    fr: "Du lundi au vendredi, de 9 h à 18 h",
    ar: "من الاثنين إلى الجمعة، من 9:00 صباحًا إلى 6:00 مساءً",
  },
  googleProfileUrl: "#",
  googleReviewUrl: "#",
  rating: 4.9,
  reviewCount: "40+",
  reviews: [
    {
      name: "Amina K.",
      timeAgo: { en: "2 months ago", fr: "il y a 2 mois", ar: "منذ شهرين" },
      rating: 5,
      featured: true,
      text: {
        en: "Very professional and organized service. The process was explained clearly, the appointment was on time, and every document was checked carefully. I felt confident throughout the entire procedure.",
        fr: "Un service très professionnel et bien organisé. La démarche a été clairement expliquée, le rendez-vous était à l’heure et chaque document a été vérifié avec soin. Je me suis sentie en confiance tout au long de la procédure.",
        ar: "خدمة احترافية ومنظمة للغاية. شُرحت الإجراءات بوضوح، وكان الموعد في وقته، ودُقّقت كل وثيقة بعناية. شعرت بالثقة طوال الإجراء.",
      },
      tag: {
        en: "Most mentioned: clarity & professionalism",
        fr: "Le plus cité : clarté et professionnalisme",
        ar: "الأكثر ذكرًا: الوضوح والاحترافية",
      },
    },
    {
      name: "Mark T.",
      timeAgo: { en: "5 months ago", fr: "il y a 5 mois", ar: "منذ 5 أشهر" },
      rating: 5,
      text: {
        en: "Excellent help with contract documents. Communication was fast, requirements were explained in advance, and the office made the signing process smooth and stress-free.",
        fr: "Une aide excellente pour mes documents contractuels. Les échanges ont été rapides, les pièces requises expliquées à l’avance, et l’étude a rendu la signature simple et sereine.",
        ar: "مساعدة ممتازة في وثائق العقد. كان التواصل سريعًا، وشُرحت المتطلبات مسبقًا، وجعل المكتب عملية التوقيع سلسة ومريحة.",
      },
      tag: {
        en: "Contracts support",
        fr: "Accompagnement pour les contrats",
        ar: "المساعدة في العقود",
      },
    },
    {
      name: "Sara L.",
      timeAgo: { en: "1 month ago", fr: "il y a 1 mois", ar: "منذ شهر" },
      rating: 5,
      text: {
        en: "We visited for assistance with official paperwork and appreciated how respectful and detail-oriented the team was. Everything felt well prepared before we arrived.",
        fr: "Nous sommes venus pour des démarches administratives et avons apprécié le respect et la rigueur de l’équipe. Tout semblait bien préparé avant notre arrivée.",
        ar: "زرنا المكتب للمساعدة في وثائق رسمية، وقدّرنا احترام الفريق ودقته في التفاصيل. بدا كل شيء مُعدًّا جيدًا قبل وصولنا.",
      },
      tag: {
        en: "Appointments & preparation",
        fr: "Rendez-vous et préparation",
        ar: "المواعيد والتحضير",
      },
    },
  ],
};
