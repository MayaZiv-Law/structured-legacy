import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Calendar, ArrowLeft, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import insightFatca from '@/assets/insight-fatca.webp';
import insightRealEstate from '@/assets/insight-real-estate.webp';
import insightEstate from '@/assets/insight-estate.webp';

interface ArticleData {
  slug: string;
  title: { en: string; he: string };
  excerpt: { en: string; he: string };
  category: { en: string; he: string };
  date: string;
  readTime: { en: string; he: string };
  author: { en: string; he: string };
  image: string;
  content: { en: string[]; he: string[] };
}

const articlesData: ArticleData[] = [
  {
    slug: 'buying-property-foreign-resident',
    title: {
      en: 'Buying Property in Israel as a Foreign Resident Legal and Tax Essentials',
      he: 'רכישת נכס בישראל כתושב חוץ: יסודות משפטיים ומיסויים'
    },
    excerpt: {
      en: 'Navigating Purchase Tax, AML compliance, and secure registration for cross-border acquisitions.',
      he: 'ניווט במס רכישה, ציות להלבנת הון ורישום מאובטח לרכישות חוצות גבולות.'
    },
    category: { en: 'Real Estate', he: 'נדל"ן' },
    date: '2024-01-15',
    readTime: { en: '8 min read', he: '8 דקות קריאה' },
    author: { en: 'Maya Ziv, Attorney & Notary', he: 'עו"ד ונוטריון מאיה זיו' },
    image: insightFatca,
    content: {
      en: [
        'Real estate investment in Israel attracts international interest and requires clear understanding of local legal and tax frameworks. Foreign residents must complete structured due diligence to ensure lawful and secure ownership.',
        '## Legal Framework',
        'Property ownership is regulated by statutory law and the Israel Land Authority. Foreign residents may purchase property under defined conditions subject to approvals based on location and classification.',
        'Due diligence includes title verification, planning status, and confirmation of no encumbrances.',
        '## Purchase Tax and Financial Structuring',
        'Foreign residents generally pay higher purchase tax rates.',
        'New immigrants and returning residents may qualify for reduced brackets. Early structuring prevents unnecessary exposure and supports regulatory compliance.',
        '## Registration and Contractual Process',
        'Ownership transfer must be registered with the Land Registry.',
        'This requires coordination, drafting tax clearance, and verification of title. Each step ensures enforceable and accurate registration.',
        '## Cross Border Considerations',
        'Investors often maintain financial or familial ties abroad.',
        'Aligning Israeli and foreign reporting reduces double taxation and enhances regulatory transparency.',
        '## Conclusion',
        'Foreign residents benefit from structured legal and tax planning ensuring secure and compliant property acquisition.'
      ],
      he: [
        'השקעות נדל"ן בישראל מושכות עניין בינלאומי ודורשות הבנה ברורה של המסגרות המשפטיות והמיסויות המקומיות. תושבי חוץ חייבים להשלים בדיקת נאותות מובנית כדי להבטיח בעלות חוקית ומאובטחת.',
        '## מסגרת משפטית',
        'בעלות על נכסים מוסדרת על ידי החוק ומינהל מקרקעי ישראל. תושבי חוץ יכולים לרכוש נכס בתנאים מוגדרים בכפוף לאישורים על בסיס מיקום וסיווג.',
        'בדיקת נאותות כוללת אימות בעלות, מצב תכנוני ואישור שאין שעבודים.',
        '## מס רכישה ומבנה פיננסי',
        'תושבי חוץ משלמים בדרך כלל שיעורי מס רכישה גבוהים יותר.',
        'עולים חדשים ותושבים חוזרים עשויים להיות זכאים למדרגות מופחתות. מבנה מוקדם מונע חשיפה מיותרת ותומך בציות לרגולציה.',
        '## רישום ותהליך חוזי',
        'העברת בעלות חייבת להירשם בלשכת רישום המקרקעין.',
        'זה דורש תיאום, ניסוח אישור מס ואימות בעלות. כל שלב מבטיח רישום אכיף ומדויק.',
        '## שיקולים חוצי גבולות',
        'משקיעים שומרים לעיתים קרובות על קשרים פיננסיים או משפחתיים בחו"ל.',
        'התאמת דיווח ישראלי וזר מפחיתה מיסוי כפול ומשפרת שקיפות רגולטורית.',
        '## סיכום',
        'תושבי חוץ נהנים מתכנון משפטי ומיסויי מובנה המבטיח רכישת נכס מאובטחת ותואמת.'
      ]
    }
  },
  {
    slug: 'wills-inheritance-cross-border',
    title: {
      en: 'Wills and Inheritance in Israel Ensuring Cross Border Validity',
      he: 'צוואות וירושה בישראל: הבטחת תוקף חוצה גבולות'
    },
    excerpt: {
      en: 'Efficient estate transfer through harmonized Israeli and foreign Wills.',
      he: 'העברת עיזבון יעילה באמצעות הרמוניזציה של צוואות ישראליות וזרות.'
    },
    category: { en: 'Estate Planning', he: 'תכנון עיזבון' },
    date: '2024-01-08',
    readTime: { en: '7 min read', he: '7 דקות קריאה' },
    author: { en: 'Maya Ziv, Attorney & Notary', he: 'עו"ד ונוטריון מאיה זיו' },
    image: insightEstate,
    content: {
      en: [
        'Inheritance matters involving Israeli assets often span multiple jurisdictions. Cross border planning ensures enforceability and prevents disputes.',
        '## Legal Context and Jurisdiction',
        'Israeli inheritance law applies to Israeli based assets regardless of nationality. Foreign wills may require separate probate in Israel.',
        'Understanding interaction between systems ensures full enforceability.',
        '## Drafting and Coordination',
        'Israeli assets must be addressed under the Inheritance Law of 1965. Complementary Israeli wills avoid conflict with foreign wills.',
        'Coordinated drafting provides clarity and compliance.',
        '## Tax and Reporting Implications',
        'Cross border inheritance may trigger tax reporting obligations in multiple countries. Aligned probate and reporting minimize double taxation.',
        'Accurate valuation and documentation support smooth proceedings.',
        '## Cross Border Family Structures',
        'Dual citizenship international family arrangements and multijurisdictional assets require coordinated planning.',
        '## Conclusion',
        'Strategic coordination protects beneficiaries and provides clarity across all jurisdictions.'
      ],
      he: [
        'עניינים בירושה הכוללים נכסים ישראליים משתרעים לעיתים קרובות על פני מספר תחומי שיפוט. תכנון חוצה גבולות מבטיח אכיפות ומונע סכסוכים.',
        '## הקשר משפטי וסמכות שיפוט',
        'דיני הירושה הישראליים חלים על נכסים בישראל ללא קשר לאזרחות. צוואות זרות עשויות לדרוש פרובייט נפרד בישראל.',
        'הבנת האינטראקציה בין המערכות מבטיחה אכיפות מלאה.',
        '## ניסוח ותיאום',
        'יש להתייחס לנכסים ישראליים על פי חוק הירושה משנת 1965. צוואות ישראליות משלימות מונעות סתירה עם צוואות זרות.',
        'ניסוח מתואם מספק בהירות וציות.',
        '## השלכות מס ודיווח',
        'ירושה חוצה גבולות עשויה להפעיל חובות דיווח מס במספר מדינות. פרובייט ודיווח מתואמים ממזערים מיסוי כפול.',
        'הערכה ותיעוד מדויקים תומכים בהליכים חלקים.',
        '## מבני משפחה חוצי גבולות',
        'אזרחות כפולה, הסדרים משפחתיים בינלאומיים ונכסים בריבוי תחומי שיפוט דורשים תכנון מתואם.',
        '## סיכום',
        'תיאום אסטרטגי מגן על מוטבים ומספק בהירות בכל תחומי השיפוט.'
      ]
    }
  },
  {
    slug: 'domestic-buyers-legal-checks',
    title: {
      en: 'Buying Property in Israel Essential Legal Checks for Domestic Buyers',
      he: 'רכישת נכס בישראל: בדיקות משפטיות חיוניות לקונים מקומיים'
    },
    excerpt: {
      en: 'Risk management and due diligence for local property transactions.',
      he: 'ניהול סיכונים ובדיקת נאותות לעסקאות נדל"ן מקומיות.'
    },
    category: { en: 'Real Estate', he: 'נדל"ן' },
    date: '2024-01-02',
    readTime: { en: '6 min read', he: '6 דקות קריאה' },
    author: { en: 'Maya Ziv, Attorney & Notary', he: 'עו"ד ונוטריון מאיה זיו' },
    image: insightRealEstate,
    content: {
      en: [
        'Domestic buyers must complete comprehensive legal due diligence before committing to a property purchase.',
        '## Legal Due Diligence',
        'Verification of title encumbrances planning status municipal approvals and absence of building violations.',
        '## Structuring the Transaction',
        'Clear payment schedules, protective clauses, and financing alignment ensure secure execution.',
        '## Contractual Safeguards',
        'Accurate property description disclosure of regulatory and municipal matters coordination of timelines and proper handling of lien removals.',
        '## Tax and Financial Considerations',
        'Domestic buyers must review purchase tax brackets available exemptions and documentation requirements.',
        '## Conclusion',
        'Structured planning and legal oversight ensure a compliant transparent and secure domestic purchase.'
      ],
      he: [
        'קונים מקומיים חייבים להשלים בדיקת נאותות משפטית מקיפה לפני התחייבות לרכישת נכס.',
        '## בדיקת נאותות משפטית',
        'אימות בעלות, שעבודים, מצב תכנוני, אישורים עירוניים והיעדר חריגות בנייה.',
        '## מבנה העסקה',
        'לוחות זמני תשלום ברורים, סעיפי הגנה והתאמת מימון מבטיחים ביצוע מאובטח.',
        '## הגנות חוזיות',
        'תיאור נכס מדויק, גילוי עניינים רגולטוריים ועירוניים, תיאום לוחות זמנים וטיפול נכון בהסרת שעבודים.',
        '## שיקולי מס ופיננסים',
        'קונים מקומיים חייבים לבחון מדרגות מס רכישה, פטורים זמינים ודרישות תיעוד.',
        '## סיכום',
        'תכנון מובנה ופיקוח משפטי מבטיחים רכישה מקומית תואמת, שקופה ומאובטחת.'
      ]
    }
  }
];

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, isRTL } = useLanguage();

  const article = articlesData.find(a => a.slug === slug);

  if (!article) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-display font-semibold mb-4">
              {language === 'he' ? 'המאמר לא נמצא' : 'Article Not Found'}
            </h1>
            <Button asChild>
              <Link to="/insights">
                {language === 'he' ? 'חזרה למאמרים' : 'Back to Insights'}
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const renderContent = (content: string[]) => {
    return content.map((paragraph, index) => {
      // Italic disclaimer
      if (paragraph.startsWith('*') && paragraph.endsWith('*') && !paragraph.startsWith('**')) {
        return (
          <p key={index} className="text-muted-foreground italic text-sm border-l-2 border-accent/30 pl-4 my-6">
            {paragraph.slice(1, -1)}
          </p>
        );
      }
      if (paragraph.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-display font-semibold text-foreground mt-10 mb-4">
            {paragraph.replace('## ', '')}
          </h2>
        );
      }
      if (paragraph.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl font-display font-medium text-foreground mt-8 mb-3">
            {paragraph.replace('### ', '')}
          </h3>
        );
      }
      if (paragraph.startsWith('• ')) {
        return (
          <li key={index} className="text-muted-foreground leading-relaxed ml-4 mb-2">
            <span dangerouslySetInnerHTML={{ __html: paragraph.replace('• ', '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
          </li>
        );
      }
      if (paragraph.match(/^\d+\./)) {
        return (
          <li key={index} className="text-muted-foreground leading-relaxed ml-4 mb-2 list-decimal">
            {paragraph.replace(/^\d+\.\s*/, '')}
          </li>
        );
      }
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        return (
          <p key={index} className="text-foreground font-medium mt-6 mb-2">
            {paragraph.replace(/\*\*/g, '')}
          </p>
        );
      }
      if (paragraph.includes('**')) {
        return (
          <p key={index} className="text-muted-foreground leading-relaxed mb-4">
            <span dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
          </p>
        );
      }
      return (
        <p key={index} className="text-muted-foreground leading-relaxed mb-4">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("max-w-4xl mx-auto", isRTL && "font-hebrew text-right")}>
            <Link 
              to="/insights" 
              className={cn(
                "inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-8",
                isRTL && "flex-row-reverse"
              )}
            >
              <ArrowLeft className={cn("h-4 w-4", isRTL && "rotate-180")} />
              {language === 'he' ? 'חזרה למאמרים' : 'Back to Insights'}
            </Link>

            <span className="inline-block bg-accent text-accent-foreground text-sm font-medium px-3 py-1 rounded-full mb-4">
              {article.category[language as 'en' | 'he']}
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-foreground mb-6 leading-tight">
              {article.title[language as 'en' | 'he']}
            </h1>

            <div className={cn(
              "flex flex-wrap items-center gap-6 text-muted-foreground",
              isRTL && "flex-row-reverse"
            )}>
              <div className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
                <User className="h-4 w-4" />
                <span>{article.author[language as 'en' | 'he']}</span>
              </div>
              <div className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
                <Calendar className="h-4 w-4" />
                <span>{new Date(article.date).toLocaleDateString(language === 'he' ? 'he-IL' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
                <Clock className="h-4 w-4" />
                <span>{article.readTime[language as 'en' | 'he']}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-[21/9] overflow-hidden rounded-xl">
              <img 
                src={article.image} 
                alt={article.title[language as 'en' | 'he']}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <article className={cn(
            "max-w-3xl mx-auto prose prose-lg",
            isRTL && "font-hebrew text-right"
          )}>
            {renderContent(article.content[language as 'en' | 'he'])}
          </article>
        </div>
      </section>

      {/* Related Articles CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("text-center", isRTL && "font-hebrew")}>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
              {language === 'he' ? 'רוצים לקרוא עוד?' : 'Want to Read More?'}
            </h2>
            <p className="text-muted-foreground mb-6">
              {language === 'he' 
                ? 'חזרו לדף התובנות שלנו לעוד מאמרים ותכנים מקצועיים.'
                : 'Return to our insights page for more articles and professional content.'}
            </p>
            <Button asChild>
              <Link to="/insights">
                {language === 'he' ? 'כל המאמרים' : 'All Articles'}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Article;
