import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const IntroSection = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="pt-8 sm:pt-10 lg:pt-12 pb-10 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn("max-w-4xl mx-auto", isRTL && "font-hebrew text-right")}>
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
            {t('hero.subtitle1')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
