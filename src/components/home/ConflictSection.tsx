import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
const ConflictSection = () => {
  const {
    t,
    isRTL
  } = useLanguage();
  return <section className="relative z-0 pt-40 sm:pt-48 pb-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn("max-w-4xl mx-auto", isRTL && "font-hebrew text-right")}>
          {/* Title */}
          <h2 className="text-4xl sm:text-5xl font-display font-semibold text-foreground mb-6">
            {t('conflict.title')}
          </h2>
          <div className={cn("w-16 h-0.5 bg-accent mb-8", isRTL && "mr-0 ml-auto")} />

          {/* Body Paragraphs */}
          <div className="space-y-5">
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('conflict.body')}
            </p>
            
          </div>
        </div>
      </div>
    </section>;
};
export default ConflictSection;