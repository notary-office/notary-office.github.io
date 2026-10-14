import { createTheme } from '@mui/material/styles';

const colors = {
  navy: '#1C2B4A',
  navyDark: '#152036',
  copper: '#B0662E',
  page: '#FAF8F4',
  paper: '#FFFFFF',
  alt: '#F5F2EC',
  border: '#E6E1D8',
  body: '#5B6474',
  gold: '#E9C27B',
  goldBg: 'rgba(233,194,123,0.10)',
  heroGlow: '#FBF3DF',
  tintGreen: '#EAF3EE',
  tintRose: '#FDEEEE',
};

const serif = '"Cormorant Garamond", Georgia, "Times New Roman", serif';
const sans = '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
// Arabic uses Cairo for headings and body; Inter stays as the fallback for Latin text.
const arabic = '"Cairo", "Inter", system-ui, "Segoe UI", Tahoma, sans-serif';

export const HEADER_HEIGHT = 72;
export const cardShadow = '0 8px 24px rgba(28,43,74,0.06)';

// For directional icons (send, arrows, open-in-new): mirror them in RTL.
export const flipInRtl = { transform: (t) => (t.direction === 'rtl' ? 'scaleX(-1)' : 'none') };

// Letter-spacing breaks the joining of Arabic letters, so tracked labels drop it in RTL.
export const tracking = (em) => (t) => (t.direction === 'rtl' ? 0 : em);

// Phones: a set of small cards reads as a feed when stacked, so they merge into one card split by
// hairlines. `phoneGroup` goes on the container (pass `false` when it already sits inside a card),
// `phoneGroupItem` on each item. Both do nothing from `sm` up.
export const phoneGroup = (framed = true) => (t) => ({
  [t.breakpoints.down('sm')]: {
    gap: 0,
    ...(framed && {
      border: `1px solid ${t.palette.divider}`,
      borderRadius: '12px',
      bgcolor: 'background.paper',
      boxShadow: cardShadow,
      overflow: 'hidden',
    }),
  },
});

export const phoneGroupItem = (t) => ({
  [t.breakpoints.down('sm')]: {
    border: 0,
    borderRadius: 0,
    boxShadow: 'none',
    bgcolor: 'transparent',
    '&:not(:first-of-type)': { borderTop: `1px solid ${t.palette.divider}` },
  },
});

// Phones: a horizontal swipe row (scroll-snap, the next card peeks in) instead of a vertical stack.
// From `sm` up the container is a plain grid; set `gridTemplateColumns` and `gap` alongside it.
// Scrolling follows the page direction, so it starts from the right in Arabic with no extra code.
export const swipeRow = (t) => ({
  [t.breakpoints.down('sm')]: {
    display: 'flex',
    overflowX: 'auto',
    scrollSnapType: 'x mandatory',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': { display: 'none' },
    // Bleed to the screen edges (Container gutter is 16px) and leave room for the card shadows.
    mx: -2,
    px: 2,
    scrollPaddingInline: '16px',
    mt: -1,
    pt: 1,
    mb: -3,
    pb: 3,
    '& > *': { flex: '0 0 84%', scrollSnapAlign: 'start' },
  },
});

export function createAppTheme(direction = 'ltr') {
  const rtl = direction === 'rtl';
  const headingFont = rtl ? arabic : serif;
  const bodyFont = rtl ? arabic : sans;
  // Cairo needs more line height than Cormorant for its tall ascenders and dots.
  const heading = (lineHeight) => ({
    fontFamily: headingFont,
    fontWeight: rtl ? 600 : 500,
    lineHeight: rtl ? 1.4 : lineHeight,
    letterSpacing: 'normal',
    color: colors.navy,
  });

  const base = createTheme({
    direction,
    palette: {
      primary: { main: colors.navy, dark: colors.navyDark, contrastText: '#FFFFFF' },
      secondary: { main: colors.copper, contrastText: '#FFFFFF' },
      background: { default: colors.page, paper: colors.paper, alt: colors.alt },
      text: { primary: colors.navy, secondary: colors.body },
      divider: colors.border,
      gold: { main: colors.gold, bg: colors.goldBg },
      tint: { green: colors.tintGreen, rose: colors.tintRose },
      heroGlow: colors.heroGlow,
    },
    shape: { borderRadius: 16 },
    typography: {
      fontFamily: bodyFont,
      fontSize: 15,
      h1: heading(1.15),
      h2: heading(1.2),
      h3: { ...heading(1.25), fontSize: '1.75rem' },
      h4: { ...heading(1.3), fontSize: '1.5rem' },
      body1: { fontSize: '1rem', lineHeight: 1.6, color: colors.body },
      body2: { fontSize: '0.9375rem', lineHeight: 1.6, color: colors.body },
      button: { fontSize: '0.875rem', fontWeight: 600, textTransform: 'none' },
      eyebrow: {
        fontFamily: bodyFont,
        fontSize: rtl ? '0.8125rem' : '0.6875rem',
        fontWeight: 600,
        lineHeight: 1.4,
        letterSpacing: rtl ? 0 : '0.2em',
        // Arabic has no case, and uppercasing would only turn embedded Latin words into "GOOGLE".
        textTransform: rtl ? 'none' : 'uppercase',
        color: colors.copper,
      },
    },
  });

  const { breakpoints } = base;

  return createTheme(base, {
    typography: {
      // Cairo reads about 25% larger than Cormorant at the same size, so Arabic headings are scaled down.
      h1: rtl
        ? { fontSize: '1.875rem', [breakpoints.up('md')]: { fontSize: '2.625rem' } }
        : { fontSize: '2.25rem', [breakpoints.up('md')]: { fontSize: '3.25rem' } },
      h2: rtl
        ? { fontSize: '1.5rem', [breakpoints.up('md')]: { fontSize: '1.875rem' } }
        : { fontSize: '1.75rem', [breakpoints.up('md')]: { fontSize: '2.25rem' } },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: { scrollBehavior: 'smooth' },
          '@media (prefers-reduced-motion: reduce)': { html: { scrollBehavior: 'auto' } },
          'section[id]': { scrollMarginTop: HEADER_HEIGHT },
          ':focus-visible': { outline: `2px solid ${colors.copper}`, outlineOffset: 2 },
        },
      },
      MuiTypography: {
        defaultProps: { variantMapping: { eyebrow: 'span' } },
      },
      MuiContainer: {
        defaultProps: { maxWidth: 'lg' },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: { borderRadius: 999, paddingInline: 20, paddingBlock: 10 },
          sizeSmall: { paddingInline: 14, paddingBlock: 6 },
          outlined: {
            backgroundColor: colors.paper,
            borderColor: colors.border,
            color: colors.navy,
            '&:hover': { borderColor: colors.navy, backgroundColor: colors.paper },
          },
        },
      },
      MuiChip: {
        styleOverrides: { root: { borderRadius: 999 } },
      },
      MuiPaper: {
        styleOverrides: {
          outlined: { borderColor: colors.border, boxShadow: cardShadow },
        },
      },
      MuiCard: {
        defaultProps: { variant: 'outlined' },
        styleOverrides: {
          root: { borderRadius: 16, borderColor: colors.border, boxShadow: cardShadow },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            backgroundColor: colors.paper,
            '& .MuiOutlinedInput-notchedOutline': { borderColor: colors.border },
          },
        },
      },
      MuiDivider: {
        styleOverrides: { root: { borderColor: colors.border } },
      },
      MuiLink: {
        defaultProps: { underline: 'hover' },
      },
    },
  });
}
