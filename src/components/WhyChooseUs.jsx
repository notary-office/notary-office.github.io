import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';

import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import { useLanguage } from '../i18n/context.js';
import { cardShadow, phoneGroup, phoneGroupItem } from '../theme.js';

const onDark = {
  text: 'rgba(255,255,255,0.78)',
  rowBg: 'rgba(255,255,255,0.04)',
  rowBorder: 'rgba(255,255,255,0.10)',
};

function ProcessCard() {
  const { t } = useLanguage();

  return (
    <Box
      sx={{
        bgcolor: 'primary.dark',
        color: 'common.white',
        borderRadius: '16px',
        boxShadow: cardShadow,
        p: { xs: 3, md: 4 },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            flexShrink: 0,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.08)',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <TaskAltRoundedIcon sx={{ fontSize: 22 }} aria-hidden />
        </Box>
        <Box>
          <Typography variant="eyebrow" component="p" sx={{ color: onDark.text }}>
            {t('about.process.eyebrow')}
          </Typography>
          <Typography variant="h3" id="process-title" sx={{ color: 'common.white', fontSize: '1.875rem' }}>
            {t('about.process.title')}
          </Typography>
        </Box>
      </Box>

      {/* On tablets the card spans the full width, so the three steps sit side by side. */}
      <Box
        component="ol"
        aria-labelledby="process-title"
        sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gridTemplateColumns: { sm: 'repeat(3, 1fr)', md: '1fr' }, gap: 2 }}
      >
        {t('about.process.steps').map(({ title, text }, i) => (
          <Box
            component="li"
            key={title}
            sx={{ p: 2.5, bgcolor: onDark.rowBg, border: 1, borderColor: onDark.rowBorder, borderRadius: '12px' }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: '0.9375rem', color: 'common.white', mb: 0.5 }}>
              {i + 1}. {title}
            </Typography>
            <Typography variant="body2" sx={{ color: onDark.text }}>
              {text}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          mt: 4,
          p: 2.5,
          bgcolor: 'gold.bg',
          border: 1,
          borderColor: 'rgba(233,194,123,0.30)',
          borderRadius: '12px',
        }}
      >
        <Typography variant="body2" sx={{ color: 'gold.main', fontWeight: 500 }}>
          {t('about.process.tip')}
        </Typography>
      </Box>
    </Box>
  );
}

export default function WhyChooseUs() {
  const { t } = useLanguage();

  return (
    <Box component="section" id="about" aria-labelledby="about-title" sx={{ py: { xs: 8, md: 12 } }}>
      <Container>
        <Grid container columnSpacing={6} rowSpacing={6} sx={{ alignItems: 'flex-start' }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <SectionHeading
              eyebrow={t('about.eyebrow')}
              title={t('about.title')}
              subtitle={t('about.subtitle')}
              titleId="about-title"
              sx={{ mb: 4 }}
            />

            <Box sx={[{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2.5 }, phoneGroup()]}>
              {t('about.reasons').map(({ title, text }, i) => (
                <Reveal
                  key={title}
                  delay={Math.min(i, 2) * 100}
                  sx={[
                    { p: 2.5, bgcolor: 'background.paper', border: 1, borderColor: 'divider', borderRadius: '12px' },
                    phoneGroupItem,
                  ]}
                >
                  <Typography component="h3" sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
                    {title}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                    {text}
                  </Typography>
                </Reveal>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Reveal delay={100}>
              <ProcessCard />
            </Reveal>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
