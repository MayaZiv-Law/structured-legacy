import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const InsightsSection = () => {
  const { t, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const articles = [
    {
      titleKey: 'insights.article1.title',
      snippetKey: 'insights.article1.snippet',
    },
    {
      titleKey: 'insights.article2.title',
      snippetKey: 'insights.article2.snippet',
    },
    {
      titleKey: 'insights.article3.title',
      snippetKey: 'insights.article3.snippet',
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
                "group bg-card border border-border rounded-sm p-6 hover:border-accent/50 transition-colors duration-300",
                isRTL && "font-hebrew text-right"
              )}
            >
              <h3 className="text-lg font-display font-medium text-foreground mb-4 group-hover:text-accent transition-colors">
                {t(article.titleKey)}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
