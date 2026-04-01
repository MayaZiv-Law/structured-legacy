import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { isPrerender } from '@/lib/isPrerender';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQSection = () => {
  const { t, isRTL } = useLanguage();
  const isPrerenderEnv = isPrerender();

  const faqs = [
    { qKey: 'faq.q1', aKey: 'faq.a1' },
    { qKey: 'faq.q2', aKey: 'faq.a2' },
    { qKey: 'faq.q3', aKey: 'faq.a3' },
    { qKey: 'faq.q4', aKey: 'faq.a4' },
    { qKey: 'faq.q5', aKey: 'faq.a5' },
    { qKey: 'faq.q6', aKey: 'faq.a6' },
    { qKey: 'faq.q7', aKey: 'faq.a7' },
    { qKey: 'faq.q8', aKey: 'faq.a8' },
    { qKey: 'faq.q9', aKey: 'faq.a9' },
  ];

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn("max-w-3xl mx-auto", isRTL && "font-hebrew")}>
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-foreground mb-8 text-center">
            {t('faq.title')}
          </h2>

          {/* FAQ Accordion */}
          {isPrerenderEnv ? (
          <Accordion type="multiple" defaultValue={faqs.map((_, i) => `item-${i}`)} className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
                <AccordionTrigger 
                  className={cn(
                    "text-left py-5 text-lg sm:text-xl font-medium hover:no-underline",
                    isRTL && "text-right"
                  )}
                >
                  {t(faq.qKey)}
                </AccordionTrigger>
                <AccordionContent 
                  className={cn(
                    "text-muted-foreground leading-relaxed pb-5 text-base sm:text-lg",
                    isRTL && "text-right"
                  )}
                >
                  {t(faq.aKey)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          ) : (
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
                <AccordionTrigger 
                  className={cn(
                    "text-left py-5 text-lg sm:text-xl font-medium hover:no-underline",
                    isRTL && "text-right"
                  )}
                >
                  {t(faq.qKey)}
                </AccordionTrigger>
                <AccordionContent 
                  className={cn(
                    "text-muted-foreground leading-relaxed pb-5 text-base sm:text-lg",
                    isRTL && "text-right"
                  )}
                >
                  {t(faq.aKey)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
