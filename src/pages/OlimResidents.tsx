import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Users, FileCheck, Home, Building, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import olimHeroBg from '@/assets/olim-hero-bg.webp';

const OlimResidents = () => {
  const { t, isRTL, language } = useLanguage();

  const frameworkItems = [
    { 
      title: t('olim.framework.planning.title'), 
      desc: t('olim.framework.planning.desc'), 
      icon: Clock 
    },
    { 
      title: t('olim.framework.property.title'), 
      desc: t('olim.framework.property.desc'), 
      icon: Home 
    },
    { 
      title: t('olim.framework.banking.title'), 
      desc: t('olim.framework.banking.desc'), 
      icon: Building 
    },
  ];

  const expectItems = [
    t('olim.expect.item1'),
    t('olim.expect.item2'),
    t('olim.expect.item3'),
  ];

  return (
    <Layout>
      <Helmet>
        <title>{language === 'he' ? 'עורך דין לעולים ותושבים חוזרים בתל אביב | מאיה זיו' : 'Legal Counsel for Olim & Returning Residents in Tel Aviv | Maya Ziv Law'}</title>
        <meta name="description" content={language === 'he' ? 'מסגרת משפטית מובנית למעבר לישראל: מיצוב מס, רכישת נכס ושילוב נכסים לעולים ותושבים חוזרים.' : 'A structured legal framework for your transition to Israel: Tax positioning, property acquisition, and asset integration for Olim and Returning Residents.'} />
      </Helmet>

      {/* Hero Section */}
      <section 
        className="relative pt-32 pb-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${olimHeroBg})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("max-w-4xl mx-auto", isRTL && "font-hebrew text-right")}>
            <div className="w-16 h-1 bg-accent mb-8" />
            <h1 className="text-4xl sm:text-5xl font-display font-semibold text-white mb-6">
              {t('olim.hero.title')}
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              {t('olim.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* The Context Section */}
      <section className="py-16 gradient-stone">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("max-w-4xl mx-auto", isRTL && "font-hebrew text-right")}>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold mb-6">
              {t('olim.context.title')}
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {t('olim.context.body')}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t('olim.context.body2')}
            </p>
          </div>
        </div>
      </section>

      {/* The Framework Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("max-w-4xl mx-auto mb-10", isRTL && "font-hebrew text-right")}>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold mb-6">
              {t('olim.framework.title')}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {frameworkItems.map((item, i) => (
              <div key={i} className={cn("p-6 bg-card rounded-lg border border-border", isRTL && "font-hebrew text-right")}>
                <item.icon className="h-6 w-6 text-accent mb-4" />
                <h3 className="font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tax Positioning Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto relative">
            <div className={cn(
              "relative z-10 max-w-2xl p-8 sm:p-10 bg-card rounded-2xl shadow-lg border border-border/50",
              isRTL ? "font-hebrew text-right mr-auto" : "ml-0"
            )}>
              <h2 className="text-2xl sm:text-3xl font-display font-semibold mb-6 text-foreground">
                {t('olim.tax.title')}
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {t('olim.tax.body')}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t('olim.tax.body2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Work With Section */}
      <section className="py-16 gradient-stone">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("max-w-4xl mx-auto", isRTL && "font-hebrew text-right")}>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold mb-6">
              {t('olim.clients.title')}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t('olim.clients.body')}
            </p>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("max-w-4xl mx-auto", isRTL && "font-hebrew text-right")}>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold mb-6">
              {t('olim.expect.title')}
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {t('olim.expect.body')}
            </p>
            <ul className="space-y-3">
              {expectItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={cn("text-2xl sm:text-3xl font-display font-semibold mb-4", isRTL && "font-hebrew")}>
            {t('olim.cta.title')}
          </h2>
          <p className={cn("text-primary-foreground/80 mb-8 max-w-xl mx-auto", isRTL && "font-hebrew")}>
            {t('olim.cta.body')}
          </p>
          <Button asChild size="lg" variant="secondary" className="group">
            <Link to="/contact">
              {t('olim.cta.button')}
              <ArrowRight className={cn("ml-2 h-4 w-4 transition-transform group-hover:translate-x-1", isRTL && "rotate-180 mr-2 ml-0")} />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default OlimResidents;
