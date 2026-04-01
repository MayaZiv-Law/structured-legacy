import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface PageHeroProps {
  backgroundImage: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  iconLabel?: string;
  imagePosition?: string;
}

const PageHero = ({
  backgroundImage,
  title,
  imagePosition = 'center'
}: PageHeroProps) => {
  const { isRTL } = useLanguage();
  const heroAnim = useScrollAnimation();

  return (
    <section className="relative min-h-[70vh] sm:min-h-[75vh] flex flex-col overflow-visible -mt-0 lg:-mt-20">
      {/* Full Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover"
          style={{ objectPosition: imagePosition }}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          width={1920}
          height={1080}
        />
      </div>

      {/* Spacer to push content box to bottom */}
      <div className="flex-grow" />

      {/* Compact Content Box - title only */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 translate-y-4 sm:translate-y-8 lg:translate-y-12">
        <div ref={heroAnim.ref} className={cn("mx-auto transition-all duration-700", heroAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <div className={cn("bg-primary/95 backdrop-blur-sm px-5 py-4 sm:px-8 sm:py-5 lg:px-10 lg:py-6 shadow-2xl", isRTL && "font-hebrew text-right")}>
            <h1 className={cn("text-2xl sm:text-3xl lg:text-4xl font-display font-semibold text-primary-foreground leading-tight", isRTL && "font-hebrew")}>
              {title}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
