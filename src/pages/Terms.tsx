import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { SEO } from '@/components/SEO';

const Terms = () => {
  const { isRTL, language } = useLanguage();

  const content = {
    en: {
      title: 'Terms of Service',
      lastUpdated: 'Last Updated March 2026',
      sections: [
        {
          title: '1. Acceptance of Terms',
          content: 'By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use this website.'
        },
        {
          title: '2. Informational Purposes Only',
          content: 'The information provided on this website is for general informational purposes only. It does not constitute legal advice and should not be relied upon as such. The use of this website does not create an attorney-client relationship between you and Maya Ziv Law.'
        },
        {
          title: '3. No Attorney-Client Relationship',
          content: 'Viewing this website, submitting a contact form, or sending an email does not create an attorney-client relationship. Such a relationship is only established through a formal written engagement agreement signed by both parties.'
        },
        {
          title: '4. Confidentiality',
          content: 'Information submitted through this website is not guaranteed to be confidential. Please do not send sensitive or confidential information until an attorney-client relationship has been formally established.'
        },
        {
          title: '5. Intellectual Property',
          content: 'All content on this website, including text, graphics, logos, and images, is the property of Maya Ziv Law and is protected by Israeli and international copyright laws. Unauthorized use of this content is prohibited.'
        },
        {
          title: '6. Limitation of Liability',
          content: 'Maya Ziv Law shall not be liable for any damages arising from your use of this website or any information contained herein. This includes direct, indirect, incidental, punitive, and consequential damages.'
        },
        {
          title: '7. Links to Third Party Websites',
          content: 'This website may contain links to third party websites. We have no control over the content of these sites and are not responsible for their content or practices.'
        },
        {
          title: '8. Governing Law',
          content: 'These Terms of Service shall be governed by and construed in accordance with the laws of the State of Israel. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Israel.'
        },
        {
          title: '9. Changes to Terms',
          content: 'We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on this website. Your continued use of the website constitutes acceptance of the modified terms.'
        },
        {
          title: '10. Contact Information',
          content: 'For questions about these Terms of Service, please contact us at info@mayaziv-law.com or +972.544943597.'
        }
      ]
    },
    he: {
      title: 'תנאי השימוש',
      lastUpdated: 'עודכן לאחרונה במרץ 2026',
      sections: [
        {
          title: '1. הסכמה לתנאים',
          content: 'בכניסתך לאתר זה ובשימוש בו, אתה מקבל ומסכים להיות כפוף לתנאי הסכם זה. אם אינך מסכים לתנאים אלה, אנא אל תשתמש באתר זה.',
        },
        {
          title: '2. למטרות מידע בלבד',
          content: 'המידע המופיע באתר זה נועד למטרות מידע כלליות בלבד. הוא אינו מהווה ייעוץ משפטי ואין להסתמך עליו ככזה. השימוש באתר זה אינו יוצר יחסי עורך דין-לקוח בינך לבין משרד עורכי הדין "מאיה זיו".',
        },
        {
          title: '3. אין יחסי עורך דין-לקוח',
          content: 'הגלישה באתר זה, מילוי טופס יצירת קשר או שליחת דוא"ל אינם יוצרים יחסי עורך דין-לקוח. יחסים כאלה נוצרים אך ורק באמצעות הסכם התקשרות רשמי בכתב, שנחתם על ידי שני הצדדים.',
        },
        {
          title: '4. סודיות',
          content: 'אין כל ערובה לכך שהמידע הנמסר דרך אתר זה יישאר חסוי. אנא אל תשלחו מידע רגיש או חסוי עד להקמתו הרשמית של קשר עורך דין-לקוח.',
        },
        {
          title: '5. קניין רוחני',
          content: 'כל התוכן באתר זה, לרבות טקסט, גרפיקה, לוגואים ותמונות, הוא בבעלות משרד עורכי הדין מאיה זיו ומוגן על ידי חוקי זכויות היוצרים הישראליים והבינלאומיים. חל איסור על שימוש בלתי מורשה בתוכן זה.',
        },
        {
          title: '6. הגבלת אחריות',
          content: 'משרד עורכי הדין מאיה זיו לא יישא באחריות לכל נזק שייגרם כתוצאה משימושך באתר זה או במידע המופיע בו. הדבר כולל נזקים ישירים, עקיפים, נלווים, עונשיים ותוצאתיים.',
        },
        {
          title: '7. קישורים לאתרי צד שלישי',
          content: 'אתר זה עשוי להכיל קישורים לאתרי צד שלישי. אין לנו כל שליטה על התוכן באתרים אלה ואנו לא אחראים לתוכנם או לנהליהם.',
        },
        {
          title: '8. הדין החל',
          content: 'תנאי שירות אלה יהיו כפופים לחוקי מדינת ישראל ויפורשו בהתאם להם. כל סכסוך שייווצר כתוצאה מתנאים אלה יהיה כפוף לסמכות השיפוט הבלעדית של בתי המשפט בישראל.',
        },
        {
          title: '9. שינויים בתנאים',
          content: 'אנו שומרים לעצמנו את הזכות לשנות את תנאי השירות הללו בכל עת. השינויים ייכנסו לתוקף מיד עם פרסומם באתר זה. המשך השימוש באתר מהווה הסכמה לתנאים המעודכנים.',
        },
        {
          title: '10. פרטי יצירת קשר',
          content: 'לשאלות בנוגע לתנאי השירות הללו, אנא צרו איתנו קשר בכתובת info@mayaziv-law.com או בטלפון +972.544943597.',
        },
      ],
    }
  };

  const t = content[language];

  return (
    <Layout>
      <SEO
        titleEn="Terms of Service | Maya Ziv Law"
        titleHe="תנאי שימוש | מאיה זיו עו״ד"
        descriptionEn="Terms of Service for Maya Ziv Law website. Read our terms and conditions for using our website and services."
        descriptionHe="תנאי השימוש של אתר משרד מאיה זיו עו״ד. קראו את התנאים וההגבלות לשימוש באתר ובשירותינו."
        path="/terms"
      />

      <section className="pt-28 pb-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("max-w-3xl mx-auto", isRTL && "font-hebrew text-right")}>
            <div className="w-16 h-1 bg-accent mb-8" />
            <h1 className="text-4xl sm:text-5xl font-display font-semibold text-foreground mb-4">
              {t.title}
            </h1>
            <p className="text-muted-foreground mb-8">{t.lastUpdated}</p>

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

export default Terms;
