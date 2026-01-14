import { ReactNode, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import AccessibilityWidget from '@/components/AccessibilityWidget';
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

  return (
    <div className={cn("min-h-screen flex flex-col", isRTL && "font-hebrew")}>
      <Header />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
      <AccessibilityWidget />
    </div>
  );
};

export default Layout;