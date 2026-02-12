import { useLanguage } from '@/contexts/LanguageContext';
import { useCallback } from 'react';

/**
 * Returns a function that prefixes a path with the current language.
 * Usage: const localePath = useLocalePath(); <Link to={localePath('/about')} />
 */
export const useLocalePath = () => {
  const { language } = useLanguage();
  
  return useCallback((path: string) => {
    // Don't prefix admin routes
    if (path.startsWith('/admin')) return path;
    // Don't prefix if already prefixed
    if (path.startsWith('/en/') || path.startsWith('/he/') || path === '/en' || path === '/he') return path;
    // Ensure path starts with /
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `/${language}${cleanPath}`;
  }, [language]);
};
