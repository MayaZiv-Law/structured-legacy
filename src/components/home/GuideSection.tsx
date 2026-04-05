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
        {/* Title - only render if not empty */}
        {t('guide.title') && (
          <div className={cn("text-center mb-8 lg:mb-12", isRTL && "font-hebrew")}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-foreground">
              {t('guide.title')}
            </h2>
          </div>
        )}

        {/* Mobile Layout */}
        <div className="lg:hidden flex flex-col items-center">
          {/* Text Content - Mobile */}
          <div className={cn("text-center px-6 pt-10 bg-background relative", isRTL && "font-hebrew")}>
            {t('guide.bio') && (
              <p className="text-muted-foreground leading-relaxed mb-5 text-base sm:text-lg lg:text-xl">
                {t('guide.bio')}
              </p>
            )}

            {/* Punchline */}
            <p className="text-foreground font-medium text-lg sm:text-xl italic mb-6">
              {t('guide.punchline')}
            </p>

            {/* CTA Link */}
            <Link to={localePath('/about')} className={cn("inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all text-xl", isRTL && "flex-row-reverse")}>
              {t('guide.cta')}
              <Arrow className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Desktop Layout: Centered */}
        <div className="hidden lg:block max-w-3xl mx-auto mb-8">
          <div>
            <div className={cn("bg-secondary/50 p-8 sm:p-10 lg:py-12 lg:px-10", isRTL && "text-right font-hebrew")}>
              {t('guide.bio') && (
                <p className="text-muted-foreground leading-relaxed mb-5 text-lg lg:text-xl">
                  {t('guide.bio')}
                </p>
              )}

              {/* Punchline */}
              <p className={cn("text-foreground font-medium text-lg sm:text-xl italic mb-6", isRTL ? "border-r-2 border-accent pr-4" : "border-l-2 border-accent pl-4")}>
                {t('guide.punchline')}
              </p>

              {/* CTA Link - inside the card so it never gets cut off */}
              <Link to={localePath('/about')} className={cn("inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all text-xl", isRTL && "flex-row-reverse")}>
                {t('guide.cta')}
                <Arrow className="h-5 w-5" />
              </Link>
            </div>
          </div>

        </div>

        {/* No separate CTA link needed - it's inside the card now */}
      </div>
    </section>;
};
export default GuideSection;
