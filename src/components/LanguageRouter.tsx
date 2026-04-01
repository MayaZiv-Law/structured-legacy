import { useEffect } from 'react';
import { useParams, Navigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Syncs the :lang URL param with LanguageContext.
 * Wraps children and provides language from URL.
 */
export const LanguageRouter = ({ children }: { children: React.ReactNode }) => {
  const { lang } = useParams<{ lang: string }>();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    if (lang === 'en' || lang === 'he') {
      if (lang !== language) {
        setLanguage(lang);
      }
    }
  }, [lang, language, setLanguage]);

  // If lang param is not valid, redirect to /en
  if (lang !== 'en' && lang !== 'he') {
    return <Navigate to={`/en`} replace />;
  }

  return <>{children}</>;
};

/**
 * Redirects from / to /en/ or /he/ based on localStorage preference or browser language.
 */
export const RedirectToLang = () => {
  const stored = localStorage.getItem('language');
  if (stored === 'he' || stored === 'en') {
    return <Navigate to={`/${stored}`} replace />;
  }
  const browserLang = navigator.language?.startsWith('he') ? 'he' : 'en';
  return <Navigate to={`/${browserLang}`} replace />;
};

/**
 * Redirects legacy routes (without lang prefix) to /en/... 
 */
export const LegacyRedirect = () => {
  const location = useLocation();
  return <Navigate to={`/en${location.pathname}${location.search}${location.hash}`} replace />;
};
