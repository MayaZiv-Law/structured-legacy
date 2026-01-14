import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { ArrowRight, ArrowLeft } from 'lucide-react';
const GuideSection = () => {
  const {
    t,
    isRTL
  } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  return <section className="py-12 lg:py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Title */}
        <div className={cn("text-center mb-8 lg:mb-12", isRTL && "font-hebrew")}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-foreground">
            {t('guide.title')}
          </h2>
        </div>

        {/* Mobile Layout: Image first, then text */}
        <div className="lg:hidden flex flex-col items-center">
          {/* Image - Mobile */}
          <div className="w-[85%] relative z-10">
            <img 
              alt="Maya Ziv - Attorney" 
              className="w-full h-auto object-cover object-top" 
              src="/lovable-uploads/a50b3ae0-2451-4322-bcc9-b89b82add8d4.webp"
              loading="lazy"
              decoding="async"
              width={565}
              height={565}
            />
          </div>

          {/* Text Content - Mobile (centered, with negative margin to overlap) */}
          <div className={cn("text-center px-6 pt-10 -mt-6 bg-background relative", isRTL && "font-hebrew")}>
            <p className="text-muted-foreground leading-relaxed mb-5 text-xl">
              {t('guide.bio')}
            </p>

            {/* Punchline */}
            <p className="text-foreground font-medium text-xl italic mb-6">
              {t('guide.punchline')}
            </p>

            {/* CTA Link */}
            <Link to="/about" className={cn("inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all text-xl", isRTL && "flex-row-reverse")}>
              {t('guide.cta')}
              <Arrow className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Desktop Layout: Asymmetric with offset */}
        <div className="hidden lg:block relative max-w-6xl mx-auto mb-8">
          {/* Content Card */}
          <div className={cn("relative z-10 lg:w-[55%]", isRTL ? "lg:ml-auto" : "lg:mr-auto")}>
            <div className={cn("bg-secondary/50 p-8 sm:p-10 lg:py-12 lg:px-10", isRTL && "text-right font-hebrew")}>
              <p className="text-muted-foreground leading-relaxed mb-5 text-xl">
                {t('guide.bio')}
              </p>

              {/* Punchline */}
              <p className={cn("text-foreground font-medium text-xl italic", isRTL ? "border-r-2 border-accent pr-4" : "border-l-2 border-accent pl-4")}>
                {t('guide.punchline')}
              </p>
            </div>
          </div>

          {/* Image - Positioned to touch the card */}
          <div className={cn("lg:absolute lg:top-10 lg:w-[48%] lg:h-[calc(100%+2rem)] z-20", isRTL ? "lg:left-0" : "lg:right-0")}>
            <div className="h-full min-h-[350px] lg:min-h-full">
              <img 
                src="/lovable-uploads/a50b3ae0-2451-4322-bcc9-b89b82add8d4.webp" 
                alt="Maya Ziv - Attorney" 
                className="w-full h-full object-cover object-top"
                loading="lazy"
                decoding="async"
                width={565}
                height={565}
              />
            </div>
          </div>
        </div>

        {/* Centered CTA Link - Desktop only */}
        <div className="hidden lg:block text-center mt-16">
          <Link to="/about" className={cn("inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all text-xl", isRTL && "flex-row-reverse")}>
            {t('guide.cta')}
            <Arrow className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>;
};
export default GuideSection;