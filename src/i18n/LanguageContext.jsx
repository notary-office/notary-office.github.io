import { useCallback, useEffect, useMemo, useState } from 'react';

import { DEFAULT_LANG, DICTIONARIES, LANGUAGES, LanguageContext, directionOf, interpolate, lookup } from './context.js';

const STORAGE_KEY = 'notary-office.lang';

// Saved choice first, then the browser language, then English.
function getInitialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (LANGUAGES.includes(saved)) return saved;
  } catch {
    // Storage can be blocked (private mode, strict settings); fall through.
  }
  const browser = (navigator.language || '').slice(0, 2).toLowerCase();
  return LANGUAGES.includes(browser) ? browser : DEFAULT_LANG;
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang);
  const dir = directionOf(lang);

  // Only an explicit choice is saved, so visitors without one keep following their browser.
  const setLang = useCallback((next) => {
    if (!LANGUAGES.includes(next)) return;
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Not persisted; the choice still applies for this visit.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const value = useMemo(() => {
    const dict = DICTIONARIES[lang];
    const { locale } = dict.meta;
    const numberFormat = new Intl.NumberFormat(locale);

    // Returns the string at `key` (with `{name}` placeholders filled from `vars`), or the array/object
    // there for lists. Missing keys fall back to English, then to the key itself.
    const t = (key, vars) => {
      const found = lookup(dict, key) ?? lookup(DICTIONARIES[DEFAULT_LANG], key);
      if (found === undefined) {
        if (import.meta.env.DEV) console.warn(`[i18n] Missing key "${key}"`);
        return key;
      }
      return typeof found === 'string' ? interpolate(found, vars) : found;
    };

    // Business text in config/business.js is either a plain string or { en, fr, ar }.
    const localize = (field) =>
      field && typeof field === 'object' && !Array.isArray(field) ? (field[lang] ?? field[DEFAULT_LANG]) : field;

    return { lang, setLang, dir, locale, t, localize, formatNumber: (n) => numberFormat.format(n) };
  }, [lang, dir, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
