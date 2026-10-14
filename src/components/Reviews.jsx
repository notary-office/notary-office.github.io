import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';

import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import { business } from '../config/business.js';
import { useLanguage } from '../i18n/context.js';
import { flipInRtl, swipeRow } from '../theme.js';

// Darker than gold.main so the stars stay visible on white and on the warm featured card.
const STAR_COLOR = '#D9A441';
const ratingSx = { '& .MuiRating-iconFilled': { color: STAR_COLOR }, '& .MuiRating-iconEmpty': { color: 'divider' } };

// The Google URLs are '#' until the real profile is known; only open real links in a new tab.
const externalProps = (url) => (url && url !== '#' ? { target: '_blank', rel: 'noopener noreferrer' } : {});

const serifSx = { fontFamily: (t) => t.typography.h1.fontFamily, color: 'text.primary', lineHeight: 1 };

function SummaryCard() {
  const { t, formatNumber } = useLanguage();
  const stats = [
    // An LTR island keeps "40+" from rendering as "+40" in Arabic.
    { key: 'count', value: <span dir="ltr">{business.reviewCount}</span>, label: t('reviews.summary.publicReviews') },
    { key: 'presence', value: t('reviews.summary.localValue'), label: t('reviews.summary.mapsPresence') },
  ];

  return (
    <Card sx={{ p: { xs: 3, md: 4 }, height: '100%' }}>
      <Box sx={{ display: 'flex', flexWrap: { xs: 'wrap', sm: 'nowrap' }, alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            width: 52,
            height: 52,
            flexShrink: 0,
            borderRadius: '12px',
            bgcolor: 'gold.bg',
            border: 1,
            borderColor: 'gold.main',
            color: 'secondary.main',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <PlaceOutlinedIcon aria-hidden />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="eyebrow" component="p">
            {t('reviews.summary.eyebrow')}
          </Typography>
          <Typography variant="h3" sx={{ fontSize: '1.625rem' }}>
            {t('reviews.summary.title')}
          </Typography>
        </Box>
        {/* Below sm the rating drops to its own row so the title keeps its width. */}
        <Box
          sx={{
            flexShrink: 0,
            flexBasis: { xs: '100%', sm: 'auto' },
            display: { xs: 'flex', sm: 'block' },
            alignItems: 'baseline',
            gap: 1,
            textAlign: { sm: 'end' },
          }}
        >
          <Typography sx={{ ...serifSx, fontSize: '2.5rem' }}>{formatNumber(business.rating)}</Typography>
          <Typography variant="body2" sx={{ fontSize: '0.8125rem' }}>
            {t('reviews.summary.averageRating')}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Rating value={business.rating} precision={0.1} readOnly sx={ratingSx} />
      <Typography variant="body1" sx={{ mt: 2 }}>
        {t('reviews.summary.text')}
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, my: 3 }}>
        {stats.map(({ key, value, label }) => (
          <Box key={key} sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: '12px' }}>
            <Typography sx={{ ...serifSx, fontSize: '1.625rem', mb: 0.5 }}>{value}</Typography>
            <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
              {label}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
        <Button
          variant="contained"
          href={business.googleProfileUrl}
          {...externalProps(business.googleProfileUrl)}
          startIcon={<OpenInNewRoundedIcon aria-hidden sx={flipInRtl} />}
        >
          {t('reviews.summary.viewOnGoogle')}
        </Button>
        <Button
          variant="outlined"
          href={business.googleReviewUrl}
          {...externalProps(business.googleReviewUrl)}
          startIcon={<RateReviewOutlinedIcon aria-hidden />}
        >
          {t('reviews.summary.writeReview')}
        </Button>
      </Box>
    </Card>
  );
}

function ReviewCard({ name, timeAgo, rating, text, tag, featured }) {
  const { t, localize } = useLanguage();
  const BadgeIcon = featured ? VerifiedOutlinedIcon : MapOutlinedIcon;

  return (
    <Card
      component="article"
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        ...(featured && {
          // Gradient angles are not mirrored by the RTL plugin; keep the warm corner at the start side.
          backgroundImage: (th) =>
            `linear-gradient(${th.direction === 'rtl' ? 225 : 135}deg, ${th.palette.heroGlow} 0%, ${th.palette.background.paper} 70%)`,
        }),
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 2 }}>
        <Avatar
          aria-hidden
          sx={{
            width: 44,
            height: 44,
            bgcolor: 'background.alt',
            color: 'text.primary',
            border: 1,
            borderColor: 'divider',
            fontWeight: 600,
            fontSize: '1rem',
          }}
        >
          {name.charAt(0)}
        </Avatar>
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography component="h3" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {/* <bdi> keeps a Latin name's trailing "." in place inside Arabic text. */}
            <bdi>{name}</bdi>
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.8125rem' }}>
            {t('reviews.source', { timeAgo: localize(timeAgo) })}
          </Typography>
        </Box>
        <Box
          aria-hidden
          sx={{
            width: 36,
            height: 36,
            flexShrink: 0,
            borderRadius: '50%',
            border: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
            color: 'text.primary',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <BadgeIcon sx={{ fontSize: 18 }} />
        </Box>
      </Box>

      <Rating value={rating} readOnly size="small" sx={ratingSx} />
      <Typography variant="body1" component="blockquote" sx={{ m: 0, mt: 1.5, mb: 2.5, flexGrow: 1 }}>
        {localize(text)}
      </Typography>

      <Box
        sx={{
          alignSelf: 'stretch',
          px: 1.5,
          py: 0.5,
          borderRadius: 999,
          bgcolor: 'gold.bg',
          border: 1,
          borderColor: 'divider',
          color: 'secondary.main',
          fontSize: '0.75rem',
          fontWeight: 600,
        }}
      >
        {localize(tag)}
      </Box>
    </Card>
  );
}

export default function Reviews() {
  const featured = business.reviews.find((r) => r.featured) ?? business.reviews[0];
  const others = business.reviews.filter((r) => r !== featured);
  const { t } = useLanguage();

  return (
    <Box component="section" id="reviews" aria-labelledby="reviews-title" sx={{ py: { xs: 8, md: 12 } }}>
      <Container>
        <SectionHeading
          eyebrow={t('reviews.eyebrow')}
          title={t('reviews.title')}
          subtitle={t('reviews.subtitle')}
          titleId="reviews-title"
          align="center"
        />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Reveal sx={{ height: '100%' }}>
              <SummaryCard />
            </Reveal>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            {/* Swipe row on phones; from sm the featured review spans the row above the others. */}
            <Box sx={[{ display: 'grid', gridTemplateColumns: { sm: 'repeat(2, 1fr)' }, gap: 3 }, swipeRow]}>
              <Reveal delay={100} sx={{ gridColumn: '1 / -1' }}>
                <ReviewCard {...featured} featured />
              </Reveal>
              {others.map((review) => (
                <Reveal key={review.name} delay={200}>
                  <ReviewCard {...review} />
                </Reveal>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
