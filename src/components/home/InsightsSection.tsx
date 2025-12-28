import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { ArrowRight, ArrowLeft, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import insightFatca from '@/assets/insight-fatca.webp';
import insightRealEstate from '@/assets/insight-real-estate.webp';
import insightEstate from '@/assets/insight-estate.webp';

const InsightsSection = () => {
  const { t, isRTL, language } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const sectionAnim = useScrollAnimation();

  const articles = [
    {
      titleKey: 'insights.article1.title',
      snippetKey: 'insights.article1.snippet',
      image: insightFatca,
      category: language === 'he' ? 'מיסוי' : 'Taxation',
      date: '2024-01-15',
    },
    {
      titleKey: 'insights.article2.title',
      snippetKey: 'insights.article2.snippet',
      image: insightRealEstate,
      category: language === 'he' ? 'נדל"ן' : 'Real Estate',
      date: '2024-01-08',
    },
    {
      titleKey: 'insights.article3.title',
      snippetKey: 'insights.article3.snippet',
      image: insightEstate,
      category: language === 'he' ? 'ירושות' : 'Estate',
      date: '2024-01-02',
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={sectionAnim.ref}
          className={cn(
            "transition-all duration-700",
            sectionAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className={cn(
            "flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4",
            isRTL && "font-hebrew"
          )}>
            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mb-2">
                {t('insights.title')}
              </h2>
            </div>
            <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Link to="/insights" className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
                {t('insights.viewAll')}
                <Arrow className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="w-16 h-0.5 bg-accent mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <article
                key={index}
                className={cn(
                  "group bg-card border border-border rounded-xl overflow-hidden hover:border-accent/50 transition-all duration-500 hover:shadow-lg",
                  isRTL && "font-hebrew text-right",
                  sectionAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: sectionAnim.isVisible ? `${index * 150}ms` : '0ms' }}
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={t(article.titleKey)}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className={cn("absolute top-4", isRTL ? "right-4" : "left-4")}>
                    <span className="bg-accent text-accent-foreground text-xs font-medium px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className={cn("flex items-center gap-2 text-muted-foreground text-sm mb-3", isRTL && "flex-row-reverse")}>
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(article.date).toLocaleDateString(language === 'he' ? 'he-IL' : 'en-US')}</span>
                  </div>
                  
                  <h3 className="text-lg font-display font-medium text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-2">
                    {t(article.titleKey)}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                    {t(article.snippetKey)}
                  </p>

                  <Link
                    to="/insights"
                    className={cn(
                      "inline-flex items-center gap-2 text-accent font-medium text-sm hover:gap-3 transition-all",
                      isRTL && "flex-row-reverse"
                    )}
                  >
                    {t('insights.readMore')}
                    <Arrow className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
