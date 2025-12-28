import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Users, Briefcase } from 'lucide-react';

const PracticeAreasSection = () => {
  const { t, isRTL } = useLanguage();

  const mainAreas = [
    {
      titleKey: 'practice.realEstate.title',
      descKey: 'practice.realEstate.desc',
      link: '/real-estate',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    },
    {
      titleKey: 'practice.taxation.title',
      descKey: 'practice.taxation.desc',
      link: '/taxation',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2072&auto=format&fit=crop',
    },
    {
      titleKey: 'practice.estate.title',
      descKey: 'practice.estate.desc',
      link: '/estate-planning',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop',
    },
  ];

  const additionalAreas = [
    {
      icon: Users,
      titleKey: 'practice.additional.olim',
      link: '/contact',
    },
    {
      icon: Briefcase,
      titleKey: 'practice.additional.commercial',
      link: '/contact',
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn("text-center mb-16", isRTL && "font-hebrew")}>
          <h2 className="text-4xl sm:text-5xl font-display font-semibold text-foreground mb-4">
            {t('practice.title')}
          </h2>
        </div>

        {/* Main Practice Areas - Image Cards with Label */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12 max-w-6xl mx-auto">
          {mainAreas.map((area, index) => (
            <Link
              key={index}
              to={area.link}
              className="group relative"
            >
              {/* Image Container */}
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={area.image}
                  alt={t(area.titleKey)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Bottom Label Card - Overlapping */}
              <div className={cn(
                "absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 w-[85%] bg-background shadow-md py-4 px-6 text-center",
                isRTL && "font-hebrew"
              )}>
                <p className="text-muted-foreground text-sm mb-1">
                  {t(area.descKey)}
                </p>
                <h3 className="text-xl font-display font-medium text-foreground">
                  {t(area.titleKey)}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Spacer for overlapping cards */}
        <div className="h-12" />

        {/* Additional Focus Areas - Text Links */}
        <div className={cn(
          "flex flex-wrap justify-center gap-8 mt-8",
          isRTL && "font-hebrew"
        )}>
          {additionalAreas.map((area, index) => (
            <Link
              key={index}
              to={area.link}
              className={cn(
                "flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors group",
                isRTL && "flex-row-reverse"
              )}
            >
              <area.icon className="h-5 w-5 text-accent/70 group-hover:text-accent" strokeWidth={1.5} />
              <span className="font-medium">{t(area.titleKey)}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreasSection;
