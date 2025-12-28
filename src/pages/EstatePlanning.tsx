import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { FileText, CheckCircle, Map, FileCheck, Shield, Clock, Users, Scale, ArrowRight } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import epaImage from '@/assets/epa-section-image.webp';

const EstatePlanning = () => {
  const { t, isRTL, language } = useLanguage();

  const willsFocusAreas = [
    { title: t('estate.wills.compliance.title'), desc: t('estate.wills.compliance.desc'), icon: FileCheck },
    { title: t('estate.wills.probate.title'), desc: t('estate.wills.probate.desc'), icon: Scale },
    { title: t('estate.wills.conflict.title'), desc: t('estate.wills.conflict.desc'), icon: Shield },
  ];

  const processSteps = [
    { num: '1', title: t('estate.process.step1.title'), desc: t('estate.process.step1.desc') },
    { num: '2', title: t('estate.process.step2.title'), desc: t('estate.process.step2.desc') },
    { num: '3', title: t('estate.process.step3.title'), desc: t('estate.process.step3.desc') },
    { num: '4', title: t('estate.process.step4.title'), desc: t('estate.process.step4.desc') },
  ];

  const faqs = [
    { q: t('estate.faq.q1'), a: t('estate.faq.a1') },
    { q: t('estate.faq.q2'), a: t('estate.faq.a2') },
  ];

  return (
    <Layout>
      <Helmet>
        <title>{language === 'he' ? 'ירושות ותכנון עיזבון בתל אביב | צוואות חוצות גבולות (ישראל)' : 'Inheritance & Estate Planning in Tel Aviv | Cross-Border Wills (Israel)'}</title>
        <meta name="description" content={language === 'he' ? 'תכנון עיזבון למשפחות בינלאומיות בישראל. ניסוח צוואות דו-לשוניות, צווי ירושה וייפוי כוח מתמשך עם תוקף חוצה גבולות.' : 'Estate planning for international families in Israel. Drafting bilingual wills, probate orders, and Enduring Power of Attorney with cross-border validity.'} />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("max-w-4xl mx-auto", isRTL && "font-hebrew text-right")}>
            <div className="flex items-center gap-3 mb-6">
              <FileText className="h-8 w-8 text-accent" />
              <span className="text-accent font-medium">{t('nav.estate')}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-semibold text-foreground mb-6">
              {t('estate.hero.title')}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('estate.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* The Challenge Section */}
      <section className="py-16 gradient-stone">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("max-w-4xl mx-auto", isRTL && "font-hebrew text-right")}>
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
          <div className={cn("max-w-4xl mx-auto mb-10", isRTL && "font-hebrew text-right")}>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold mb-6">
              {t('estate.wills.title')}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t('estate.wills.body')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {willsFocusAreas.map((area, i) => (
              <div key={i} className={cn("p-6 bg-card rounded-lg border border-border", isRTL && "font-hebrew text-right")}>
                <area.icon className="h-6 w-6 text-accent mb-4" />
                <h3 className="font-medium mb-2">{area.title}</h3>
                <p className="text-sm text-muted-foreground">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enduring Power of Attorney Section */}
      <section className="py-16 bg-background overflow-visible">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto relative">
            <div className={cn(
              "relative z-10 max-w-2xl p-8 sm:p-10 bg-card rounded-2xl shadow-lg border border-border/50",
              isRTL ? "font-hebrew text-right mr-auto" : "ml-0"
            )}>
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
            <div className={cn(
              "hidden lg:block absolute w-[420px] h-[380px] rounded-xl overflow-hidden shadow-xl",
              isRTL ? "-left-8 top-8" : "-right-8 top-8"
            )}>
              <img 
                src={epaImage} 
                alt="Estate planning documents" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Process Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("max-w-4xl mx-auto", isRTL && "font-hebrew text-right")}>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold mb-10">
              {t('estate.process.title')}
            </h2>
            <div className="space-y-6">
              {processSteps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-accent font-semibold">{step.num}</span>
                  </div>
                  <div className="pt-1">
                    <h3 className="font-medium mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
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
          <div className={cn("max-w-4xl mx-auto", isRTL && "font-hebrew text-right")}>
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
          <div className={cn("max-w-4xl mx-auto p-6 bg-card rounded-lg border border-border", isRTL && "font-hebrew text-right")}>
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
          <h2 className={cn("text-2xl font-display font-semibold mb-8", isRTL && "font-hebrew text-right")}>
            {t('service.faq')}
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-card border border-border rounded-lg px-6">
                <AccordionTrigger className={cn("hover:no-underline", isRTL && "font-hebrew text-right")}>
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className={cn("text-muted-foreground", isRTL && "font-hebrew text-right")}>
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={cn("text-2xl sm:text-3xl font-display font-semibold mb-4", isRTL && "font-hebrew")}>
            {t('estate.cta.title')}
          </h2>
          <p className={cn("text-primary-foreground/80 mb-8 max-w-xl mx-auto", isRTL && "font-hebrew")}>
            {t('estate.cta.body')}
          </p>
          <Button asChild size="lg" variant="secondary" className="group">
            <Link to="/contact">
              {t('estate.cta.button')}
              <ArrowRight className={cn("ml-2 h-4 w-4 transition-transform group-hover:translate-x-1", isRTL && "rotate-180 mr-2 ml-0")} />
            </Link>
          </Button>
          <p className={cn("text-sm text-primary-foreground/60 mt-4", isRTL && "font-hebrew")}>
            {t('estate.cta.note')}
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default EstatePlanning;
