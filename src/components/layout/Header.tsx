import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import logo from '@/assets/logo.png';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
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
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t, isRTL } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // keep header fully transparent until a meaningful scroll
      setIsScrolled(window.scrollY > 64);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navLinkClass = (path: string) =>
    cn(
      'text-sm font-medium transition-colors',
      isScrolled
        ? cn('hover:text-accent', isActive(path) ? 'text-accent' : 'text-foreground/80')
        : cn(
            'hover:text-primary-foreground/80',
            isActive(path) ? 'text-primary-foreground' : 'text-primary-foreground/90'
          )
    );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-card/75 backdrop-blur-xl border-b border-border/60 shadow-premium"
          : "bg-transparent backdrop-blur-none border-b border-transparent shadow-none"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={logo} 
              alt="Maya Ziv Law" 
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/about" className={navLinkClass('/about')}>
              {t('nav.firm')}
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors",
                  isScrolled
                    ? cn(
                        'hover:text-accent',
                        ['/real-estate', '/taxation', '/estate-planning', '/olim-residents', '/commercial'].some(p =>
                          isActive(p)
                        )
                          ? 'text-accent'
                          : 'text-foreground/80'
                      )
                    : cn(
                        'hover:text-primary-foreground/80',
                        ['/real-estate', '/taxation', '/estate-planning', '/olim-residents', '/commercial'].some(p =>
                          isActive(p)
                        )
                          ? 'text-primary-foreground'
                          : 'text-primary-foreground/90'
                      )
                )}
              >
                {t('nav.expertise')}
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/real-estate" className="w-full cursor-pointer">
                    {t('nav.realEstate')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/taxation" className="w-full cursor-pointer">
                    {t('nav.taxation')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/estate-planning" className="w-full cursor-pointer">
                    {t('nav.estate')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/olim-residents" className="w-full cursor-pointer">
                    {t('nav.olim')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/commercial" className="w-full cursor-pointer">
                    {t('nav.commercial')}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/insights" className={navLinkClass('/insights')}>
              {t('nav.insights')}
            </Link>

            <Link to="/contact" className={navLinkClass('/contact')}>
              {t('nav.contact')}
            </Link>
          </nav>

          {/* Right side - Language & CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'he' : 'en')}
              className={cn(
                "text-sm font-medium transition-colors px-3 py-1.5 rounded border",
                isScrolled
                  ? "text-foreground/70 hover:text-foreground border-border hover:border-accent"
                  : "text-primary-foreground/90 hover:text-primary-foreground border-primary-foreground/30 hover:border-primary-foreground/50"
              )}
            >
              {language === 'en' ? 'עב' : 'EN'}
            </button>

            <Button
              asChild
              variant={isScrolled ? "default" : "outline"}
              className={cn(
                !isScrolled &&
                  "!bg-transparent !text-primary-foreground border-primary-foreground/40 hover:bg-primary-foreground/10 hover:text-primary-foreground"
              )}
            >
              <Link to="/contact">{t('nav.schedule')}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn("lg:hidden p-2", isScrolled ? "text-foreground" : "text-primary-foreground")}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <Link
                to="/about"
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
                      to="/real-estate"
                      className={navLinkClass('/real-estate')}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('nav.realEstate')}
                    </Link>
                    <Link
                      to="/taxation"
                      className={navLinkClass('/taxation')}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('nav.taxation')}
                    </Link>
                    <Link
                      to="/estate-planning"
                      className={navLinkClass('/estate-planning')}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('nav.estate')}
                    </Link>
                    <Link
                      to="/olim-residents"
                      className={navLinkClass('/olim-residents')}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('nav.olim')}
                    </Link>
                    <Link
                      to="/commercial"
                      className={navLinkClass('/commercial')}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('nav.commercial')}
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/insights"
                className={navLinkClass('/insights')}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.insights')}
              </Link>
              <Link
                to="/contact"
                className={navLinkClass('/contact')}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.contact')}
              </Link>

              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <button
                  onClick={() => setLanguage(language === 'en' ? 'he' : 'en')}
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors px-3 py-1.5 rounded border border-border"
                >
                  {language === 'en' ? 'עב' : 'EN'}
                </button>
                <Button asChild variant="default" size="sm">
                  <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                    {t('nav.schedule')}
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;