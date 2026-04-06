import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalePath } from '@/hooks/useLocalePath';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// Import hero images
import realEstateHero from '@/assets/real-estate-hero-new.webp';
import taxationHero from '@/assets/taxation-hero-bg.webp';
import estateHero from '@/assets/estate-hero-new.webp';
import olimHero from '@/assets/olim-welcome-israel.webp';
import commercialHero from '@/assets/commercial-hero-new.jpg';

const PracticeAreasSection = () => {
  const { t, isRTL } = useLanguage();
  const localePath = useLocalePath();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const titleAnim = useScrollAnimation(0.1);
  const gridAnim = useScrollAnimation(0.05);

  // Memoize areas array to prevent recreating on each render
  const areas = useMemo(() => [
    {
      titleKey: 'practice.realEstate.title',
      descKey: 'practice.realEstate.desc',
      link: '/real-estate',
      image: realEstateHero
    },
    {
      titleKey: 'practice.taxation.title',
      descKey: 'practice.taxation.desc',
      link: '/taxation',
      image: taxationHero
    },
    {
      titleKey: 'practice.estate.title',
      descKey: 'practice.estate.desc',
      link: '/estate-planning',
      image: estateHero
    },
    {
      titleKey: 'practice.additional.olim',
      descKey: 'practice.olim.desc',
      link: '/olim-residents',
      image: olimHero
    },
    {
      titleKey: 'practice.additional.commercial',
      descKey: 'practice.commercial.desc',
      link: '/commercial',
      image: commercialHero
    }
  ], []);

  const staggerDelays = ['delay-100', 'delay-200', 'delay-300', 'delay-400', 'delay-500'];

  return (
    <section className="section-spacer-lg bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title with animated rule */}
        <div
          ref={titleAnim.ref}
          className={cn("text-center mb-12 sm:mb-16", isRTL && "font-hebrew")}
        >
          <div className={cn(
            "w-12 h-[2px] bg-accent mx-auto mb-6 origin-center",
            titleAnim.isVisible ? "animate-line-grow" : "scale-x-0"
          )} />
          <h2 className={cn(
            "text-fluid-4xl font-display font-semibold text-foreground transition-all duration-700",
            titleAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            {t('practice.title')}
          </h2>
        </div>

        {/* Cards Grid */}
        <div
          ref={gridAnim.ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5 max-w-7xl mx-auto"
        >
          {areas.map((area, index) => (
            <Link
              key={index}
              to={localePath(area.link)}
              className={cn(
                "group relative block pb-12 sm:pb-16 opacity-0",
                gridAnim.isVisible && `animate-scale-reveal ${staggerDelays[index]}`
              )}
            >
              {/* Image Container with hover overlay */}
              <div className="aspect-[4/5] overflow-hidden relative">
                <img
                  src={area.image}
                  alt={t(area.titleKey)}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  width={300}
                  height={375}
                />
                {/* Subtle hover overlay */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
              </div>

              {/* Bottom Label Card - Offset below image */}
              <div className={cn(
                "absolute top-[calc(100%-4.5rem)] sm:top-[calc(100%-5.5rem)] left-1/2 -translate-x-1/2 w-[90%] bg-background py-3 px-4 transition-shadow duration-500 group-hover:shadow-premium",
                isRTL && "font-hebrew"
              )}>
                <div className={cn("flex items-center justify-center gap-2", isRTL && "flex-row-reverse")}>
                  <h3 className="text-lg font-display font-medium text-foreground">
                    {t(area.titleKey)}
                  </h3>
                  <Arrow className={cn(
                    "h-4 w-4 text-accent flex-shrink-0 transition-transform duration-300",
                    isRTL ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
                  )} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Spacer for offset cards */}
      <div className="h-4 sm:h-8" />
    </section>
  );
};

export default PracticeAreasSection;
