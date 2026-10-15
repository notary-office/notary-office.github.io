import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { keyframes } from '@mui/material/styles';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import PersonPinCircleOutlinedIcon from '@mui/icons-material/PersonPinCircleOutlined';

import heroPen from '../assets/hero-pen.png';
import Reveal from './Reveal.jsx';
import { useLanguage } from '../i18n/context.js';
import { phoneGroup, phoneGroupItem } from '../theme.js';

// The pen fades in after the hero content and glides toward its nib, as if it had just written.
// Only `from` is given, so it ends on the element's own opacity and transform (mirrored in RTL).
const penIn = {
  ltr: keyframes({ from: { opacity: 0, transform: 'translate(32px, -20px)' } }),
  rtl: keyframes({ from: { opacity: 0, transform: 'translate(-32px, -20px) scaleX(-1)' } }),
};

// Delay between the hero blocks as they fade up on load.
const STAGGER = 100;

// Copy lives under hero.help.items.<key> in the i18n files.
const HELP_ITEMS = [
  { key: 'weddings', icon: FavoriteBorderRoundedIcon },
  { key: 'contracts', icon: DescriptionOutlinedIcon },
  { key: 'land', icon: MapOutlinedIcon },
];

function HelpCard() {
  const { t } = useLanguage();

  return (
    <Card sx={{ p: { xs: 3, md: 4 }, position: 'relative' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap-reverse', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1.5 }}>
        <Box>
          <Typography variant="eyebrow" component="p" sx={{ color: 'text.secondary', mb: 1 }}>
            {t('hero.help.eyebrow')}
          </Typography>
          <Typography variant="h3" component="h2" id="home-help-title" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
            {t('hero.help.title')}
          </Typography>
        </Box>
        <Chip
          label={t('hero.help.chip')}
          size="small"
          sx={{
            bgcolor: 'gold.bg',
            border: 1,
            borderColor: 'gold.main',
            color: 'secondary.main',
            fontWeight: 600,
            fontSize: '0.75rem',
          }}
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* On tablets the card spans the full width, so the three items sit side by side, icon on top. */}
      <Box
        component="ul"
        aria-labelledby="home-help-title"
        sx={[{ listStyle: 'none', p: 0, m: 0, display: 'grid', gridTemplateColumns: { sm: 'repeat(3, 1fr)', md: '1fr' }, gap: 2 }, phoneGroup(false)]}
      >
        {HELP_ITEMS.map(({ key, icon: Icon }) => (
          <Box
            component="li"
            key={key}
            sx={[
              {
                display: 'flex',
                flexDirection: { sm: 'column', md: 'row' },
                gap: 2,
                p: { xs: 0, sm: 2.5 },
                py: { xs: 2.5 },
                border: 1,
                borderColor: 'divider',
                borderRadius: '12px',
              },
              phoneGroupItem,
            ]}
          >
            <Box
              sx={{
                width: 44,
                height: 44,
                flexShrink: 0,
                borderRadius: '50%',
                bgcolor: 'background.alt',
                display: 'grid',
                placeItems: 'center',
                color: 'primary.main',
              }}
            >
              <Icon sx={{ fontSize: 20 }} aria-hidden />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>{t(`hero.help.items.${key}.title`)}</Typography>
              <Typography variant="body2">{t(`hero.help.items.${key}.text`)}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          mt: 3,
          p: 2,
          pl: 2.5,
          bgcolor: 'background.default',
          border: 1,
          borderColor: 'divider',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
        }}
      >
        <Typography variant="body2" sx={{ flex: 1 }}>
          <Box component="strong" sx={{ color: 'text.primary', fontWeight: 600 }}>
            {t('hero.help.consultationTitle')}
          </Box>{' '}
          {t('hero.help.consultationText')}
        </Typography>
        <Button variant="outlined" size="small" href="#book" sx={{ flexShrink: 0 }}>
          {t('hero.help.consultationCta')}
        </Button>
      </Box>
    </Card>
  );
}

export default function Hero() {
  const { t } = useLanguage();

  return (
    <Box
      component="section"
      id="home"
      aria-labelledby="home-title"
      sx={{
        py: { xs: 8, md: 10 },
        // Clips the pen drawing where it bleeds past the screen edge.
        overflow: 'hidden',
        // The RTL stylis plugin does not mirror gradient positions, so the glow is moved by hand.
        backgroundImage: (th) =>
          `radial-gradient(ellipse 55% 70% at ${th.direction === 'rtl' ? '10%' : '90%'} 45%, ${th.palette.heroGlow} 0%, transparent 70%)`,
      }}
    >
      <Container>
        <Grid container columnSpacing={7} rowSpacing={6} sx={{ alignItems: 'center' }}>
          {/* `isolation` keeps the pen's negative z-index inside this column: under its text and cards,
              and under the help card it reaches toward. */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ position: 'relative', isolation: 'isolate' }}>
            {/* Decorative fountain pen, nib down by the highlight cards. `left` is flipped to `right` by the
                RTL cache, and the drawing is mirrored so the nib still points to the outer edge. */}
            <Box
              component="img"
              src={heroPen}
              alt=""
              aria-hidden
              sx={(th) => ({
                position: 'absolute',
                zIndex: -1,
                pointerEvents: 'none',
                userSelect: 'none',
                left: { xs: '-12%', md: '-29%' },
                bottom: { xs: '-4%', md: '-6%' },
                width: { xs: '115%', md: '150%' },
                maxWidth: 'none', // index.css caps images at 100%
                opacity: th.palette.mode === 'dark' ? 0.14 : 0.22,
                transform: th.direction === 'rtl' ? 'scaleX(-1)' : 'none',
                animation: `${penIn[th.direction]} 1400ms cubic-bezier(0.22, 1, 0.36, 1) 600ms both`,
                '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
              })}
            />
            <Reveal sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Box aria-hidden sx={{ width: 48, height: '1px', bgcolor: 'secondary.main', flexShrink: 0 }} />
              <Typography variant="eyebrow" component="p">
                {t('hero.eyebrow')}
              </Typography>
            </Reveal>

            <Reveal delay={STAGGER}>
              <Typography variant="h1" id="home-title">
                {t('hero.title')}
              </Typography>
            </Reveal>

            <Reveal delay={STAGGER * 2}>
              <Typography variant="body1" sx={{ mt: 3, fontSize: { md: '1.125rem' }, maxWidth: 600 }}>
                {t('hero.lead')}
              </Typography>
            </Reveal>

            <Reveal delay={STAGGER * 3} sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                href="#book"
                startIcon={<NoteAltOutlinedIcon />}
                sx={{ px: 3, py: 1.5 }}
              >
                {t('hero.primaryCta')}
              </Button>
              <Button
                variant="outlined"
                size="large"
                href="#address"
                startIcon={<PersonPinCircleOutlinedIcon />}
                sx={{ px: 3, py: 1.5 }}
              >
                {t('hero.secondaryCta')}
              </Button>
            </Reveal>

            <Reveal
              delay={STAGGER * 4}
              sx={[
                { display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2, mt: 4 },
                phoneGroup(),
              ]}
            >
              {t('hero.highlights').map(({ title, text }) => (
                <Card
                  key={title}
                  sx={[{ p: 2, borderRadius: '12px', display: { xs: 'flex', sm: 'block' }, alignItems: 'baseline', gap: 2 }, phoneGroupItem]}
                >
                  <Typography variant="h4" component="h3" sx={{ fontSize: '1.75rem', mb: { sm: 0.5 }, minWidth: { xs: 88, sm: 0 } }}>
                    {title}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                    {text}
                  </Typography>
                </Card>
              ))}
            </Reveal>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Reveal delay={STAGGER * 2}>
              <HelpCard />
            </Reveal>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
