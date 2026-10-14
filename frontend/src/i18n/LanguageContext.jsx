import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_LANGUAGE, LANGUAGES, TRANSLATIONS } from './translations';
import { storage } from '../lib/storage';

const STORAGE_KEY = 'burgesta-lang';
const LanguageContext = createContext(null);

function initialLanguage() {
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  const candidate = fromUrl || storage.get(STORAGE_KEY) || DEFAULT_LANGUAGE;
  return LANGUAGES.includes(candidate) ? candidate : DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(initialLanguage);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next) => {
    if (!LANGUAGES.includes(next)) return;
    setLangState(next);
    storage.set(STORAGE_KEY, next);
    const url = new URL(window.location.href);
    url.searchParams.set('lang', next);
    window.history.replaceState(null, '', url);
  }, []);

  const value = useMemo(() => {
    const dictionary = TRANSLATIONS[lang];
    const t = (key) => dictionary[key] ?? key;
    /** Picks the current language out of a { uz, ru, en } object coming from the API. */
    const pick = (localized) => localized?.[lang] ?? localized?.[DEFAULT_LANGUAGE] ?? '';
    return { lang, setLang, t, pick };
  }, [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useI18n must be used inside <LanguageProvider>');
  return context;
}
