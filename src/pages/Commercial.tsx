import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { FileText, Scale, Globe, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import crossBorderImage from '@/assets/cross-border-business.webp';
import { SEO, createServiceSchema } from '@/components/SEO';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Commercial = () => {
  const { t, isRTL, language } = useLanguage();

  const contractItems = [
    { text: t('commercial.contracts.founders'), icon: FileText },
    { text: t('commercial.contracts.localization'), icon: Globe },
    { text: t('commercial.contracts.transactions'), icon: Scale },
  ];

  const deliverables = [
    t('commercial.deliverables.item1'),
    t('commercial.deliverables.item2'),
    t('commercial.deliverables.item3'),
  ];

  const faqs = [
    { q: t('commercial.faq.q1'), a: t('commercial.faq.a1') },
    { q: t('commercial.faq.q2'), a: t('commercial.faq.a2') },
    { q: t('commercial.faq.q3'), a: t('commercial.faq.a3') },
  ];

  const philosophyAnim = useScrollAnimation();
  const contractsAnim = useScrollAnimation();
  const disputeAnim = useScrollAnimation();
  const crossBorderAnim = useScrollAnimation();
  const deliverablesAnim = useScrollAnimation();
  const clientsAnim = useScrollAnimation();
  const faqAnim = useScrollAnimation();
  const ctaAnim = useScrollAnimation();

  const commercialSchema = createServiceSchema({
    name: 'Commercial Legal Services',
    description: 'Commercial legal counsel in Tel Aviv. Drafting contracts, partnership agreements, and managing cross-border business disputes for international clients.',
    url: 'https://mayaziv.law/commercial',
  });

  return (
    <Layout>
      <SEO
        titleEn="Commercial Lawyer Tel Aviv | Contracts & Dispute Resolution"
        titleHe="עורכת דין מסחרית בתל אביב | חוזים ויישוב סכסוכים"
        descriptionEn="Commercial legal counsel in Tel Aviv. Drafting contracts, partnership agreements, and managing cross-border business disputes for international clients."
        descriptionHe="הגנה על אינטרסים עסקיים: ניסוח חוזים, אסטרטגיית סכסוכים וייצוג חברות ומשקיעים זרים בישראל."
        path="/commercial"
        schema={commercialSchema}
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

      {/* Contracts Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={contractsAnim.ref}
            className={cn(
              "max-w-4xl mx-auto transition-all duration-700",
              isRTL && "font-hebrew text-right",
              contractsAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <h2 className="text-2xl sm:text-3xl font-display font-semibold mb-6">
              {t('commercial.contracts.title')}
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {t('commercial.contracts.body')}
            </p>
            <div className="space-y-4">
              {contractItems.map((item, i) => (
                <div 
                  key={i}
                  className={cn(
                    "flex items-start gap-4 p-4 bg-card rounded-lg border border-border",
                    isRTL && "flex-row-reverse text-right"
                  )}
                  style={{ transitionDelay: contractsAnim.isVisible ? `${i * 100}ms` : '0ms' }}
                >
                  <item.icon className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dispute Resolution Section */}
      <section className="py-16 gradient-stone">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={disputeAnim.ref}
            className={cn(
              "max-w-4xl mx-auto transition-all duration-700",
              isRTL && "font-hebrew text-right",
              disputeAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <h2 className="text-2xl sm:text-3xl font-display font-semibold mb-6">
              {t('commercial.dispute.title')}
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {t('commercial.dispute.body')}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t('commercial.dispute.body2')}
            </p>
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

      {/* Deliverables Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={deliverablesAnim.ref}
            className={cn(
              "max-w-4xl mx-auto transition-all duration-700",
              isRTL && "font-hebrew text-right",
              deliverablesAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <h2 className="text-2xl sm:text-3xl font-display font-semibold mb-8">
              {t('commercial.deliverables.title')}
            </h2>
            <div className="space-y-4">
              {deliverables.map((item, i) => (
                <div 
                  key={i}
                  className={cn(
                    "flex items-center gap-4",
                    isRTL && "flex-row-reverse"
                  )}
                >
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                  <p className="text-muted-foreground">{item}</p>
                </div>
              ))}
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
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {t('commercial.clients.body')}
            </p>
            <p className="text-sm text-muted-foreground/80 italic">
              {t('commercial.clients.filter')}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={faqAnim.ref}
            className={cn(
              "max-w-4xl mx-auto transition-all duration-700",
              isRTL && "font-hebrew text-right",
              faqAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <h2 className="text-2xl sm:text-3xl font-display font-semibold mb-8">
              {t('commercial.faq.title')}
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className={cn("text-right", isRTL && "font-hebrew")}>
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className={cn(isRTL && "font-hebrew text-right")}>
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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