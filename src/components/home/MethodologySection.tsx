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
      className="py-12 bg-secondary/30 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 6 Cards Grid - no section title */}
        <div className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto",
          isRTL && "font-hebrew"
        )}>
          {cards.map((card, index) => (
            <div
              key={index}
              className={cn(
                "group bg-background overflow-hidden transition-all duration-300 hover:shadow-premium card-premium",
                isRTL && "text-right"
              )}
            >
              {/* Image */}
              <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
                <img
                  src={card.image}
                  alt={t(card.titleKey)}
                  className="w-full h-full object-cover img-vibrant transition-transform duration-500 group-hover:scale-105"
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
                <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
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
