import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import heroImage from '@/assets/tel-aviv-coastline-hero.webp';

const HeroSection = () => {
  const {
    t,
    isRTL
  } = useLanguage();
  const heroAnim = useScrollAnimation();

  return <section aria-label="Hero" className="relative min-h-[75vh] sm:min-h-[82vh] lg:min-h-[88vh] flex flex-col overflow-visible -mt-0 lg:-mt-20">
      {/* Full Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Israel coastline and city lights at dusk"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 30%' }}
          src={heroImage}
          fetchPriority="high"
          loading="eager"
          decoding="sync"
          width={3237}
          height={2369}
        />
        {/* Cinematic gradient overlay — darkens bottom for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent" />
      </div>

      {/* Spacer to push content box to bottom */}
      <div className="flex-grow" />

      {/* Content Box */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 translate-y-4 sm:translate-y-8 lg:translate-y-12">
        <div ref={heroAnim.ref} className={cn(
          "max-w-3xl mx-auto",
          heroAnim.isVisible ? "animate-hero-reveal" : "opacity-0"
        )}>
          <div className={cn(
            "bg-primary/95 backdrop-blur-sm px-6 py-5 sm:px-10 sm:py-7 lg:px-12 lg:py-8 shadow-2xl",
            isRTL && "font-hebrew text-right"
          )}>
            {/* Gold accent line — animated */}
            <div className={cn(
              "h-[2px] bg-accent mb-4 origin-left",
              isRTL && "origin-right mr-0 ml-auto",
              heroAnim.isVisible ? "w-20 animate-line-grow delay-300" : "w-0"
            )} />

            {/* Headline */}
            <h1 className={cn(
              "text-fluid-3xl font-display font-semibold text-primary-foreground leading-tight",
              isRTL && "font-hebrew"
            )}>
              {t('hero.tagline')}
            </h1>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;
