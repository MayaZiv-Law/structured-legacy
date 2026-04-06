import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalePath } from '@/hooks/useLocalePath';
import { cn } from '@/lib/utils';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const CTASection = () => {
  const {
    t,
    isRTL
  } = useLanguage();
  const localePath = useLocalePath();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const anim = useScrollAnimation(0.15);

  return <section aria-label="Contact" className="section-spacer-lg bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={anim.ref}
          className={cn("max-w-3xl mx-auto text-center", isRTL && "font-hebrew")}
        >
          {/* Animated gold rule */}
          <div className={cn(
            "w-12 h-[2px] bg-accent mx-auto mb-8 origin-center",
            anim.isVisible ? "animate-line-grow" : "scale-x-0"
          )} />

          <h2 className={cn(
            "text-fluid-4xl font-display font-semibold mb-6 text-primary-foreground transition-all duration-700",
            anim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}>
            {t('cta.title')}
          </h2>

          <p className={cn(
            "text-fluid-lg mb-8 max-w-xl mx-auto text-primary-foreground/75 leading-relaxed transition-all duration-700 delay-150",
            anim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            {t('cta.subtitle')}
          </p>

          <div className={cn(
            "transition-all duration-700 delay-300",
            anim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-6 sm:px-8 lg:px-12 py-5 sm:py-6 text-base group max-w-full transition-shadow hover:shadow-premium">
              <Link to={localePath('/contact')} className={cn("flex items-center gap-2 whitespace-normal text-sm sm:text-base text-center", isRTL && "flex-row-reverse")}>
                {t('cta.button')}
                <Arrow className={cn("h-4 w-4 flex-shrink-0 transition-transform duration-300", isRTL ? "group-hover:-translate-x-1" : "group-hover:translate-x-1")} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default CTASection;
