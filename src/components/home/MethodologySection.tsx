import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Search, Calculator, Globe } from 'lucide-react';

const MethodologySection = () => {
  const { t, isRTL } = useLanguage();

  const pillars = [
    {
      icon: Search,
      titleKey: 'method.step1.title',
      descKey: 'method.step1.desc',
    },
    {
      icon: Calculator,
      titleKey: 'method.step2.title',
      descKey: 'method.step2.desc',
    },
  ];

  return (
    <section className="py-24 bg-background overflow-hidden">
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

        {/* Asymmetric Layout Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Offset background block - taller than content */}
          <div className={cn(
            "absolute -top-8 w-[60%] bg-secondary/50",
            "h-[calc(100%+4rem)]",
            isRTL ? "right-0" : "left-0 -ml-8 lg:-ml-16"
          )} />

          {/* Content Grid on white background - offset to the right */}
          <div className={cn(
            "relative z-10 py-12 lg:py-16 bg-background shadow-sm w-[92%] mt-12",
            isRTL ? "mr-auto ml-0" : "ml-auto mr-0"
          )}>
            <div className={cn(
              "grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 px-6 lg:px-12",
              isRTL && "font-hebrew"
            )}>
              {pillars.map((pillar, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex flex-col",
                    isRTL && "text-right"
                  )}
                >
                  {/* Icon */}
                  <div className={cn(
                    "w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-4",
                    isRTL && "mr-0 ml-auto"
                  )}>
                    <pillar.icon className="h-5 w-5 text-accent-foreground" strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-display font-medium text-foreground mb-3">
                    {t(pillar.titleKey)}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {t(pillar.descKey)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
