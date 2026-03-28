import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import heroImage from '@/assets/tel-aviv-coastline-hero.webp';

const HeroSection = () => {
  const {
    t,
    isRTL
  } = useLanguage();

  return <section className="relative z-10 -mt-20 pt-20 min-h-[100vh] flex flex-col overflow-visible" style={{ contain: 'layout style' }}>
      {/* Full Background Image - THE STAR of the hero */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Israel coastline and city lights at dusk"
          className="w-full h-full object-cover object-center"
          src={heroImage}
          fetchPriority="high"
          loading="eager"
          decoding="sync"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 3237px"
          width={3237}
          height={2369}
        />
      </div>

      {/* Spacer - pushes text to very bottom so image fills the view */}
      <div className="flex-grow" />

      {/* Compact text strip at the bottom */}
      <div className="relative z-20 w-full">
        <div className={cn("bg-primary/70 backdrop-blur-sm px-6 py-4 sm:px-10 sm:py-5", isRTL && "font-hebrew text-right")}>
          <div className="container mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h1 className={cn("text-2xl sm:text-3xl lg:text-4xl font-display font-semibold text-primary-foreground leading-tight", isRTL && "font-hebrew")}>
              {t('hero.tagline')}
            </h1>
            <p className={cn("text-base sm:text-lg text-primary-foreground/80 font-medium", isRTL && "font-hebrew")}>
              {t('hero.subtitle1')}
            </p>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;
