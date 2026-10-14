import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import BalanceIcon from '@mui/icons-material/Balance';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

import { business } from '../config/business.js';
import { DICTIONARIES, LANGUAGES, useLanguage } from '../i18n/context.js';
import { HEADER_HEIGHT, tracking } from '../theme.js';

const NAV_IDS = ['services', 'about', 'address', 'reviews', 'book'];

function Logo() {
  const { localize } = useLanguage();

  return (
    <Box
      component="a"
      href="#home"
      sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'inherit', textDecoration: 'none', borderRadius: 1 }}
    >
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: 1,
          borderColor: 'divider',
          display: 'grid',
          placeItems: 'center',
          color: 'primary.main',
          flexShrink: 0,
        }}
      >
        <BalanceIcon sx={{ fontSize: 18 }} aria-hidden />
      </Box>
      <Box>
        <Typography sx={{ fontFamily: (t) => t.typography.h1.fontFamily, fontSize: '1.375rem', fontWeight: 500, lineHeight: 1, color: 'primary.main' }}>
          {localize(business.name)}
        </Typography>
        <Typography sx={{ fontSize: '0.625rem', fontWeight: 500, letterSpacing: tracking('0.18em'), textTransform: 'uppercase', color: 'text.secondary', mt: 0.5 }}>
          {localize(business.tagline)}
        </Typography>
      </Box>
    </Box>
  );
}

// Each option is announced by the language's own name ("Français", "العربية"), so it can be found
// by someone who cannot read the current language.
function LanguageSwitcher() {
  const { lang, setLang, t } = useLanguage();

  return (
    <ToggleButtonGroup
      value={lang}
      exclusive
      onChange={(_, next) => next && setLang(next)}
      aria-label={t('header.language')}
      size="small"
      sx={{
        p: 0.5,
        gap: 0.5,
        border: 1,
        borderColor: 'divider',
        borderRadius: 999,
        bgcolor: 'background.paper',
        '& .MuiToggleButtonGroup-grouped': {
          border: 0,
          borderRadius: '999px !important',
          m: 0,
        },
      }}
    >
      {LANGUAGES.map((code) => (
        <ToggleButton
          key={code}
          value={code}
          lang={code}
          aria-label={DICTIONARIES[code].meta.name}
          sx={{
            minWidth: 36,
            px: 1.25,
            py: 0.5,
            fontSize: '0.6875rem',
            fontWeight: 600,
            lineHeight: 1.6,
            color: 'text.secondary',
            '&.Mui-selected, &.Mui-selected:hover': { bgcolor: 'primary.main', color: 'primary.contrastText' },
          }}
        >
          {code.toUpperCase()}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export default function Header() {
  const { t } = useLanguage();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="inherit"
      sx={{ bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}
    >
      <Container>
        <Toolbar disableGutters sx={{ minHeight: { xs: HEADER_HEIGHT }, gap: 2 }}>
          <Logo />

          <Box component="nav" aria-label={t('header.mainNav')} sx={{ display: { xs: 'none', md: 'flex' }, gap: 3.5, mx: 'auto' }}>
            {NAV_IDS.map((id) => (
              <Link
                key={id}
                href={`#${id}`}
                underline="none"
                sx={{ fontSize: '0.8125rem', fontWeight: 500, color: 'text.primary', '&:hover': { color: 'secondary.main' } }}
              >
                {t(`nav.${id}`)}
              </Link>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: { xs: 'auto', md: 0 } }}>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <LanguageSwitcher />
            </Box>
            <Button
              variant="contained"
              size="small"
              href="#book"
              startIcon={<CalendarMonthOutlinedIcon />}
              sx={{ display: { xs: 'none', sm: 'inline-flex' }, py: 1 }}
            >
              {t('header.cta')}
            </Button>
            <IconButton
              aria-label={t('header.openMenu')}
              aria-controls="mobile-nav"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { md: 'none' }, color: 'primary.main' }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* MUI swaps anchor="right" to the left in RTL, so the drawer always opens from the end side. */}
      <Drawer anchor="right" open={drawerOpen} onClose={closeDrawer} id="mobile-nav">
        <Box sx={{ width: 280, p: 2.5, display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton aria-label={t('header.closeMenu')} onClick={closeDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List component="nav" aria-label={t('header.mainNav')}>
            {NAV_IDS.map((id) => (
              <ListItemButton key={id} component="a" href={`#${id}`} onClick={closeDrawer} sx={{ borderRadius: 2 }}>
                <ListItemText primary={t(`nav.${id}`)} slotProps={{ primary: { sx: { fontWeight: 500, color: 'text.primary' } } }} />
              </ListItemButton>
            ))}
          </List>
          <Box sx={{ display: { sm: 'none' } }}>
            <LanguageSwitcher />
          </Box>
          <Button variant="contained" href="#book" onClick={closeDrawer} startIcon={<CalendarMonthOutlinedIcon />}>
            {t('header.cta')}
          </Button>
        </Box>
      </Drawer>
    </AppBar>
  );
}
