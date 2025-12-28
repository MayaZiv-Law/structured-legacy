import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import heroImage from '@/assets/tel-aviv-hero.webp';

const HeroSection = () => {
  const { t, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className={cn(
          "max-w-3xl",
          isRTL ? "mr-auto text-right" : "ml-0"
        )}>
          {/* Tagline */}
          <p className={cn(
            "text-accent font-display text-lg sm:text-xl italic mb-4 opacity-0 animate-fade-in-up",
            isRTL && "font-hebrew"
          )}>
            {t('hero.tagline')}
          </p>

          {/* Gold accent line */}
          <div className={cn(
            "w-16 h-1 bg-accent mb-8 opacity-0 animate-fade-in-up delay-100",
            isRTL && "mr-0 ml-auto"
          )} />

          {/* H1 - Main Title */}
          <h1 className={cn(
            "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-semibold text-primary-foreground leading-tight mb-6 opacity-0 animate-fade-in-up delay-150",
            isRTL && "font-hebrew"
          )}>
            {t('hero.title')}
          </h1>

          {/* Sub-headline Line 1 - Context */}
          <p className={cn(
            "text-xl sm:text-2xl text-primary-foreground/90 font-medium mb-4 opacity-0 animate-fade-in-up delay-200",
            isRTL && "font-hebrew"
          )}>
            {t('hero.subtitle1')}
          </p>

          {/* Sub-headline Line 2 - The Promise */}
          <p className={cn(
            "text-lg sm:text-xl text-primary-foreground/70 leading-relaxed mb-10 max-w-2xl opacity-0 animate-fade-in-up delay-250",
            isRTL && "font-hebrew"
          )}>
            {t('hero.subtitle2')}
          </p>

          <div className="opacity-0 animate-fade-in-up delay-300">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-8 py-6 text-base group"
            >
              <Link to="/contact" className="flex items-center gap-2">
                {t('hero.cta')}
                <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
