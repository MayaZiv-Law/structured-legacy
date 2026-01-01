import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { ArrowRight, ArrowLeft } from 'lucide-react';
const CTASection = () => {
  const {
    t,
    isRTL
  } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  return <section className="py-24 bg-[#faf8f5]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn("max-w-3xl mx-auto text-center", isRTL && "font-hebrew")}>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-8" />
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold mb-6 text-primary">
            {t('cta.title')}
          </h2>
          
          <p className="text-lg mb-10 max-w-xl mx-auto text-primary">
            {t('cta.subtitle')}
          </p>

          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-10 py-6 text-base group">
            <Link to="/contact" className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
              {t('cta.button')}
              <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>;
};
export default CTASection;