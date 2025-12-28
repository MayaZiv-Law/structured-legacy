import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Globe, CheckCircle, Users } from 'lucide-react';
import CTASection from '@/components/home/CTASection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Taxation = () => {
  const { t, isRTL, language } = useLanguage();
  const features = [language === 'he' ? 'תכנון מס חוצה גבולות' : 'Cross-border tax planning', language === 'he' ? 'עמידה ב-FATCA ו-CRS' : 'FATCA and CRS compliance', language === 'he' ? 'מניעת כפל מס' : 'Double taxation prevention', language === 'he' ? 'הטבות מס לעולים' : 'New immigrant tax benefits', language === 'he' ? 'דיווח ותיאום עם רשויות' : 'Reporting and authority coordination'];
  const forWhom = [{ title: language === 'he' ? 'אמריקאים בישראל' : 'Americans in Israel', desc: language === 'he' ? 'עמידה בדרישות IRS' : 'IRS compliance requirements' }, { title: language === 'he' ? 'עולים חדשים' : 'New Immigrants', desc: language === 'he' ? 'מיצוי הטבות 10 שנים' : 'Maximizing 10-year benefits' }];
  const faqs = [{ q: language === 'he' ? 'מה זה FATCA?' : 'What is FATCA?', a: language === 'he' ? 'חוק אמריקאי המחייב דיווח על נכסים פיננסיים בחו"ל.' : 'US law requiring reporting of foreign financial assets.' }, { q: language === 'he' ? 'האם אני חייב במס בשתי המדינות?' : 'Am I taxed in both countries?', a: language === 'he' ? 'תלוי באמנות המס - אנחנו מתכננים למניעת כפל.' : 'Depends on tax treaties - we plan to prevent double taxation.' }];

  return (
    <Layout>
      <section className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("max-w-4xl", isRTL && "font-hebrew text-right mr-auto")}>
            <div className="flex items-center gap-3 mb-6"><Globe className="h-8 w-8 text-accent" /><span className="text-accent font-medium">{t('nav.taxation')}</span></div>
            <h1 className="text-4xl sm:text-5xl font-display font-semibold text-foreground mb-6">{language === 'he' ? 'מיסוי בינלאומי' : 'International Taxation'}</h1>
            <p className="text-xl text-muted-foreground">{language === 'he' ? 'תכנון מס אסטרטגי למניעת כפל מס ועמידה ברגולציה בינלאומית.' : 'Strategic tax planning to prevent double taxation and ensure international compliance.'}</p>
          </div>
        </div>
      </section>
      <section className="py-16 gradient-stone">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className={cn(isRTL && "font-hebrew text-right")}><h2 className="text-2xl font-display font-semibold mb-6">{t('service.overview')}</h2><ul className="space-y-3">{features.map((f,i) => <li key={i} className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-accent" /><span>{f}</span></li>)}</ul></div>
            <div className={cn(isRTL && "font-hebrew text-right")}><h2 className="text-2xl font-display font-semibold mb-6">{t('service.forWhom')}</h2><div className="space-y-4">{forWhom.map((w,i) => <div key={i} className="flex items-start gap-3 p-4 bg-card rounded border border-border"><Users className="h-5 w-5 text-accent mt-1" /><div><h3 className="font-medium">{w.title}</h3><p className="text-sm text-muted-foreground">{w.desc}</p></div></div>)}</div></div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-background"><div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl"><h2 className={cn("text-2xl font-display font-semibold mb-8 text-center", isRTL && "font-hebrew")}>{t('service.faq')}</h2><Accordion type="single" collapsible>{faqs.map((faq,i) => <AccordionItem key={i} value={`item-${i}`}><AccordionTrigger className={cn(isRTL && "font-hebrew text-right")}>{faq.q}</AccordionTrigger><AccordionContent className={cn(isRTL && "font-hebrew text-right")}>{faq.a}</AccordionContent></AccordionItem>)}</Accordion></div></section>
      <CTASection />
    </Layout>
  );
};

export default Taxation;