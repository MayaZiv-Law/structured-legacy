import { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const MethodologySection = () => {
  const { t, isRTL } = useLanguage();

  // Memoize cards array to prevent recreating on each render
  const cards = useMemo(() => [
    {
      titleKey: 'method.step1.title',
      descKey: 'method.step1.desc',
    },
    {
      titleKey: 'method.step2.title',
      descKey: 'method.step2.desc',
    },
    {
      titleKey: 'method.step3.title',
      descKey: 'method.step3.desc',
    },
    {
      titleKey: 'method.step4.title',
      descKey: 'method.step4.desc',
    },
    {
      titleKey: 'method.step5.title',
      descKey: 'method.step5.desc',
    },
    {
      titleKey: 'method.step6.title',
      descKey: 'method.step6.desc',
    },
  ], []);

  return (
    <section 
      className="py-24 bg-secondary/30 overflow-hidden"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '0 600px' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Title */}
        <div className={cn("text-center mb-16", isRTL && "font-hebrew")}>
          <h2 className="text-4xl sm:text-5xl font-display font-semibold text-foreground mb-4">
            {t('method.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {t('method.subtitle')}
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto",
          isRTL && "font-hebrew"
        )}>
          {cards.map((card, index) => (
            <div
              key={index}
              className={cn(
                "bg-background border-2 border-accent p-8 transition-all duration-300 hover:shadow-lg",
                isRTL && "text-right"
              )}
            >
              {/* Title */}
              <h3 className="text-xl font-display font-normal text-foreground mb-4 leading-tight">
                {t(card.titleKey)}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground font-serif leading-relaxed text-sm">
                {t(card.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
