import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { CheckCircle, Building2, FileText, ShieldCheck, Footprints } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Helmet } from 'react-helmet-async';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import PageHero from '@/components/shared/PageHero';
import taxationHeroBg from '@/assets/taxation-hero-bg.webp';
const Taxation = () => {
  const {
    t,
    isRTL,
    language
  } = useLanguage();
  const realEstateServices = [{
    title: t('tax.realEstate.assessment.title'),
    desc: t('tax.realEstate.assessment.desc'),
    icon: FileText
  }, {
    title: t('tax.realEstate.ownership.title'),
    desc: t('tax.realEstate.ownership.desc'),
    icon: Building2
  }, {
    title: t('tax.realEstate.filing.title'),
    desc: t('tax.realEstate.filing.desc'),
    icon: CheckCircle
  }];
  const serveItems = [{
    title: t('tax.serve.compliance'),
    desc: t('tax.serve.compliance.desc'),
    icon: ShieldCheck
  }, {
    title: t('tax.serve.firstStep'),
    desc: t('tax.serve.firstStep.desc'),
    icon: Footprints
  }];
  const faqs = [{
    q: t('tax.faq.q1'),
    a: t('tax.faq.a1')
  }, {
    q: t('tax.faq.q2'),
    a: t('tax.faq.a2')
  }, {
    q: t('tax.faq.q3'),
    a: t('tax.faq.a3')
  }];

  // Scroll animations
  const contextAnim = useScrollAnimation();
  const realEstateAnim = useScrollAnimation();
  const bankingAnim = useScrollAnimation();
  const serveAnim = useScrollAnimation();
  const crossBorderAnim = useScrollAnimation();
  const olimAnim = useScrollAnimation();
  const faqAnim = useScrollAnimation();
  const ctaAnim = useScrollAnimation();
  return <Layout>
      <Helmet>
        <title>{language === 'he' ? 'מיסוי ורגולציה בנקאית בישראל | תל אביב (חוצה גבולות ונדל"ן)' : 'Israeli Tax & Banking Compliance | Tel Aviv (Cross-Border & Real Estate)'}</title>
        <meta name="description" content={language === 'he' ? 'ייעוץ משפטי למיסוי ורגולציה בנקאית בישראל. תכנון מס רכישה, תאימות מקור כספים והלבנת הון, ותיאום חוצה גבולות.' : 'Legal counsel for Israeli taxation and banking regulation. Purchase tax planning, source of funds compliance (AML), and cross-border alignment.'} />
      </Helmet>

      {/* Hero Section */}
      <PageHero backgroundImage={taxationHeroBg} title={t('tax.hero.title')} subtitle={t('tax.hero.subtitle')} />

      {/* The Context Section */}
      <section className="pt-40 sm:pt-48 pb-16 gradient-stone">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={contextAnim.ref} className={cn("max-w-4xl mx-auto transition-all duration-700", isRTL && "font-hebrew text-right", contextAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold mb-6">
              {t('tax.context.title')}
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {t('tax.context.body')}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t('tax.context.body2')}
            </p>
          </div>
        </div>
      </section>

      {/* Real Estate Tax Planning - Asymmetric Design */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Centered title above the layout */}
          <div ref={realEstateAnim.ref} className={cn("text-center mb-12 transition-all duration-700", isRTL && "font-hebrew", realEstateAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <div className="w-16 h-1 bg-accent mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
              {t('tax.realEstate.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('tax.realEstate.body')}
            </p>
          </div>

          {/* Asymmetric layout */}
          <div className="relative max-w-6xl mx-auto">
            {/* Beige background - 60% width, extends above/below */}
            <div className={cn("absolute -top-8 h-[calc(100%+4rem)] w-[60%] bg-secondary/50 rounded-sm", isRTL ? "right-0 -mr-8 lg:-mr-16" : "left-0 -ml-8 lg:-ml-16")} />
            
            {/* White card - 92% width, offset, z-10 */}
            <div className={cn("relative z-10 max-w-[92%] mt-8 bg-background shadow-sm rounded-lg p-8 md:p-12", isRTL ? "mr-auto" : "ml-auto")}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {realEstateServices.map((service, i) => <div key={i} className={cn("flex flex-col items-center text-center transition-all duration-500", isRTL && "font-hebrew", realEstateAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")} style={{
                transitionDelay: realEstateAnim.isVisible ? `${i * 150}ms` : '0ms'
              }}>
                    {/* Icon with filled circle */}
                    <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg font-display font-medium text-foreground mb-2">
                      {service.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.desc}
                    </p>
                  </div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banking & AML Compliance - Asymmetric Design with Image */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Centered title above the layout */}
          <div ref={bankingAnim.ref} className={cn("text-center mb-16 transition-all duration-700", isRTL && "font-hebrew", bankingAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground">
              {t('tax.banking.title')}
            </h2>
          </div>

          {/* Asymmetric layout */}
          <div className={cn("relative max-w-6xl mx-auto transition-all duration-700", bankingAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <div className={cn("flex flex-col lg:flex-row items-center gap-8", isRTL && "lg:flex-row-reverse")}>
              {/* Beige card with text */}
              <div className={cn("relative z-10 w-full lg:w-[55%] bg-secondary p-8 md:p-12 shadow-sm", isRTL ? "lg:-mr-16" : "lg:-ml-0")}>
                <div className={cn(isRTL && "font-hebrew text-right")}>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {t('tax.banking.body')}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('tax.banking.body2')}
                  </p>
                </div>
              </div>
              
              {/* Image that overlaps */}
              <div className={cn("relative w-full lg:w-[55%] lg:absolute lg:top-1/2 lg:-translate-y-1/2", isRTL ? "lg:left-0" : "lg:right-0")}>
                <img alt="Banking compliance" className="w-full h-64 lg:h-80 object-cover shadow-lg" src="/lovable-uploads/10c05b41-4184-42a1-bdf3-3b49d016c9bb.png" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={serveAnim.ref} className={cn("max-w-4xl mx-auto text-center transition-all duration-700", isRTL && "font-hebrew", serveAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <div className="w-16 h-1 bg-accent mb-6 mx-auto" />
            <h2 className="text-2xl sm:text-3xl font-display font-semibold mb-6">
              {t('tax.serve.title')}
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {t('tax.serve.body')}
            </p>
            
            <div className="grid md:grid-cols-2 gap-12 max-w-3xl mx-auto">
              {serveItems.map((item, i) => <div key={i} className={cn("flex flex-col items-center text-center transition-all duration-500", serveAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")} style={{
              transitionDelay: serveAnim.isVisible ? `${i * 150}ms` : '0ms'
            }}>
                  {/* Circular icon */}
                  <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-5">
                    <item.icon className="w-7 h-7 text-accent-foreground" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-display font-medium text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Border Alignment */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Background beige layer - absolute positioned */}
          <div className={cn("absolute -top-12 h-[calc(100%+9rem)] w-[95%] bg-secondary/50 rounded-sm", isRTL ? "-right-8 lg:-right-16" : "-left-8 lg:-left-16")} />
          
          {/* White content card - relative z-10 */}
          <div ref={crossBorderAnim.ref} className={cn("relative z-10 max-w-[92%] mt-8 bg-background shadow-sm rounded-lg p-8 md:p-12 transition-all duration-700", isRTL ? "mr-auto text-right font-hebrew" : "ml-auto", crossBorderAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <div className={cn("w-16 h-1 bg-accent mb-6", isRTL && "mr-0")} />
            <h2 className="text-2xl sm:text-3xl font-display font-semibold mb-6">
              {t('tax.crossBorder.title')}
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {t('tax.crossBorder.body')}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t('tax.crossBorder.body2')}
            </p>
          </div>
        </div>
      </section>

      {/* Olim Planning */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={olimAnim.ref} className={cn("max-w-4xl mx-auto text-center transition-all duration-700", isRTL && "font-hebrew", olimAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold mb-6">
              {t('tax.olim.title')}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t('tax.olim.body')}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 gradient-stone">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 ref={faqAnim.ref} className={cn("text-2xl sm:text-3xl font-display font-semibold mb-8 text-center transition-all duration-700", isRTL && "font-hebrew", faqAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            {t('service.faq')}
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => <AccordionItem key={i} value={`item-${i}`} className={cn("transition-all duration-500", faqAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")} style={{
            transitionDelay: faqAnim.isVisible ? `${i * 100}ms` : '0ms'
          }}>
                <AccordionTrigger className={cn("text-left", isRTL && "font-hebrew text-right")}>
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className={cn(isRTL && "font-hebrew text-right")}>
                  {faq.a}
                </AccordionContent>
              </AccordionItem>)}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={ctaAnim.ref} className={cn("max-w-2xl mx-auto text-center transition-all duration-700", isRTL && "font-hebrew", ctaAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold mb-4">
              {t('tax.cta.title')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t('tax.cta.body')}
            </p>
            <Button asChild size="lg" className="px-8">
              <Link to="/contact">{t('tax.cta.button')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>;
};
export default Taxation;