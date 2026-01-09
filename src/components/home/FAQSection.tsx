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
    { q: 'faq.q1', a: 'faq.a1' },
    { q: 'faq.q2', a: 'faq.a2' },
    { q: 'faq.q3', a: 'faq.a3' },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn("max-w-3xl mx-auto", isRTL && "font-hebrew")}>
          {/* Title */}
          <h2 className={cn(
            "text-3xl sm:text-4xl font-display font-semibold text-foreground mb-12 text-center",
            isRTL && "text-right"
          )}>
            {t('faq.title')}
          </h2>

          {/* Accordion */}
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
                <AccordionTrigger className={cn(
                  "text-lg font-medium text-foreground hover:text-accent py-6",
                  isRTL && "text-right flex-row-reverse"
                )}>
                  {t(faq.q)}
                </AccordionTrigger>
                <AccordionContent className={cn(
                  "text-muted-foreground leading-relaxed pb-6",
                  isRTL && "text-right"
                )}>
                  {t(faq.a)}
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
