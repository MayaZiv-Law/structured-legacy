import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { SEO } from '@/components/SEO';

const Privacy = () => {
  const { isRTL, language } = useLanguage();

  const content = {
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last Updated: January 2025',
      sections: [
        {
          title: '1. Introduction',
          content: 'Maya Ziv Law ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.'
        },
        {
          title: '2. Information We Collect',
          content: 'We may collect personal information that you voluntarily provide to us when you contact us through our website, including: full name, email address, phone number, and any other information you choose to provide in your message. We collect this information only with your explicit consent.'
        },
        {
          title: '3. How We Use Your Information',
          content: 'We use the information we collect to: respond to your inquiries and provide legal services, communicate with you about our services, comply with legal obligations, and protect our legal rights. We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as required by law.'
        },
        {
          title: '4. Data Security',
          content: 'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.'
        },
        {
          title: '5. Your Rights Under Israeli Law (Amendment 13)',
          content: 'In accordance with Amendment 13 to the Privacy Protection Law, 5741-1981, you have the right to: access your personal data held by us, request correction of inaccurate data, request deletion of your data, withdraw your consent at any time, and lodge a complaint with the Privacy Protection Authority. To exercise these rights, please contact us at info@mayaziv.law.'
        },
        {
          title: '6. Cookies',
          content: 'Our website may use cookies and similar tracking technologies to enhance your browsing experience. You can set your browser to refuse cookies, but this may limit some features of our website.'
        },
        {
          title: '7. Third-Party Links',
          content: 'Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to read their privacy policies.'
        },
        {
          title: '8. Changes to This Policy',
          content: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.'
        },
        {
          title: '9. Contact Us',
          content: 'If you have questions about this Privacy Policy or wish to exercise your rights, please contact us at: info@mayaziv.law or +972.544943597.'
        }
      ]
    },
    he: {
      title: 'מדיניות פרטיות',
      lastUpdated: 'עדכון אחרון: ינואר 2025',
      sections: [
        {
          title: '1. מבוא',
          content: 'משרד מאיה זיו עו"ד ("אנחנו", "שלנו") מחויב להגנה על פרטיותכם. מדיניות פרטיות זו מסבירה כיצד אנו אוספים, משתמשים, מגלים ושומרים על המידע שלכם כאשר אתם מבקרים באתר שלנו או משתמשים בשירותינו.'
        },
        {
          title: '2. המידע שאנו אוספים',
          content: 'אנו עשויים לאסוף מידע אישי שאתם מספקים לנו מרצונכם כאשר אתם יוצרים איתנו קשר דרך האתר, כולל: שם מלא, כתובת דואר אלקטרוני, מספר טלפון, וכל מידע נוסף שתבחרו לספק בהודעתכם. אנו אוספים מידע זה רק בהסכמתכם המפורשת.'
        },
        {
          title: '3. כיצד אנו משתמשים במידע',
          content: 'אנו משתמשים במידע שאנו אוספים כדי: להשיב לפניותיכם ולספק שירותים משפטיים, לתקשר איתכם בנוגע לשירותינו, לעמוד בחובות משפטיות, ולהגן על זכויותינו החוקיות. אנו לא מוכרים, סוחרים או מעבירים את המידע האישי שלכם לצדדים שלישיים ללא הסכמתכם, למעט כנדרש על פי דין.'
        },
        {
          title: '4. אבטחת מידע',
          content: 'אנו מיישמים אמצעי אבטחה טכניים וארגוניים מתאימים להגנה על המידע האישי שלכם מפני גישה בלתי מורשית, שינוי, גילוי או הרס. עם זאת, אין שיטת העברה באינטרנט שהיא מאובטחת ב-100%.'
        },
        {
          title: '5. זכויותיכם על פי החוק הישראלי (תיקון 13)',
          content: 'בהתאם לתיקון 13 לחוק הגנת הפרטיות, התשמ"א-1981, יש לכם את הזכות: לעיין במידע האישי שברשותנו, לבקש תיקון של מידע לא מדויק, לבקש מחיקה של המידע שלכם, לחזור בכם מהסכמתכם בכל עת, ולהגיש תלונה לרשות להגנת הפרטיות. לצורך מימוש זכויות אלה, אנא פנו אלינו בכתובת info@mayaziv.law.'
        },
        {
          title: '6. עוגיות (Cookies)',
          content: 'האתר שלנו עשוי להשתמש בעוגיות וטכנולוגיות מעקב דומות לשיפור חוויית הגלישה שלכם. תוכלו להגדיר את הדפדפן שלכם לסרב לעוגיות, אך הדבר עשוי להגביל חלק מתכונות האתר.'
        },
        {
          title: '7. קישורים לאתרים חיצוניים',
          content: 'האתר שלנו עשוי להכיל קישורים לאתרים של צדדים שלישיים. אנו לא אחראים לנוהלי הפרטיות של אתרים חיצוניים אלו. אנו ממליצים לקרוא את מדיניות הפרטיות שלהם.'
        },
        {
          title: '8. שינויים במדיניות זו',
          content: 'אנו עשויים לעדכן את מדיניות פרטיות זו מעת לעת. נודיע לכם על שינויים על ידי פרסום המדיניות החדשה בעמוד זה ועדכון התאריך "עדכון אחרון".'
        },
        {
          title: '9. צור קשר',
          content: 'אם יש לכם שאלות לגבי מדיניות פרטיות זו או שברצונכם לממש את זכויותיכם, אנא פנו אלינו בכתובת: info@mayaziv.law או בטלפון +972.544943597.'
        }
      ]
    }
  };

  const t = content[language];

  return (
    <Layout>
      <SEO
        titleEn="Privacy Policy | Maya Ziv Law"
        titleHe="מדיניות פרטיות | מאיה זיו עו״ד"
        descriptionEn="Privacy Policy for Maya Ziv Law website. Learn how we collect, use, and protect your personal information."
        descriptionHe="מדיניות הפרטיות של אתר משרד מאיה זיו עו״ד. למדו כיצד אנו אוספים, משתמשים ומגינים על המידע האישי שלכם."
        path="/privacy"
      />

      <section className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("max-w-3xl mx-auto", isRTL && "font-hebrew text-right")}>
            <div className="w-16 h-1 bg-accent mb-8" />
            <h1 className="text-4xl sm:text-5xl font-display font-semibold text-foreground mb-4">
              {t.title}
            </h1>
            <p className="text-muted-foreground mb-12">{t.lastUpdated}</p>

            <div className="space-y-8">
              {t.sections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-xl font-display font-semibold text-foreground mb-3">
                    {section.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;
