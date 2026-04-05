import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const introText = {
  en: 'In an ever changing world, the firm is a dedicated partner to its clients, providing legal counsel shaped by global perspective.',
  he: 'בעולם המשתנה ללא הרף, המשרד פועל כשותף מסור ללקוחותיו, ומספק ליווי ויעוץ משפטי המעוגן בפרספקטיבה גלובלית.'
};

const IntroSection = () => {
  const { language, isRTL } = useLanguage();

  return (
    <section className="pt-20 sm:pt-24 lg:pt-28 pb-4 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn("max-w-3xl mx-auto", isRTL && "font-hebrew text-right")}>
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground" style={{ lineHeight: 1.8 }}>
            {introText[language]}
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
