import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import mayaPortrait from '@/assets/maya-portrait.webp';

const GuideSection = () => {
  const { t, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Title */}
        <div className={cn("text-center mb-16", isRTL && "font-hebrew")}>
          <h2 className="text-4xl sm:text-5xl font-display font-semibold text-foreground">
            {t('guide.title')}
          </h2>
        </div>

        {/* Asymmetric Two Column Layout */}
        <div className="relative max-w-6xl mx-auto mb-8">
          {/* Content Card */}
          <div className={cn(
            "relative z-10 lg:w-[55%]",
            isRTL ? "lg:ml-auto" : "lg:mr-auto"
          )}>
            <div className={cn(
              "bg-secondary/50 p-8 sm:p-12 lg:py-16 lg:px-12",
              isRTL && "text-right font-hebrew"
            )}>
              <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                {t('guide.bio')}
              </p>

              {/* Punchline */}
              <p className={cn(
                "text-foreground font-medium text-lg italic",
                isRTL ? "border-r-2 border-accent pr-4" : "border-l-2 border-accent pl-4"
              )}>
                {t('guide.punchline')}
              </p>
            </div>
          </div>

          {/* Image - Positioned to touch the card */}
          <div className={cn(
            "lg:absolute lg:top-10 lg:w-[48%] lg:h-[calc(100%+2rem)]",
            isRTL ? "lg:left-0" : "lg:right-0",
            "mt-0 lg:mt-0"
          )}>
            <div className="h-full min-h-[350px] lg:min-h-full">
              <img
                src={mayaPortrait}
                alt="Maya Ziv - Attorney"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>

        {/* Centered CTA Link */}
        <div className="text-center mt-16">
          <Link
            to="/about"
            className={cn(
              "inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all text-lg",
              isRTL && "flex-row-reverse"
            )}
          >
            {t('guide.cta')}
            <Arrow className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GuideSection;
