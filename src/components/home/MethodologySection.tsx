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
    {
      icon: Globe,
      titleKey: 'method.step3.title',
      descKey: 'method.step3.desc',
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn("text-center mb-16", isRTL && "font-hebrew")}>
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mb-4">
            {t('method.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {t('method.subtitle')}
          </p>
          <div className="w-16 h-0.5 bg-accent mx-auto mt-6" />
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className={cn(
                "relative bg-card p-8 rounded-sm border border-border hover:border-accent/50 transition-all duration-300 group",
                isRTL && "font-hebrew text-right"
              )}
            >
              <div className={cn(
                "flex items-center gap-4 mb-4",
                isRTL && "flex-row-reverse"
              )}>
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                  <pillar.icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-display font-medium text-foreground">
                  {t(pillar.titleKey)}
                </h3>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {t(pillar.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
