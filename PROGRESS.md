# Progress

## Stage 1: Theme, layout shell (done)

- `theme.js`: colors, fonts, shapes and component overrides from SITE_SPEC.md.
- `main.jsx`: font imports, `ThemeProvider`, `CssBaseline`. LTR only.
- `config/business.js`: the placeholder business data from the spec.
- `Header`: sticky, logo, nav, EN/FR/AR pill switcher, "Book appointment" CTA, mobile drawer.
- `Footer`: name, tagline, links, copyright with the current year. No Grapes Studio badge.
- `SectionHeading`: eyebrow + h2 + subtitle, `align="left" | "center"`.
- `App.jsx`: placeholder sections with ids `home`, `services`, `about`, `address`, `reviews`, `book`, separated by hairline dividers. The alt background is on services, address and book.
- `npm run build` and `npm run lint` pass with no errors.

## Stage 2a: Hero, Services, WhyChooseUs (done)

- `Hero` (`id="home"`): two columns (6/6 from `md`). On the left: copper-rule eyebrow, h1, lead, two CTA pills (`#book`, `#address`) and three highlight cards. On the right: the "How we can help" card with the gold chip, three icon rows and the consultation box with "Book now". The warm radial glow sits on the right.
- `Services` (`id="services"`, alt background): centered `SectionHeading` and three cards (one column below `md`). Each card has a tinted icon square, a faint 01/02/03, a serif title, the description and copper-dot bullets.
- `WhyChooseUs` (`id="about"`): 7/5 columns. On the left: the heading and a 2×2 grid of reason cards (one column below `sm`). On the right: the dark `primary.dark` "Simple process" card with an ordered list of three steps and the gold tip box.
- `App.jsx` renders these three components. Address, reviews and book are still placeholders.
- `npm run build` and `npm run lint` pass. Checked visually in headless Edge at 1440px against the reference and at 375px.

## Stage 2b: Location, Reviews, Booking (done)

- `Location` (`id="address"`, alt background): left-aligned heading, then 6/6 columns. On the left: a card with Address, Phone (`tel:` link) and Office hours icon rows, plus the outlined "Open directions" pill (Google Maps directions URL, new tab). On the right: a card holding the Maps `<iframe>` (`?q=…&output=embed`, `loading="lazy"`, `title`, min height 360px, stretches to match the left card) with the "Open in Maps" chip in the top-left corner. All URLs are built from `business.mapQuery`.
- `Reviews` (`id="reviews"`): centered heading, then 5/7 columns. On the left: the summary card (gold-tinted icon, "Verified on Google", serif title, `business.rating` + "Average rating", divider, `Rating`, paragraph, stat boxes using `business.reviewCount`, and the "View on Google Maps" / "Write a review" buttons). On the right: the featured review (the one with `featured: true`, warm gradient) at full width, with the others in two columns below (one column below `sm`). Each card has a letter avatar, name, "Google review · timeAgo", a badge icon, a small `Rating`, the text as a `<blockquote>` and the tag pill.
- `Booking` (`id="book"`, alt background): 6/6 columns. On the left: the heading and the bordered box of three tips with check icons. On the right: a white `Card` rendered as a `<form noValidate>` with labels above the inputs (Name, Surname, Phone, Service `Select`, Date, Time, Additional information) in a 2-column grid (one column below `sm`), the bordered consent row, and the full-width navy submit button with a send icon.
- `services/booking.js`: `submitBooking(data)` builds a `mailto:` to `business.email` with a subject line and every field in the body, then opens it. A `SWAP POINT` comment shows Formspree / EmailJS / WhatsApp replacements. It is `async` and should throw on failure, so a real backend drops in without touching the form.
- Validation: name, surname, phone, service and consent are required. Phone accepts digits, spaces, `+ ( ) . -` and needs 6 to 15 digits. Errors appear only after the first submit attempt, then update live as each field is fixed. On a failed submit the first invalid field gets focus. Errors are inline MUI `helperText`; the consent error uses a `FormHelperText` linked with `aria-describedby`.
- After submit: a `Snackbar` + filled `Alert` reads "Request prepared. Please send the email that just opened." An error variant appears if `submitBooking` throws.
- `App.jsx` now renders all six sections. The placeholder component is gone.
- `npm run build` and `npm run lint` pass. Checked visually in headless Edge at 1440px and at a true 375px.

## Stage 3: i18n (EN/FR/AR) and RTL (done)

- `i18n/en.js`, `fr.js`, `ar.js`: every UI string, same nested shape in all three. Lists (highlights, reasons, steps, tips, bullets) are arrays; items that carry an icon are keyed (`weddings`, `contracts`, `land`) so the icon mapping stays in the component. `{name}` placeholders are filled by `t(key, vars)`.
- `i18n/LanguageContext.jsx`: `LanguageProvider`. The value is `{ lang, setLang, dir, locale, t, localize, formatNumber }`. The starting language is the saved choice (`localStorage['notary-office.lang']`), then the browser language, then `en`. Only an explicit switch is saved. It sets `<html lang dir>`. `t()` falls back to English, then to the key (and warns in dev). `t()` returns arrays/objects as they are, for lists.
- `i18n/context.js`: the context object, `useLanguage()`, `DICTIONARIES`, `LANGUAGES`, `directionOf()`. It is split from the `.jsx` because `react-refresh/only-export-components` rejects a file exporting both a component and a hook.
- `DirectionalTheme.jsx`: Emotion `CacheProvider` (`muiltr`, or `muirtl` with `[prefixer, rtlPlugin]`) + `ThemeProvider` (`createAppTheme(dir)`, memoized) + `CssBaseline`. It is its own file because `main.jsx` cannot define a component (same lint rule). `main.jsx` now only imports fonts (Cairo 400–700 added) and renders `LanguageProvider > DirectionalTheme > App`.
- `theme.js` in RTL: Cairo for headings and body, weight 600 headings with line-height 1.4, h1/h2 scaled down (Cairo reads about 25% larger than Cormorant), and the eyebrow at 13px with no letter-spacing or uppercase. New exports: `flipInRtl` (sx for directional icons) and `tracking(em)` (letter-spacing that drops to 0 in RTL; used by the logo tagline).
- Header: the switcher is wired to the context. Each option has `lang` and an `aria-label` with the language's own name ("Français", "العربية"). The drawer keeps `anchor="right"`, which MUI turns into left in RTL.
- `business.js`: `tagline`, `hours` and each review's `timeAgo` / `text` / `tag` are now `{ en, fr, ar }`, read through `localize()`. Plain strings still work (shown as-is in every language), so real Google reviews can stay in their original language. `name` and `address` stay plain strings.
- Booking: `validateField` returns error **keys** and the snackbar stores only its severity, so messages already on screen re-translate on a language switch. The phone input is `dir="ltr"`.
- **Mailto decision**: the email is for the office, so its labels stay English and the service is the English label (`DICTIONARIES.en`). It also gets a new `Client language: Arabic` line (`Intl.DisplayNames`), so the office knows which language to reply in.
- **Bidi fixes**: the phone in Location and `reviewCount` ("40+") are wrapped in `dir="ltr"` spans, and reviewer names in `<bdi>`. Without them the `+` or the trailing `.` jump to the wrong end in Arabic.
- **Things the RTL plugin does not mirror, handled by hand**: the hero glow position (`90%` → `10%`) and the featured review gradient angle (`135deg` → `225deg`). Flipped icons: send, open-in-new, near-me (directions).
- Numbers: the rating goes through `Intl.NumberFormat(meta.locale)`, so FR shows "4,9". Arabic uses `ar-u-nu-latn` (Western digits, as in the Maghreb).
- French typography uses literal no-break spaces before `:` (U+00A0) and `?` (U+202F). They are invisible in the editor; keep them when editing.
- Checks: `npm run lint` and `npm run build` pass. A script confirmed that all three dictionaries have identical key shapes and placeholders, and that every literal `t('…')` key exists. No hard-coded copy is left in components. Checked in headless Edge at 1440px in AR and FR. The Arabic layout is fully mirrored; two issues were found and fixed (uppercased "GOOGLE" in the eyebrow, ".Amina K" bidi).

## Reveal on scroll (done)

- `components/Reveal.jsx`: a wrapper `Box` that fades its children in (opacity 0 → 1, `translateY(24px)` → none, 600ms ease-out) the first time 15% of it is on screen (`IntersectionObserver`, then disconnects, so it never re-hides). Optional `delay` (ms). Extra props (`sx`, `component`, …) pass through to the `Box`. Once shown, the transform is `none`, so the wrapper keeps no stacking context.
- `prefers-reduced-motion: reduce` (via `useMediaQuery`) or a browser without `IntersectionObserver`: content is shown at once with no transition styles.
- RTL: only the Y axis moves, so nothing needs mirroring. Switching language does not remount, so revealed content stays visible.
- Applied to: every `SectionHeading` (its root is now a `Reveal`); Services cards (0/100/200ms); WhyChooseUs reason cards (0/100/200/200ms) and the process card (100ms); Reviews summary (0), featured (100), the other two (200). Location: the two column cards (0/100ms). Booking: the tips box (0) and the form card (100ms). The Booking left column is not wrapped as a whole, because its heading already reveals on its own and nesting would double the slide.
- Not on Header or Hero.
- Cards that must fill their grid cell get `sx={{ height: '100%' }}` on the `Reveal`, so equal-height rows still work.
- `npm run lint` and `npm run build` pass. Not checked in a browser (skipped at the owner's request).

## Files

```
index.html                     (title changed to "Notary Office")
src/main.jsx
src/index.css                  (now a minimal reset)
src/theme.js
src/DirectionalTheme.jsx
src/App.jsx
src/config/business.js
src/i18n/LanguageContext.jsx
src/i18n/context.js
src/i18n/en.js
src/i18n/fr.js
src/i18n/ar.js
src/components/Header.jsx
src/components/Footer.jsx
src/components/SectionHeading.jsx
src/components/Reveal.jsx
src/components/Hero.jsx
src/components/Services.jsx
src/components/WhyChooseUs.jsx
src/components/Location.jsx
src/components/Reviews.jsx
src/components/Booking.jsx
src/services/booking.js
```

Removed Vite boilerplate: `src/App.css`, `src/assets/` (hero.png, react.svg, vite.svg).

## Decisions

- **Reference image**: now at `docs/reference.png` (1920×5378, full page). To compare a section, crop it with `System.Drawing` in PowerShell (PIL is not installed).
- **375px screenshots**: headless Edge will not make a window narrower than about 500px, so a plain `--window-size=375,…` clips the page and looks like overflow. Load the site inside a `<375px` iframe on a page served over HTTP (not `file://`, which hangs) and screenshot that instead.
- **MUI version is 9.5** (package.json). Code uses `sx` only, with no system props, and `slotProps` where needed. In later stages, use `Grid` with the `size` prop (the v7+ API).
- **Theme is a function**: `createAppTheme(direction)`, so the RTL stage can rebuild it. It also exports `HEADER_HEIGHT` (72) and `cardShadow`.
- **Custom palette keys**: `background.alt`, `gold.main` / `gold.bg`, `tint.green` / `tint.rose`, `heroGlow`.
- **Custom typography variant `eyebrow`**: use `<Typography variant="eyebrow">`. It renders as a `<span>` by default; pass `component="p"` for block use.
- **Responsive sizes**: h1 is 36px on mobile and 52px from `md` up; h2 is 28px and 36px.
- **Smooth scroll**: plain `href="#id"` anchors, `html { scroll-behavior: smooth }` (turned off for `prefers-reduced-motion`), and `section[id] { scroll-margin-top: 72px }`. All of it lives in the CssBaseline overrides, so no JS is needed.
- **Focus**: a global `:focus-visible` copper outline.
- **Hero id**: the spec gives the hero no id, so it uses `id="home"`. The logo links to it.
- **Language switcher**: wired to `LanguageContext` in stage 3.
- **Mobile header**: below `md` the nav moves into a right-side Drawer. Below `sm` the language switcher and CTA also move into the drawer.
- **Radius in `sx`**: `borderRadius: 3` multiplies `shape.borderRadius` (16), which gives 48px. Use string values (`'12px'`, `'16px'`) for inner sub-cards and boxes.
- **Section strings**: all copy is in `i18n/*.js` (stage 3). Components keep only non-text data (icons, tints, ids).
- **Icons**: Weddings = `FavoriteBorderRounded`, Contracts = `DescriptionOutlined` (hero) / `EditNoteOutlined` (services), Land = `MapOutlined` (hero) / `AccountBalanceOutlined` (services). Service icon colors (rose `#B23A48`, green `#2E6B4F`) are local to `Services.jsx`, so the theme was left unchanged.
- **Heading levels**: the hero h1, then "How we can help" as h2. Card titles are h3, and "Simple process" is h3 under the About h2.
- **Nav lists**: the header and footer keep only section ids (`NAV_IDS`, `LINK_IDS`); labels come from `nav.*` / `footer.links.*`.
- **Builder notes removed**: none of the reference's "Replace the sample…" or "If you want, this section can…" hints, and no notary@example.com note under the form.
- **Star color**: `#D9A441` (local `STAR_COLOR` in `Reviews.jsx`), a little darker than `gold.main` so the stars stay visible on white. Empty stars use `divider`.
- **Google links**: `googleProfileUrl` / `googleReviewUrl` are `'#'` for now, so `target="_blank"` is added only when the URL is real (`externalProps` in `Reviews.jsx`).
- **Service select**: it starts empty with a "Select a service" placeholder (the reference preselects Weddings), so the required check means something. Option values are keys (`weddings`, `contracts`, `land`, `other`). The readable label goes into the email.
- **Form labels**: a `<label htmlFor>` sits above each input with a copper `*` (`aria-hidden`) on required fields; the inputs carry `required` / `aria-required`. The Select is labelled through `slotProps.select.labelId`. All field ids follow `booking-<field>`, which is how the first invalid field gets focus (no refs; the React Compiler lint rule rejects callback refs written into `useRef` during render).
- **Form card**: white per the spec. The reference's card is slightly beige.
- **Form data is kept after submit**: if the mail client does not open, the user has not lost anything.
- **Directional icons**: flipped with the shared `flipInRtl` sx from `theme.js`.
- **Bundle size**: Vite warns that the JS chunk is over 500 kB. That is a warning, not an error; look at it in stage 4.

## Not done yet

- Stage 4: quality checklist pass, including a browser check at 1280px and 375px. Also check, in all three languages:
  - Arabic at 375px (not yet checked): the drawer opening from the left, and long Arabic or French labels wrapping in buttons and the header.
  - The language choice surviving a reload in a real (non-headless) browser.
  - Dev-console i18n warnings.
- Data to confirm with the owner: `business.mapQuery` is still the spec placeholder ("123 Legal Avenue…") while `address` is the real Djerba address, so the map and directions point to the wrong place. The phone placeholder in the form (`+1 234 567 890`, in all three dictionaries) could become a Tunisian-format example.
- To check before going live: "Land registration" is translated as "Enregistrement foncier" / "التسجيل العقاري", which are neutral terms; in Tunisia the official term is "immatriculation foncière". The headless check used Edge's map iframe, which stays blank offline, as in earlier stages.
