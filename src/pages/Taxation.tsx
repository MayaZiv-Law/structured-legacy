import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { CheckCircle, Building2, FileText, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Helmet } from 'react-helmet-async';
import realEstateDueDiligence from '@/assets/real-estate-due-diligence.webp';

const Taxation = () => {
  const { t, isRTL, language } = useLanguage();

  const realEstateServices = [
    { title: t('tax.realEstate.assessment.title'), desc: t('tax.realEstate.assessment.desc'), icon: FileText },
    { title: t('tax.realEstate.ownership.title'), desc: t('tax.realEstate.ownership.desc'), icon: Building2 },
    { title: t('tax.realEstate.filing.title'), desc: t('tax.realEstate.filing.desc'), icon: CheckCircle },
  ];

  const serveItems = [
    { title: t('tax.serve.compliance'), desc: t('tax.serve.compliance.desc') },
    { title: t('tax.serve.firstStep'), desc: t('tax.serve.firstStep.desc') },
  ];

  const faqs = [
    { q: t('tax.faq.q1'), a: t('tax.faq.a1') },
    { q: t('tax.faq.q2'), a: t('tax.faq.a2') },
    { q: t('tax.faq.q3'), a: t('tax.faq.a3') },
  ];

  return (
    <Layout>
      <Helmet>
        <title>{language === 'he' ? 'מיסוי ורגולציה בנקאית בישראל | תל אביב (חוצה גבולות ונדל"ן)' : 'Israeli Tax & Banking Compliance | Tel Aviv (Cross-Border & Real Estate)'}</title>
        <meta 
          name="description" 
          content={language === 'he' 
            ? 'ייעוץ משפטי למיסוי ורגולציה בנקאית בישראל. תכנון מס רכישה, תאימות מקור כספים והלבנת הון, ותיאום חוצה גבולות.' 
            : 'Legal counsel for Israeli taxation and banking regulation. Purchase tax planning, source of funds compliance (AML), and cross-border alignment.'
          } 
        />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("max-w-4xl", isRTL && "font-hebrew text-right mr-auto")}>
            <div className="w-16 h-1 bg-accent mb-8" />
            <h1 className="text-4xl sm:text-5xl font-display font-semibold text-foreground mb-6">
              {t('tax.hero.title')}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('tax.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* The Context Section */}
      <section className="py-16 gradient-stone">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("max-w-3xl", isRTL && "font-hebrew text-right mr-auto")}>
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
      <section className="py-16 lg:py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Centered Title */}
          <div className={cn("text-center mb-10 lg:mb-16", isRTL && "font-hebrew")}>
            <div className="w-16 h-1 bg-accent mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground">
              {t('tax.realEstate.title')}
            </h2>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden flex flex-col items-center">
            <div className="w-[85%] relative z-10">
              <img 
                src={realEstateDueDiligence} 
                alt="Real estate due diligence" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className={cn(
              "bg-secondary/50 px-6 py-10 -mt-6 relative w-full",
              isRTL && "font-hebrew text-right"
            )}>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {t('tax.realEstate.body')}
              </p>
              
              <div className="space-y-6">
                {realEstateServices.map((service, i) => (
                  <div key={i} className={cn("flex flex-col", isRTL && "text-right")}>
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center mb-3">
                      <service.icon className="h-4 w-4 text-accent-foreground" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-display font-medium text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {service.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Layout - Asymmetric */}
          <div className="hidden lg:block relative max-w-6xl mx-auto">
            {/* Content Card - 55% */}
            <div className={cn(
              "relative z-10 lg:w-[55%]",
              isRTL ? "lg:ml-auto" : "lg:mr-auto"
            )}>
              <div className={cn(
                "bg-secondary/50 p-8 lg:py-16 lg:px-12",
                isRTL && "font-hebrew text-right"
              )}>
                <p className="text-muted-foreground mb-10 leading-relaxed">
                  {t('tax.realEstate.body')}
                </p>
                
                {/* Highlighted Quote */}
                <div className={cn(
                  "mb-10",
                  isRTL ? "border-r-2 border-accent pr-6" : "border-l-2 border-accent pl-6"
                )}>
                  <p className="text-foreground font-display text-lg italic">
                    {t('tax.realEstate.punchline') || t('tax.realEstate.body')}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 gap-8">
                  {realEstateServices.map((service, i) => (
                    <div key={i} className={cn("flex gap-4", isRTL && "flex-row-reverse text-right")}>
                      <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                        <service.icon className="h-5 w-5 text-accent-foreground" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="text-xl font-display font-medium text-foreground mb-2">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                          {service.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Image - 48%, overlapping with offset */}
            <div className={cn(
              "lg:absolute lg:top-10 lg:w-[48%] lg:h-[calc(100%+2rem)] z-20",
              isRTL ? "lg:left-0" : "lg:right-0"
            )}>
              <img 
                src={realEstateDueDiligence} 
                alt="Real estate due diligence" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Centered CTA */}
          <div className={cn("text-center mt-12 lg:mt-16", isRTL && "font-hebrew")}>
            <Link 
              to="/contact" 
              className={cn(
                "inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-colors group",
                isRTL && "flex-row-reverse"
              )}
            >
              {t('tax.realEstate.cta') || t('cta.schedule')}
              {isRTL ? (
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              ) : (
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              )}
            </Link>
          </div>
        </div>
      </section>

      {/* Banking & AML Compliance */}
      <section className="py-16 gradient-stone">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("max-w-4xl", isRTL && "font-hebrew text-right mr-auto")}>
            <div className="w-16 h-1 bg-accent mb-6" />
            <h2 className="text-2xl sm:text-3xl font-display font-semibold mb-6">
              {t('tax.banking.title')}
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {t('tax.banking.body')}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t('tax.banking.body2')}
            </p>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("max-w-4xl", isRTL && "font-hebrew text-right mr-auto")}>
            <div className="w-16 h-1 bg-accent mb-6" />
            <h2 className="text-2xl sm:text-3xl font-display font-semibold mb-6">
              {t('tax.serve.title')}
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {t('tax.serve.body')}
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {serveItems.map((item, i) => (
                <div key={i} className="p-5 bg-card rounded-lg border border-border">
                  <h3 className="font-medium text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Border Alignment */}
      <section className="py-16 gradient-stone">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("max-w-4xl", isRTL && "font-hebrew text-right mr-auto")}>
            <div className="w-16 h-1 bg-accent mb-6" />
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
          <div className={cn("max-w-4xl", isRTL && "font-hebrew text-right mr-auto")}>
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
          <h2 className={cn("text-2xl sm:text-3xl font-display font-semibold mb-8 text-center", isRTL && "font-hebrew")}>
            {t('service.faq')}
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className={cn("text-left", isRTL && "font-hebrew text-right")}>
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className={cn(isRTL && "font-hebrew text-right")}>
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("max-w-2xl mx-auto text-center", isRTL && "font-hebrew")}>
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
    </Layout>
  );
};

export default Taxation;
