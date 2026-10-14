import { useMemo } from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

import { createAppTheme } from './theme.js';
import { useLanguage } from './i18n/context.js';

// The RTL cache mirrors every left/right rule (margins, padding, positions) for Arabic.
const caches = {
  ltr: createCache({ key: 'muiltr' }),
  rtl: createCache({ key: 'muirtl', stylisPlugins: [prefixer, rtlPlugin] }),
};

// Emotion cache + MUI theme for the current language's direction.
export default function DirectionalTheme({ children }) {
  const { dir } = useLanguage();
  const theme = useMemo(() => createAppTheme(dir), [dir]);

  return (
    <CacheProvider value={caches[dir]}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
