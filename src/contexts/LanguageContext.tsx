import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'he';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.firm': 'The Firm',
    'nav.expertise': 'Expertise',
    'nav.realEstate': 'Real Estate',
    'nav.taxation': 'International Taxation',
    'nav.estate': 'Estate Planning',
    'nav.insights': 'Insights',
    'nav.globalClients': 'Global Clients',
    'nav.contact': 'Contact',
    'nav.schedule': 'Schedule Consultation',

    // Hero
    'hero.tagline': 'The Future Favors the Prepared',
    'hero.title': 'Attorney & Notary in Tel Aviv',
    'hero.subtitle1': 'Cross-Border Legal Matters for International Clients in Israel',
    'hero.subtitle2': 'Real estate, taxation, and estate planning — delivered with clarity, structure, and financial foresight.',
    'hero.cta': 'Schedule a Consultation',

    // Conflict Section
    'conflict.title': 'Clarity Where Details Decide Outcomes',
    'conflict.body': 'In Israel, major decisions often depend on registration, tax exposure, and compliance — not only on the contract itself. For international clients, the risk increases when legal steps must align with foreign reporting, banking requirements, and cross-border family structures.',
    'conflict.body2': 'We begin with verification and documentation — so decisions are made with facts, not assumptions. Our role is to turn complex requirements into clear, structured decisions that protect your assets.',

    // Guide Section
    'guide.title': 'About the Firm',
    'guide.bio': 'Maya Ziv Law is built around a hybrid advantage: legal strategy informed by financial discipline. The practice serves clients in Israel and abroad with bilingual counsel and a structured, documentation-driven approach designed to support long-term security.',
    'guide.punchline': 'We treat every legal step as a financial decision with long-term consequences.',
    'guide.cta': 'More About the Firm',

    // Methodology
    'method.title': 'A Structured Process — From Verification to Execution',
    'method.subtitle': 'Clients receive a defined process, clear timelines, and rigorous due diligence — with confidentiality and precision at every stage.',
    'method.step1.title': 'Verified Ownership & Status',
    'method.step1.desc': 'Title, encumbrances, planning, and zoning review before commitment.',
    'method.step2.title': 'Tax & Long-Term Structuring',
    'method.step2.desc': 'Early planning to reduce exposure and support compliance.',
    'method.step3.title': 'Remote Execution & Coordination',
    'method.step3.desc': 'Matters can be managed from abroad, including structured documentation and cross-border coordination when required.',

    // Practice Areas
    'practice.title': 'Areas of Practice',
    'practice.realEstate.title': 'Real Estate & Investment',
    'practice.realEstate.desc': 'Secure acquisition and tax planning.',
    'practice.taxation.title': 'International Tax & Compliance',
    'practice.taxation.desc': 'Cross-border reporting and banking regulation.',
    'practice.estate.title': 'Family & Legacy Planning',
    'practice.estate.desc': 'Wills, inheritance, and intergenerational transfer.',
    'practice.learnMore': 'Learn More',
    'practice.additional.olim': 'Olim & Returning Residents',
    'practice.additional.commercial': 'Commercial & Civil',

    // Insights
    'insights.title': 'Insights',
    'insights.readMore': 'Continue Reading',
    'insights.viewAll': 'View All Insights',
    'insights.article1.title': 'Buying Property in Israel as a Foreign Resident',
    'insights.article1.snippet': 'Legal, tax, and registration essentials — with due diligence that supports compliant ownership.',
    'insights.article2.title': 'Wills and Inheritance in Israel for Cross-Border Families',
    'insights.article2.snippet': 'Coordination between jurisdictions to ensure enforceability and reduce conflict and delays.',
    'insights.article3.title': 'Legal Due Diligence Before Buying Property in Israel',
    'insights.article3.snippet': 'Title, planning status, and contractual protections that reduce exposure before signing.',

    // CTA
    'cta.title': 'Your Interests Deserve Personal Attention',
    'cta.subtitle': 'Each inquiry is handled with confidentiality, structured guidance, and precise legal strategy — whether you are based in Israel or abroad.',
    'cta.button': 'Send a Confidential Inquiry',

    // Footer
    'footer.brand': 'Attorney & Notary in Tel Aviv',
    'footer.services': 'Services',
    'footer.contact': 'Contact',
    'footer.legal': 'Legal',
    'footer.disclaimer': 'Disclaimer',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.disclaimerText': 'This website is for informational purposes only and does not constitute legal advice. No attorney-client relationship is formed by use of this site.',
    'footer.copyright': '© 2024 Maya Ziv Law. All rights reserved.',

    // Contact Page
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Begin your journey to legal clarity',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email Address',
    'contact.form.phone': 'Phone Number',
    'contact.form.inquiry': 'Nature of Inquiry',
    'contact.form.message': 'Your Message',
    'contact.form.submit': 'Send Message',
    'contact.form.success': 'Thank you for your message. We will respond within 24-48 hours.',
    'contact.inquiry.realEstate': 'Real Estate Transaction',
    'contact.inquiry.taxation': 'International Taxation',
    'contact.inquiry.estate': 'Estate Planning',
    'contact.inquiry.other': 'Other Legal Matter',

    // About Page
    'about.title': 'The Firm',
    'about.approach.title': 'Our Approach',
    'about.approach.desc': 'Maya Ziv Law was founded on a simple premise: legal service should be as structured and analytical as financial planning. We bring the discipline of numbers to the practice of law.',
    'about.values.title': 'Core Values',
    'about.values.clarity': 'Clarity',
    'about.values.clarity.desc': 'Transparent communication in your preferred language.',
    'about.values.structure': 'Structure',
    'about.values.structure.desc': 'Systematic processes with clear timelines.',
    'about.values.foresight': 'Foresight',
    'about.values.foresight.desc': 'Preventing problems before they arise.',

    // Service Pages
    'service.overview': 'Overview',
    'service.financialAngle': 'The Financial Perspective',
    'service.forWhom': 'Who This Is For',
    'service.faq': 'Frequently Asked Questions',
  },
  he: {
    // Navigation
    'nav.firm': 'המשרד',
    'nav.expertise': 'תחומי התמחות',
    'nav.realEstate': 'נדל"ן',
    'nav.taxation': 'מיסוי בינלאומי',
    'nav.estate': 'ירושות וצוואות',
    'nav.insights': 'מאמרים',
    'nav.globalClients': 'לקוחות בינלאומיים',
    'nav.contact': 'צור קשר',
    'nav.schedule': 'תיאום פגישת ייעוץ',

    // Hero
    'hero.tagline': 'העתיד מעדיף את המוכנים',
    'hero.title': 'עורכת דין ונוטריון בתל אביב',
    'hero.subtitle1': 'ענייני משפט חוצי גבולות ללקוחות בינלאומיים בישראל',
    'hero.subtitle2': 'נדל"ן, מיסוי ותכנון עיזבון — עם בהירות, מבניות וראייה פיננסית צופה פני עתיד.',
    'hero.cta': 'לתיאום פגישת ייעוץ',

    // Conflict Section
    'conflict.title': 'בהירות כשהפרטים מכריעים את התוצאות',
    'conflict.body': 'בישראל, החלטות מרכזיות תלויות לעתים קרובות ברישום, בחשיפת מס ובתאימות — לא רק בחוזה עצמו. עבור לקוחות בינלאומיים, הסיכון גדל כאשר צעדים משפטיים צריכים להתאים לדיווח זר, דרישות בנקאיות ומבני משפחה חוצי גבולות.',
    'conflict.body2': 'אנחנו מתחילים באימות ותיעוד — כך שהחלטות מתקבלות על סמך עובדות, לא הנחות. התפקיד שלנו הוא להפוך דרישות מורכבות להחלטות ברורות ומובנות שמגנות על הנכסים שלכם.',

    // Guide Section
    'guide.title': 'אודות המשרד',
    'guide.bio': 'משרד מאיה זיו נבנה סביב יתרון היברידי: אסטרטגיה משפטית מונחית משמעת פיננסית. המשרד משרת לקוחות בישראל ובחו"ל עם ייעוץ דו-לשוני וגישה מובנית מונעת תיעוד המיועדת לתמוך בביטחון לטווח ארוך.',
    'guide.punchline': 'אנחנו מתייחסים לכל צעד משפטי כהחלטה פיננסית עם השלכות ארוכות טווח.',
    'guide.cta': 'עוד על המשרד',

    // Methodology
    'method.title': 'תהליך מובנה — מאימות ועד ביצוע',
    'method.subtitle': 'לקוחות מקבלים תהליך מוגדר, לוחות זמנים ברורים ובדיקת נאותות קפדנית — עם סודיות ודיוק בכל שלב.',
    'method.step1.title': 'אימות בעלות וסטטוס',
    'method.step1.desc': 'בדיקת נסח, שעבודים, תכנון וייעוד לפני התחייבות.',
    'method.step2.title': 'מס ומבנה לטווח ארוך',
    'method.step2.desc': 'תכנון מוקדם להפחתת חשיפה ותמיכה בתאימות.',
    'method.step3.title': 'ביצוע ותיאום מרחוק',
    'method.step3.desc': 'ניתן לנהל עניינים מחו"ל, כולל תיעוד מובנה ותיאום חוצה גבולות בעת הצורך.',

    // Practice Areas
    'practice.title': 'תחומי התמחות',
    'practice.realEstate.title': 'נדל"ן והשקעות',
    'practice.realEstate.desc': 'רכישה מאובטחת ותכנון מס.',
    'practice.taxation.title': 'מס בינלאומי ותאימות',
    'practice.taxation.desc': 'דיווח חוצה גבולות ורגולציה בנקאית.',
    'practice.estate.title': 'תכנון משפחה ומורשת',
    'practice.estate.desc': 'צוואות, ירושה והעברה בין-דורית.',
    'practice.learnMore': 'למידע נוסף',
    'practice.additional.olim': 'עולים ותושבים חוזרים',
    'practice.additional.commercial': 'מסחרי ואזרחי',

    // Insights
    'insights.title': 'תובנות',
    'insights.readMore': 'המשך קריאה',
    'insights.viewAll': 'לכל המאמרים',
    'insights.article1.title': 'רכישת נכס בישראל כתושב חוץ',
    'insights.article1.snippet': 'יסודות משפטיים, מיסויים ורישומיים — עם בדיקת נאותות התומכת בבעלות תואמת.',
    'insights.article2.title': 'צוואות וירושה בישראל למשפחות חוצות גבולות',
    'insights.article2.snippet': 'תיאום בין תחומי שיפוט להבטחת אכיפות והפחתת סכסוכים ועיכובים.',
    'insights.article3.title': 'בדיקת נאותות משפטית לפני רכישת נכס בישראל',
    'insights.article3.snippet': 'נסח, סטטוס תכנוני והגנות חוזיות שמפחיתים חשיפה לפני החתימה.',

    // CTA
    'cta.title': 'האינטרסים שלכם ראויים לתשומת לב אישית',
    'cta.subtitle': 'כל פנייה מטופלת בסודיות, הכוונה מובנית ואסטרטגיה משפטית מדויקת — בין אם אתם בישראל או בחו"ל.',
    'cta.button': 'שלחו פנייה חסויה',

    // Footer
    'footer.brand': 'עורכת דין ונוטריון בתל אביב',
    'footer.services': 'שירותים',
    'footer.contact': 'צור קשר',
    'footer.legal': 'משפטי',
    'footer.disclaimer': 'הסתייגות',
    'footer.privacy': 'מדיניות פרטיות',
    'footer.terms': 'תנאי שימוש',
    'footer.disclaimerText': 'אתר זה הינו למטרות מידע בלבד ואינו מהווה ייעוץ משפטי. אין יצירת יחסי עורך דין-לקוח באמצעות השימוש באתר זה.',
    'footer.copyright': '© 2024 מאיה זיו עו"ד. כל הזכויות שמורות.',

    // Contact Page
    'contact.title': 'צור קשר',
    'contact.subtitle': 'התחילו את המסע שלכם לבהירות משפטית',
    'contact.form.name': 'שם מלא',
    'contact.form.email': 'כתובת אימייל',
    'contact.form.phone': 'מספר טלפון',
    'contact.form.inquiry': 'אופי הפנייה',
    'contact.form.message': 'ההודעה שלכם',
    'contact.form.submit': 'שלח הודעה',
    'contact.form.success': 'תודה על פנייתכם. נחזור אליכם תוך 24-48 שעות.',
    'contact.inquiry.realEstate': 'עסקת נדל"ן',
    'contact.inquiry.taxation': 'מיסוי בינלאומי',
    'contact.inquiry.estate': 'ירושות וצוואות',
    'contact.inquiry.other': 'עניין משפטי אחר',

    // About Page
    'about.title': 'המשרד',
    'about.approach.title': 'הגישה שלנו',
    'about.approach.desc': 'משרד מאיה זיו הוקם על תפיסה פשוטה: שירות משפטי צריך להיות מובנה ואנליטי כמו תכנון פיננסי. אנחנו מביאים את המשמעת של המספרים לפרקטיקה המשפטית.',
    'about.values.title': 'ערכי הליבה',
    'about.values.clarity': 'בהירות',
    'about.values.clarity.desc': 'תקשורת שקופה בשפה המועדפת עליכם.',
    'about.values.structure': 'מבניות',
    'about.values.structure.desc': 'תהליכים שיטתיים עם לוחות זמנים ברורים.',
    'about.values.foresight': 'ראייה צופה פני עתיד',
    'about.values.foresight.desc': 'מניעת בעיות לפני שהן מתעוררות.',

    // Service Pages
    'service.overview': 'סקירה כללית',
    'service.financialAngle': 'הזווית הפיננסית',
    'service.forWhom': 'למי זה מתאים',
    'service.faq': 'שאלות נפוצות',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('maya-ziv-lang');
    return (saved as Language) || 'en';
  });

  const isRTL = language === 'he';

  useEffect(() => {
    localStorage.setItem('maya-ziv-lang', language);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};