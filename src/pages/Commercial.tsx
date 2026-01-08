import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Briefcase, FileText, Shield, Scale, Globe, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import PageHero from '@/components/shared/PageHero';
import commercialHeroBg from '@/assets/commercial-hero-new.jpg';
import crossBorderImage from '@/assets/cross-border-business.webp';

const Commercial = () => {
  const { t, isRTL, language } = useLanguage();

  const coreServices = [
    { 
      title: t('commercial.services.contracts.title'), 
      desc: t('commercial.services.contracts.desc'), 
      icon: FileText 
    },
    { 
      title: t('commercial.services.negotiation.title'), 
      desc: t('commercial.services.negotiation.desc'), 
      icon: Scale 
    },
    { 
      title: t('commercial.services.dispute.title'), 
      desc: t('commercial.services.dispute.desc'), 
      icon: Shield 
    },
    { 
      title: t('commercial.services.crossborder.title'), 
      desc: t('commercial.services.crossborder.desc'), 
      icon: Globe 
    },
  ];

  const philosophyAnim = useScrollAnimation();
  const servicesAnim = useScrollAnimation();
  const crossBorderAnim = useScrollAnimation();
  const clientsAnim = useScrollAnimation();
  const ctaAnim = useScrollAnimation();

  return (
    <Layout>
      <Helmet>
        <title>{language === 'he' ? 'עורך דין מסחרי בתל אביב | חוזים ויישוב סכסוכים בישראל' : 'Commercial Lawyer Tel Aviv | Contracts & Dispute Resolution Israel'}</title>
        <meta name="description" content={language === 'he' ? 'ייעוץ משפטי מסחרי בתל אביב. ניסוח חוזים, הסכמי שותפות וניהול סכסוכים עסקיים חוצי גבולות ללקוחות בינלאומיים.' : 'Commercial legal counsel in Tel Aviv. Drafting contracts, partnership agreements, and managing cross-border business disputes for international clients.'} />
      </Helmet>

      {/* Hero Section */}
      <PageHero
        backgroundImage={commercialHeroBg}
        title={t('commercial.hero.title')}
      />

      {/* Philosophy Section */}
      <section className="pt-40 sm:pt-48 pb-16 gradient-stone">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={philosophyAnim.ref}
            className={cn(
              "max-w-4xl mx-auto transition-all duration-700",
              isRTL && "font-hebrew text-right",
              philosophyAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <h2 className="text-2xl sm:text-3xl font-display font-semibold mb-6">
              {t('commercial.philosophy.title')}
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {t('commercial.philosophy.body')}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t('commercial.philosophy.body2')}
            </p>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={servicesAnim.ref}
            className={cn(
              "max-w-4xl mx-auto mb-10 transition-all duration-700",
              isRTL && "font-hebrew text-right",
              servicesAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <h2 className="text-2xl sm:text-3xl font-display font-semibold mb-6">
              {t('commercial.services.title')}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {coreServices.map((service, i) => (
              <div 
                key={i} 
                className={cn(
                  "p-6 bg-card rounded-lg border border-border transition-all duration-500",
                  isRTL && "font-hebrew text-right",
                  servicesAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: servicesAnim.isVisible ? `${i * 100}ms` : '0ms' }}
              >
                <service.icon className="h-6 w-6 text-accent mb-4" />
                <h3 className="font-medium mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-Border Section */}
      <section className="relative z-20 py-20 bg-background overflow-visible">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={crossBorderAnim.ref}
            className={cn(
              "relative max-w-6xl mx-auto transition-all duration-700",
              crossBorderAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            {/* Offset beige background */}
            <div className={cn(
              "absolute -top-8 w-[60%] bg-secondary h-[calc(100%+4rem)]",
              isRTL ? "right-0 -mr-8 lg:-mr-16" : "left-0 -ml-8 lg:-ml-16"
            )} />
            
            {/* Content grid */}
            <div className={cn(
              "relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center",
              isRTL && "direction-rtl"
            )}>
              {/* Text content in white card */}
              <div className={cn(
                "bg-background py-10 px-8 lg:py-14 lg:px-12 shadow-sm",
                isRTL && "font-hebrew text-right"
              )}>
                <h2 className="text-2xl sm:text-3xl font-display font-semibold mb-6 text-foreground">
                  {t('commercial.crossborder.title')}
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {t('commercial.crossborder.body')}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t('commercial.crossborder.body2')}
                </p>
              </div>

              {/* Image */}
              <div className={cn(
                "relative",
                isRTL ? "lg:order-first" : ""
              )}>
                <div className="aspect-[3/4] max-w-sm mx-auto lg:mx-0 overflow-hidden rounded-sm shadow-premium">
                  <img 
                    src={crossBorderImage} 
                    alt={language === 'he' ? 'עסקים חוצי גבולות' : 'Cross-border business'}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Work With Section */}
      <section className="py-16 gradient-stone">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={clientsAnim.ref}
            className={cn(
              "max-w-4xl mx-auto transition-all duration-700",
              isRTL && "font-hebrew text-right",
              clientsAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <h2 className="text-2xl sm:text-3xl font-display font-semibold mb-6">
              {t('commercial.clients.title')}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t('commercial.clients.body')}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#faf8f5]">
        <div 
          ref={ctaAnim.ref}
          className={cn(
            "container mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-700",
            ctaAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="w-16 h-0.5 bg-accent mx-auto mb-8" />
          <h2 className={cn("text-3xl sm:text-4xl lg:text-5xl font-display font-semibold mb-6 text-primary", isRTL && "font-hebrew")}>
            {t('commercial.cta.title')}
          </h2>
          <p className={cn("text-lg mb-10 max-w-xl mx-auto text-primary", isRTL && "font-hebrew")}>
            {t('commercial.cta.body')}
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-10 py-6 text-base group">
            <Link to="/contact" className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
              {t('commercial.cta.button')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Commercial;
