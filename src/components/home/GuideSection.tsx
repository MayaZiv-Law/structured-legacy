import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { GraduationCap, LineChart, Languages } from 'lucide-react';

const GuideSection = () => {
  const { t, isRTL } = useLanguage();

  const credentials = [
    { icon: GraduationCap, text: t('guide.credential1') },
    { icon: LineChart, text: t('guide.credential2') },
    { icon: Languages, text: t('guide.credential3') },
  ];

  return (
    <section className="py-24 gradient-stone">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn(
          "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center",
          isRTL && "lg:grid-flow-dense"
        )}>
          {/* Image */}
          <div className={cn(isRTL && "lg:col-start-2")}>
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden rounded-sm shadow-premium">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
                  alt="Maya Ziv - Attorney"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              {/* Decorative accent */}
              <div className={cn(
                "absolute -bottom-4 w-24 h-1 bg-accent",
                isRTL ? "-left-4" : "-right-4"
              )} />
            </div>
          </div>

          {/* Content */}
          <div className={cn(isRTL && "lg:col-start-1 text-right font-hebrew")}>
            <div className={cn(
              "w-12 h-0.5 bg-accent mb-6",
              isRTL && "mr-0 ml-auto"
            )} />
            
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mb-2">
              {t('guide.title')}
            </h2>
            
            <p className="text-accent font-medium mb-6">
              {t('guide.role')}
            </p>
            
            <p className="text-muted-foreground leading-relaxed mb-8">
              {t('guide.bio')}
            </p>

            {/* Credentials */}
            <div className="space-y-4">
              {credentials.map((cred, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center gap-4",
                    isRTL && "flex-row-reverse"
                  )}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <cred.icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                  </div>
                  <span className="text-foreground font-medium">{cred.text}</span>
                </div>
              ))}
            </div>

            {/* Signature */}
            <div className={cn("mt-10", isRTL && "text-right")}>
              <p className="font-display text-xl italic text-foreground">
                {isRTL ? 'מאיה זיו' : 'Maya Ziv'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuideSection;