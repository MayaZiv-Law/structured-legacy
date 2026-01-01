-- Create articles table
CREATE TABLE public.articles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title_en TEXT NOT NULL,
    title_he TEXT NOT NULL,
    excerpt_en TEXT NOT NULL,
    excerpt_he TEXT NOT NULL,
    content_en TEXT[] NOT NULL DEFAULT '{}',
    content_he TEXT[] NOT NULL DEFAULT '{}',
    category_en TEXT NOT NULL,
    category_he TEXT NOT NULL,
    author_en TEXT NOT NULL DEFAULT 'Adv. Maya Ziv',
    author_he TEXT NOT NULL DEFAULT 'עו"ד מאיה זיו',
    read_time_en TEXT NOT NULL DEFAULT '5 min read',
    read_time_he TEXT NOT NULL DEFAULT '5 דקות קריאה',
    image_url TEXT,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    is_published BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to published articles
CREATE POLICY "Anyone can view published articles" 
ON public.articles 
FOR SELECT 
USING (is_published = true);

-- Create policy for full access (for admin - no auth required as per plan)
CREATE POLICY "Allow all operations for now" 
ON public.articles 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_articles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_articles_updated_at
BEFORE UPDATE ON public.articles
FOR EACH ROW
EXECUTE FUNCTION public.update_articles_updated_at();

-- Create storage bucket for article images
INSERT INTO storage.buckets (id, name, public) VALUES ('article-images', 'article-images', true);

-- Create storage policies for article images
CREATE POLICY "Article images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'article-images');

CREATE POLICY "Anyone can upload article images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'article-images');

CREATE POLICY "Anyone can update article images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'article-images');

CREATE POLICY "Anyone can delete article images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'article-images');

-- Insert existing articles
INSERT INTO public.articles (slug, title_en, title_he, excerpt_en, excerpt_he, content_en, content_he, category_en, category_he, image_url, is_published, published_at) VALUES
(
    'israeli-real-estate-foreign-buyers',
    'Navigating Israeli Real Estate: A Guide for Foreign Buyers',
    'ניווט בנדל"ן ישראלי: מדריך לקונים זרים',
    'Essential legal considerations for international investors looking to purchase property in Israel, from due diligence to closing.',
    'שיקולים משפטיים חיוניים למשקיעים בינלאומיים המעוניינים לרכוש נכס בישראל, מבדיקת נאותות ועד לסגירה.',
    ARRAY[
        '# Understanding the Israeli Real Estate Market',
        'Israel''s real estate market presents unique opportunities and challenges for foreign buyers. Whether you''re looking for a vacation home, investment property, or a future residence, understanding the legal landscape is crucial.',
        '## Key Considerations for Foreign Buyers',
        '**Ownership Rights**: Foreign nationals can purchase property in Israel, though certain restrictions may apply depending on the property''s location and land designation.',
        '**Due Diligence**: Before purchasing, it''s essential to verify the property''s legal status, including ownership history, existing liens, and zoning regulations.',
        '**Tax Implications**: Foreign buyers should be aware of purchase tax obligations, which may differ from those applied to Israeli residents.',
        '## The Purchase Process',
        'The typical property purchase in Israel involves several stages:',
        '- Initial negotiations and preliminary agreement',
        '- Due diligence and legal verification',
        '- Contract signing and payment schedule',
        '- Registration with the Land Registry (Tabu)',
        '## Working with Legal Counsel',
        'Having experienced legal representation is invaluable when navigating cross-border real estate transactions. A knowledgeable attorney can help identify potential issues early and ensure a smooth closing process.'
    ],
    ARRAY[
        '# הבנת שוק הנדל"ן הישראלי',
        'שוק הנדל"ן הישראלי מציג הזדמנויות ואתגרים ייחודיים לקונים זרים. בין אם אתם מחפשים בית נופש, נכס להשקעה או מגורים עתידיים, הבנת הנוף המשפטי היא קריטית.',
        '## שיקולים מרכזיים לקונים זרים',
        '**זכויות בעלות**: אזרחים זרים יכולים לרכוש נכס בישראל, אם כי הגבלות מסוימות עשויות לחול בהתאם למיקום הנכס וייעוד הקרקע.',
        '**בדיקת נאותות**: לפני הרכישה, חיוני לוודא את המצב המשפטי של הנכס, כולל היסטוריית הבעלות, שעבודים קיימים ותקנות תכנון.',
        '**השלכות מס**: קונים זרים צריכים להיות מודעים לחובות מס רכישה, שעשויות להיות שונות מאלה החלות על תושבי ישראל.',
        '## תהליך הרכישה',
        'רכישת נכס טיפוסית בישראל כוללת מספר שלבים:',
        '- משא ומתן ראשוני והסכם מקדמי',
        '- בדיקת נאותות ואימות משפטי',
        '- חתימת חוזה ולוח תשלומים',
        '- רישום בלשכת רישום המקרקעין (טאבו)',
        '## עבודה עם ייעוץ משפטי',
        'ייצוג משפטי מנוסה הוא בעל ערך רב בעת ניווט בעסקאות נדל"ן חוצות גבולות. עורך דין בקיא יכול לסייע בזיהוי בעיות פוטנציאליות מוקדם ולהבטיח תהליך סגירה חלק.'
    ],
    'Real Estate',
    'נדל"ן',
    '/lovable-uploads/8883ef4e-474d-45c3-bf10-74ce4eabdba0.png',
    true,
    '2024-01-15'::timestamp
),
(
    'cross-border-taxation-americans-israel',
    'Cross-Border Taxation: What Americans in Israel Need to Know',
    'מיסוי חוצה גבולות: מה אמריקאים בישראל צריכים לדעת',
    'Understanding FATCA compliance, dual taxation treaties, and strategic tax planning for US citizens residing in Israel.',
    'הבנת עמידה ב-FATCA, אמנות מס כפול ותכנון מס אסטרטגי לאזרחי ארה"ב המתגוררים בישראל.',
    ARRAY[
        '# The Complexity of US-Israel Dual Taxation',
        'American citizens and green card holders living in Israel face unique tax obligations. The United States is one of only two countries that taxes its citizens on worldwide income, regardless of where they reside.',
        '## FATCA Compliance',
        'The Foreign Account Tax Compliance Act (FATCA) requires US persons to report foreign financial accounts and assets. Non-compliance can result in severe penalties.',
        '**Key Reporting Requirements**:',
        '- FBAR (FinCEN Form 114) for foreign accounts exceeding $10,000',
        '- Form 8938 for specified foreign financial assets',
        '- Reporting of foreign trusts and corporations',
        '## The US-Israel Tax Treaty',
        'The bilateral tax treaty between the US and Israel provides mechanisms to prevent double taxation. Key provisions include:',
        '- Foreign tax credits',
        '- Exemptions for certain types of income',
        '- Tie-breaker rules for determining tax residency',
        '## Strategic Tax Planning',
        'Proactive planning can significantly reduce your overall tax burden while maintaining full compliance with both jurisdictions. This may include:',
        '- Timing of income recognition',
        '- Retirement account optimization',
        '- Investment structuring',
        '## New Immigrants (Olim) Benefits',
        'New immigrants to Israel enjoy significant tax benefits during their first ten years, including exemption from reporting foreign income. Understanding how these benefits interact with US obligations is crucial.'
    ],
    ARRAY[
        '# המורכבות של מיסוי כפול ישראל-ארה"ב',
        'אזרחים אמריקאים ובעלי גרין קארד המתגוררים בישראל מתמודדים עם חובות מס ייחודיות. ארצות הברית היא אחת משתי מדינות בלבד הממסות את אזרחיהן על הכנסה עולמית, ללא קשר למקום מגוריהם.',
        '## עמידה ב-FATCA',
        'חוק ה-FATCA מחייב אמריקאים לדווח על חשבונות פיננסיים ונכסים זרים. אי-ציות עלול לגרור קנסות חמורים.',
        '**דרישות דיווח מרכזיות**:',
        '- FBAR (טופס FinCEN 114) לחשבונות זרים מעל $10,000',
        '- טופס 8938 לנכסים פיננסיים זרים מוגדרים',
        '- דיווח על נאמנויות וחברות זרות',
        '## אמנת המס ישראל-ארה"ב',
        'אמנת המס הדו-צדדית בין ארה"ב לישראל מספקת מנגנונים למניעת כפל מס. הוראות מרכזיות כוללות:',
        '- זיכויי מס זר',
        '- פטורים לסוגים מסוימים של הכנסה',
        '- כללי שוברי שוויון לקביעת תושבות מס',
        '## תכנון מס אסטרטגי',
        'תכנון יזום יכול להפחית משמעותית את נטל המס הכולל שלכם תוך שמירה על ציות מלא לשתי הרשויות. זה עשוי לכלול:',
        '- תזמון הכרה בהכנסה',
        '- אופטימיזציה של חשבונות פרישה',
        '- מבנה השקעות',
        '## הטבות לעולים חדשים',
        'עולים חדשים לישראל נהנים מהטבות מס משמעותיות במהלך עשר השנים הראשונות, כולל פטור מדיווח על הכנסה זרה. הבנת האופן שבו הטבות אלה מתקשרות עם החובות האמריקאיות היא קריטית.'
    ],
    'Taxation',
    'מיסוי',
    '/lovable-uploads/10c05b41-4184-42a1-bdf3-3b49d016c9bb.png',
    true,
    '2024-02-20'::timestamp
),
(
    'estate-planning-international-families',
    'Estate Planning for International Families: Protecting Your Legacy',
    'תכנון עיזבון למשפחות בינלאומיות: הגנה על המורשת שלכם',
    'How to structure your estate plan when you have assets, heirs, or residency in multiple countries.',
    'כיצד לבנות את תכנית העיזבון שלכם כאשר יש לכם נכסים, יורשים או תושבות במספר מדינות.',
    ARRAY[
        '# The Importance of International Estate Planning',
        'For families with connections to multiple countries, estate planning requires careful consideration of different legal systems, tax regimes, and inheritance laws.',
        '## Key Challenges',
        '**Conflicting Laws**: Different countries have different rules about forced heirship, spousal rights, and asset distribution.',
        '**Tax Exposure**: Without proper planning, an estate may be subject to taxation in multiple jurisdictions.',
        '**Asset Location**: The location of assets affects which laws apply and how they can be transferred.',
        '## Strategic Approaches',
        'Effective international estate planning often involves:',
        '- Coordinated wills for different jurisdictions',
        '- Strategic use of trusts and foundations',
        '- Life insurance planning',
        '- Business succession planning',
        '## Israel-Specific Considerations',
        'Israeli inheritance law differs significantly from common law systems. Key points include:',
        '- No forced heirship in Israel',
        '- Recognition of foreign wills',
        '- Estate tax was abolished in 1981',
        '## The Role of Professional Guidance',
        'Given the complexity of international estate planning, working with advisors who understand both Israeli law and the laws of other relevant jurisdictions is essential.',
        'A comprehensive estate plan should be reviewed regularly and updated as circumstances change, including changes in residence, family structure, or asset composition.'
    ],
    ARRAY[
        '# החשיבות של תכנון עיזבון בינלאומי',
        'למשפחות עם קשרים למספר מדינות, תכנון עיזבון דורש התחשבות מדוקדקת במערכות משפטיות שונות, משטרי מס וחוקי ירושה.',
        '## אתגרים מרכזיים',
        '**חוקים סותרים**: למדינות שונות יש כללים שונים לגבי ירושה כפויה, זכויות בני זוג וחלוקת נכסים.',
        '**חשיפת מס**: ללא תכנון נכון, עיזבון עלול להיות כפוף למיסוי במספר תחומי שיפוט.',
        '**מיקום נכסים**: מיקום הנכסים משפיע על אילו חוקים חלים וכיצד ניתן להעבירם.',
        '## גישות אסטרטגיות',
        'תכנון עיזבון בינלאומי יעיל כולל לעתים קרובות:',
        '- צוואות מתואמות לתחומי שיפוט שונים',
        '- שימוש אסטרטגי בנאמנויות וקרנות',
        '- תכנון ביטוח חיים',
        '- תכנון רציפות עסקית',
        '## שיקולים ספציפיים לישראל',
        'חוק הירושה הישראלי שונה משמעותית ממערכות המשפט המקובל. נקודות מרכזיות כוללות:',
        '- אין ירושה כפויה בישראל',
        '- הכרה בצוואות זרות',
        '- מס עיזבון בוטל ב-1981',
        '## תפקיד ההנחיה המקצועית',
        'בהתחשב במורכבות של תכנון עיזבון בינלאומי, עבודה עם יועצים המבינים הן את החוק הישראלי והן את החוקים של תחומי שיפוט רלוונטיים אחרים היא חיונית.',
        'תכנית עיזבון מקיפה צריכה להיבדק באופן קבוע ולהתעדכן ככל שהנסיבות משתנות, כולל שינויים במגורים, מבנה משפחתי או הרכב נכסים.'
    ],
    'Estate Planning',
    'תכנון עיזבון',
    '/lovable-uploads/81459920-5f87-4bcb-8430-47c1c2edc6e4.png',
    true,
    '2024-03-10'::timestamp
);