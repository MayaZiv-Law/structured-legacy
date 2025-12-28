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
      en: 'Buying Property in Israel as a Foreign Resident: Legal & Tax Essentials',
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
        '**Executive Summary:** Purchasing property in Israel involves more than just finding the right asset; it requires navigating a unique legal and tax environment. For foreign residents, the primary challenges lie in Purchase Tax structure, Anti-Money Laundering (AML) compliance for funding, and secure registration. This guide outlines the essential legal framework for a secure acquisition.',
        '*Disclaimer: This article is for general informational purposes only and does not constitute legal or tax advice. Regulations, tax thresholds, and banking policies are subject to change and must be assessed on a case-by-case basis.*',
        '## 1. The Legal Framework: Verification Before Commitment',
        'In Israel, the principle of Caveat Emptor ("Buyer Beware") places the burden of verification primarily on the purchaser. In Israel, thorough legal due diligence typically plays the central protective role in the transaction.',
        'Before signing any memorandum or contract, we verify:',
        '• **Title Ownership:** Confirming the seller is the registered owner at the Land Registry (Tabu) or Israel Land Authority.',
        '• **Encumbrances:** Ensuring the property is free of liens, mortgages, or third-party warnings that could block the transfer.',
        '• **Planning & Zoning:** Checking for enforcement exposure, permitting irregularities, and ensuring the built property matches the permit to avoid future restrictions on use or resale.',
        '## 2. Payment Security & Milestones',
        'Protecting your capital during the transaction is as important as verifying the asset.',
        '**Key Safeguards:**',
        '• **Escrow / Trust:** Funds are often held in trust or released only against specific legal milestones.',
        '• **Warning Note (He\'arat Azhara):** This is a critical legal instrument registered in your favor as early as practicable after signing (or initial payment), subject to the transaction structure. It serves to prevent the seller from selling the property to another party.',
        '## 3. Purchase Tax & Financial Planning',
        '**Financial Note:** Tax planning should be the first step. Foreign residents generally face higher Purchase Tax brackets.',
        'A foreign resident is typically subject to a tiered Purchase Tax which often applies from the first NIS bracket. However, new immigrants (Olim) may be eligible for reduced rates if the purchase is timed correctly relative to their Aliyah. We calculate these liabilities in advance to ensure your budget reflects the true cost of the transaction.',
        '## 4. Moving Capital: The AML Challenge',
        'Transferring funds into Israel is a significant hurdle due to strict Anti-Money Laundering (AML) regulations. Israeli banks require detailed "Source of Funds" documentation.',
        '**Important Reality Check:** Bank acceptance remains discretionary. Even with proper documentation, banks may request additional clarifications. We guide clients in preparing these compliance files early to facilitate the review process.',
        '## 5. Cross-Border Coordination',
        'For investors with assets abroad, the purchase mechanism (individual vs. corporate/trust) can have long-term tax implications in your home country. We recommend coordinating the purchase structure with your local tax advisors to prevent double taxation.',
        '## Ready to Move Forward?',
        'If you are considering a purchase and would like a documented assessment, we typically request the following for our initial conflict check and review:',
        '• Copy of Foreign Passport / Israeli ID.',
        '• Property details (City, Street, or Block/Parcel numbers if known).',
        '• Draft memorandum or contract (if already provided by the seller).',
        '**Related Services:**',
        '• Real Estate Representation',
        '• Tax & Compliance',
        '• Olim & Returning Residents'
      ],
      he: [
        '**תקציר מנהלים:** רכישת נכס בישראל כוללת יותר מאשר מציאת הנכס הנכון; היא דורשת ניווט בסביבה משפטית ומיסויית ייחודית. עבור תושבי חוץ, האתגרים העיקריים נמצאים במבנה מס הרכישה, ציות לתקנות הלבנת הון (AML) למימון, ורישום מאובטח. מדריך זה מתאר את המסגרת המשפטית החיונית לרכישה מאובטחת.',
        '*הבהרה: מאמר זה מיועד למטרות מידע כלליות בלבד ואינו מהווה ייעוץ משפטי או מיסויי. תקנות, סכומי מס ומדיניות בנקאית כפופים לשינויים ויש להעריכם לפי כל מקרה לגופו.*',
        '## 1. המסגרת המשפטית: אימות לפני התחייבות',
        'בישראל, עיקרון "ייזהר הקונה" (Caveat Emptor) מטיל את נטל האימות בעיקר על הרוכש. בישראל, בדיקת נאותות משפטית יסודית ממלאה בדרך כלל את התפקיד המגן המרכזי בעסקה.',
        'לפני חתימה על כל זיכרון דברים או חוזה, אנו מאמתים:',
        '• **בעלות על הנכס:** אישור שהמוכר הוא הבעלים הרשום בלשכת רישום המקרקעין (טאבו) או מינהל מקרקעי ישראל.',
        '• **שעבודים:** הבטחה שהנכס נקי משעבודים, משכנתאות או אזהרות צד שלישי שעלולים לחסום את ההעברה.',
        '• **תכנון ובנייה:** בדיקת חשיפה לאכיפה, אי-סדרים בהיתרים, והבטחה שהנכס הבנוי תואם להיתר כדי למנוע הגבלות עתידיות על שימוש או מכירה חוזרת.',
        '## 2. אבטחת תשלום ואבני דרך',
        'הגנה על ההון שלכם במהלך העסקה חשובה כמו אימות הנכס.',
        '**אמצעי הגנה מרכזיים:**',
        '• **נאמנות / פיקדון:** כספים מוחזקים לעיתים קרובות בנאמנות או משוחררים רק כנגד אבני דרך משפטיות ספציפיות.',
        '• **הערת אזהרה:** זהו מכשיר משפטי קריטי הנרשם לטובתכם מוקדם ככל האפשר לאחר החתימה (או התשלום הראשוני), בכפוף למבנה העסקה. הוא נועד למנוע מהמוכר למכור את הנכס לצד אחר.',
        '## 3. מס רכישה ותכנון פיננסי',
        '**הערה פיננסית:** תכנון מס צריך להיות הצעד הראשון. תושבי חוץ מתמודדים בדרך כלל עם מדרגות מס רכישה גבוהות יותר.',
        'תושב חוץ כפוף בדרך כלל למס רכישה מדורג שלעיתים חל מהמדרגה הראשונה בשקלים. עם זאת, עולים חדשים עשויים להיות זכאים לשיעורים מופחתים אם הרכישה מתוזמנת נכון ביחס לעלייתם. אנו מחשבים חבויות אלו מראש כדי להבטיח שהתקציב שלכם משקף את העלות האמיתית של העסקה.',
        '## 4. העברת הון: אתגר הלבנת ההון',
        'העברת כספים לישראל היא מכשול משמעותי עקב תקנות הלבנת הון (AML) מחמירות. בנקים ישראליים דורשים תיעוד מפורט של "מקור הכספים".',
        '**בדיקת מציאות חשובה:** אישור בנקאי נותר לפי שיקול דעת. גם עם תיעוד נכון, בנקים עשויים לבקש הבהרות נוספות. אנו מנחים לקוחות בהכנת קבצי ציות אלו מוקדם כדי להקל על תהליך הבדיקה.',
        '## 5. תיאום חוצה גבולות',
        'עבור משקיעים עם נכסים בחו"ל, מנגנון הרכישה (פרטי לעומת תאגידי/נאמנות) יכול להיות בעל השלכות מס ארוכות טווח במדינת המוצא שלכם. אנו ממליצים לתאם את מבנה הרכישה עם יועצי המס המקומיים שלכם כדי למנוע מיסוי כפול.',
        '## מוכנים להתקדם?',
        'אם אתם שוקלים רכישה ורוצים הערכה מתועדת, אנו מבקשים בדרך כלל את הפריטים הבאים לבדיקת ניגוד עניינים ובחינה ראשונית:',
        '• העתק דרכון זר / תעודת זהות ישראלית.',
        '• פרטי נכס (עיר, רחוב, או מספרי גוש/חלקה אם ידועים).',
        '• טיוטת זיכרון דברים או חוזה (אם כבר סופק על ידי המוכר).',
        '**שירותים קשורים:**',
        '• ייצוג בנדל"ן',
        '• מיסוי וציות',
        '• עולים ותושבים חוזרים'
      ]
    }
  },
  {
    slug: 'wills-inheritance-cross-border',
    title: {
      en: 'Wills and Inheritance in Israel: Harmonizing Cross-Border Estates',
      he: 'צוואות וירושה בישראל: הרמוניזציה של עיזבונות חוצי גבולות'
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
        '**Executive Summary:** International families often assume that a single Will drafted in their home country covers their global assets. In practice, relying solely on a foreign Will for Israeli property can lead to procedural delays and court validations. A specific Israeli Will is often the most effective tool for a smooth intergenerational transfer.',
        '*Disclaimer: This article is for general informational purposes only and does not constitute legal or tax advice. Inheritance laws and tax regulations are subject to change.*',
        '## 1. The Jurisdiction Challenge',
        'Israeli inheritance law applies to assets located in Israel, regardless of the owner\'s citizenship. While Israel respects foreign Wills, validating them requires a complex legal process: submitting the foreign probate order to Israeli courts, translations, and domestic enforcement. During this period, assets may be practically locked from sale or transfer until the appropriate orders are obtained.',
        '## 2. The Solution: A Concurrent Israeli Will',
        'The most efficient strategy for cross-border estates is often a Concurrent Will. This is a separate legal document that covers only your assets in Israel, drafted to meet local evidentiary standards. It runs parallel to your primary Will abroad without revoking it.',
        '**Benefit:** It allows for a streamlined, purely local probate process.',
        '**Result:** It often materially reduces procedural delays, allowing heirs to receive clear title to the property efficiently.',
        '## 3. Protecting Your Intent vs. Statutory Defaults',
        'Israel has specific default statutory inheritance rules (determining who inherits if a Will is invalid or unclear) and spousal rights considerations that may differ from your home country. A clearly drafted Israeli Will is designed to reflect your distribution intent clearly and reduce reliance on default provisions.',
        '## 4. Tax Considerations',
        '**Financial Note:** As of today, Israel does not have an Estate Tax, but Capital Gains Tax considerations apply to the future sale of inherited assets. Proper structuring can help define the "cost basis" for future sales. These considerations can be complex and typically require case-specific analysis, especially when coordinating with foreign tax jurisdictions.',
        '## 5. Coordinating Guardianship & Trusts',
        'For families with minor children or complex asset structures, coordination is vital. We ensure that definitions used in your Israeli documents align with your global estate plan to prevent administrative conflicts.',
        '## Planning Your Legacy?',
        'To assist us in structuring your Israeli estate plan, we typically request:',
        '• Overview of Israeli assets (Real Estate, Bank Accounts).',
        '• Details of existing foreign Wills (to ensure no revocation clauses clash).',
        '• Family structure overview (Citizenships and residency of potential heirs).',
        '**Related Services:**',
        '• Family & Legacy',
        '• Real Estate Representation'
      ],
      he: [
        '**תקציר מנהלים:** משפחות בינלאומיות מניחות לעיתים קרובות שצוואה אחת שנערכה במדינת המוצא שלהם מכסה את נכסיהם הגלובליים. בפועל, הסתמכות בלעדית על צוואה זרה עבור נכס ישראלי יכולה להוביל לעיכובים פרוצדורליים ואימותים בבית משפט. צוואה ישראלית ספציפית היא לעיתים קרובות הכלי היעיל ביותר להעברה בין-דורית חלקה.',
        '*הבהרה: מאמר זה מיועד למטרות מידע כלליות בלבד ואינו מהווה ייעוץ משפטי או מיסויי. דיני ירושה ותקנות מס כפופים לשינויים.*',
        '## 1. אתגר הסמכות השיפוטית',
        'דיני הירושה הישראליים חלים על נכסים הממוקמים בישראל, ללא קשר לאזרחות הבעלים. בעוד ישראל מכבדת צוואות זרות, אימותן דורש תהליך משפטי מורכב: הגשת צו הפרובייט הזר לבתי המשפט הישראליים, תרגומים ואכיפה מקומית. במהלך תקופה זו, נכסים עלולים להיות נעולים למעשה ממכירה או העברה עד לקבלת הצווים המתאימים.',
        '## 2. הפתרון: צוואה ישראלית מקבילה',
        'האסטרטגיה היעילה ביותר לעיזבונות חוצי גבולות היא לעיתים קרובות צוואה מקבילה. זהו מסמך משפטי נפרד המכסה רק את הנכסים שלכם בישראל, ערוך לעמוד בתקנים הראייתיים המקומיים. הוא פועל במקביל לצוואה העיקרית שלכם בחו"ל מבלי לבטל אותה.',
        '**יתרון:** הוא מאפשר תהליך פרובייט מקומי ויעיל.',
        '**תוצאה:** הוא לעיתים קרובות מפחית באופן מהותי עיכובים פרוצדורליים, ומאפשר ליורשים לקבל בעלות ברורה על הנכס ביעילות.',
        '## 3. הגנה על כוונתכם מול ברירות מחדל חוקיות',
        'לישראל יש כללי ירושה חוקתיים ספציפיים (הקובעים מי יורש אם הצוואה אינה תקפה או אינה ברורה) ושיקולי זכויות בן זוג שעשויים להיות שונים ממדינת המוצא שלכם. צוואה ישראלית ערוכה בבהירות נועדה לשקף את כוונת החלוקה שלכם בבירור ולהפחית הסתמכות על הוראות ברירת מחדל.',
        '## 4. שיקולי מס',
        '**הערה פיננסית:** נכון להיום, לישראל אין מס עיזבון, אך שיקולי מס רווח הון חלים על מכירה עתידית של נכסים בירושה. מבנה נכון יכול לסייע בהגדרת "בסיס העלות" למכירות עתידיות. שיקולים אלו יכולים להיות מורכבים ובדרך כלל דורשים ניתוח ספציפי למקרה, במיוחד בעת תיאום עם תחומי שיפוט מיסויים זרים.',
        '## 5. תיאום אפוטרופסות ונאמנויות',
        'עבור משפחות עם ילדים קטינים או מבני נכסים מורכבים, תיאום הוא חיוני. אנו מבטיחים שההגדרות המשמשות במסמכים הישראליים שלכם מתיישרות עם תוכנית העיזבון הגלובלית שלכם כדי למנוע סכסוכים מנהליים.',
        '## מתכננים את המורשת שלכם?',
        'כדי לסייע לנו בבניית תוכנית העיזבון הישראלית שלכם, אנו מבקשים בדרך כלל:',
        '• סקירה של נכסים ישראליים (נדל"ן, חשבונות בנק).',
        '• פרטי צוואות זרות קיימות (כדי להבטיח שאין התנגשות בסעיפי ביטול).',
        '• סקירת מבנה משפחתי (אזרחויות ותושבות של יורשים פוטנציאליים).',
        '**שירותים קשורים:**',
        '• משפחה ומורשת',
        '• ייצוג בנדל"ן'
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
        '**Executive Summary:** Even for experienced Israeli buyers, the property market holds hidden risks. From "As-Is" clauses to municipal debts, the legal responsibility rests on the buyer. This guide outlines the essential due diligence checks required to protect your capital in a domestic transaction.',
        '*Disclaimer: This article is for general informational purposes only and does not constitute legal or tax advice.*',
        '## 1. Beyond the Price: Due Diligence',
        'Finding the property is only the beginning. Before entering negotiations, three layers of verification are required:',
        '• **Legal Title:** Is the seller the sole owner? Are there cautionary notes (He\'arat Azhara) in favor of third parties?',
        '• **Financial Encumbrances:** Is the property mortgaged? We must confirm the mortgage balance does not exceed the purchase price and structure payments to ensure its removal.',
        '• **Physical & Planning Status:** Does the built area match the approved permit? Unapproved extensions may create enforcement exposure, fines, and restrictions that can affect value and resale. We also check for potential Betterment Levy (Hetel Hashbacha) exposure.',
        '## 2. The Contract: Protecting Your Capital',
        'Standard real estate contracts often lean on generic clauses, but every deal has unique risks. We focus on structuring the Payment Schedule to match the removal of risks.',
        '**Critical Rule:** Avoid releasing funds directly to the seller without escrow/trust safeguards and a clear milestone-based schedule. Registering a Warning Note as early as feasible is a key protective step.',
        '## 3. Purchase Tax Planning',
        'For Israeli residents, Purchase Tax is determined by whether this is your "Single Home" or an "Additional Apartment" for investment. We assess your eligibility for exemptions (such as "Meshaper Diur") to ensure you do not overpay taxes due to incorrect reporting or timing errors.',
        '## 4. Final Registration',
        'The deal isn\'t finished when you get the keys. It concludes only when the property is registered in your name at the Land Registry (Tabu). We monitor the process post-handover to ensure title transfer is completed.',
        '## Considering a Purchase?',
        'For a preliminary legal assessment or representation, we typically request:',
        '• ID (Teudat Zehut).',
        '• Property details (Gush/Helka or Address).',
        '• Current status of funding (Mortgage pre-approval / Own equity).',
        '**Related Services:**',
        '• Real Estate Representation',
        '• Tax & Compliance'
      ],
      he: [
        '**תקציר מנהלים:** גם עבור קונים ישראליים מנוסים, שוק הנדל"ן מחזיק סיכונים נסתרים. מסעיפי "כמות שהוא" ועד חובות עירוניים, האחריות המשפטית מוטלת על הקונה. מדריך זה מתאר את בדיקות הנאותות החיוניות הנדרשות להגנה על ההון שלכם בעסקה מקומית.',
        '*הבהרה: מאמר זה מיועד למטרות מידע כלליות בלבד ואינו מהווה ייעוץ משפטי או מיסויי.*',
        '## 1. מעבר למחיר: בדיקת נאותות',
        'מציאת הנכס היא רק ההתחלה. לפני כניסה למשא ומתן, נדרשות שלוש שכבות של אימות:',
        '• **בעלות משפטית:** האם המוכר הוא הבעלים היחיד? האם יש הערות אזהרה לטובת צדדים שלישיים?',
        '• **שעבודים פיננסיים:** האם הנכס ממושכן? עלינו לאשר שיתרת המשכנתא אינה עולה על מחיר הרכישה ולבנות תשלומים כדי להבטיח את הסרתה.',
        '• **מצב פיזי ותכנוני:** האם השטח הבנוי תואם להיתר המאושר? הרחבות ללא אישור עלולות ליצור חשיפה לאכיפה, קנסות והגבלות שיכולים להשפיע על הערך ועל מכירה חוזרת. אנו גם בודקים חשיפה פוטנציאלית להיטל השבחה.',
        '## 2. החוזה: הגנה על ההון שלכם',
        'חוזי נדל"ן סטנדרטיים נשענים לעיתים קרובות על סעיפים גנריים, אך לכל עסקה יש סיכונים ייחודיים. אנו מתמקדים בבניית לוח התשלומים כך שיתאים להסרת הסיכונים.',
        '**כלל קריטי:** הימנעו משחרור כספים ישירות למוכר ללא הגנות נאמנות/פיקדון ולוח זמנים ברור מבוסס אבני דרך. רישום הערת אזהרה מוקדם ככל האפשר הוא צעד הגנה מרכזי.',
        '## 3. תכנון מס רכישה',
        'עבור תושבי ישראל, מס רכישה נקבע לפי האם זו "דירתכם היחידה" או "דירה נוספת" להשקעה. אנו מעריכים את זכאותכם לפטורים (כגון "משפר דיור") כדי להבטיח שאינכם משלמים מס יתר עקב דיווח שגוי או טעויות תזמון.',
        '## 4. רישום סופי',
        'העסקה לא מסתיימת כשאתם מקבלים את המפתחות. היא מסתיימת רק כאשר הנכס רשום על שמכם בלשכת רישום המקרקעין (טאבו). אנו עוקבים אחר התהליך לאחר המסירה כדי להבטיח שהעברת הבעלות הושלמה.',
        '## שוקלים רכישה?',
        'להערכה משפטית ראשונית או ייצוג, אנו מבקשים בדרך כלל:',
        '• תעודת זהות.',
        '• פרטי נכס (גוש/חלקה או כתובת).',
        '• מצב מימון נוכחי (אישור עקרוני למשכנתא / הון עצמי).',
        '**שירותים קשורים:**',
        '• ייצוג בנדל"ן',
        '• מיסוי וציות'
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
