import { useCallback, useEffect, useMemo, useState } from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

import { ColorModeContext } from './colorMode.js';
import { createAppTheme } from './theme.js';
import { useLanguage } from './i18n/context.js';

// The RTL cache mirrors every left/right rule (margins, padding, positions) for Arabic.
const caches = {
  ltr: createCache({ key: 'muiltr' }),
  rtl: createCache({ key: 'muirtl', stylisPlugins: [prefixer, rtlPlugin] }),
};

const STORAGE_KEY = 'notary-office.colorMode';
const darkQuery = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
const systemMode = () => (darkQuery?.matches ? 'dark' : 'light');

function getSavedMode() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'light' || saved === 'dark' ? saved : null;
  } catch {
    // Storage can be blocked (private mode, strict settings).
    return null;
  }
}

// Saved choice first, otherwise the system setting (followed live until the visitor picks one).
function useColorModeState() {
  const [saved, setSaved] = useState(getSavedMode);
  const [system, setSystem] = useState(systemMode);

  useEffect(() => {
    if (!darkQuery) return undefined;
    const onChange = () => setSystem(systemMode());
    darkQuery.addEventListener('change', onChange);
    return () => darkQuery.removeEventListener('change', onChange);
  }, []);

  const mode = saved ?? system;
  const toggleMode = useCallback(() => {
    const next = mode === 'dark' ? 'light' : 'dark';
    setSaved(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Not persisted; the choice still applies for this visit.
    }
  }, [mode]);

  return useMemo(() => ({ mode, toggleMode }), [mode, toggleMode]);
}

// Emotion cache + MUI theme for the current language's direction and color mode.
export default function DirectionalTheme({ children }) {
  const { dir } = useLanguage();
  const colorMode = useColorModeState();
  const theme = useMemo(() => createAppTheme(dir, colorMode.mode), [dir, colorMode.mode]);

  return (
    <CacheProvider value={caches[dir]}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          {/* enableColorScheme sets `color-scheme`, so scrollbars and form controls match the mode. */}
          <CssBaseline enableColorScheme />
          {children}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </CacheProvider>
  );
}
