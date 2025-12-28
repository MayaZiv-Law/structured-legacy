import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { FileText, CheckCircle, Users } from 'lucide-react';
import CTASection from '@/components/home/CTASection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const EstatePlanning = () => {
  const { t, isRTL, language } = useLanguage();
  const features = [language === 'he' ? 'צוואות חוצות גבולות' : 'Cross-border wills', language === 'he' ? 'הקמת נאמנויות' : 'Trust establishment', language === 'he' ? 'תכנון ירושה רב-תחומי' : 'Multi-jurisdiction succession', language === 'he' ? 'הגנה על נכסים' : 'Asset protection', language === 'he' ? 'העברה בין-דורית' : 'Intergenerational transfer'];
  const forWhom = [{ title: language === 'he' ? 'משפחות בינלאומיות' : 'International Families', desc: language === 'he' ? 'נכסים בכמה מדינות' : 'Assets in multiple countries' }, { title: language === 'he' ? 'בעלי עסקים' : 'Business Owners', desc: language === 'he' ? 'תכנון המשכיות' : 'Succession planning' }];
  const faqs = [{ q: language === 'he' ? 'האם צוואה ישראלית תקפה בחו"ל?' : 'Is an Israeli will valid abroad?', a: language === 'he' ? 'תלוי במדינה - אנחנו מתכננים לתוקף בכל התחומים הרלוונטיים.' : 'Depends on jurisdiction - we plan for validity across all relevant territories.' }];

  return (
    <Layout>
      <section className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("max-w-4xl", isRTL && "font-hebrew text-right mr-auto")}>
            <div className="flex items-center gap-3 mb-6"><FileText className="h-8 w-8 text-accent" /><span className="text-accent font-medium">{t('nav.estate')}</span></div>
            <h1 className="text-4xl sm:text-5xl font-display font-semibold text-foreground mb-6">{language === 'he' ? 'ירושות וצוואות' : 'Estate Planning'}</h1>
            <p className="text-xl text-muted-foreground">{language === 'he' ? 'הגנה על המורשת שלכם עם תכנון עיזבון חוצה גבולות.' : 'Protecting your legacy with cross-border estate planning.'}</p>
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

export default EstatePlanning;