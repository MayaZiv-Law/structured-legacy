import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Building2, Globe, FileText, ArrowRight, ArrowLeft, Users, Briefcase } from 'lucide-react';

const PracticeAreasSection = () => {
  const { t, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const mainAreas = [
    {
      icon: Building2,
      titleKey: 'practice.realEstate.title',
      descKey: 'practice.realEstate.desc',
      link: '/real-estate',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    },
    {
      icon: Globe,
      titleKey: 'practice.taxation.title',
      descKey: 'practice.taxation.desc',
      link: '/taxation',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2072&auto=format&fit=crop',
    },
    {
      icon: FileText,
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
    <section className="py-24 gradient-stone">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn("text-center mb-16", isRTL && "font-hebrew")}>
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mb-4">
            {t('practice.title')}
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mt-6" />
        </div>

        {/* Main Practice Areas - Prominent Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {mainAreas.map((area, index) => (
            <Link
              key={index}
              to={area.link}
              className="group relative overflow-hidden rounded-sm shadow-premium bg-card"
            >
              {/* Background Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={area.image}
                  alt={t(area.titleKey)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
              </div>

              {/* Content */}
              <div className={cn(
                "absolute bottom-0 left-0 right-0 p-6",
                isRTL && "font-hebrew text-right"
              )}>
                <div className={cn(
                  "flex items-center gap-3 mb-3",
                  isRTL && "flex-row-reverse"
                )}>
                  <area.icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
                  <h3 className="text-xl font-display font-medium text-primary-foreground">
                    {t(area.titleKey)}
                  </h3>
                </div>
                <p className="text-primary-foreground/80 text-sm leading-relaxed mb-4">
                  {t(area.descKey)}
                </p>
                <div className={cn(
                  "flex items-center gap-2 text-accent font-medium text-sm group-hover:gap-3 transition-all",
                  isRTL && "flex-row-reverse"
                )}>
                  {t('practice.learnMore')}
                  <Arrow className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Additional Focus Areas - Text Links */}
        <div className={cn(
          "flex flex-wrap justify-center gap-8",
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
              <Arrow className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreasSection;
