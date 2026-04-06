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
  subtitle,
  imagePosition = 'center'
}: PageHeroProps) => {
  const { isRTL } = useLanguage();
  const heroAnim = useScrollAnimation();

  return (
    <section className="relative min-h-[75vh] sm:min-h-[80vh] lg:min-h-[85vh] flex flex-col overflow-visible -mt-0 lg:-mt-20">
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
        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/15 to-transparent" />
      </div>

      {/* Spacer to push content box to bottom */}
      <div className="flex-grow" />

      {/* Content Box */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 translate-y-4 sm:translate-y-8 lg:translate-y-12">
        <div ref={heroAnim.ref} className={cn(
          "max-w-3xl mx-auto",
          heroAnim.isVisible ? "animate-hero-reveal" : "opacity-0"
        )}>
          <div className={cn(
            "bg-primary/95 backdrop-blur-sm px-6 py-5 sm:px-10 sm:py-7 lg:px-12 lg:py-8 shadow-2xl",
            isRTL && "font-hebrew text-right"
          )}>
            {/* Gold accent line — animated */}
            <div className={cn(
              "h-[2px] bg-accent mb-4 origin-left",
              isRTL && "origin-right mr-0 ml-auto",
              heroAnim.isVisible ? "w-20 animate-line-grow delay-300" : "w-0"
            )} />

            {/* Title */}
            <h1 className={cn(
              "text-fluid-3xl font-display font-semibold text-primary-foreground leading-tight",
              isRTL && "font-hebrew"
            )}>
              {title}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p className={cn(
                "text-fluid-base text-primary-foreground/70 mt-3 leading-relaxed",
                isRTL && "font-hebrew"
              )}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
