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
import SvgIcon from '@mui/material/SvgIcon';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CloseIcon from '@mui/icons-material/Close';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import MenuIcon from '@mui/icons-material/Menu';

import { useColorMode } from '../colorMode.js';
import { business } from '../config/business.js';
import { DICTIONARIES, LANGUAGES, useLanguage } from '../i18n/context.js';
import { HEADER_HEIGHT, tracking } from '../theme.js';

const NAV_IDS = ['services', 'about', 'address', 'reviews', 'book'];

// The fountain-pen nib from public/logo.svg, without its navy disc, so it takes the theme color.
function PenNibIcon(props) {
  return (
    <SvgIcon viewBox="12 12 40 40" {...props}>
      <g transform="translate(37 24.5) rotate(35) translate(-12 -13) scale(1.45)">
        <rect x="8.6" y="3" width="6.8" height="2.3" rx="0.6" />
        <path
          fillRule="evenodd"
          d="M8.2 6.5H15.8C16 10 18.5 11.8 18.5 14.6C18.5 17 15 19.8 12 22.5C9 19.8 5.5 17 5.5 14.6C5.5 11.8 8 10 8.2 6.5ZM10.5 13.1a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0ZM11.65 14.9H12.35L12.1 21.3H11.9Z"
        />
      </g>
      <path
        d="M29 36.6C26.4 41.2 21.4 45.6 18.6 44.6C16.4 43.8 18.8 41 23.6 42.2C29.6 43.7 38 46.4 47.5 43.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}

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
        <PenNibIcon sx={{ fontSize: 24 }} aria-hidden />
      </Box>
      <Box sx={{ whiteSpace: 'nowrap' }}>
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

function ColorModeToggle() {
  const { t } = useLanguage();
  const { mode, toggleMode } = useColorMode();
  const dark = mode === 'dark';
  const label = t(dark ? 'header.lightMode' : 'header.darkMode');

  return (
    <IconButton
      aria-label={label}
      title={label}
      onClick={toggleMode}
      size="small"
      sx={{ width: 36, height: 36, border: 1, borderColor: 'divider', color: 'primary.main' }}
    >
      {dark ? <LightModeOutlinedIcon fontSize="small" /> : <DarkModeOutlinedIcon fontSize="small" />}
    </IconButton>
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

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 }, ml: { xs: 'auto', md: 0 } }}>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <LanguageSwitcher />
            </Box>
            <ColorModeToggle />
            <Button
              variant="contained"
              size="small"
              href="#book"
              startIcon={<CalendarMonthOutlinedIcon />}
              // From 600px the switcher and logo leave too little room, so the button joins them at 700px (it stays in the drawer).
              sx={(theme) => ({ display: 'none', [theme.breakpoints.up(700)]: { display: 'inline-flex' }, py: 1, whiteSpace: 'nowrap' })}
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
