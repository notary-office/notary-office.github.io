# Notary Office Website: Build Spec for Claude Code

## Goal

Recreate a one-page marketing website for a local notary office, using **React (Vite) + Material UI (MUI v5/v6)**. A reference screenshot of the original design is at `docs/reference.png`. **Open and study it before writing any code**, and match its layout, spacing, colors, and tone as closely as possible.

The site is in three languages (English, French, Arabic), with Arabic rendered right-to-left.

## Tech constraints

- Vite + React (JavaScript, functional components, hooks).
- UI: `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`.
- RTL: `@emotion/cache`, `stylis`, `stylis-plugin-rtl`.
- Fonts: `@fontsource/cormorant-garamond` (headings) and `@fontsource/inter` (body), imported in `main.jsx`.
- No other UI libraries. Use MUI's `sx` prop and the theme; avoid separate CSS files except `index.css` for a minimal reset.
- No backend. The booking form must be wired so it is easy to plug in later (see "Booking form").
- Must be fully responsive (mobile, tablet, desktop) and keyboard accessible.

## Project structure

```
src/
  main.jsx              // fonts, ThemeProvider, CacheProvider (LTR/RTL), CssBaseline
  App.jsx               // assembles sections in order
  theme.js              // createTheme(direction) – palette, typography, shape, component overrides
  config/business.js    // ALL business data in one place (name, address, phone, hours, email, map query, reviews, Google profile URL)
  i18n/
    LanguageContext.jsx // current lang, setLang, t(key), dir
    en.js  fr.js  ar.js // all UI strings
  components/
    Header.jsx
    Hero.jsx
    Services.jsx
    WhyChooseUs.jsx
    Location.jsx
    Reviews.jsx
    Booking.jsx
    Footer.jsx
    SectionHeading.jsx  // reusable eyebrow + title + subtitle
```

No text is hard-coded in components: every string comes from `t()`, and every business fact comes from `config/business.js`.

## Design tokens (put these in `theme.js`)

### Colors

| Token | Hex | Use |
|---|---|---|
| primary.main | `#1C2B4A` | Navy: buttons, header CTA, active language pill, headings |
| primary.dark | `#152036` | Dark "Simple process" card background |
| secondary.main | `#B0662E` | Copper accent: small eyebrow labels, bullet dots, short rule before hero eyebrow |
| background.default | `#FAF8F4` | Warm off-white page background |
| background.paper | `#FFFFFF` | Cards |
| alt section bg | `#F5F2EC` | Alternating section bands (Services, Location, Booking) |
| divider / card border | `#E6E1D8` | 1px borders on cards and inputs |
| text.primary | `#1C2B4A` | |
| text.secondary | `#5B6474` | Body copy |
| gold highlight | `#E9C27B` on `rgba(233,194,123,0.10)` | Tip box inside the dark process card; "Appointments available" chip |
| icon tint bg | `#EAF3EE` (green) / `#FDEEEE` (rose) | Soft square behind service icons |

The hero right side has a very soft warm radial glow (`radial-gradient` from `#FBF3DF` to transparent) behind the "How we can help" card.

### Typography

- Headings (`h1`–`h4`): **Cormorant Garamond**, weight 500, normal letter-spacing, navy.
  - h1 ~ 52px desktop / 36px mobile, line-height 1.15.
  - h2 ~ 36px / 28px.
  - Card titles ~ 24px.
- Body / UI: **Inter**, 15–16px, line-height 1.6, `text.secondary`.
- Eyebrow labels: Inter 11px, weight 600, uppercase, letter-spacing 0.2em, copper color. (Kept because it's part of the original design.)
- Buttons: Inter 14px weight 600, no uppercase (`textTransform: 'none'`).

### Shape and elevation

- Card radius 16px; inner sub-cards 12px; buttons and chips fully rounded (pill).
- Cards: white, 1px `#E6E1D8` border, very soft shadow `0 8px 24px rgba(28,43,74,0.06)`.
- Max content width 1200px, centered (`Container maxWidth="lg"`). Section vertical padding ~96px desktop, ~64px mobile.
- Hairline full-width divider between sections.

## Sections (in order)

### 1. Header (sticky, white, bottom border)
- Left: small round scale-of-justice icon (`BalanceIcon`) in a bordered circle + "Notary Office" (serif) with tiny uppercase tagline "Trusted legal services" under it.
- Center: nav links: Services, About, Address, Reviews, Book. They smooth-scroll to section ids.
- Right: language switcher as a pill-shaped segmented control (EN / FR / AR; active = navy filled, white text), then a navy pill button "Book appointment" with a calendar icon.
- Mobile: nav collapses into a hamburger `Drawer`; language switcher and CTA stay visible or move into the drawer.

### 2. Hero (two columns, stacks on mobile)
- **Left column**
  - Eyebrow with a short copper line before it: "Reliable notarial assistance".
  - h1: "Professional notary services for life's important moments and legal documents."
  - Paragraph: "We help individuals and families with wedding paperwork, contracts, land registration, and other official procedures with clarity, confidentiality, and care."
  - Buttons: navy contained "Request an appointment" (scrolls to booking) and outlined white pill "Find our office" (person/location icon, scrolls to map).
  - Three small bordered cards in a row: **Trusted** / "Confidential and professional service"; **Clear** / "Simple guidance for every process"; **Local** / "Easy-to-reach office and support". Titles in serif.
- **Right column**: a large white card.
  - Eyebrow "Office assistance", title "How we can help", and a small gold-outlined chip "Appointments available" top-right.
  - Three stacked bordered rows, each with a small icon box, a bold title and a short description:
    - Wedding paperwork support / "Support for document validation and formal procedures related to civil marriage and official declarations."
    - Contracts and certifications / "Preparation, notarization, and certification of contracts, declarations, authorizations, and signatures."
    - Land registration assistance / "Guidance for property records, land registration documents, ownership formalities, and official filing steps."
  - Bottom grey box: **Need a quick consultation?** "Send your details and we will contact you to confirm your appointment." plus a small outlined pill button "Book now".

### 3. Services (`id="services"`, alt background)
- Centered heading: eyebrow "Our services", h2 "Essential notary services handled with care and precision", subtitle "We provide practical legal support for personal and property matters, helping you complete official procedures with confidence."
- Three equal cards in a grid (1 column on mobile). Each card has a soft tinted icon square top-left and a faint serif number top-right (01, 02, 03), then the title (serif), a description, and three bullet lines with copper dots:
  - **Weddings** (rose heart icon): "Support for marriage-related legal formalities, certified declarations, identity verification, and official document preparation." Bullets: Preparation of required legal documents · Certification and identity verification · Guidance on official procedures.
  - **Contracts** (green document/edit icon): "Drafting, reviewing, notarizing, and certifying contracts for personal, business, or family matters." Bullets: Contract notarization and signature witnessing · Certified copies and legal declarations · Reliable support for private agreements.
  - **Land registration** (green bank/building icon): "Support for ownership documents, registration files, property transfers, and land-related official procedures." Bullets: Document review before submission · Guidance for title and registration formalities · Clear explanation of required steps.

### 4. Why choose us (`id="about"`, two columns)
- **Left**: eyebrow "Why choose us", h2 "A dependable office for personal, family, and property documents", paragraph "Our office focuses on clarity, trust, and careful handling of official paperwork. Whether you need help with a wedding procedure, a signed contract, or registering land documents, you will receive professional support at every step."
  - 2×2 grid of small bordered cards: Clear guidance / Professional care / Accessible office / Fast communication, each with one or two lines of text (see screenshot).
- **Right**: dark navy card (`primary.dark`, white text, radius 16).
  - Small circular check icon, eyebrow "Client confidence", serif title "Simple process".
  - Three stacked rows with a slightly lighter navy background and subtle border:
    1. **Send your request**: "Fill in your name, surname, phone number, and service needed."
    2. **We contact you**: "Our office confirms the details and proposes an appointment time."
    3. **Visit the office**: "Bring the requested documents and complete your procedure smoothly."
  - Gold-tinted tip box at the bottom: "For the best experience, please mention if your request concerns weddings, contracts, or land registration when booking."

### 5. Office address and map (`id="address"`, alt background)
- Left-aligned heading: eyebrow "Find us easily", h2 "Office address and map", subtitle "Use the map below to find the office and get directions."
  - **Do not** copy the original's placeholder note "Replace the sample address…". All such builder instructions must be removed from the visible site.
- Two columns:
  - Left card: icon rows for **Address**, **Phone** (`tel:` link), **Office hours**, then an outlined pill "Open directions" (opens Google Maps directions in a new tab).
  - Right card: Google Maps embed via `<iframe src="https://www.google.com/maps?q=${encodeURIComponent(business.mapQuery)}&output=embed">` (no API key needed), rounded corners, `loading="lazy"`, a small "Open in Maps" link chip in the top-left corner. Map height ~360px.

### 6. Reviews (`id="reviews"`)
- Centered heading: eyebrow "Google reviews", h2 "See what clients say about their experience", subtitle "Clients regularly share their experience with our office on Google Maps."
  - Again, drop the original's builder hints ("Replace the sample review text…", "These review cards are styled to showcase…", "If you want, this section can next be personalized…").
- Two-column layout:
  - **Left summary card**: icon, eyebrow "Verified on Google", serif title "Trusted by local clients", big "4.9" with "Average rating" under it on the right; five gold stars; short paragraph; two small stat boxes ("40+ / Public reviews", "Local / Google Maps presence"); buttons "View on Google Maps" (navy) and "Write a review" (outlined). Both links come from `business.googleProfileUrl` / `business.googleReviewUrl`.
  - **Right**: one wide featured review card on top (soft warm tint background) and two review cards below side by side. Each card: letter avatar circle, name, "Google review · X months ago", small Google/map icon top-right, five stars (MUI `Rating` readOnly, gold), review text, and a small pill tag at the bottom ("Most mentioned: clarity & professionalism", "Contracts support", "Appointments & preparation").
- Reviews data lives in `business.reviews` (name, timeAgo, rating, text, tag).

### 7. Booking (`id="book"`, alt background, two columns)
- **Left**: eyebrow "Book an appointment", h2 "Send your details and request a visit", paragraph "Fill in the form with your name, surname, phone number, and the service you need. The office will contact you to confirm a time." Below it, a bordered box with three check-mark lines: "Include the service type: weddings, contracts, or land registration." / "Provide a valid phone number so the office can call you back." / "You can also mention your preferred day or time for the appointment."
- **Right**: white form card. Two-column grid of fields with labels above inputs:
  - Name, Surname, Phone number (`type="tel"`), Service needed (`Select`: Weddings, Contracts, Land registration, Other), Preferred date (`type="date"`), Preferred time (`type="time"`), Additional information (multiline, full width, 4 rows).
  - Consent checkbox in a bordered row: "I agree to be contacted regarding my appointment request." (required).
  - Full-width navy submit button with a send icon: "Send appointment request".
- **Behaviour**:
  - Client-side validation (name, surname, phone, service, consent required) with inline MUI `helperText` errors.
  - Submission goes through one function `submitBooking(data)` in `src/services/booking.js`. For now it builds a `mailto:` link to `business.email` with all fields in the body and opens it. Leave a clear comment showing where to swap in Formspree / EmailJS / a WhatsApp link later.
  - After submit, show an MUI `Snackbar` + `Alert`: "Request prepared. Please send the email that just opened."
  - Do not show the original's "Replace notary@example.com…" note.

### 8. Footer
- Light top border. Left: "Notary Office" (serif) + "Professional assistance for weddings, contracts, and land registration." Right: links Services, Address, Reviews, Book appointment. Below: small copyright line with the current year.
- **Do not** include any "Created in Grapes Studio" badge.

## Internationalization

- `LanguageContext` holds `lang` (`en` | `fr` | `ar`), persisted to `localStorage`.
- When `lang === 'ar'`: set `document.documentElement.dir = 'rtl'` and `lang="ar"`, rebuild the theme with `direction: 'rtl'`, and wrap the app in an Emotion `CacheProvider` using `stylis-plugin-rtl` (`key: 'muirtl'`). LTR uses a normal cache (`key: 'muiltr'`).
- For Arabic, swap the body font to a font that supports Arabic (e.g. `@fontsource/noto-naskh-arabic` or `@fontsource/cairo`) and use it for headings too.
- Write complete, natural FR and AR translations for every string (not placeholders). Directional icons (arrows, send) should flip in RTL.

## Business config (`src/config/business.js`): use these placeholders

```js
export const business = {
  name: 'Notary Office',
  tagline: 'Trusted legal services',
  address: '123 Legal Avenue, City Center, Your City',
  mapQuery: '123 Legal Avenue, City Center, Your City',
  phone: '+1 234 567 890',
  email: 'notary@example.com',
  hours: 'Monday to Friday, 9:00 AM – 6:00 PM',
  googleProfileUrl: '#',
  googleReviewUrl: '#',
  rating: 4.9,
  reviewCount: '40+',
  reviews: [
    { name: 'Amina K.', timeAgo: '2 months ago', rating: 5, featured: true,
      text: 'Very professional and organized service. The process was explained clearly, the appointment was on time, and every document was checked carefully. I felt confident throughout the entire procedure.',
      tag: 'Most mentioned: clarity & professionalism' },
    { name: 'Mark T.', timeAgo: '5 months ago', rating: 5,
      text: 'Excellent help with contract documents. Communication was fast, requirements were explained in advance, and the office made the signing process smooth and stress-free.',
      tag: 'Contracts support' },
    { name: 'Sara L.', timeAgo: '1 month ago', rating: 5,
      text: 'We visited for assistance with official paperwork and appreciated how respectful and detail-oriented the team was. Everything felt well prepared before we arrived.',
      tag: 'Appointments & preparation' },
  ],
};
```

## Quality checklist (verify before finishing)

1. `npm run dev` runs with no console errors or warnings.
2. Layout matches `docs/reference.png` at ~1280px width; all sections stack cleanly at 375px.
3. Header nav and all "Book" buttons smooth-scroll to the right section (account for the sticky header offset with `scroll-margin-top`).
4. EN/FR/AR switch works everywhere, Arabic is fully mirrored, and the choice survives a reload.
5. Form validation, mailto submit and snackbar all work.
6. Visible focus states on all interactive elements; images/iframes have `title`/`alt`; color contrast passes WCAG AA.
7. No leftover builder/template instruction text anywhere on the page.
8. Changing anything in `business.js` updates the whole site.

## Working order

1. Theme + fonts + layout shell (header/footer) → check in browser.
2. Hero → Services → Why choose us → Location → Reviews → Booking, checking each against the screenshot as you go.
3. i18n + RTL.
4. Run through the quality checklist and fix anything that fails.
