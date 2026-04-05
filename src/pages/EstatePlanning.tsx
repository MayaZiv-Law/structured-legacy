import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { isPrerender } from '@/lib/isPrerender';
import { FileText, CheckCircle, Map, FileCheck, Shield, Clock, Users, Scale, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLocalePath } from '@/hooks/useLocalePath';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import PageHero from '@/components/shared/PageHero';
import epaImage from '@/assets/epa-section-image.webp';
import estateHeroBg from '@/assets/estate-hero-new.webp';
import { SEO, createServiceSchema, createFAQSchema, createBreadcrumbSchema } from '@/components/SEO';
import RelatedServices from '@/components/shared/RelatedServices';
const EstatePlanning = () => {
  const {
    t,
    isRTL,
    language
  } = useLanguage();
  const localePath = useLocalePath();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const willsFocusAreas = [{
    title: t('estate.wills.compliance.title'),
    desc: t('estate.wills.compliance.desc'),
    icon: FileCheck
  }, {
    title: t('estate.wills.probate.title'),
    desc: t('estate.wills.probate.desc'),
    icon: Scale
  }, {
    title: t('estate.wills.conflict.title'),
    desc: t('estate.wills.conflict.desc'),
    icon: Shield
  }];
  const processSteps = [{
    num: '1',
    title: t('estate.process.step1.title'),
    desc: t('estate.process.step1.desc')
  }, {
    num: '2',
    title: t('estate.process.step2.title'),
    desc: t('estate.process.step2.desc')
  }, {
    num: '3',
    title: t('estate.process.step3.title'),
    desc: t('estate.process.step3.desc')
  }, {
    num: '4',
    title: t('estate.process.step4.title'),
    desc: t('estate.process.step4.desc')
  }];
  const faqs = [{
    q: t('estate.faq.q1'),
    a: t('estate.faq.a1')
  }, {
    q: t('estate.faq.q2'),
    a: t('estate.faq.a2')
  }, {
    q: t('estate.faq.q3'),
    a: t('estate.faq.a3')
  }, {
    q: t('estate.faq.q4'),
    a: t('estate.faq.a4')
  }];

  // Scroll animations
  const willsAnim = useScrollAnimation();
  const epaAnim = useScrollAnimation();
  const processAnim = useScrollAnimation();
  const taxAnim = useScrollAnimation();
  const financialAnim = useScrollAnimation();
  const faqAnim = useScrollAnimation();
  const ctaAnim = useScrollAnimation();
  const estateSchema = createServiceSchema({
    name: 'Estate Planning and Inheritance Legal Services',
    description: 'Estate planning for international families in Israel. Drafting bilingual wills, probate orders, and Enduring Power of Attorney with cross border validity.',
    url: 'https://mayaziv-law.com/estate-planning'
  });

  const faqSchema = createFAQSchema(faqs.map(faq => ({
    question: faq.q,
    answer: faq.a,
  })));

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: language === 'he' ? 'בית' : 'Home', url: 'https://mayaziv-law.com/' },
    { name: language === 'he' ? 'משפחה ומורשת' : 'Family and Legacy', url: 'https://mayaziv-law.com/estate-planning' },
  ]);

  return <Layout>
      <SEO titleEn="Estate Planning Lawyer Israel | Wills, Inheritance and Cross Border Succession" titleHe="ירושות ותכנון עיזבון בתל אביב | צוואות חוצות גבולות" descriptionEn="Drafting wills and inheritance plans with cross border validity. Advising Israeli and international families on estate structure and succession planning." descriptionHe="תכנון עיזבון למשפחות בינלאומיות בישראל. ניסוח צוואות דו-לשוניות, צווי ירושה וייפוי כוח מתמשך עם תוקף חוצה גבולות." path="/estate-planning" schema={[estateSchema, faqSchema, breadcrumbSchema]} />

      {/* Hero Section */}
      <PageHero backgroundImage={estateHeroBg} title={t('estate.hero.title')} subtitle={t('estate.hero.subtitle')} imagePosition="center 70%" />

      {/* Enduring Power of Attorney Section */}
      <section className="pt-24 sm:pt-28 pb-12 bg-background overflow-visible">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={epaAnim.ref} className={cn("max-w-6xl mx-auto transition-all duration-700", epaAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch")}>
              {/* Text card */}
              <div className={cn("p-8 sm:p-10 bg-card rounded-2xl shadow-lg border border-border/50", isRTL ? "font-hebrew text-right order-1" : "order-1")}>
                <div className={cn("w-16 h-0.5 bg-accent mb-6", isRTL && "ml-auto")} />
                <h2 className="text-3xl sm:text-4xl font-display font-semibold mb-5 text-foreground">
                  {t('estate.epa.title')}
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed text-lg">
                  {t('estate.epa.body')}
                </p>
              </div>
              {/* Image */}
              <div className={cn("rounded-xl overflow-hidden shadow-xl transition-all duration-700 delay-200 h-64 sm:h-80 lg:h-full", isRTL ? "order-2" : "order-2", epaAnim.isVisible ? "opacity-100 translate-x-0" : isRTL ? "opacity-0 -translate-x-8" : "opacity-0 translate-x-8")}>
                <img alt="Estate planning documents" className="w-full h-full object-cover" src="/lovable-uploads/e3b93eb0-b8af-4d3d-96e5-15a47306753b.webp" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Border Wills Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={willsAnim.ref} className={cn("max-w-4xl mx-auto mb-8 transition-all duration-700", isRTL && "font-hebrew text-right", willsAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <div className={cn("w-16 h-0.5 bg-accent mb-6", isRTL && "ml-auto")} />
            <h2 className="text-3xl sm:text-4xl font-display font-semibold mb-5">
              {t('estate.wills.title')}
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {t('estate.wills.body')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {willsFocusAreas.map((area, i) => <div key={i} className={cn("p-6 bg-card rounded-lg border border-border transition-all duration-500", isRTL && "font-hebrew text-right", willsAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")} style={{
            transitionDelay: willsAnim.isVisible ? `${i * 150}ms` : '0ms'
          }}>
                <area.icon className="h-6 w-6 text-accent mb-4" />
                <h3 className="font-medium mb-2 text-lg">{area.title}</h3>
                <p className="text-base text-muted-foreground">{area.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* The Process Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={processAnim.ref} className={cn("max-w-4xl mx-auto transition-all duration-700", isRTL && "font-hebrew text-right", processAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <div className={cn("w-16 h-0.5 bg-accent mb-6", isRTL && "ml-auto")} />
            <h2 className="text-3xl sm:text-4xl font-display font-semibold mb-8">
              {t('estate.process.title')}
            </h2>
            <div className="space-y-6">
              {processSteps.map((step, i) => <div key={i} className={cn("flex gap-4 transition-all duration-500", processAnim.isVisible ? "opacity-100 translate-x-0" : isRTL ? "opacity-0 translate-x-8" : "opacity-0 -translate-x-8")} style={{
              transitionDelay: processAnim.isVisible ? `${i * 100}ms` : '0ms'
            }}>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-accent font-semibold">{step.num}</span>
                  </div>
                  <div className="pt-1">
                    <h3 className="font-medium mb-1 text-lg">{step.title}</h3>
                    <p className="text-base text-muted-foreground">{step.desc}</p>
                  </div>
                </div>)}
            </div>
            <p className="mt-8 text-muted-foreground italic">
              {t('estate.process.note')}
            </p>
          </div>
        </div>
      </section>

      {/* Tax Considerations Section */}
      <section className="py-12 gradient-stone">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={taxAnim.ref} className={cn("max-w-4xl mx-auto transition-all duration-700", isRTL && "font-hebrew text-right", taxAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <div className={cn("w-16 h-0.5 bg-accent mb-6", isRTL && "ml-auto")} />
            <h2 className="text-3xl sm:text-4xl font-display font-semibold mb-5">
              {t('estate.tax.title')}
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed text-lg">
              {t('estate.tax.body')}
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {t('estate.tax.body2')}
            </p>
          </div>
        </div>
      </section>

      {/* Financial Agreements Section */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={financialAnim.ref} className={cn("max-w-4xl mx-auto p-6 bg-card rounded-lg border border-border transition-all duration-700", isRTL && "font-hebrew text-right", financialAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <h3 className="text-xl font-display font-medium mb-3">
              {t('estate.financial.title')}
            </h3>
            <p className="text-muted-foreground text-lg">
              {t('estate.financial.body')}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 gradient-stone">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 ref={faqAnim.ref} className={cn("text-3xl sm:text-4xl font-display font-semibold mb-6 transition-all duration-700", isRTL && "font-hebrew text-right", faqAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            {t('service.faq')}
          </h2>
          {isPrerender() ? (
          <Accordion type="multiple" defaultValue={faqs.map((_, i) => `item-${i}`)} className="space-y-4">
            {faqs.map((faq, i) => <AccordionItem key={i} value={`item-${i}`} className="bg-card border border-border rounded-lg px-6">
                <AccordionTrigger className={cn("hover:no-underline", isRTL && "font-hebrew text-right")}>
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className={cn("text-muted-foreground", isRTL && "font-hebrew text-right")}>
                  {faq.a}
                </AccordionContent>
              </AccordionItem>)}
          </Accordion>
          ) : (
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => <AccordionItem key={i} value={`item-${i}`} className={cn("bg-card border border-border rounded-lg px-6 transition-all duration-500", faqAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")} style={{
            transitionDelay: faqAnim.isVisible ? `${i * 100}ms` : '0ms'
          }}>
                <AccordionTrigger className={cn("hover:no-underline", isRTL && "font-hebrew text-right")}>
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className={cn("text-muted-foreground", isRTL && "font-hebrew text-right")}>
                  {faq.a}
                </AccordionContent>
              </AccordionItem>)}
          </Accordion>
          )}
        </div>
      </section>

      {/* Related Services */}
      <RelatedServices currentPath="/estate-planning" />

      {/* CTA Section */}
      <section className="py-12 bg-primary">
        <div ref={ctaAnim.ref} className={cn("container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700", ctaAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />
            <h2 className={cn("text-4xl sm:text-5xl lg:text-6xl font-display font-semibold mb-5 text-primary-foreground", isRTL && "font-hebrew")}>
              {t('estate.cta.title')}
            </h2>
            <p className={cn("text-xl mb-8 max-w-xl mx-auto text-primary-foreground/80", isRTL && "font-hebrew")}>
              {t('estate.cta.body')}
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-4 sm:px-6 lg:px-10 py-4 sm:py-6 text-base group max-w-full">
              <Link to={localePath('/contact')} className={cn("flex items-center gap-2 whitespace-normal text-center", isRTL && "flex-row-reverse")}>
                {t('estate.cta.button')}
                <Arrow className="h-4 w-4 flex-shrink-0 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>;
};
export default EstatePlanning;