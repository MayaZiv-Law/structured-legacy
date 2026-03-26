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

  // Signal to prerender services that the page is fully rendered
  // Fires when key DOM elements exist, or after 5s max as fallback
  useEffect(() => {
    const checkReady = () => {
      const h1 = document.querySelector('h1');
      const main = document.querySelector('main');
      if (h1 && main && main.children.length > 1) {
        (window as any).prerenderReady = true;
        return true;
      }
      return false;
    };

    // Check immediately
    if (checkReady()) return;

    // Poll every 200ms
    const interval = setInterval(() => {
      if (checkReady()) clearInterval(interval);
    }, 200);

    // Maximum wait 5 seconds
    const timeout = setTimeout(() => {
      clearInterval(interval);
      (window as any).prerenderReady = true;
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
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