import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalePath } from '@/hooks/useLocalePath';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

import realEstateHero from '@/assets/real-estate-hero-new.webp';
import taxationHero from '@/assets/taxation-hero-bg.webp';
import estateHero from '@/assets/estate-hero-new.webp';
import olimHero from '@/assets/olim-welcome-israel.webp';
import commercialHero from '@/assets/commercial-hero-new.jpg';

const PracticeAreasSection = () => {
  const { t, isRTL } = useLanguage();
  const localePath = useLocalePath();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  
  const areas = useMemo(() => [
    { titleKey: 'practice.realEstate.title', descKey: 'practice.realEstate.desc', link: '/real-estate', image: realEstateHero },
    { titleKey: 'practice.taxation.title', descKey: 'practice.taxation.desc', link: '/taxation', image: taxationHero },
    { titleKey: 'practice.estate.title', descKey: 'practice.estate.desc', link: '/estate-planning', image: estateHero },
    { titleKey: 'practice.additional.olim', descKey: 'practice.olim.desc', link: '/olim-residents', image: olimHero },
    { titleKey: 'practice.additional.commercial', descKey: 'practice.commercial.desc', link: '/commercial', image: commercialHero }
  ], []);

  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn("text-center mb-6", isRTL && "font-hebrew")}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-foreground mb-4">
            {t('practice.title')}
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-5 max-w-5xl mx-auto">
          {areas.map((area, index) => (
            <Link key={index} to={localePath(area.link)} className="group relative block pb-10 sm:pb-12 hover:shadow-lg transition-shadow duration-300 w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.875rem)]">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={area.image}
                  alt={t(area.titleKey)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  width={300}
                  height={375}
                />
              </div>
              <div className={cn("absolute top-[calc(100%-3.5rem)] sm:top-[calc(100%-4.5rem)] left-1/2 -translate-x-1/2 w-[90%] bg-background shadow-md py-3 px-4", isRTL && "font-hebrew")}>
                <div className={cn("flex items-center justify-center gap-2", isRTL && "flex-row-reverse")}>
                  <h3 className="text-lg font-display font-medium text-foreground">
                    {t(area.titleKey)}
                  </h3>
                  <Arrow className="h-4 w-4 text-accent flex-shrink-0 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreasSection;
