import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalePath } from '@/hooks/useLocalePath';
import { cn } from '@/lib/utils';
import { ArrowRight, ArrowLeft } from 'lucide-react';
const CTASection = () => {
  const {
    t,
    isRTL
  } = useLanguage();
  const localePath = useLocalePath();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  return <section className="py-12 bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn("max-w-3xl mx-auto text-center", isRTL && "font-hebrew")}>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold mb-5 text-primary-foreground">
            {t('cta.title')}
          </h2>

          <p className="text-xl mb-8 max-w-xl mx-auto text-primary-foreground/80">
            {t('cta.subtitle')}
          </p>

          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-4 sm:px-6 lg:px-10 py-4 sm:py-6 text-base group max-w-full">
            <Link to={localePath('/contact')} className={cn("flex items-center gap-2 whitespace-normal text-sm sm:text-base text-center", isRTL && "flex-row-reverse")}>
              {t('cta.button')}
              <Arrow className={cn("h-4 w-4 flex-shrink-0 transition-transform", isRTL ? "group-hover:-translate-x-1" : "group-hover:translate-x-1")} />
            </Link>
          </Button>
        </div>
      </div>
    </section>;
};
export default CTASection;
