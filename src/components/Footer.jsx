import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { business } from '../config/business.js';
import { useLanguage } from '../i18n/context.js';

const LINK_IDS = ['services', 'address', 'reviews', 'book'];

export default function Footer() {
  const { t, localize } = useLanguage();
  const year = new Date().getFullYear();
  const name = localize(business.name);

  return (
    <Box component="footer" sx={{ borderTop: 1, borderColor: 'divider', py: { xs: 5, md: 6 } }}>
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            gap: 3,
          }}
        >
          <Box>
            <Typography variant="h4" component="p">
              {name}
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.5 }}>
              {t('footer.description')}
            </Typography>
          </Box>
          <Box component="nav" aria-label={t('footer.nav')} sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 3, rowGap: 1 }}>
            {LINK_IDS.map((id) => (
              <Link key={id} href={`#${id}`} sx={{ fontSize: '0.8125rem', color: 'text.primary' }}>
                {t(`footer.links.${id}`)}
              </Link>
            ))}
          </Box>
        </Box>
        <Typography variant="body2" sx={{ mt: 4, fontSize: '0.75rem' }}>
          {t('footer.copyright', { year, name })}
        </Typography>
      </Container>
    </Box>
  );
}
