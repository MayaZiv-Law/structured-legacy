import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Mail, Phone, MapPin } from 'lucide-react';
const Footer = () => {
  const {
    t,
    isRTL
  } = useLanguage();
  return <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className={cn("text-xl font-display font-semibold tracking-wide", isRTL && "font-hebrew")}>
                {isRTL ? 'מאיה זיו עו"ד' : 'MAYA ZIV LAW'}
              </span>
            </Link>
            
            <div className="w-12 h-0.5 bg-accent" />
          </div>

          <div>
            <h4 className={cn("font-display text-sm font-semibold uppercase tracking-wider mb-6", isRTL && "font-hebrew")}>
              {isRTL ? 'תחומי התמחות' : 'Expertise'}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/real-estate" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                  {t('nav.realEstate')}
                </Link>
              </li>
              <li>
                <Link to="/taxation" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                  {t('nav.taxation')}
                </Link>
              </li>
              <li>
                <Link to="/estate-planning" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                  {t('nav.estate')}
                </Link>
              </li>
              <li>
                <Link to="/olim-residents" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                  {t('nav.olim')}
                </Link>
              </li>
              <li>
                <Link to="/commercial" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                  {t('nav.commercial')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className={cn("font-display text-sm font-semibold uppercase tracking-wider mb-6", isRTL && "font-hebrew")}>
              {t('footer.contact')}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 text-accent flex-shrink-0" />
                <span className="text-primary-foreground/70 text-sm">
                  {isRTL ? 'משה סנה 18, תל אביב' : '18 Moshe Sneh, Tel Aviv Israel'}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                <a href="tel:+972544943597" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                  +972.544943597
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                <a href="mailto:info@mayaziv.law" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                  info@mayaziv.law
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column */}
          <div>
            <h4 className={cn("font-display text-sm font-semibold uppercase tracking-wider mb-6", isRTL && "font-hebrew")}>
              {isRTL ? 'קישורים' : 'Links'}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/insights" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                  {t('nav.insights')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                  {t('footer.terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Disclaimer & Copyright */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className={cn("text-primary-foreground/50 text-xs leading-relaxed mb-4", isRTL && "font-hebrew")}>
            {t('footer.disclaimerText')}
          </p>
          <p className={cn("text-primary-foreground/50 text-xs", isRTL && "font-hebrew")}>
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;