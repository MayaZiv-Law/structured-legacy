import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Search, Target, Rocket, Shield } from 'lucide-react';

const MethodologySection = () => {
  const { t, isRTL } = useLanguage();

  const steps = [
    {
      icon: Search,
      number: '01',
      titleKey: 'method.step1.title',
      descKey: 'method.step1.desc',
    },
    {
      icon: Target,
      number: '02',
      titleKey: 'method.step2.title',
      descKey: 'method.step2.desc',
    },
    {
      icon: Rocket,
      number: '03',
      titleKey: 'method.step3.title',
      descKey: 'method.step3.desc',
    },
    {
      icon: Shield,
      number: '04',
      titleKey: 'method.step4.title',
      descKey: 'method.step4.desc',
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn("text-center mb-16", isRTL && "font-hebrew")}>
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mb-4">
            {t('method.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('method.subtitle')}
          </p>
          <div className="w-16 h-0.5 bg-accent mx-auto mt-6" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={cn(
                  "relative bg-card p-8 rounded-sm border border-border hover:border-accent/50 transition-all duration-300 group",
                  isRTL && "font-hebrew text-right"
                )}
              >
                {/* Step number */}
                <div className={cn(
                  "absolute -top-3 text-5xl font-display font-bold text-accent/20 group-hover:text-accent/40 transition-colors",
                  isRTL ? "right-4" : "left-4"
                )}>
                  {step.number}
                </div>

                <div className={cn(
                  "flex items-center gap-4 mb-4 pt-6",
                  isRTL && "flex-row-reverse"
                )}>
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                    <step.icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-display font-medium text-foreground">
                    {t(step.titleKey)}
                  </h3>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {t(step.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;