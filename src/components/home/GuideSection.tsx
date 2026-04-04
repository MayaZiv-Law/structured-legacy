import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const GuideSection = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-8 lg:py-10 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className={cn("bg-secondary/50 p-8 sm:p-10 lg:py-10 lg:px-10", isRTL && "text-right font-hebrew")}>
            <blockquote className={cn(
              "text-foreground font-medium text-lg sm:text-xl italic",
              isRTL ? "border-r-2 border-accent pr-4" : "border-l-2 border-accent pl-4"
            )}>
              "{t('guide.punchline')}"
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuideSection;
