import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Calendar, ArrowRight } from 'lucide-react';
import CTASection from '@/components/home/CTASection';
import insightFatca from '@/assets/insight-fatca.webp';
import insightRealEstate from '@/assets/insight-real-estate.webp';
import insightEstate from '@/assets/insight-estate.webp';

const Insights = () => {
  const { t, isRTL, language } = useLanguage();
  const articles = [
    { 
      title: language === 'he' ? 'השלכות FATCA על עולים חדשים' : 'FATCA Implications for New Immigrants', 
      excerpt: language === 'he' ? 'הבנת חובות הדיווח כאמריקאי בישראל.' : 'Understanding reporting obligations as a US person in Israel.', 
      date: '2024-01-15', 
      category: language === 'he' ? 'מיסוי' : 'Taxation',
      image: insightFatca
    },
    { 
      title: language === 'he' ? 'בדיקת נאותות בנדל"ן' : 'Real Estate Due Diligence', 
      excerpt: language === 'he' ? 'שלבים חיוניים לפני רכישת נכס.' : 'Essential steps before property purchase.', 
      date: '2024-01-08', 
      category: language === 'he' ? 'נדל"ן' : 'Real Estate',
      image: insightRealEstate
    },
    { 
      title: language === 'he' ? 'תכנון עיזבון חוצה גבולות' : 'Cross-Border Estate Planning', 
      excerpt: language === 'he' ? 'הבטחת תוקף צוואה בכמה מדינות.' : 'Ensuring will validity across jurisdictions.', 
      date: '2024-01-02', 
      category: language === 'he' ? 'ירושות' : 'Estate',
      image: insightEstate
    },
  ];

  return (
    <Layout>
      <section className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("max-w-4xl", isRTL && "font-hebrew text-right mr-auto")}>
            <div className="w-16 h-1 bg-accent mb-8" />
            <h1 className="text-4xl sm:text-5xl font-display font-semibold text-foreground mb-6">{t('insights.title')}</h1>
            <p className="text-xl text-muted-foreground">{t('insights.subtitle')}</p>
          </div>
        </div>
      </section>
      <section className="py-16 gradient-stone">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, i) => (
              <article 
                key={i} 
                className={cn(
                  "group bg-card border border-border rounded-xl overflow-hidden hover:border-accent/50 transition-all hover:shadow-lg",
                  isRTL && "font-hebrew text-right"
                )}
              >
                {/* Image Container */}
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
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
                  <h3 className="text-lg font-display font-medium text-foreground mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <button className={cn(
                    "flex items-center gap-2 text-accent font-medium text-sm hover:gap-3 transition-all",
                    isRTL && "flex-row-reverse"
                  )}>
                    {t('insights.readMore')}
                    <ArrowRight className={cn("h-4 w-4", isRTL && "rotate-180")} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </Layout>
  );
};

export default Insights;
