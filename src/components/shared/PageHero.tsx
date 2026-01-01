import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ReactNode } from 'react';

interface PageHeroProps {
  backgroundImage: string;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  iconLabel?: string;
}

const PageHero = ({ backgroundImage, title, subtitle, icon, iconLabel }: PageHeroProps) => {
  const { isRTL } = useLanguage();
  const heroAnim = useScrollAnimation();

  return (
    <section className="relative min-h-[70vh] flex flex-col">
      {/* Full Background Image - No overlay, sharp and sparkling */}
      <div className="absolute inset-0 z-0">
        <img 
          src={backgroundImage} 
          alt="" 
          className="w-full h-full object-cover"
          style={{ imageRendering: 'crisp-edges' }}
        />
      </div>

      {/* Spacer to push content box to bottom */}
      <div className="flex-grow" />

      {/* Content Box at Bottom */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div
          ref={heroAnim.ref}
          className={cn(
            "max-w-5xl mx-auto transition-all duration-700",
            heroAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Text Box - wider and narrower */}
          <div className={cn(
            "bg-primary/95 backdrop-blur-sm px-8 py-6 sm:px-12 sm:py-8 shadow-2xl",
            isRTL && "font-hebrew text-right"
          )}>
            {/* Icon and Label */}
            {icon && iconLabel && (
              <div className={cn("flex items-center gap-3 mb-4", isRTL && "flex-row-reverse")}>
                {icon}
                <span className="text-accent font-medium">{iconLabel}</span>
              </div>
            )}

            {/* Gold accent line */}
            <div className={cn("w-16 h-1 bg-accent mb-4", isRTL && "mr-0 ml-auto")} />

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-primary-foreground mb-4 leading-tight">
              {title}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p className="text-lg sm:text-xl text-primary-foreground/80 leading-relaxed">
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
