import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const IntroSection = () => {
  const { t, isRTL } = useLanguage();
  const anim = useScrollAnimation(0.15);

  return (
    <section aria-label="Introduction" className="pt-10 sm:pt-14 pb-8 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={anim.ref}
          className={cn(
            "max-w-4xl mx-auto",
            isRTL && "font-hebrew text-right",
            anim.isVisible ? "opacity-100" : "opacity-0"
          )}
        >
          {/* Decorative gold rule */}
          <div className={cn(
            "mb-6 sm:mb-8",
            isRTL ? "flex justify-end" : ""
          )}>
            <div className={cn(
              "h-[2px] bg-accent origin-left",
              isRTL && "origin-right",
              anim.isVisible ? "w-12 animate-line-grow" : "w-0"
            )} />
          </div>

          <h1 className={cn(
            "text-fluid-2xl font-display font-medium text-gradient-gold leading-relaxed transition-all duration-700 delay-200",
            anim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            {t('hero.subtitle1')}
          </h1>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
