import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

// Import hero images
import realEstateHero from '@/assets/real-estate-hero-bg.webp';
import taxationHero from '@/assets/taxation-hero-bg.webp';
import estateHero from '@/assets/estate-hero-bg.webp';
import olimHero from '@/assets/olim-hero-bg.webp';
import commercialHero from '@/assets/commercial-hero-bg.webp';

const PracticeAreasSection = () => {
  const { t, isRTL } = useLanguage();

  const areas = [
    {
      titleKey: 'practice.realEstate.title',
      descKey: 'practice.realEstate.desc',
      link: '/real-estate',
      image: realEstateHero,
    },
    {
      titleKey: 'practice.taxation.title',
      descKey: 'practice.taxation.desc',
      link: '/taxation',
      image: taxationHero,
    },
    {
      titleKey: 'practice.estate.title',
      descKey: 'practice.estate.desc',
      link: '/estate-planning',
      image: estateHero,
    },
    {
      titleKey: 'practice.additional.olim',
      descKey: 'practice.olim.desc',
      link: '/olim-residents',
      image: olimHero,
    },
    {
      titleKey: 'practice.additional.commercial',
      descKey: 'practice.commercial.desc',
      link: '/commercial',
      image: commercialHero,
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

        {/* Carousel */}
        <div className="max-w-6xl mx-auto px-8">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
              direction: isRTL ? 'rtl' : 'ltr',
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {areas.map((area, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <Link
                    to={area.link}
                    className="group relative block"
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
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className={cn(
              "hidden sm:flex -left-4",
              isRTL && "-right-4 left-auto"
            )} />
            <CarouselNext className={cn(
              "hidden sm:flex -right-4",
              isRTL && "-left-4 right-auto"
            )} />
          </Carousel>
        </div>

        {/* Spacer for overlapping cards */}
        <div className="h-12" />
      </div>
    </section>
  );
};

export default PracticeAreasSection;
