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
      title: 'תנאי שימוש',
      lastUpdated: 'עדכון אחרון מרץ 2026',
      sections: [
        {
          title: '1. קבלת התנאים',
          content: 'בגישה ובשימוש באתר זה, אתם מסכימים להיות מחויבים לתנאים והוראות הסכם זה. אם אינכם מסכימים לתנאים אלה, אנא אל תשתמשו באתר זה.'
        },
        {
          title: '2. למטרות מידע בלבד',
          content: 'המידע המסופק באתר זה הוא למטרות מידע כללי בלבד. הוא אינו מהווה ייעוץ משפטי ואין להסתמך עליו ככזה. השימוש באתר זה אינו יוצר יחסי עורך דין-לקוח בינכם לבין משרד מאיה זיו עו"ד.'
        },
        {
          title: '3. אין יחסי עורך דין-לקוח',
          content: 'צפייה באתר זה, הגשת טופס יצירת קשר או שליחת דואר אלקטרוני אינם יוצרים יחסי עורך דין-לקוח. יחסים כאלה נוצרים רק באמצעות הסכם התקשרות רשמי בכתב שנחתם על ידי שני הצדדים.'
        },
        {
          title: '4. סודיות',
          content: 'מידע שנשלח דרך אתר זה אינו מובטח כסודי. אנא אל תשלחו מידע רגיש או סודי עד שייווצרו יחסי עורך דין-לקוח באופן רשמי.'
        },
        {
          title: '5. קניין רוחני',
          content: 'כל התוכן באתר זה, לרבות טקסט, גרפיקה, לוגואים ותמונות, הוא רכושו של משרד מאיה זיו עו"ד ומוגן על ידי חוקי זכויות יוצרים ישראליים ובינלאומיים. שימוש בלתי מורשה בתוכן זה אסור.'
        },
        {
          title: '6. הגבלת אחריות',
          content: 'משרד מאיה זיו עו"ד לא יהיה אחראי לכל נזק הנובע משימושכם באתר זה או בכל מידע הכלול בו. זה כולל נזקים ישירים, עקיפים, מקריים, עונשיים ותוצאתיים.'
        },
        {
          title: '7. קישורים לאתרים של צדדים שלישיים',
          content: 'אתר זה עשוי להכיל קישורים לאתרים של צדדים שלישיים. אין לנו שליטה על תוכן אתרים אלו ואיננו אחראים לתוכנם או לנוהליהם.'
        },
        {
          title: '8. הדין החל',
          content: 'תנאי שימוש אלה יהיו כפופים לחוקי מדינת ישראל ויפורשו בהתאם להם. כל סכסוך הנובע מתנאים אלה יהיה כפוף לסמכות השיפוט הבלעדית של בתי המשפט בתל אביב, ישראל.'
        },
        {
          title: '9. שינויים בתנאים',
          content: 'אנו שומרים לעצמנו את הזכות לשנות תנאי שימוש אלה בכל עת. שינויים ייכנסו לתוקף מיידית עם פרסומם באתר זה. המשך השימוש שלכם באתר מהווה הסכמה לתנאים המעודכנים.'
        },
        {
          title: '10. פרטי התקשרות',
          content: 'לשאלות לגבי תנאי שימוש אלה, אנא פנו אלינו בכתובת info@mayaziv-law.com או בטלפון +972.544943597.'
        }
      ]
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
