import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Building2, CheckCircle, Users } from 'lucide-react';
import CTASection from '@/components/home/CTASection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const RealEstate = () => {
  const { t, isRTL, language } = useLanguage();

  const features = [
    language === 'he' ? 'בדיקת נאותות מקיפה של הנכס' : 'Comprehensive property due diligence',
    language === 'he' ? 'סקירת חוזה וניהול משא ומתן' : 'Contract review and negotiation',
    language === 'he' ? 'רישום בטאבו ורשויות מקרקעין' : 'Land registry and title registration',
    language === 'he' ? 'תכנון מס ואופטימיזציה' : 'Tax planning and optimization',
    language === 'he' ? 'תאום עם בנקים וגורמים פיננסיים' : 'Bank and financial coordination',
    language === 'he' ? 'ייצוג בעסקאות מרחוק' : 'Remote transaction representation',
  ];

  const forWhom = [
    { title: language === 'he' ? 'תושבי חוץ' : 'Foreign Residents', desc: language === 'he' ? 'רוכשי נכסים מחו"ל' : 'Purchasing property from abroad' },
    { title: language === 'he' ? 'משקיעים' : 'Investors', desc: language === 'he' ? 'נדל"ן מניב ויוקרה' : 'Income and luxury real estate' },
    { title: language === 'he' ? 'עולים חדשים' : 'New Immigrants', desc: language === 'he' ? 'רכישת בית ראשון' : 'First home purchase' },
  ];

  const faqs = [
    { q: language === 'he' ? 'האם אני צריך להיות בישראל לחתימה?' : 'Do I need to be in Israel for signing?', a: language === 'he' ? 'לא, אנחנו מציעים תהליכים מרחוק מלאים דרך הקונסוליות.' : 'No, we offer full remote processes through consulates.' },
    { q: language === 'he' ? 'כמה זמן לוקח התהליך?' : 'How long does the process take?', a: language === 'he' ? 'בדרך כלל 60-90 יום מחתימה ועד רישום.' : 'Typically 60-90 days from signing to registration.' },
    { q: language === 'he' ? 'מה לגבי מיסוי?' : 'What about taxation?', a: language === 'he' ? 'אנחנו מתכננים את העסקה למיצוי כל הטבות המס הרלוונטיות.' : 'We structure transactions to maximize all relevant tax benefits.' },
  ];

  return (
    <Layout>
      <section className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("max-w-4xl", isRTL && "font-hebrew text-right mr-auto")}>
            <div className="flex items-center gap-3 mb-6"><Building2 className="h-8 w-8 text-accent" /><span className="text-accent font-medium">{t('nav.realEstate')}</span></div>
            <h1 className="text-4xl sm:text-5xl font-display font-semibold text-foreground mb-6">{language === 'he' ? 'עסקאות נדל"ן יוקרתי' : 'Luxury Real Estate Transactions'}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">{language === 'he' ? 'בדיקת נאותות מלאה והערכת סיכונים לרכישות נדל"ן בישראל, עם דגש על לקוחות בינלאומיים.' : 'Full due diligence and risk assessment for Israeli property purchases, with emphasis on international clients.'}</p>
          </div>
        </div>
      </section>
      <section className="py-16 gradient-stone">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className={cn(isRTL && "font-hebrew text-right")}>
              <h2 className="text-2xl font-display font-semibold mb-6">{t('service.overview')}</h2>
              <ul className="space-y-3">{features.map((f,i) => <li key={i} className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-accent flex-shrink-0" /><span>{f}</span></li>)}</ul>
            </div>
            <div className={cn(isRTL && "font-hebrew text-right")}>
              <h2 className="text-2xl font-display font-semibold mb-6">{t('service.forWhom')}</h2>
              <div className="space-y-4">{forWhom.map((w,i) => <div key={i} className="flex items-start gap-3 p-4 bg-card rounded border border-border"><Users className="h-5 w-5 text-accent mt-1" /><div><h3 className="font-medium">{w.title}</h3><p className="text-sm text-muted-foreground">{w.desc}</p></div></div>)}</div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className={cn("text-2xl font-display font-semibold mb-8 text-center", isRTL && "font-hebrew")}>{t('service.faq')}</h2>
          <Accordion type="single" collapsible className="w-full">{faqs.map((faq,i) => <AccordionItem key={i} value={`item-${i}`}><AccordionTrigger className={cn(isRTL && "font-hebrew text-right")}>{faq.q}</AccordionTrigger><AccordionContent className={cn(isRTL && "font-hebrew text-right")}>{faq.a}</AccordionContent></AccordionItem>)}</Accordion>
        </div>
      </section>
      <CTASection />
    </Layout>
  );
};

export default RealEstate;