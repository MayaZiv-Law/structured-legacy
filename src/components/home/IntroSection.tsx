import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const IntroSection = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="pt-20 sm:pt-24 lg:pt-28 pb-10 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn("max-w-4xl mx-auto", isRTL && "font-hebrew text-right")}>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
            {t('hero.subtitle1')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
