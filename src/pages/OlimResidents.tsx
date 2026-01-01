import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Users, FileCheck, Home, Building, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import PageHero from '@/components/shared/PageHero';
import olimHeroBg from '@/assets/olim-hero-bg.webp';
import taxPositioningImage from '@/assets/tax-positioning-olim.webp';

const OlimResidents = () => {
  const { t, isRTL, language } = useLanguage();

  const frameworkItems = [
    { title: t('olim.framework.planning.title'), desc: t('olim.framework.planning.desc'), icon: Clock },
    { title: t('olim.framework.property.title'), desc: t('olim.framework.property.desc'), icon: Home },
    { title: t('olim.framework.banking.title'), desc: t('olim.framework.banking.desc'), icon: Building },
  ];

  const expectItems = [
    t('olim.expect.item1'),
    t('olim.expect.item2'),
    t('olim.expect.item3'),
  ];

  const contextAnim = useScrollAnimation();
  const frameworkAnim = useScrollAnimation();
  const taxAnim = useScrollAnimation();
  const clientsAnim = useScrollAnimation();
  const expectAnim = useScrollAnimation();
  const ctaAnim = useScrollAnimation();

  return (
    <Layout>
      <Helmet>
        <title>{language === 'he' ? 'עורך דין לעולים ותושבים חוזרים בתל אביב | מאיה זיו' : 'Legal Counsel for Olim & Returning Residents in Tel Aviv | Maya Ziv Law'}</title>
        <meta name="description" content={language === 'he' ? 'מסגרת משפטית מובנית למעבר לישראל: מיצוב מס, רכישת נכס ושילוב נכסים לעולים ותושבים חוזרים.' : 'A structured legal framework for your transition to Israel: Tax positioning, property acquisition, and asset integration for Olim and Returning Residents.'} />
      </Helmet>

      {/* Hero Section */}
      <PageHero
        backgroundImage={olimHeroBg}
        title={t('olim.hero.title')}
        subtitle={t('olim.hero.subtitle')}
      />

      <section className="pt-40 sm:pt-48 pb-16 gradient-stone">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={contextAnim.ref} className={cn("max-w-4xl mx-auto transition-all duration-700", isRTL && "font-hebrew text-right", contextAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold mb-6">{t('olim.context.title')}</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">{t('olim.context.body')}</p>
            <p className="text-muted-foreground leading-relaxed">{t('olim.context.body2')}</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={frameworkAnim.ref} className={cn("max-w-4xl mx-auto mb-10 transition-all duration-700", isRTL && "font-hebrew text-right", frameworkAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold mb-6">{t('olim.framework.title')}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {frameworkItems.map((item, i) => (
              <div key={i} className={cn("p-6 bg-card rounded-lg border border-border transition-all duration-500", isRTL && "font-hebrew text-right", frameworkAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")} style={{ transitionDelay: frameworkAnim.isVisible ? `${i * 150}ms` : '0ms' }}>
                <item.icon className="h-6 w-6 text-accent mb-4" />
                <h3 className="font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-20 py-20 bg-background overflow-visible">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={taxAnim.ref} className={cn("relative max-w-6xl mx-auto transition-all duration-700", taxAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <div className={cn("absolute -top-8 w-[60%] bg-secondary h-[calc(100%+4rem)]", isRTL ? "right-0 -mr-8 lg:-mr-16" : "left-0 -ml-8 lg:-ml-16")} />
            <div className={cn("relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center", isRTL && "direction-rtl")}>
              <div className={cn("bg-background py-10 px-8 lg:py-14 lg:px-12 shadow-sm", isRTL && "font-hebrew text-right")}>
                <h2 className="text-2xl sm:text-3xl font-display font-semibold mb-6 text-foreground">{t('olim.tax.title')}</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">{t('olim.tax.body')}</p>
                <p className="text-muted-foreground leading-relaxed">{t('olim.tax.body2')}</p>
              </div>
              <div className={cn("relative", isRTL ? "lg:order-first" : "")}>
                <div className="aspect-[3/4] max-w-sm mx-auto lg:mx-0 overflow-hidden rounded-sm shadow-premium">
                  <img src={taxPositioningImage} alt={language === 'he' ? 'תכנון מס לעולים' : 'Tax positioning for Olim'} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 gradient-stone">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={clientsAnim.ref} className={cn("max-w-4xl mx-auto transition-all duration-700", isRTL && "font-hebrew text-right", clientsAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold mb-6">{t('olim.clients.title')}</h2>
            <p className="text-muted-foreground leading-relaxed">{t('olim.clients.body')}</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={expectAnim.ref} className={cn("max-w-4xl mx-auto transition-all duration-700", isRTL && "font-hebrew text-right", expectAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold mb-6">{t('olim.expect.title')}</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">{t('olim.expect.body')}</p>
            <ul className="space-y-3">
              {expectItems.map((item, i) => (
                <li key={i} className={cn("flex items-start gap-3 transition-all duration-500", expectAnim.isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4")} style={{ transitionDelay: expectAnim.isVisible ? `${i * 100}ms` : '0ms' }}>
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#faf8f5]">
        <div ref={ctaAnim.ref} className={cn("container mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-700", ctaAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-8" />
          <h2 className={cn("text-3xl sm:text-4xl lg:text-5xl font-display font-semibold mb-6 text-primary", isRTL && "font-hebrew")}>{t('olim.cta.title')}</h2>
          <p className={cn("text-lg mb-10 max-w-xl mx-auto text-primary", isRTL && "font-hebrew")}>{t('olim.cta.body')}</p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-10 py-6 text-base group">
            <Link to="/contact" className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
              {t('olim.cta.button')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default OlimResidents;
