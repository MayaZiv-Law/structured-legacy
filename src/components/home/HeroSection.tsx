import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import heroImage from '@/assets/tel-aviv-hero-new.webp';

const HeroSection = () => {
  const {
    t,
    isRTL
  } = useLanguage();
  
  return <section className="relative z-10 -mt-20 pt-20 min-h-[90vh] flex flex-col overflow-visible" style={{ contain: 'layout style' }}>
      {/* Full Background Image - optimized for LCP */}
      <div className="absolute inset-0 z-0">
        <img 
          alt="Tel Aviv skyline and coastline at dusk" 
          className="w-full h-full object-cover" 
          src={heroImage}
          fetchPriority="high" 
          loading="eager" 
          decoding="sync"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
          width={1920} 
          height={1080}
        />
      </div>

      {/* Spacer to push content box to bottom */}
      <div className="flex-grow" />

      {/* Content Box - Overflows into next section */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 translate-y-28 sm:translate-y-24">
        <div className={cn("max-w-2xl", isRTL ? "ml-auto mr-4 lg:mr-8" : "mr-auto ml-4 lg:ml-8")}>
          {/* Text Box - optimized for faster render */}
          <div className={cn("bg-primary/95 px-8 py-6 sm:px-12 sm:py-8 shadow-2xl", isRTL && "font-hebrew text-right")}>
            {/* Tagline */}
            <h1 className={cn("text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-primary-foreground mb-4 leading-tight", isRTL && "font-hebrew")}>
              {t('hero.tagline')}
            </h1>

            {/* Gold accent line */}
            <div className={cn("w-16 h-1 bg-accent mb-6", isRTL && "mr-0 ml-auto")} />

            {/* H1 - Main Title */}
            

            {/* Sub-headline Line 1 - Context */}
            <p className={cn("text-xl sm:text-2xl text-primary-foreground/90 font-medium mb-3", isRTL && "font-hebrew")}>
              {t('hero.subtitle1')}
            </p>

            {/* Sub-headline Line 2 - The Promise */}
            <p className={cn("text-lg sm:text-xl text-primary-foreground/80 font-medium", isRTL && "font-hebrew")}>
              {t('hero.subtitle2')}
            </p>

          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;