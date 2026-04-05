import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalePath } from '@/hooks/useLocalePath';
import { cn } from '@/lib/utils';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const GuideSection = () => {
  const { t, isRTL } = useLanguage();
  const localePath = useLocalePath();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="py-6 lg:py-8 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className={cn("bg-secondary/50 p-8 sm:p-10 lg:py-10 lg:px-10", isRTL && "text-right font-hebrew")}>
            <blockquote className={cn(
              "text-foreground font-medium text-lg sm:text-xl italic",
              isRTL ? "border-r-2 border-accent pr-4" : "border-l-2 border-accent pl-4"
            )}>
              "{t('guide.punchline')}"
            </blockquote>
            <Link
              to={localePath('/about')}
              className={cn(
                "inline-flex items-center gap-2 mt-6 text-accent hover:text-accent/80 font-medium transition-colors",
                isRTL && "flex-row-reverse font-hebrew"
              )}
            >
              {t('guide.cta')}
              <Arrow className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuideSection;
