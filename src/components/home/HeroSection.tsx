import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import heroImage from '@/assets/tel-aviv-coastline-hero.webp';

const HeroSection = () => {
  const {
    t,
    isRTL
  } = useLanguage();

  return <section className="relative z-10 -mt-20 pt-20 min-h-[100vh] flex flex-col overflow-visible" style={{ contain: 'layout style' }}>
      {/* Full Background Image - NO overlay, NO fade, image shines */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Israel coastline and city lights at dusk"
          className="w-full h-full object-cover object-center brightness-105 contrast-105"
          src={heroImage}
          fetchPriority="high"
          loading="eager"
          decoding="sync"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 3237px"
          width={3237}
          height={2369}
        />
      </div>

      {/* Spacer - image fills the entire viewport */}
      <div className="flex-grow" />

      {/* Text floats at bottom - NO box, NO overlay, just glowing text */}
      <div className="relative z-20 pb-8 sm:pb-12 lg:pb-16 px-6 sm:px-10 lg:px-16">
        <div className={cn("max-w-3xl", isRTL ? "ml-auto" : "mr-auto")}>
          <h1
            className={cn(
              "text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-semibold text-white leading-tight mb-3",
              isRTL && "font-hebrew text-right"
            )}
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.7), 0 1px 6px rgba(0,0,0,0.9)' }}
          >
            {t('hero.tagline')}
          </h1>
          <p
            className={cn(
              "text-lg sm:text-xl lg:text-2xl text-white/90 font-medium",
              isRTL && "font-hebrew text-right"
            )}
            style={{ textShadow: '0 2px 15px rgba(0,0,0,0.7), 0 1px 4px rgba(0,0,0,0.8)' }}
          >
            {t('hero.subtitle1')}
          </p>
        </div>
      </div>
    </section>;
};
export default HeroSection;
