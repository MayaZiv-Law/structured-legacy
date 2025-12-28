import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { ArrowRight, ArrowLeft, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const InsightsSection = () => {
  const { t, isRTL, language } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const articles = [
    {
      title: language === 'he' 
        ? 'השלכות FATCA על עולים חדשים: מה שצריך לדעת' 
        : 'FATCA Implications for New Immigrants: What You Need to Know',
      excerpt: language === 'he'
        ? 'הבנת חובות הדיווח שלך כאמריקאי המתגורר בישראל ואיך להישאר תואם.'
        : 'Understanding your reporting obligations as a U.S. person residing in Israel and how to stay compliant.',
      date: '2024-01-15',
      category: language === 'he' ? 'מיסוי' : 'Taxation',
    },
    {
      title: language === 'he'
        ? 'בדיקת נאותות בנדל"ן ישראלי: רשימת בדיקה מלאה'
        : 'Due Diligence in Israeli Real Estate: A Complete Checklist',
      excerpt: language === 'he'
        ? 'שלבים חיוניים לפני רכישת נכס בישראל כתושב חוץ.'
        : 'Essential steps before purchasing property in Israel as a foreign resident.',
      date: '2024-01-08',
      category: language === 'he' ? 'נדל"ן' : 'Real Estate',
    },
    {
      title: language === 'he'
        ? 'תכנון עיזבון חוצה גבולות: הגנה על המורשת שלך'
        : 'Cross-Border Estate Planning: Protecting Your Legacy',
      excerpt: language === 'he'
        ? 'איך להבטיח שהצוואה שלך תקפה בין תחומי שיפוט מרובים.'
        : 'How to ensure your will is valid across multiple jurisdictions.',
      date: '2024-01-02',
      category: language === 'he' ? 'ירושות' : 'Estate',
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
            <p className="text-muted-foreground">
              {t('insights.subtitle')}
            </p>
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
              <div className={cn("flex items-center gap-2 text-muted-foreground text-sm mb-4", isRTL && "flex-row-reverse")}>
                <Calendar className="h-4 w-4" />
                <span>{new Date(article.date).toLocaleDateString(language === 'he' ? 'he-IL' : 'en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
                <span className="mx-2">•</span>
                <span className="text-accent">{article.category}</span>
              </div>

              <h3 className="text-lg font-display font-medium text-foreground mb-3 group-hover:text-accent transition-colors">
                {article.title}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {article.excerpt}
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