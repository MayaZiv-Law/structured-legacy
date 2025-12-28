import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Globe, Calculator, HelpCircle } from 'lucide-react';

const ConflictSection = () => {
  const { t, isRTL } = useLanguage();

  const challenges = [
    {
      icon: Globe,
      titleKey: 'conflict.culture.title',
      descKey: 'conflict.culture.desc',
    },
    {
      icon: Calculator,
      titleKey: 'conflict.tax.title',
      descKey: 'conflict.tax.desc',
    },
    {
      icon: HelpCircle,
      titleKey: 'conflict.uncertainty.title',
      descKey: 'conflict.uncertainty.desc',
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn("text-center mb-16", isRTL && "font-hebrew")}>
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mb-4">
            {t('conflict.title')}
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {challenges.map((challenge, index) => (
            <div
              key={index}
              className={cn(
                "text-center p-8 rounded-sm bg-card border border-border hover:border-accent/50 transition-colors duration-300",
                isRTL && "font-hebrew"
              )}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-6">
                <challenge.icon className="h-7 w-7 text-accent" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-display font-medium text-foreground mb-4">
                {t(challenge.titleKey)}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t(challenge.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConflictSection;