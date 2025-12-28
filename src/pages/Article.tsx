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
      en: 'Buying Property in Israel as a Foreign Resident: Legal and Tax Essentials',
      he: 'רכישת נכס בישראל כתושב חוץ: יסודות משפטיים ומיסויים'
    },
    excerpt: {
      en: 'Understanding reporting obligations as a US person in Israel.',
      he: 'הבנת חובות הדיווח כאמריקאי בישראל.'
    },
    category: { en: 'Taxation', he: 'מיסוי' },
    date: '2024-01-15',
    readTime: { en: '8 min read', he: '8 דקות קריאה' },
    author: { en: 'Maya Gilad, Adv.', he: 'עו"ד מאיה גלעד' },
    image: insightFatca,
    content: {
      en: [
        'Purchasing property in Israel as a foreign resident involves navigating a unique set of legal and tax considerations. While the process shares similarities with domestic transactions, there are critical distinctions that can significantly impact your investment.',
        '## Legal Framework for Foreign Buyers',
        'Israeli law permits foreign nationals to purchase most types of real estate, with certain restrictions on agricultural land and properties in designated security zones. The acquisition process requires compliance with both Israeli property law and, in many cases, the buyer\'s home jurisdiction regulations.',
        'Key legal considerations include:',
        '• **Title verification**: Ensuring the property has clear title through the Israel Land Registry (Tabu) or Israel Land Authority',
        '• **Due diligence**: Comprehensive review of planning permissions, building permits, and any encumbrances',
        '• **Contract structure**: Purchase agreements must address currency fluctuations, payment schedules, and cross-border considerations',
        '## Tax Implications',
        'Foreign residents face specific tax obligations when purchasing Israeli property:',
        '**Purchase Tax (Mas Rechisha)**: Non-residents typically pay higher purchase tax rates compared to Israeli residents buying their primary residence. The current rate structure for non-residents ranges from 8% to 10% of the property value.',
        '**Capital Gains Tax**: Upon sale, foreign residents are subject to Israeli capital gains tax, though tax treaties may provide relief or credits in your home jurisdiction.',
        '**Rental Income**: If you intend to rent the property, rental income is taxable in Israel. Various tax routes are available, including a flat 10% rate on gross rental income or standard progressive rates on net income.',
        '## FATCA and FBAR Considerations',
        'For U.S. persons, Israeli property ownership triggers additional reporting requirements:',
        '• **FBAR (FinCEN Form 114)**: While the property itself may not require reporting, associated bank accounts holding rental income or sale proceeds must be reported if aggregate foreign account balances exceed $10,000.',
        '• **FATCA Form 8938**: Depending on filing status and residence, Israeli property may need to be reported as a specified foreign financial asset.',
        '• **Form 8865**: If the property is held through an Israeli company or partnership structure, additional partnership reporting may apply.',
        '## Structuring the Purchase',
        'The optimal ownership structure depends on your specific circumstances, including:',
        '• Personal vs. corporate ownership',
        '• Estate planning considerations',
        '• Tax treaty benefits between Israel and your home country',
        '• Future sale or transfer intentions',
        '## Practical Recommendations',
        'Before proceeding with a purchase:',
        '1. Engage Israeli legal counsel experienced in cross-border transactions',
        '2. Consult with tax advisors in both Israel and your home jurisdiction',
        '3. Understand currency exchange implications and hedging options',
        '4. Plan for ongoing compliance obligations',
        'The complexity of cross-border real estate transactions requires careful planning and professional guidance to optimize both legal protection and tax efficiency.'
      ],
      he: [
        'רכישת נכס בישראל כתושב חוץ כרוכה בניווט בין מערכת ייחודית של שיקולים משפטיים ומיסויים. בעוד שהתהליך דומה לעסקאות מקומיות, ישנם הבדלים קריטיים שיכולים להשפיע באופן משמעותי על ההשקעה שלכם.',
        '## המסגרת המשפטית לקונים זרים',
        'החוק הישראלי מאפשר לאזרחים זרים לרכוש רוב סוגי הנדל"ן, עם הגבלות מסוימות על קרקע חקלאית ונכסים באזורי ביטחון מוגדרים. תהליך הרכישה מחייב עמידה הן בדיני המקרקעין הישראליים והן, במקרים רבים, בתקנות מדינת המוצא של הקונה.',
        'שיקולים משפטיים מרכזיים כוללים:',
        '• **אימות בעלות**: הבטחה שלנכס יש בעלות נקייה דרך לשכת רישום המקרקעין (טאבו) או מינהל מקרקעי ישראל',
        '• **בדיקת נאותות**: בחינה מקיפה של היתרי תכנון, היתרי בנייה וכל שעבוד',
        '• **מבנה החוזה**: הסכמי רכישה חייבים להתייחס לתנודות מטבע, לוחות זמני תשלום ושיקולים חוצי גבולות',
        '## השלכות מס',
        'תושבי חוץ מתמודדים עם חובות מס ספציפיות בעת רכישת נכס ישראלי:',
        '**מס רכישה**: תושבי חוץ משלמים בדרך כלל שיעורי מס רכישה גבוהים יותר בהשוואה לתושבי ישראל הרוכשים את דירתם הראשונה. מבנה השיעורים הנוכחי לתושבי חוץ נע בין 8% ל-10% משווי הנכס.',
        '**מס שבח**: במכירה, תושבי חוץ חייבים במס שבח ישראלי, אם כי אמנות מס עשויות לספק הקלה או זיכויים במדינת המוצא.',
        '**הכנסות משכירות**: אם אתם מתכוונים להשכיר את הנכס, הכנסות משכירות חייבות במס בישראל. מסלולי מס שונים זמינים, כולל שיעור קבוע של 10% על הכנסה ברוטו משכירות או שיעורים פרוגרסיביים רגילים על הכנסה נטו.',
        '## שיקולי FATCA ו-FBAR',
        'עבור אזרחים אמריקאים, בעלות על נכס ישראלי מפעילה דרישות דיווח נוספות:',
        '• **FBAR (טופס FinCEN 114)**: בעוד שהנכס עצמו עשוי שלא לדרוש דיווח, חשבונות בנק משויכים המחזיקים הכנסות משכירות או תמורות מכירה חייבים בדיווח אם יתרות החשבון הזר המצטברות עולות על $10,000.',
        '• **FATCA טופס 8938**: בהתאם לסטטוס הגשה ומגורים, נכס ישראלי עשוי להזדקק לדיווח כנכס פיננסי זר מוגדר.',
        '• **טופס 8865**: אם הנכס מוחזק באמצעות חברה או מבנה שותפות ישראלי, דיווח שותפות נוסף עשוי לחול.',
        '## מבנה הרכישה',
        'מבנה הבעלות האופטימלי תלוי בנסיבות הספציפיות שלכם, כולל:',
        '• בעלות אישית מול בעלות תאגידית',
        '• שיקולי תכנון עיזבון',
        '• הטבות אמנת מס בין ישראל למדינת המוצא שלכם',
        '• כוונות מכירה או העברה עתידיות',
        '## המלצות מעשיות',
        'לפני שתמשיכו ברכישה:',
        '1. שכרו עורך דין ישראלי מנוסה בעסקאות חוצות גבולות',
        '2. התייעצו עם יועצי מס הן בישראל והן במדינת המוצא שלכם',
        '3. הבינו את השלכות המרת המטבע ואפשרויות הגידור',
        '4. תכננו לחובות ציות מתמשכות',
        'המורכבות של עסקאות נדל"ן חוצות גבולות מחייבת תכנון קפדני והנחייה מקצועית כדי לייעל הן את ההגנה המשפטית והן את היעילות המיסויית.'
      ]
    }
  },
  {
    slug: 'domestic-buyers-legal-checks',
    title: {
      en: 'Buying Property in Israel: Essential Legal Checks for Domestic Buyers',
      he: 'רכישת נכס בישראל: בדיקות משפטיות חיוניות לקונים מקומיים'
    },
    excerpt: {
      en: 'Essential steps before property purchase.',
      he: 'שלבים חיוניים לפני רכישת נכס.'
    },
    category: { en: 'Real Estate', he: 'נדל"ן' },
    date: '2024-01-08',
    readTime: { en: '6 min read', he: '6 דקות קריאה' },
    author: { en: 'Maya Gilad, Adv.', he: 'עו"ד מאיה גלעד' },
    image: insightRealEstate,
    content: {
      en: [
        'Purchasing property in Israel is one of the most significant financial decisions you\'ll make. A thorough legal review before signing any agreement can prevent costly disputes and protect your investment.',
        '## The Importance of Pre-Contract Due Diligence',
        'Israeli real estate transactions operate under the principle of "buyer beware." Unlike some jurisdictions where sellers bear extensive disclosure obligations, Israeli law places significant responsibility on buyers to investigate the property thoroughly.',
        '## Essential Legal Checks',
        '### 1. Land Registry Verification (Tabu)',
        'The first step is obtaining a current extract from the Land Registry (Nessach Tabu). This document reveals:',
        '• Current registered owners',
        '• Any mortgages or liens',
        '• Easements and rights of way',
        '• Cautionary notes (He\'arot Azhara)',
        '• Historical ownership chain',
        '### 2. Planning and Building Permits',
        'Verify that all structures on the property have proper building permits. Unpermitted construction can result in:',
        '• Demolition orders',
        '• Fines and penalties',
        '• Inability to obtain financing',
        '• Problems when selling',
        'Request the property\'s "Tik Binyan" (building file) from the local municipality to review all permits and approved plans.',
        '### 3. Municipal Certificates',
        'Before closing, obtain:',
        '• **Property tax clearance (Arnona)**: Confirms no outstanding municipal taxes',
        '• **Water and sewage clearance**: Ensures utility accounts are settled',
        '• **Betterment levy status (Hetel Hashbacha)**: Important if planning changes were recently approved',
        '### 4. Condominium Rules and Bylaws',
        'For apartments:',
        '• Review the building\'s registered bylaws (Takanon)',
        '• Check house committee meeting minutes',
        '• Verify maintenance fund status and upcoming major repairs',
        '• Understand parking and storage allocations',
        '### 5. Developer Due Diligence (New Construction)',
        'When buying from a developer:',
        '• Verify the developer\'s financial stability',
        '• Confirm construction guarantees under the Sale (Apartments) Law',
        '• Review the specification appendix carefully',
        '• Understand delivery timelines and delay compensation',
        '## Common Pitfalls to Avoid',
        '**Rushing the process**: Market pressure should not compromise thorough investigation.',
        '**Relying on verbal assurances**: Everything must be documented in writing.',
        '**Ignoring red flags**: Unexplained gaps in documentation warrant deeper investigation.',
        '**Underestimating renovation restrictions**: Historic buildings and rent-controlled properties have special rules.',
        '## The Role of Legal Counsel',
        'An experienced real estate attorney will:',
        '• Conduct comprehensive due diligence',
        '• Negotiate protective contract terms',
        '• Coordinate with banks and mortgage providers',
        '• Ensure proper fund transfers through escrow',
        '• Handle registration of ownership',
        'The cost of proper legal representation is minimal compared to the risks of an uninformed purchase.'
      ],
      he: [
        'רכישת נכס בישראל היא אחת ההחלטות הכלכליות המשמעותיות ביותר שתקבלו. בדיקה משפטית יסודית לפני חתימה על כל הסכם יכולה למנוע סכסוכים יקרים ולהגן על ההשקעה שלכם.',
        '## החשיבות של בדיקת נאותות לפני חוזה',
        'עסקאות נדל"ן בישראל פועלות לפי עיקרון "ייזהר הקונה". בניגוד לתחומי שיפוט מסוימים שבהם למוכרים יש חובות גילוי נרחבות, החוק הישראלי מטיל אחריות משמעותית על הקונים לחקור את הנכס ביסודיות.',
        '## בדיקות משפטיות חיוניות',
        '### 1. אימות לשכת רישום המקרקעין (טאבו)',
        'הצעד הראשון הוא קבלת נסח עדכני מלשכת רישום המקרקעין. מסמך זה חושף:',
        '• בעלים רשומים נוכחיים',
        '• משכנתאות או שעבודים',
        '• זכויות מעבר וזיקות הנאה',
        '• הערות אזהרה',
        '• שרשרת בעלות היסטורית',
        '### 2. היתרי תכנון ובנייה',
        'וודאו שלכל המבנים בנכס יש היתרי בנייה תקינים. בנייה ללא היתר עלולה לגרום ל:',
        '• צווי הריסה',
        '• קנסות ועונשים',
        '• חוסר יכולת לקבל מימון',
        '• בעיות בעת מכירה',
        'בקשו את "תיק הבניין" של הנכס מהעירייה המקומית לעיון בכל ההיתרים והתוכניות המאושרות.',
        '### 3. אישורים עירוניים',
        'לפני הסגירה, קבלו:',
        '• **אישור מס רכוש (ארנונה)**: מאשר שאין חובות עירוניים',
        '• **אישור מים וביוב**: מבטיח שחשבונות השירות מסולקים',
        '• **סטטוס היטל השבחה**: חשוב אם אושרו לאחרונה שינויי תכנון',
        '### 4. תקנון בית משותף',
        'לדירות:',
        '• עיינו בתקנון הרשום של הבניין',
        '• בדקו פרוטוקולים של ישיבות ועד הבית',
        '• וודאו סטטוס קרן התחזוקה ותיקונים גדולים צפויים',
        '• הבינו הקצאות חניה ומחסן',
        '### 5. בדיקת נאותות יזם (בנייה חדשה)',
        'בעת קנייה מיזם:',
        '• וודאו את היציבות הפיננסית של היזם',
        '• אשרו ערבויות בנייה לפי חוק המכר (דירות)',
        '• עיינו בקפידה בנספח המפרט',
        '• הבינו לוחות זמנים למסירה ופיצוי על עיכובים',
        '## מלכודות נפוצות להימנע מהן',
        '**להאיץ את התהליך**: לחץ שוק לא צריך לפגוע בחקירה יסודית.',
        '**להסתמך על הבטחות בעל פה**: הכל חייב להיות מתועד בכתב.',
        '**להתעלם מדגלים אדומים**: פערים בלתי מוסברים בתיעוד מצדיקים חקירה מעמיקה יותר.',
        '**לזלזל במגבלות שיפוץ**: לבניינים היסטוריים ונכסים בשכירות מוגנת יש כללים מיוחדים.',
        '## תפקיד הייעוץ המשפטי',
        'עורך דין נדל"ן מנוסה:',
        '• יבצע בדיקת נאותות מקיפה',
        '• ינהל משא ומתן על תנאי חוזה מגנים',
        '• יתאם עם בנקים וספקי משכנתאות',
        '• יבטיח העברות כספים תקינות דרך נאמנות',
        '• יטפל ברישום הבעלות',
        'עלות הייצוג המשפטי הנכון היא מינימלית בהשוואה לסיכונים של רכישה בלתי מושכלת.'
      ]
    }
  },
  {
    slug: 'wills-inheritance-cross-border',
    title: {
      en: 'Wills and Inheritance in Israel: Ensuring Cross-Border Validity',
      he: 'צוואות וירושה בישראל: הבטחת תוקף חוצה גבולות'
    },
    excerpt: {
      en: 'Ensuring will validity across jurisdictions.',
      he: 'הבטחת תוקף צוואה בכמה מדינות.'
    },
    category: { en: 'Estate', he: 'ירושות' },
    date: '2024-01-02',
    readTime: { en: '7 min read', he: '7 דקות קריאה' },
    author: { en: 'Maya Gilad, Adv.', he: 'עו"ד מאיה גלעד' },
    image: insightEstate,
    content: {
      en: [
        'For individuals with assets or family members in multiple countries, estate planning requires careful consideration of how different legal systems interact. A will that is valid and effective in one jurisdiction may face challenges in another.',
        '## The Israeli Inheritance Framework',
        'Israeli inheritance law is governed primarily by the Inheritance Law of 1965. Key features include:',
        '• **Freedom of testation**: Generally, individuals may dispose of their assets as they wish',
        '• **Forced heirship limitations**: Unlike many civil law countries, Israel does not impose strict forced heirship rules',
        '• **Probate requirement**: All wills must be validated by the Registrar of Inheritance Affairs or the Family Court',
        '## Types of Wills Recognized in Israel',
        'Israeli law recognizes several forms of wills:',
        '### Handwritten Will (Tzavaah Bichtav Yad)',
        'Must be entirely handwritten, dated, and signed by the testator. No witnesses required.',
        '### Witnessed Will (Tzavaah Be\'edim)',
        'Typed or printed document signed by the testator in the presence of two witnesses who also sign.',
        '### Will Before an Authority',
        'Made orally or in writing before a judge, religious court judge, or other authorized official.',
        '### Oral Will (Deathbed Will)',
        'Permitted only when the testator believes death is imminent. Requires two witnesses and expires after one month if the testator recovers.',
        '## Cross-Border Considerations',
        '### Conflict of Laws',
        'When a person has assets in multiple countries, different rules may apply:',
        '• **Domicile vs. situs**: Movable assets typically follow the law of the deceased\'s domicile; immovable assets follow the law where they are located',
        '• **Renvoi**: Some jurisdictions may refer back to Israeli law even when foreign law would otherwise apply',
        '• **Recognition**: Wills valid under Israeli law may require additional formalities for recognition abroad',
        '### Common Challenges',
        '**Witness requirements**: A will valid in Israel may not meet witness requirements in common law jurisdictions.',
        '**Notarization**: Some countries require notarization that Israeli law does not mandate.',
        '**Language**: Wills in Hebrew may need certified translations and apostille authentication.',
        '**Executor appointments**: Powers granted to executors under Israeli law may not be recognized internationally.',
        '## Best Practices for Cross-Border Estates',
        '### Consider Multiple Wills',
        'For significant assets in different jurisdictions, separate wills for each country may provide:',
        '• Faster administration (no need for international probate)',
        '• Compliance with local formalities',
        '• Language accessibility for local courts and institutions',
        '**Caution**: Multiple wills must be carefully coordinated to avoid inadvertently revoking each other.',
        '### Coordinate Advisors',
        'Work with legal counsel in each relevant jurisdiction to ensure:',
        '• Consistent estate planning objectives',
        '• No conflicts between different wills',
        '• Tax efficiency across borders',
        '• Proper asset titling',
        '### Address Tax Treaties',
        'Israel has estate tax treaties with several countries. Understanding these agreements helps:',
        '• Avoid double taxation',
        '• Optimize asset location',
        '• Plan for liquidity needs',
        '## Updating Your Estate Plan',
        'Review your cross-border estate plan when:',
        '• Acquiring or disposing of assets abroad',
        '• Changing residence or domicile',
        '• Family circumstances change (marriage, divorce, birth, death)',
        '• Tax laws change in relevant jurisdictions',
        'Proper cross-border estate planning ensures your wishes are honored wherever your assets and beneficiaries may be located.'
      ],
      he: [
        'עבור אנשים עם נכסים או בני משפחה במספר מדינות, תכנון עיזבון דורש שיקול דעת זהיר לגבי האופן שבו מערכות משפטיות שונות מתקשרות ביניהן. צוואה שתקפה ואפקטיבית בתחום שיפוט אחד עלולה להיתקל באתגרים בתחום אחר.',
        '## מסגרת הירושה הישראלית',
        'דיני הירושה בישראל מוסדרים בעיקר על ידי חוק הירושה משנת 1965. מאפיינים עיקריים כוללים:',
        '• **חופש צוואה**: באופן כללי, אנשים רשאים לעשות בנכסיהם כרצונם',
        '• **מגבלות ירושה כפויה**: בניגוד למדינות משפט אזרחי רבות, ישראל אינה כופה כללי ירושה כפויה נוקשים',
        '• **דרישת קיום צוואה**: כל הצוואות חייבות להיות מאומתות על ידי רשם הירושות או בית המשפט לענייני משפחה',
        '## סוגי צוואות המוכרים בישראל',
        'החוק הישראלי מכיר במספר צורות של צוואות:',
        '### צוואה בכתב יד',
        'חייבת להיות כתובה כולה בכתב יד, מתוארכת וחתומה על ידי המצווה. לא נדרשים עדים.',
        '### צוואה בעדים',
        'מסמך מודפס או כתוב חתום על ידי המצווה בנוכחות שני עדים שגם הם חותמים.',
        '### צוואה בפני רשות',
        'נעשית בעל פה או בכתב בפני שופט, דיין או פקיד מוסמך אחר.',
        '### צוואה בעל פה (צוואת שכיב מרע)',
        'מותרת רק כאשר המצווה מאמין שהמוות קרוב. דורשת שני עדים ופוקעת לאחר חודש אם המצווה מחלים.',
        '## שיקולים חוצי גבולות',
        '### התנגשות דינים',
        'כאשר לאדם יש נכסים במספר מדינות, כללים שונים עשויים לחול:',
        '• **מושב מול מיקום**: נכסים ניידים בדרך כלל עוקבים אחר דיני מושבו של המנוח; נכסים לא ניידים עוקבים אחר הדין במקום שבו הם נמצאים',
        '• **רנבואה**: חלק מתחומי השיפוט עשויים להפנות בחזרה לדין הישראלי גם כאשר דין זר היה חל אחרת',
        '• **הכרה**: צוואות תקפות לפי הדין הישראלי עשויות לדרוש פורמליות נוספות להכרה בחו"ל',
        '### אתגרים נפוצים',
        '**דרישות עדים**: צוואה תקפה בישראל עשויה שלא לעמוד בדרישות עדים בתחומי משפט מקובל.',
        '**נוטריון**: חלק מהמדינות דורשות אימות נוטריוני שהדין הישראלי אינו מחייב.',
        '**שפה**: צוואות בעברית עשויות להזדקק לתרגומים מאושרים ואימות אפוסטיל.',
        '**מינוי מנהלי עיזבון**: סמכויות שניתנו למנהלי עיזבון לפי הדין הישראלי עשויות שלא להיות מוכרות בינלאומית.',
        '## שיטות עבודה מומלצות לעיזבונות חוצי גבולות',
        '### שקלו צוואות מרובות',
        'לנכסים משמעותיים בתחומי שיפוט שונים, צוואות נפרדות לכל מדינה עשויות לספק:',
        '• ניהול מהיר יותר (אין צורך בפרובייט בינלאומי)',
        '• עמידה בפורמליות מקומיות',
        '• נגישות שפה לבתי משפט ומוסדות מקומיים',
        '**זהירות**: צוואות מרובות חייבות להיות מתואמות בקפידה כדי להימנע מביטול בשוגג של אחת את השנייה.',
        '### תאמו יועצים',
        'עבדו עם יועצים משפטיים בכל תחום שיפוט רלוונטי כדי להבטיח:',
        '• יעדי תכנון עיזבון עקביים',
        '• אין התנגשויות בין צוואות שונות',
        '• יעילות מס חוצת גבולות',
        '• רישום נכסים תקין',
        '### התייחסו לאמנות מס',
        'לישראל יש אמנות מס עיזבון עם מספר מדינות. הבנת הסכמים אלה מסייעת:',
        '• להימנע ממיסוי כפול',
        '• לייעל מיקום נכסים',
        '• לתכנן לצרכי נזילות',
        '## עדכון תוכנית העיזבון שלכם',
        'סקרו את תוכנית העיזבון חוצת הגבולות שלכם כאשר:',
        '• רוכשים או מוכרים נכסים בחו"ל',
        '• משנים מגורים או מושב',
        '• נסיבות משפחתיות משתנות (נישואין, גירושין, לידה, מוות)',
        '• חוקי מס משתנים בתחומי שיפוט רלוונטיים',
        'תכנון עיזבון חוצה גבולות נכון מבטיח שרצונותיכם יכובדו בכל מקום שבו נכסיכם ומוטביכם נמצאים.'
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
