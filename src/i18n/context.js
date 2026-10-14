import { createContext, useContext } from 'react';

import en from './en.js';
import fr from './fr.js';
import ar from './ar.js';

export const DICTIONARIES = { en, fr, ar };
export const LANGUAGES = Object.keys(DICTIONARIES);
export const DEFAULT_LANG = 'en';
const RTL_LANGUAGES = ['ar'];

export const directionOf = (lang) => (RTL_LANGUAGES.includes(lang) ? 'rtl' : 'ltr');

// Kept apart from LanguageContext.jsx so that file only exports components (react-refresh rule).
export const LanguageContext = createContext(null);

// { lang, setLang, dir, locale, t, localize, formatNumber }; see LanguageProvider.
export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error('useLanguage must be used inside <LanguageProvider>.');
  return value;
}

export function lookup(dict, key) {
  return key.split('.').reduce((node, part) => node?.[part], dict);
}

export function interpolate(text, vars) {
  if (!vars) return text;
  return text.replace(/\{(\w+)\}/g, (match, name) => (name in vars ? String(vars[name]) : match));
}
