import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { FileText, CheckCircle, Map, FileCheck, Shield, Clock, Users, Scale, ArrowRight } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import PageHero from '@/components/shared/PageHero';
import epaImage from '@/assets/epa-section-image.webp';
import estateHeroBg from '@/assets/estate-hero-new.webp';
import { SEO, createServiceSchema } from '@/components/SEO';

const EstatePlanning = () => {
  const {
    t,
    isRTL,
    language
  } = useLanguage();
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
  }];

  // Scroll animations
  const challengeAnim = useScrollAnimation();
  const willsAnim = useScrollAnimation();
  const epaAnim = useScrollAnimation();
  const processAnim = useScrollAnimation();
  const taxAnim = useScrollAnimation();
  const financialAnim = useScrollAnimation();
  const faqAnim = useScrollAnimation();
  const ctaAnim = useScrollAnimation();
  const estateSchema = createServiceSchema({
    name: 'Estate Planning & Inheritance Legal Services',
    description: 'Estate planning for international families in Israel. Drafting bilingual wills, probate orders, and Enduring Power of Attorney with cross-border validity.',
    url: 'https://mayaziv.law/estate-planning',
  });

  return <Layout>
      <SEO
        titleEn="Inheritance & Estate Planning in Tel Aviv | Cross-Border Wills"
        titleHe="ירושות ותכנון עיזבון בתל אביב | צוואות חוצות גבולות"
        descriptionEn="Estate planning for international families in Israel. Drafting bilingual wills, probate orders, and Enduring Power of Attorney with cross-border validity."
        descriptionHe="תכנון עיזבון למשפחות בינלאומיות בישראל. ניסוח צוואות דו-לשוניות, צווי ירושה וייפוי כוח מתמשך עם תוקף חוצה גבולות."
        path="/estate-planning"
        schema={estateSchema}
      />
      {/* Hero Section */}
      <PageHero backgroundImage={estateHeroBg} title={t('estate.hero.title')} imagePosition="center 70%" />

      {/* The Challenge Section */}
      <section className="pt-40 sm:pt-48 pb-16 gradient-stone">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={challengeAnim.ref} className={cn("max-w-4xl mx-auto transition-all duration-700", isRTL && "font-hebrew text-right", challengeAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold mb-6">
              {t('estate.challenge.title')}
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {t('estate.challenge.body')}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t('estate.challenge.body2')}
            </p>
          </div>
        </div>
      </section>

      {/* Cross-Border Wills Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={willsAnim.ref} className={cn("max-w-4xl mx-auto transition-all duration-700", isRTL && "font-hebrew text-right", willsAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold mb-6">
              {t('estate.wills.title')}
            </h2>
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                {t('estate.wills.body')}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t('estate.wills.concurrent')}
              </p>
              <p className="text-muted-foreground leading-relaxed italic bg-accent/5 p-4 rounded-lg border-l-2 border-accent">
                {t('estate.wills.warning')}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t('estate.wills.remote')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enduring Power of Attorney Section */}
      <section className="py-16 bg-background overflow-visible">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={epaAnim.ref} className={cn("max-w-5xl mx-auto relative transition-all duration-700", epaAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <div className={cn("relative z-10 max-w-2xl p-8 sm:p-10 bg-card rounded-2xl shadow-lg border border-border/50", isRTL ? "font-hebrew text-right mr-auto" : "ml-0")}>
              <h2 className="text-2xl sm:text-3xl font-display font-semibold mb-6 text-foreground">
                {t('estate.epa.title')}
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {t('estate.epa.body')}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t('estate.epa.body2')}
              </p>
            </div>
            <div className={cn("hidden lg:block absolute w-[420px] h-[380px] rounded-xl overflow-hidden shadow-xl transition-all duration-700 delay-200", isRTL ? "-left-8 top-8" : "-right-8 top-8", epaAnim.isVisible ? "opacity-100 translate-x-0" : isRTL ? "opacity-0 -translate-x-8" : "opacity-0 translate-x-8")}>
              <img src={epaImage} alt="Estate planning documents" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* The Process Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={processAnim.ref} className={cn("max-w-4xl mx-auto transition-all duration-700", isRTL && "font-hebrew text-right", processAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold mb-10">
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
                    <h3 className="font-medium mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
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
      <section className="py-16 gradient-stone">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={taxAnim.ref} className={cn("max-w-4xl mx-auto transition-all duration-700", isRTL && "font-hebrew text-right", taxAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold mb-6">
              {t('estate.tax.title')}
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {t('estate.tax.body')}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t('estate.tax.body2')}
            </p>
          </div>
        </div>
      </section>

      {/* Financial Agreements Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={financialAnim.ref} className={cn("max-w-4xl mx-auto p-6 bg-card rounded-lg border border-border transition-all duration-700", isRTL && "font-hebrew text-right", financialAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <h3 className="text-lg font-display font-medium mb-3">
              {t('estate.financial.title')}
            </h3>
            <p className="text-muted-foreground">
              {t('estate.financial.body')}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 gradient-stone">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 ref={faqAnim.ref} className={cn("text-2xl font-display font-semibold mb-8 transition-all duration-700", isRTL && "font-hebrew text-right", faqAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            {t('service.faq')}
          </h2>
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#faf8f5]">
        <div ref={ctaAnim.ref} className={cn("container mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-700", ctaAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-8" />
          <h2 className={cn("text-3xl sm:text-4xl lg:text-5xl font-display font-semibold mb-6 text-primary", isRTL && "font-hebrew")}>
            {t('estate.cta.title')}
          </h2>
          <p className={cn("text-lg mb-10 max-w-xl mx-auto text-primary", isRTL && "font-hebrew")}>
            {t('estate.cta.body')}
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-10 py-6 text-base group">
            <Link to="/contact" className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
              {t('estate.cta.button')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <p className={cn("text-sm text-primary/60 mt-4", isRTL && "font-hebrew")}>
            {t('estate.cta.note')}
          </p>
        </div>
      </section>
    </Layout>;
};
export default EstatePlanning;