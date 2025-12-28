import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isRTL } = useLanguage();

  return (
    <div className={cn("min-h-screen flex flex-col", isRTL && "font-hebrew")}>
      <Header />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;