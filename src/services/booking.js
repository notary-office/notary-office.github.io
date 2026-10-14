import { business } from '../config/business.js';

// The single entry point for booking requests. The form only calls this function, so switching
// delivery method later means changing this file only.
//
// `data`: { name, surname, phone, service, date, time, message, language } (service is the English
// label, language the site language code). Resolves to { ok: true } when the request was handed off.
//
// The email is read by the office, so its labels are always English whatever language the client used;
// the "Client language" line tells the office which language to reply in.
export async function submitBooking(data) {
  // ---------------------------------------------------------------------------------------------
  // SWAP POINT: replace the mailto block below with a real backend when one is available, e.g.
  //
  //   Formspree:  await fetch('https://formspree.io/f/<form-id>', {
  //                 method: 'POST',
  //                 headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  //                 body: JSON.stringify(data),
  //               });
  //   EmailJS:    await emailjs.send('<service-id>', '<template-id>', data, '<public-key>');
  //   WhatsApp:   window.open(`https://wa.me/<number>?text=${encodeURIComponent(buildBody(data))}`, '_blank');
  //
  // Throw on failure so the form can show an error instead of the success message.
  // ---------------------------------------------------------------------------------------------
  const subject = `Appointment request: ${data.name} ${data.surname}`;
  const href = `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildBody(data))}`;
  window.location.href = href;

  return { ok: true };
}

const languageNames = new Intl.DisplayNames(['en'], { type: 'language' });

function buildBody({ name, surname, phone, service, date, time, message, language }) {
  return [
    'New appointment request',
    '',
    `Name: ${name}`,
    `Surname: ${surname}`,
    `Phone: ${phone}`,
    `Service: ${service}`,
    `Preferred date: ${date || 'Not specified'}`,
    `Preferred time: ${time || 'Not specified'}`,
    `Client language: ${language ? languageNames.of(language) : 'Not specified'}`,
    '',
    'Additional information:',
    message || 'None',
  ].join('\r\n');
}
