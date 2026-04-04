import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const IntroSection = () => {
  const { t, isRTL } = useLanguage();

  // Split the paragraph at periods, keeping each sentence on its own line
  const rawText = t('hero.subtitle1');
  const sentences = rawText
    .split('.')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  return (
    <section className="pt-20 sm:pt-24 lg:pt-28 pb-6 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn("max-w-3xl mx-auto", isRTL && "font-hebrew text-right")}>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground" style={{ lineHeight: 1.8 }}>
            {sentences.map((sentence, i) => (
              <span key={i}>
                {sentence}.
                {i < sentences.length - 1 && <><br /><br /></>}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
