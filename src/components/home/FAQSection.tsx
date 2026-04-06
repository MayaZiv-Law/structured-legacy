import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { isPrerender } from '@/lib/isPrerender';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQSection = () => {
  const { t, isRTL } = useLanguage();
  const isPrerenderEnv = isPrerender();
  const titleAnim = useScrollAnimation(0.1);
  const contentAnim = useScrollAnimation(0.05);

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

  const accordionContent = (
    <Accordion type={isPrerenderEnv ? "multiple" : "single"} {...(isPrerenderEnv ? { defaultValue: faqs.map((_, i) => `item-${i}`) } : { collapsible: true })} className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/60 group/item">
          <AccordionTrigger
            className={cn(
              "text-left py-5 sm:py-6 text-fluid-base font-medium hover:no-underline hover:text-accent transition-colors",
              isRTL && "text-right"
            )}
          >
            <span className={cn("flex items-baseline gap-3 sm:gap-4", isRTL && "flex-row-reverse")}>
              <span className="text-accent/40 text-sm font-display tabular-nums flex-shrink-0">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span>{t(faq.qKey)}</span>
            </span>
          </AccordionTrigger>
          <AccordionContent
            className={cn(
              "text-muted-foreground leading-relaxed pb-6 text-fluid-sm",
              isRTL ? "text-right pr-8 sm:pr-10" : "pl-8 sm:pl-10"
            )}
          >
            {t(faq.aKey)}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );

  return (
    <section className="section-spacer-md bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn("max-w-3xl mx-auto", isRTL && "font-hebrew")}>
          {/* Title */}
          <div
            ref={titleAnim.ref}
            className={cn(
              "text-center mb-8 transition-all duration-700",
              titleAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <h2 className="text-fluid-3xl font-display font-semibold text-foreground mb-6">
              {t('faq.title')}
            </h2>
            <div className={cn(
              "w-12 h-[2px] bg-accent mx-auto origin-center",
              titleAnim.isVisible ? "animate-line-grow" : "scale-x-0"
            )} />
          </div>

          {/* FAQ Accordion */}
          <div
            ref={contentAnim.ref}
            className={cn(
              "transition-all duration-700 delay-200",
              contentAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            {accordionContent}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
