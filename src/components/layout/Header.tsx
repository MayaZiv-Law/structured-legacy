import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import logoEn from '@/assets/logo-en.webp';
import logoHe from '@/assets/logo-he.webp';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalePath } from '@/hooks/useLocalePath';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExpertiseOpen, setIsExpertiseOpen] = useState(false);
  const { language, setLanguage, t, isRTL } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const localePath = useLocalePath();

  const isActive = (path: string) => location.pathname === localePath(path);

  const navLinkClass = (path: string) =>
    cn(
      'text-base font-semibold transition-colors hover:text-accent',
      isActive(path) ? 'text-accent' : 'text-foreground'
    );

  const switchLanguage = () => {
    const newLang = language === 'en' ? 'he' : 'en';
    // Replace current lang prefix with new one
    const currentPath = location.pathname;
    const pathWithoutLang = currentPath.replace(/^\/(en|he)/, '');
    setLanguage(newLang);
    navigate(`/${newLang}${pathWithoutLang || ''}`, { replace: true });
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        "bg-white/90 backdrop-blur-md border-b border-border/20 shadow-sm"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to={localePath('/')} className="flex items-center">
            <img 
              src={language === 'he' ? logoHe : logoEn} 
              alt={language === 'he' ? 'מאיה זיו - משרד עורכי דין' : 'Maya Ziv Law'} 
              className={cn("w-auto", language === 'he' ? "h-14" : "h-12")}
              width={language === 'he' ? 180 : 107}
              height={language === 'he' ? 56 : 48}
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to={localePath('/about')} className={navLinkClass('/about')}>
              {t('nav.firm')}
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  "flex items-center gap-1 text-base font-semibold transition-colors hover:text-accent",
                  ['/real-estate', '/taxation', '/estate-planning', '/olim-residents', '/commercial'].some(p =>
                    isActive(p)
                  )
                    ? 'text-accent'
                    : 'text-foreground/80'
                )}
              >
                {t('nav.expertise')}
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className={cn("w-56", isRTL && "text-right")}>
                <DropdownMenuItem asChild className={cn(isRTL && "justify-end")}>
                  <Link to={localePath('/real-estate')} className="w-full cursor-pointer">
                    {t('nav.realEstate')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className={cn(isRTL && "justify-end")}>
                  <Link to={localePath('/taxation')} className="w-full cursor-pointer">
                    {t('nav.taxation')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className={cn(isRTL && "justify-end")}>
                  <Link to={localePath('/estate-planning')} className="w-full cursor-pointer">
                    {t('nav.estate')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className={cn(isRTL && "justify-end")}>
                  <Link to={localePath('/olim-residents')} className="w-full cursor-pointer">
                    {t('nav.olim')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className={cn(isRTL && "justify-end")}>
                  <Link to={localePath('/commercial')} className="w-full cursor-pointer">
                    {t('nav.commercial')}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to={localePath('/insights')} className={navLinkClass('/insights')}>
              {t('nav.insights')}
            </Link>

            <Link to={localePath('/contact')} className={navLinkClass('/contact')}>
              {t('nav.contact')}
            </Link>
          </nav>


          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/20 bg-white/80 backdrop-blur-xl -mx-4 px-4 sm:-mx-6 sm:px-6 shadow-lg">
            <nav className="flex flex-col gap-4">
              <Link
                to={localePath('/about')}
                className={navLinkClass('/about')}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.firm')}
              </Link>
              
              {/* Expertise Collapsible Section */}
              <div>
                <button
                  onClick={() => setIsExpertiseOpen(!isExpertiseOpen)}
                  className={cn(
                    "flex items-center justify-between w-full text-sm font-medium transition-colors hover:text-accent",
                    ['/real-estate', '/taxation', '/estate-planning', '/olim-residents', '/commercial'].some(p => isActive(p))
                      ? 'text-accent'
                      : 'text-foreground/80'
                  )}
                >
                  {t('nav.expertise')}
                  <ChevronDown className={cn("h-4 w-4 transition-transform", isExpertiseOpen && "rotate-180")} />
                </button>
                
                {isExpertiseOpen && (
                  <div className={cn("flex flex-col gap-3 mt-3 border-border", isRTL ? "pr-4 border-r" : "pl-4 border-l")}>
                    <Link
                      to={localePath('/real-estate')}
                      className={navLinkClass('/real-estate')}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('nav.realEstate')}
                    </Link>
                    <Link
                      to={localePath('/taxation')}
                      className={navLinkClass('/taxation')}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('nav.taxation')}
                    </Link>
                    <Link
                      to={localePath('/estate-planning')}
                      className={navLinkClass('/estate-planning')}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('nav.estate')}
                    </Link>
                    <Link
                      to={localePath('/olim-residents')}
                      className={navLinkClass('/olim-residents')}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('nav.olim')}
                    </Link>
                    <Link
                      to={localePath('/commercial')}
                      className={navLinkClass('/commercial')}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('nav.commercial')}
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to={localePath('/insights')}
                className={navLinkClass('/insights')}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.insights')}
              </Link>
              <Link
                to={localePath('/contact')}
                className={navLinkClass('/contact')}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.contact')}
              </Link>

            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
