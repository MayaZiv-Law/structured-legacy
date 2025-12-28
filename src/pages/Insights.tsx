import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Calendar, ArrowRight } from 'lucide-react';
import CTASection from '@/components/home/CTASection';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import insightFatca from '@/assets/insight-fatca.webp';
import insightRealEstate from '@/assets/insight-real-estate.webp';
import insightEstate from '@/assets/insight-estate.webp';

const Insights = () => {
  const { t, isRTL, language } = useLanguage();
  
  const heroAnim = useScrollAnimation();
  const philosophyAnim = useScrollAnimation();
  const articlesAnim = useScrollAnimation();

  const articles = [
    { slug: 'buying-property-foreign-resident', title: language === 'he' ? 'רכישת נכס בישראל כתושב חוץ: יסודות משפטיים ומיסויים' : 'Buying Property in Israel as a Foreign Resident: Legal and Tax Essentials', excerpt: language === 'he' ? 'הבנת חובות הדיווח כאמריקאי בישראל.' : 'Understanding reporting obligations as a US person in Israel.', date: '2024-01-15', category: language === 'he' ? 'מיסוי' : 'Taxation', image: insightFatca },
    { slug: 'domestic-buyers-legal-checks', title: language === 'he' ? 'רכישת נכס בישראל: בדיקות משפטיות חיוניות לקונים מקומיים' : 'Buying Property in Israel: Essential Legal Checks for Domestic Buyers', excerpt: language === 'he' ? 'שלבים חיוניים לפני רכישת נכס.' : 'Essential steps before property purchase.', date: '2024-01-08', category: language === 'he' ? 'נדל"ן' : 'Real Estate', image: insightRealEstate },
    { slug: 'wills-inheritance-cross-border', title: language === 'he' ? 'צוואות וירושה בישראל: הבטחת תוקף חוצה גבולות' : 'Wills and Inheritance in Israel: Ensuring Cross-Border Validity', excerpt: language === 'he' ? 'הבטחת תוקף צוואה בכמה מדינות.' : 'Ensuring will validity across jurisdictions.', date: '2024-01-02', category: language === 'he' ? 'ירושות' : 'Estate', image: insightEstate },
  ];

  return (
    <Layout>
      <section className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={heroAnim.ref} className={cn("max-w-4xl transition-all duration-700", isRTL && "font-hebrew text-right mr-auto", heroAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <div className="w-16 h-1 bg-accent mb-8" />
            <h1 className="text-4xl sm:text-5xl font-display font-semibold text-foreground mb-6">{language === 'he' ? 'תובנות משפטיות ופרשנות אסטרטגית' : 'Legal Insights & Strategic Commentary'}</h1>
            <p className="text-xl text-muted-foreground">{language === 'he' ? 'הנחיות מעשיות בנושאי נדל"ן בישראל, מיסוי חוצה גבולות, ציות ותכנון מורשת.' : 'Practical guidance on Israeli real estate, cross-border taxation, compliance, and legacy planning.'}</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={philosophyAnim.ref} className={cn("max-w-3xl mx-auto transition-all duration-700", isRTL && "font-hebrew text-right", philosophyAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mb-6">{language === 'he' ? 'בהירות להחלטות חוצות גבולות' : 'Clarity for Cross-Border Decisions'}</h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>{language === 'he' ? 'ההחלטות החשובות ביותר בישראל מעוצבות לעתים קרובות על ידי תיעוד, תזמון ופרשנות רגולטורית—במיוחד כאשר נכסים, תושבות או מוטבים משתרעים על פני מספר תחומי שיפוט.' : "The decisions that matter most in Israel are often shaped by documentation, timing, and regulatory interpretation—especially when assets, residency, or beneficiaries span multiple jurisdictions."}</p>
              <p>{language === 'he' ? 'התובנות שלנו נכתבות להיות מעשיות: הסברים מובנים, שיקולים מרכזיים ומלכודות נפוצות לסימון מוקדם. המטרה היא לעזור לכם לשאול שאלות טובות יותר ולהבין את המפה המשפטית לפני התחייבות לעסקה.' : 'Our insights are written to be practical: structured explanations, key considerations, and common pitfalls to flag early. The goal is to help you ask better questions and understand the legal roadmap before committing to a transaction.'}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 gradient-stone">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={articlesAnim.ref} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, i) => (
              <Link to={`/insights/${article.slug}`} key={i} className={cn("group bg-card border border-border rounded-xl overflow-hidden hover:border-accent/50 transition-all hover:shadow-lg block duration-500", isRTL && "font-hebrew text-right", articlesAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")} style={{ transitionDelay: articlesAnim.isVisible ? `${i * 150}ms` : '0ms' }}>
                <div className="relative h-52 overflow-hidden">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute top-4 left-4"><span className="bg-accent text-accent-foreground text-xs font-medium px-3 py-1 rounded-full">{article.category}</span></div>
                </div>
                <div className="p-6">
                  <div className={cn("flex items-center gap-2 text-muted-foreground text-sm mb-3", isRTL && "flex-row-reverse")}>
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(article.date).toLocaleDateString(language === 'he' ? 'he-IL' : 'en-US')}</span>
                  </div>
                  <h3 className="text-lg font-display font-medium text-foreground mb-3 line-clamp-2">{article.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                  <span className={cn("flex items-center gap-2 text-accent font-medium text-sm group-hover:gap-3 transition-all", isRTL && "flex-row-reverse")}>
                    {t('insights.readMore')}
                    <ArrowRight className={cn("h-4 w-4", isRTL && "rotate-180")} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </Layout>
  );
};

export default Insights;
