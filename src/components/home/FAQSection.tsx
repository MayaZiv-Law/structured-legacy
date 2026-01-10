import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQSection = () => {
  const { t, isRTL } = useLanguage();

  const faqs = [
    { qKey: 'faq.q1', aKey: 'faq.a1' },
    { qKey: 'faq.q2', aKey: 'faq.a2' },
    { qKey: 'faq.q3', aKey: 'faq.a3' },
  ];

  return (
    <section 
      className="py-24 bg-background"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '0 400px' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn("max-w-3xl mx-auto", isRTL && "font-hebrew")}>
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mb-10 text-center">
            {t('faq.title')}
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-10" />

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
                <AccordionTrigger 
                  className={cn(
                    "text-left py-6 text-lg font-medium hover:no-underline",
                    isRTL && "text-right"
                  )}
                >
                  {t(faq.qKey)}
                </AccordionTrigger>
                <AccordionContent 
                  className={cn(
                    "text-muted-foreground leading-relaxed pb-6",
                    isRTL && "text-right"
                  )}
                >
                  {t(faq.aKey)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
