import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const GuideSection = () => {
  const { t, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

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
            
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mb-6">
              {t('guide.title')}
            </h2>
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              {t('guide.bio')}
            </p>

            {/* Punchline */}
            <p className="text-foreground font-medium text-lg italic border-l-2 border-accent pl-4 mb-8">
              {t('guide.punchline')}
            </p>

            {/* CTA Link */}
            <Link
              to="/about"
              className={cn(
                "inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all",
                isRTL && "flex-row-reverse"
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
