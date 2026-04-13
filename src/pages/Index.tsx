import { lazy, Suspense } from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import IntroSection from '@/components/home/IntroSection';
import GuideSection from '@/components/home/GuideSection';
import { SEO, organizationSchema, websiteSchema, localBusinessSchema, createFAQSchema } from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';

// Lazy load below-the-fold sections to improve TTI
const PracticeAreasSection = lazy(() => import('@/components/home/PracticeAreasSection'));
const FAQSection = lazy(() => import('@/components/home/FAQSection'));
const CTASection = lazy(() => import('@/components/home/CTASection'));

const SectionLoader = () => (
  <div className="min-h-[200px]" />
);

const Index = () => {
  const { t } = useLanguage();

  const faqSchema = createFAQSchema([
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    { question: t('faq.q4'), answer: t('faq.a4') },
    { question: t('faq.q5'), answer: t('faq.a5') },
    { question: t('faq.q6'), answer: t('faq.a6') },
    { question: t('faq.q7'), answer: t('faq.a7') },
    { question: t('faq.q8'), answer: t('faq.a8') },
    { question: t('faq.q9'), answer: t('faq.a9') },
  ]);

  return (
    <Layout>
      <SEO
        titleEn="Maya Ziv Law | Israel Real Estate, Commercial & Cross-Border Counsel"
        titleHe="מאיה זיו עורכי דין | מקרקעין, פיננסי ומסחרי בינלאומי | ניהול עזבונות"
        descriptionEn="Israeli law firm advising private clients and businesses on real estate, commercial transactions, cross-border matters and estate planning, combining international legal and financial expertise."
        descriptionHe="ניהול סיכונים משפטי ואסטרטגיית מיסוי עבור תושבי ישראל ולקוחות בזירה הגלובלית. התמחות בבדיקת נאותות למקרקעין, ציות בנקאי וניהול עזבונות חוצי גבולות."
        path="/"
        schema={[organizationSchema, websiteSchema, localBusinessSchema, faqSchema]}
      />
      <HeroSection />
      <IntroSection />
      <GuideSection />
      <Suspense fallback={<SectionLoader />}>
        <PracticeAreasSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <FAQSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <CTASection />
      </Suspense>
    </Layout>
  );
};

export default Index;
