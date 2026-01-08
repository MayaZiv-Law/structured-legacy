import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

// Import hero images
import realEstateHero from '@/assets/real-estate-hero-bg.webp';
import taxationHero from '@/assets/taxation-hero-bg.webp';
import estateHero from '@/assets/estate-hero-new.webp';
import olimHero from '@/assets/olim-hero-welcome.png';
import commercialHero from '@/assets/commercial-hero-new.jpg';
const PracticeAreasSection = () => {
  const {
    t,
    isRTL
  } = useLanguage();
  const areas = [{
    titleKey: 'practice.realEstate.title',
    descKey: 'practice.realEstate.desc',
    link: '/real-estate',
    image: realEstateHero
  }, {
    titleKey: 'practice.taxation.title',
    descKey: 'practice.taxation.desc',
    link: '/taxation',
    image: taxationHero
  }, {
    titleKey: 'practice.estate.title',
    descKey: 'practice.estate.desc',
    link: '/estate-planning',
    image: estateHero
  }, {
    titleKey: 'practice.additional.olim',
    descKey: 'practice.olim.desc',
    link: '/olim-residents',
    image: olimHero
  }, {
    titleKey: 'practice.additional.commercial',
    descKey: 'practice.commercial.desc',
    link: '/commercial',
    image: commercialHero
  }];
  return <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn("text-center mb-16", isRTL && "font-hebrew")}>
          <h2 className="text-4xl sm:text-5xl font-display font-semibold text-foreground mb-4">
            {t('practice.title')}
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {areas.map((area, index) => <Link key={index} to={area.link} className="group relative block pb-16">
              {/* Image Container */}
              <div className="aspect-[4/5] overflow-hidden">
                <img src={area.image} alt={t(area.titleKey)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>

              {/* Bottom Label Card - Offset below image, top-aligned */}
              <div className={cn("absolute top-[calc(100%-5.5rem)] left-1/2 -translate-x-1/2 w-[90%] bg-background shadow-md py-3 px-4 text-center", isRTL && "font-hebrew")}>
                
                <h3 className="text-base font-display font-medium text-foreground">
                  {t(area.titleKey)}
                </h3>
              </div>
            </Link>)}
        </div>
        </div>

        {/* Spacer for offset cards */}
        <div className="h-16" />
    </section>;
};
export default PracticeAreasSection;