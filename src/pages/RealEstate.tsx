import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Building2, AlertTriangle, Globe, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Helmet } from 'react-helmet-async';
import dueDiligenceImage from '@/assets/real-estate-due-diligence.webp';
import remoteTransactionImage from '@/assets/remote-transaction.webp';
import realEstateHeroBg from '@/assets/real-estate-hero-bg.webp';
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
  }];
  return <Layout>
      <Helmet>
        <title>{language === 'he' ? 'עורכת דין נדל"ן בתל אביב | רכישת נכס בישראל' : 'Real Estate Lawyer in Tel Aviv | Buying Property in Israel (Tax & Due Diligence)'}</title>
        <meta name="description" content={language === 'he' ? 'ייעוץ משפטי לרכישת נכס בישראל. בדיקת נאותות, תכנון מס רכישה וייצוג מרחוק לתושבי חוץ ומשקיעים.' : 'Legal counsel for buying property in Israel. Due diligence, purchase tax planning, and remote representation for foreign residents and investors.'} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 min-h-[60vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img src={realEstateHeroBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/40 to-primary/70" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={cn("max-w-4xl", isRTL && "font-hebrew text-right mr-auto")}>
            <div className={cn("flex items-center gap-3 mb-6", isRTL && "flex-row-reverse")}>
              <Building2 className="h-8 w-8 text-accent" strokeWidth={1.5} />
              <span className="text-accent font-medium">{t('nav.realEstate')}</span>
            </div>
            <div className={cn("w-16 h-1 bg-accent mb-8", isRTL && "mr-0")} />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-primary-foreground mb-6">
              {t('realestate.hero.title')}
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              {t('realestate.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* The Approach Section */}
      <section className="py-20 gradient-stone">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("max-w-4xl mx-auto", isRTL && "font-hebrew text-right")}>
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
          <div className={cn("max-w-4xl mx-auto", isRTL && "font-hebrew text-right")}>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mb-6">
              {t('realestate.risk.title')}
            </h2>
            <div className={cn("w-16 h-0.5 bg-accent mb-8", isRTL && "mr-0 ml-auto")} />
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {t('realestate.risk.intro')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
              {risks.map((risk, index) => <div key={index} className={cn("flex flex-col items-center text-center", isRTL && "font-hebrew")}>
                  {/* Icon with outlined circle */}
                  <div className="w-14 h-14 rounded-full border border-accent flex items-center justify-center mb-5">
                    <AlertTriangle className="h-6 w-6 text-accent" strokeWidth={1.5} />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-display font-medium text-foreground mb-4">
                    {t(risk.titleKey)}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed text-sm">
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
          <div className={cn("max-w-4xl mx-auto", isRTL && "font-hebrew text-right")}>
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

      {/* Due Diligence Section - Asymmetric Design */}
      <section className="relative z-20 py-20 bg-background overflow-visible">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-6xl mx-auto">
            {/* Offset beige background */}
            <div className={cn("absolute -top-8 w-[60%] bg-secondary", "h-[calc(100%+4rem)]", isRTL ? "right-0 -mr-8 lg:-mr-16" : "left-0 -ml-8 lg:-ml-16")} />
            
            {/* Content grid */}
            <div className={cn("relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center", isRTL && "lg:grid-flow-dense")}>
              {/* Text content in white card */}
              <div className={cn("bg-background py-10 px-8 lg:py-14 lg:px-12 shadow-sm", isRTL ? "lg:col-start-2" : "lg:col-start-1")}>
                <div className={cn(isRTL && "font-hebrew text-right")}>
                  <h2 className="text-2xl sm:text-3xl font-display font-semibold text-foreground mb-6">
                    {t('realestate.diligence.title')}
                  </h2>
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {t('realestate.diligence.body')}
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('realestate.diligence.body2')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className={cn("relative", isRTL ? "lg:col-start-1" : "lg:col-start-2")}>
                <div className="aspect-[3/4] max-w-sm mx-auto lg:mx-0 overflow-hidden rounded-sm shadow-premium">
                  <img src={dueDiligenceImage} alt="Real estate due diligence" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Remote Execution Section - Same layout as Due Diligence */}
      <section className="relative z-20 py-20 bg-background overflow-visible">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-6xl mx-auto">
            {/* Offset beige background - same position as Due Diligence */}
            <div className={cn("absolute -top-8 w-[60%] bg-secondary", "h-[calc(100%+4rem)]", isRTL ? "right-0 -mr-8 lg:-mr-16" : "left-0 -ml-8 lg:-ml-16")} />
            
            {/* Content grid */}
            <div className={cn("relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center", isRTL && "lg:grid-flow-dense")}>
              {/* Text content in white card - on left */}
              <div className={cn("bg-background py-10 px-8 lg:py-14 lg:px-12 shadow-sm", isRTL ? "lg:col-start-2" : "lg:col-start-1")}>
                <div className={cn(isRTL && "font-hebrew text-right")}>
                  <h2 className="text-2xl sm:text-3xl font-display font-semibold text-foreground mb-6">
                    {t('realestate.remote.title')}
                  </h2>
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {t('realestate.remote.body')}
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('realestate.remote.body2')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Image - on right */}
              <div className={cn("relative", isRTL ? "lg:col-start-1" : "lg:col-start-2")}>
                <div className="aspect-[3/4] max-w-sm mx-auto lg:mx-0 overflow-hidden rounded-sm shadow-premium">
                  <img alt="Remote real estate transaction" className="w-full h-full object-cover" src="/lovable-uploads/b4f1d315-d122-495e-bf2b-e2629dfb57b4.webp" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className={cn("text-center mb-12", isRTL && "font-hebrew")}>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mb-4">
              {t('service.faq')}
            </h2>
            <div className="w-16 h-0.5 bg-accent mx-auto" />
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => <AccordionItem key={i} value={`item-${i}`}>
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
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("max-w-3xl mx-auto text-center", isRTL && "font-hebrew")}>
            <div className="w-16 h-0.5 bg-accent mx-auto mb-8" />
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-primary-foreground mb-6">
              {t('realestate.cta.title')}
            </h2>
            
            <p className="text-primary-foreground/80 text-lg mb-10 max-w-xl mx-auto">
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