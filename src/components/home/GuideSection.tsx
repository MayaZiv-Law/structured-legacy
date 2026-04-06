import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalePath } from '@/hooks/useLocalePath';
import { cn } from '@/lib/utils';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const GuideSection = () => {
  const {
    t,
    isRTL
  } = useLanguage();
  const localePath = useLocalePath();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const anim = useScrollAnimation(0.15);

  return <section aria-label="About the Firm" className="section-spacer-sm bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div
            ref={anim.ref}
            className={cn(
              "bg-secondary/40 p-6 sm:p-8 lg:py-10 lg:px-10 transition-all duration-700",
              isRTL && "text-right font-hebrew",
              anim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            <p className={cn(
              "text-foreground font-medium text-fluid-lg italic mb-6 leading-relaxed",
              isRTL ? "border-r-2 border-accent pr-5" : "border-l-2 border-accent pl-5"
            )}>
              {t('guide.punchline')}
            </p>
            <div className={cn(isRTL ? "pr-5" : "pl-5")}>
              <Link
                to={localePath('/about')}
                className={cn(
                  "inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all text-fluid-base group",
                  isRTL && "flex-row-reverse"
                )}
              >
                <span className="border-b border-accent/0 group-hover:border-accent/60 transition-colors pb-0.5">
                  {t('guide.cta')}
                </span>
                <Arrow className={cn("h-5 w-5 transition-transform", isRTL ? "group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5")} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default GuideSection;
