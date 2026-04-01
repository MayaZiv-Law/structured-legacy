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

  return <section className="relative min-h-[70vh] sm:min-h-[75vh] flex flex-col overflow-visible -mt-0 lg:-mt-20">
      {/* Full Background Image - same style as expertise pages */}
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
      </div>

      {/* Spacer to push content box to bottom */}
      <div className="flex-grow" />

      {/* Content Box - compact */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 translate-y-4 sm:translate-y-8 lg:translate-y-12">
        <div ref={heroAnim.ref} className={cn("max-w-3xl mx-auto transition-all duration-700", heroAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <div className={cn("bg-primary/95 backdrop-blur-sm px-5 py-4 sm:px-8 sm:py-5 lg:px-10 lg:py-6 shadow-2xl", isRTL && "font-hebrew text-right")}>
            {/* Gold accent line */}
            <div className={cn("w-16 h-1 bg-accent mb-3", isRTL && "mr-0 ml-auto")} />

            {/* Headline only */}
            <h1 className={cn("text-2xl sm:text-3xl lg:text-4xl font-display font-semibold text-primary-foreground leading-tight lg:whitespace-nowrap", isRTL && "font-hebrew")}>
              {t('hero.tagline')}
            </h1>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;
