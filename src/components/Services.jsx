import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';

import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import { useLanguage } from '../i18n/context.js';
import { swipeRow } from '../theme.js';

// Copy lives under services.items.<key> in the i18n files.
const SERVICES = [
  { key: 'weddings', icon: FavoriteBorderRoundedIcon, tint: 'rose' },
  { key: 'contracts', icon: EditNoteOutlinedIcon, tint: 'green' },
  { key: 'land', icon: AccountBalanceOutlinedIcon, tint: 'green' },
];

const ICON_COLORS = { rose: '#B23A48', green: '#2E6B4F' };

function ServiceCard({ icon: Icon, tint, title, text, bullets, index }) {
  return (
    <Card component="article" sx={{ p: { xs: 3, sm: 4 }, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: '12px',
            bgcolor: `tint.${tint}`,
            color: ICON_COLORS[tint],
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <Icon aria-hidden />
        </Box>
        <Typography
          aria-hidden
          sx={{ fontFamily: (t) => t.typography.h1.fontFamily, fontSize: '1.5rem', color: 'text.disabled', lineHeight: 1 }}
        >
          {String(index + 1).padStart(2, '0')}
        </Typography>
      </Box>

      <Typography variant="h4" component="h3" sx={{ fontSize: '1.75rem', mb: 2 }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        {text}
      </Typography>

      <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: 1.5 }}>
        {bullets.map((bullet) => (
          <Box
            component="li"
            key={bullet}
            sx={{ display: 'flex', gap: 1.5, fontSize: '0.875rem', lineHeight: 1.5, color: 'text.primary' }}
          >
            <Box
              aria-hidden
              sx={{ width: 6, height: 6, mt: '0.5em', borderRadius: '50%', bgcolor: 'secondary.main', flexShrink: 0 }}
            />
            {bullet}
          </Box>
        ))}
      </Box>
    </Card>
  );
}

export default function Services() {
  const { t } = useLanguage();

  return (
    <Box
      component="section"
      id="services"
      aria-labelledby="services-title"
      sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.alt' }}
    >
      <Container>
        <SectionHeading
          eyebrow={t('services.eyebrow')}
          title={t('services.title')}
          subtitle={t('services.subtitle')}
          titleId="services-title"
          align="center"
        />

        {/* Swipe row on phones, two per row on tablets (an odd last card takes the full row), three on desktop. */}
        <Box
          sx={[
            {
              display: 'grid',
              gridTemplateColumns: { sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
              gap: 3,
              '& > :last-child:nth-of-type(odd)': { gridColumn: { sm: '1 / -1', md: 'auto' } },
            },
            swipeRow,
          ]}
        >
          {SERVICES.map(({ key, ...service }, i) => (
            <Reveal key={key} delay={i * 100} sx={{ height: '100%' }}>
              <ServiceCard {...service} {...t(`services.items.${key}`)} index={i} />
            </Reveal>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
