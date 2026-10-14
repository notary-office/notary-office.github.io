import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';

import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import { business } from '../config/business.js';
import { useLanguage } from '../i18n/context.js';
import { flipInRtl } from '../theme.js';

const query = encodeURIComponent(business.mapQuery);
const MAP_EMBED_URL = `https://www.google.com/maps?q=${query}&output=embed`;
const MAP_SEARCH_URL = `https://www.google.com/maps/search/?api=1&query=${query}`;
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${query}`;

// Labels live under location.<key> in the i18n files.
const CONTACT_ROWS = [
  { key: 'address', icon: PlaceOutlinedIcon, value: business.address },
  {
    key: 'phone',
    icon: PhoneInTalkOutlinedIcon,
    value: business.phone,
    href: `tel:${business.phone.replace(/[^\d+]/g, '')}`,
    ltr: true,
  },
  { key: 'hours', icon: ScheduleOutlinedIcon, value: business.hours },
];

// `ltr` isolates values like phone numbers, so the leading "+" stays in place inside Arabic text.
function ContactRow({ icon: Icon, label, value: rawValue, href, ltr }) {
  const value = ltr ? <span dir="ltr">{rawValue}</span> : rawValue;

  return (
    <Box component="li" sx={{ display: 'flex', gap: 2 }}>
      <Box
        sx={{
          width: 48,
          height: 48,
          flexShrink: 0,
          borderRadius: '12px',
          bgcolor: 'background.alt',
          color: 'text.primary',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Icon sx={{ fontSize: 22 }} aria-hidden />
      </Box>
      <Box>
        <Typography component="h3" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
          {label}
        </Typography>
        <Typography variant="body2">
          {href ? (
            <Link href={href} color="inherit">
              {value}
            </Link>
          ) : (
            value
          )}
        </Typography>
      </Box>
    </Box>
  );
}

export default function Location() {
  const { t, localize } = useLanguage();

  return (
    <Box
      component="section"
      id="address"
      aria-labelledby="address-title"
      sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.alt' }}
    >
      <Container>
        <SectionHeading
          eyebrow={t('location.eyebrow')}
          title={t('location.title')}
          subtitle={t('location.subtitle')}
          titleId="address-title"
        />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Reveal sx={{ height: '100%' }}>
              <Card sx={{ p: { xs: 3, md: 4 }, height: '100%' }}>
                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: 3 }}>
                  {CONTACT_ROWS.map(({ key, value, ...row }) => (
                    <ContactRow key={key} {...row} label={t(`location.${key}`)} value={localize(value)} />
                  ))}
                </Box>
                <Button
                  variant="outlined"
                  href={DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<NearMeOutlinedIcon aria-hidden sx={flipInRtl} />}
                  sx={{ mt: 4 }}
                >
                  {t('location.directions')}
                </Button>
              </Card>
            </Reveal>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Reveal delay={100} sx={{ height: '100%' }}>
              <Card sx={{ position: 'relative', height: '100%', minHeight: 360, display: 'flex' }}>
                <Box
                  component="iframe"
                  src={MAP_EMBED_URL}
                  title={t('location.mapTitle', { name: localize(business.name) })}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  sx={{ border: 0, width: '100%', minHeight: 360, flexGrow: 1 }}
                />
                <Chip
                  component="a"
                  href={MAP_SEARCH_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  clickable
                  size="small"
                  label={t('location.openInMaps')}
                  icon={<OpenInNewRoundedIcon aria-hidden sx={flipInRtl} />}
                  sx={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    bgcolor: 'background.paper',
                    color: 'text.primary',
                    fontWeight: 600,
                    border: 1,
                    borderColor: 'divider',
                    boxShadow: '0 2px 8px rgba(28,43,74,0.12)',
                    '&:hover': { bgcolor: 'background.alt' },
                    '& .MuiChip-icon': { color: 'inherit', fontSize: 16 },
                  }}
                />
              </Card>
            </Reveal>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
