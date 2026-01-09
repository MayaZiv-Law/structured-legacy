import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Building2, AlertTriangle, Globe, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import PageHero from '@/components/shared/PageHero';
import dueDiligenceImage from '@/assets/real-estate-due-diligence.webp';
import remoteTransactionImage from '@/assets/remote-transaction.webp';
import realEstateHeroBg from '@/assets/real-estate-hero-bg.webp';
import { SEO, createServiceSchema } from '@/components/SEO';

const RealEstate = () => {
  const {
    t,
    isRTL,
    language
  } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const risks = [{
    titleKey: 'realestate.risk.liabilities.title',
    descKey: 'realestate.risk.liabilities.desc'
  }, {
    titleKey: 'realestate.risk.planning.title',
    descKey: 'realestate.risk.planning.desc'
  }, {
    titleKey: 'realestate.risk.tax.title',
    descKey: 'realestate.risk.tax.desc'
  }];
  const faqs = [{
    qKey: 'realestate.faq.q1',
    aKey: 'realestate.faq.a1'
  }, {
    qKey: 'realestate.faq.q2',
    aKey: 'realestate.faq.a2'
  }, {
    qKey: 'realestate.faq.q3',
    aKey: 'realestate.faq.a3'
  }, {
    qKey: 'realestate.faq.q4',
    aKey: 'realestate.faq.a4'
  }];

  // Scroll animations
  const approachAnim = useScrollAnimation();
  const riskAnim = useScrollAnimation();
  const taxAnim = useScrollAnimation();
  const dueDiligenceAnim = useScrollAnimation();
  const remoteAnim = useScrollAnimation();
  const faqAnim = useScrollAnimation();
  const ctaAnim = useScrollAnimation();
  const realEstateSchema = createServiceSchema({
    name: 'Real Estate Legal Services',
    description: 'Legal counsel for buying property in Israel. Due diligence, purchase tax planning, and remote representation for foreign residents and investors.',
    url: 'https://mayaziv.law/real-estate',
  });

  return <Layout>
      <SEO
        titleEn="Real Estate Lawyer in Tel Aviv | Buying Property in Israel"
        titleHe="עורכת דין נדל״ן בתל אביב | רכישת נכס בישראל"
        descriptionEn="Legal counsel for buying property in Israel. Due diligence, purchase tax planning, and remote representation for foreign residents and investors."
        descriptionHe="ייעוץ משפטי לרכישת נכס בישראל. בדיקת נאותות, תכנון מס רכישה וייצוג מרחוק לתושבי חוץ ומשקיעים."
        path="/real-estate"
        schema={realEstateSchema}
      />
      {/* Hero Section */}
      <PageHero backgroundImage={realEstateHeroBg} title={t('realestate.hero.title')} />

      {/* The Approach Section */}
      <section className="pt-40 sm:pt-48 pb-20 gradient-stone">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={approachAnim.ref} className={cn("max-w-4xl mx-auto transition-all duration-700", isRTL && "font-hebrew text-right", approachAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mb-6">
              {t('realestate.approach.title')}
            </h2>
            <div className={cn("w-16 h-0.5 bg-accent mb-8", isRTL && "mr-0 ml-auto")} />
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('realestate.approach.body')}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('realestate.approach.body2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Map Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={riskAnim.ref} className={cn("max-w-4xl mx-auto transition-all duration-700", isRTL && "font-hebrew text-right", riskAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mb-6">
              {t('realestate.risk.title')}
            </h2>
            <div className={cn("w-16 h-0.5 bg-accent mb-8", isRTL && "mr-0 ml-auto")} />
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {t('realestate.risk.intro')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
              {risks.map((risk, index) => <div key={index} className={cn("flex flex-col items-center text-center transition-all duration-500", isRTL && "font-hebrew", riskAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")} style={{
              transitionDelay: riskAnim.isVisible ? `${index * 150}ms` : '0ms'
            }}>
                  {/* Icon with outlined circle */}
                  <div className="w-14 h-14 rounded-full border border-accent flex items-center justify-center mb-5">
                    <AlertTriangle className="h-6 w-6 text-accent" strokeWidth={1.5} />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-display font-medium text-foreground mb-4">
                    {t(risk.titleKey)}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {t(risk.descKey)}
                  </p>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Tax Planning Section */}
      <section className="py-20 gradient-stone">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={taxAnim.ref} className={cn("max-w-4xl mx-auto transition-all duration-700", isRTL && "font-hebrew text-right", taxAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mb-6">
              {t('realestate.tax.title')}
            </h2>
            <div className={cn("w-16 h-0.5 bg-accent mb-8", isRTL && "mr-0 ml-auto")} />
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('realestate.tax.body')}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('realestate.tax.body2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fund Protection & Escrow Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={dueDiligenceAnim.ref} className={cn("max-w-4xl mx-auto transition-all duration-700", isRTL && "font-hebrew text-right", dueDiligenceAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mb-6">
              {t('realestate.escrow.title')}
            </h2>
            <div className={cn("w-16 h-0.5 bg-accent mb-8", isRTL && "mr-0 ml-auto")} />
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {t('realestate.escrow.body')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className={cn("p-6 bg-muted/30 rounded-lg", isRTL && "text-right")}>
                <h3 className="text-xl font-display font-medium text-foreground mb-3">
                  {t('realestate.escrow.escrow.title')}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('realestate.escrow.escrow.desc')}
                </p>
              </div>
              <div className={cn("p-6 bg-muted/30 rounded-lg", isRTL && "text-right")}>
                <h3 className="text-xl font-display font-medium text-foreground mb-3">
                  {t('realestate.escrow.milestones.title')}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('realestate.escrow.milestones.desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Remote Execution Section */}
      <section className="py-20 gradient-stone">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={remoteAnim.ref} className={cn("max-w-4xl mx-auto transition-all duration-700", isRTL && "font-hebrew text-right", remoteAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mb-6">
              {t('realestate.remote.title')}
            </h2>
            <div className={cn("w-16 h-0.5 bg-accent mb-8", isRTL && "mr-0 ml-auto")} />
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('realestate.remote.body')}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div ref={faqAnim.ref} className={cn("text-center mb-12 transition-all duration-700", isRTL && "font-hebrew", faqAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mb-4">
              {t('service.faq')}
            </h2>
            <div className="w-16 h-0.5 bg-accent mx-auto" />
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => <AccordionItem key={i} value={`item-${i}`} className={cn("transition-all duration-500", faqAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")} style={{
            transitionDelay: faqAnim.isVisible ? `${i * 100}ms` : '0ms'
          }}>
                <AccordionTrigger className={cn("text-left", isRTL && "font-hebrew text-right")}>
                  {t(faq.qKey)}
                </AccordionTrigger>
                <AccordionContent className={cn(isRTL && "font-hebrew text-right")}>
                  {t(faq.aKey)}
                </AccordionContent>
              </AccordionItem>)}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-primary bg-[#faf8f5]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={ctaAnim.ref} className={cn("max-w-3xl mx-auto text-center transition-all duration-700", isRTL && "font-hebrew", ctaAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <div className="w-16 h-0.5 bg-accent mx-auto mb-8" />
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold mb-6 text-primary">
              {t('realestate.cta.title')}
            </h2>
            
            <p className="text-lg mb-10 max-w-xl mx-auto text-primary">
              {t('realestate.cta.body')}
            </p>

            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-10 py-6 text-base group">
              <Link to="/contact" className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
                {t('realestate.cta.button')}
                <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>;
};
export default RealEstate;