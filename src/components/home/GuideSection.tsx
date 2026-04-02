import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalePath } from '@/hooks/useLocalePath';
import { cn } from '@/lib/utils';
import { ArrowRight, ArrowLeft } from 'lucide-react';
const GuideSection = () => {
  const {
    t,
    isRTL
  } = useLanguage();
  const localePath = useLocalePath();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  return <section className="py-12 lg:py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Title */}
        <div className={cn("text-center mb-8 lg:mb-12", isRTL && "font-hebrew")}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-foreground">
            {t('guide.title')}
          </h2>
        </div>

        {/* Single layout that adapts: stacked on mobile, side-by-side on desktop */}
        <div className={cn("flex flex-col lg:grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto mb-8 items-center")}>
          {/* Image */}
          <div className={cn("w-[85%] mx-auto lg:w-full", isRTL ? "lg:order-1" : "lg:order-2")}>
            <div className="lg:aspect-[3/4] overflow-hidden">
              <img
                src="/lovable-uploads/a50b3ae0-2451-4322-bcc9-b89b82add8d4.webp"
                alt="Maya Ziv - Attorney"
                className="w-full h-auto lg:h-full object-cover object-top"
                loading="lazy"
                decoding="async"
                width={565}
                height={565}
              />
            </div>
          </div>

          {/* Content */}
          <div className={cn(isRTL ? "lg:order-2" : "lg:order-1")}>
            <div className={cn("text-center lg:text-left px-6 lg:px-0 pt-10 lg:pt-0 -mt-6 lg:mt-0 bg-background lg:bg-secondary/50 relative lg:p-8 lg:sm:p-10 lg:py-12 lg:px-10", isRTL && "font-hebrew lg:text-right")}>
              <p className="text-muted-foreground leading-relaxed mb-5 text-base sm:text-lg lg:text-xl">
                {t('guide.bio')}
              </p>

              {/* Punchline */}
              <p className={cn("text-foreground font-medium text-lg sm:text-xl italic mb-6", isRTL ? "lg:border-r-2 lg:border-accent lg:pr-4" : "lg:border-l-2 lg:border-accent lg:pl-4")}>
                {t('guide.punchline')}
              </p>

              {/* CTA Link */}
              <Link to={localePath('/about')} className={cn("inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all text-xl", isRTL && "flex-row-reverse")}>
                {t('guide.cta')}
                <Arrow className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default GuideSection;
