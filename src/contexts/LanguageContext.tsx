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
    'hero.title': 'Bridging Law & Finance',
    'hero.subtitle': 'Premium legal counsel for international clients navigating Israeli law with clarity, structure, and foresight.',
    'hero.cta': 'Start the Process',

    // Conflict Section
    'conflict.title': 'The Challenges You Face',
    'conflict.culture.title': 'Cultural Barriers',
    'conflict.culture.desc': 'Navigating unfamiliar bureaucracy and business practices in a foreign legal landscape.',
    'conflict.tax.title': 'Double Taxation Risk',
    'conflict.tax.desc': 'Complex cross-border tax obligations that can erode your wealth without proper planning.',
    'conflict.uncertainty.title': 'Legal Uncertainty',
    'conflict.uncertainty.desc': 'Unclear procedures and unexpected requirements that delay critical transactions.',

    // Guide Section
    'guide.title': 'Meet Maya Ziv',
    'guide.role': 'Founder & Principal Attorney',
    'guide.bio': 'With a unique background combining law and financial analysis, Maya brings an analytical, numbers-driven approach to legal practice. Her international academic training and accounting experience enable her to see beyond the legal document to its financial implications.',
    'guide.credential1': 'International Academic Background',
    'guide.credential2': 'Financial & Accounting Expertise',
    'guide.credential3': 'Bilingual Legal Practice',

    // Methodology
    'method.title': 'Our Structured Approach',
    'method.subtitle': 'No surprises. Clear timelines. Predictable outcomes.',
    'method.step1.title': 'Diagnosis',
    'method.step1.desc': 'Comprehensive due diligence and early verification of all legal and financial factors.',
    'method.step2.title': 'Strategy',
    'method.step2.desc': 'Tailored planning with structured timelines and clear milestones.',
    'method.step3.title': 'Execution',
    'method.step3.desc': 'Disciplined implementation with remote process capabilities.',
    'method.step4.title': 'Protection',
    'method.step4.desc': 'Ongoing oversight and future-focused risk management.',

    // Practice Areas
    'practice.title': 'Practice Areas',
    'practice.subtitle': 'Comprehensive legal solutions with a financial lens',
    'practice.realEstate.title': 'Real Estate',
    'practice.realEstate.desc': 'Luxury property transactions with full due diligence and risk assessment.',
    'practice.taxation.title': 'International Taxation',
    'practice.taxation.desc': 'Cross-border tax planning, FATCA compliance, and double taxation prevention.',
    'practice.estate.title': 'Estate Planning',
    'practice.estate.desc': 'Wills, trusts, and multi-jurisdiction succession planning.',
    'practice.learnMore': 'Learn More',

    // Insights
    'insights.title': 'Legal Insights',
    'insights.subtitle': 'Expert analysis on matters that affect international clients',
    'insights.readMore': 'Read Article',
    'insights.viewAll': 'View All Insights',

    // CTA
    'cta.title': 'Secure Your Legacy',
    'cta.subtitle': 'The future favors the prepared. Begin with a confidential consultation.',
    'cta.button': 'Schedule Consultation',

    // Footer
    'footer.brand': 'Bridging Law & Finance',
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
    'hero.title': 'גשר בין משפט לפיננסים',
    'hero.subtitle': 'ייעוץ משפטי פרימיום ללקוחות בינלאומיים הניווטים במשפט הישראלי עם בהירות, מבניות וראייה צופה פני עתיד.',
    'hero.cta': 'להתחיל את התהליך',

    // Conflict Section
    'conflict.title': 'האתגרים שאתם מתמודדים איתם',
    'conflict.culture.title': 'מחסומים תרבותיים',
    'conflict.culture.desc': 'ניווט בבירוקרטיה ובנהלים עסקיים לא מוכרים בנוף משפטי זר.',
    'conflict.tax.title': 'סיכון כפל מס',
    'conflict.tax.desc': 'מורכבות מיסוי חוצה גבולות שעלולה לשחוק את הונכם ללא תכנון נכון.',
    'conflict.uncertainty.title': 'חוסר ודאות משפטית',
    'conflict.uncertainty.desc': 'נהלים לא ברורים ודרישות בלתי צפויות שמעכבות עסקאות קריטיות.',

    // Guide Section
    'guide.title': 'הכירו את מאיה זיו',
    'guide.role': 'מייסדת ועורכת דין ראשית',
    'guide.bio': 'עם רקע ייחודי המשלב משפט וניתוח פיננסי, מאיה מביאה גישה אנליטית ומבוססת מספרים לפרקטיקה המשפטית. ההכשרה האקדמית הבינלאומית שלה וניסיונה בחשבונאות מאפשרים לה לראות מעבר למסמך המשפטי אל ההשלכות הפיננסיות שלו.',
    'guide.credential1': 'רקע אקדמי בינלאומי',
    'guide.credential2': 'מומחיות פיננסית וחשבונאית',
    'guide.credential3': 'פרקטיקה משפטית דו-לשונית',

    // Methodology
    'method.title': 'הגישה המובנית שלנו',
    'method.subtitle': 'ללא הפתעות. לוחות זמנים ברורים. תוצאות צפויות.',
    'method.step1.title': 'אבחון',
    'method.step1.desc': 'בדיקת נאותות מקיפה ואימות מוקדם של כל הגורמים המשפטיים והפיננסיים.',
    'method.step2.title': 'אסטרטגיה',
    'method.step2.desc': 'תכנון מותאם אישית עם לוחות זמנים מובנים ואבני דרך ברורות.',
    'method.step3.title': 'ביצוע',
    'method.step3.desc': 'יישום ממושמע עם יכולות תהליך מרחוק.',
    'method.step4.title': 'הגנה',
    'method.step4.desc': 'פיקוח שוטף וניהול סיכונים צופה פני עתיד.',

    // Practice Areas
    'practice.title': 'תחומי התמחות',
    'practice.subtitle': 'פתרונות משפטיים מקיפים עם עדשה פיננסית',
    'practice.realEstate.title': 'נדל"ן',
    'practice.realEstate.desc': 'עסקאות נדל"ן יוקרתי עם בדיקת נאותות מלאה והערכת סיכונים.',
    'practice.taxation.title': 'מיסוי בינלאומי',
    'practice.taxation.desc': 'תכנון מס חוצה גבולות, עמידה ב-FATCA ומניעת כפל מס.',
    'practice.estate.title': 'ירושות וצוואות',
    'practice.estate.desc': 'צוואות, נאמנויות ותכנון ירושה רב-תחומי.',
    'practice.learnMore': 'למידע נוסף',

    // Insights
    'insights.title': 'תובנות משפטיות',
    'insights.subtitle': 'ניתוח מומחים בנושאים המשפיעים על לקוחות בינלאומיים',
    'insights.readMore': 'קרא את המאמר',
    'insights.viewAll': 'לכל המאמרים',

    // CTA
    'cta.title': 'הבטיחו את המורשת שלכם',
    'cta.subtitle': 'העתיד מעדיף את המוכנים. התחילו עם ייעוץ חסוי.',
    'cta.button': 'תיאום פגישת ייעוץ',

    // Footer
    'footer.brand': 'גשר בין משפט לפיננסים',
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