import { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

// Import images
import methodOwnership from '@/assets/method-ownership.webp';
import methodCrossborder from '@/assets/method-crossborder.webp';
import methodWills from '@/assets/method-wills.webp';
import methodPrenup from '@/assets/method-prenup.webp';
import methodTax from '@/assets/method-tax.webp';
import methodStructure from '@/assets/method-structure.webp';

const MethodologySection = () => {
  const { t, isRTL } = useLanguage();

  // Memoize cards array to prevent recreating on each render
  const cards = useMemo(() => [
    {
      titleKey: 'method.step1.title',
      descKey: 'method.step1.desc',
      image: methodOwnership,
    },
    {
      titleKey: 'method.step2.title',
      descKey: 'method.step2.desc',
      image: methodCrossborder,
    },
    {
      titleKey: 'method.step3.title',
      descKey: 'method.step3.desc',
      image: methodWills,
    },
    {
      titleKey: 'method.step4.title',
      descKey: 'method.step4.desc',
      image: methodPrenup,
    },
    {
      titleKey: 'method.step5.title',
      descKey: 'method.step5.desc',
      image: methodTax,
    },
    {
      titleKey: 'method.step6.title',
      descKey: 'method.step6.desc',
      image: methodStructure,
    },
  ], []);

  return (
    <section 
      className="py-16 bg-secondary/30 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Title */}
        <div className={cn("text-center mb-10", isRTL && "font-hebrew")}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-foreground mb-4">
            {t('method.title')}
          </h2>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
            {t('method.subtitle')}
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto",
          isRTL && "font-hebrew"
        )}>
          {cards.map((card, index) => (
            <div
              key={index}
              className={cn(
                "group bg-background overflow-hidden transition-all duration-300 hover:shadow-xl border-b-4 border-accent",
                isRTL && "text-right"
              )}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={card.image} 
                  alt={t(card.titleKey)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-display font-semibold text-foreground mb-3 leading-tight group-hover:text-accent transition-colors">
                  {t(card.titleKey)}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground font-serif leading-relaxed text-lg">
                  {t(card.descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
