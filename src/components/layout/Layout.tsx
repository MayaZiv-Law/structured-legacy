import { ReactNode, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isRTL, language } = useLanguage();

  // Update HTML lang and dir attributes dynamically
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [language, isRTL]);

  // Signal to prerender services that the page is fully rendered (delayed for async content)
  useEffect(() => {
    const timer = setTimeout(() => {
      (window as any).prerenderReady = true;
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn("min-h-screen flex flex-col", isRTL && "font-hebrew")}>
      <Header />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;