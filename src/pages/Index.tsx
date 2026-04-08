import { lazy, Suspense } from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import IntroSection from '@/components/home/IntroSection';
import GuideSection from '@/components/home/GuideSection';
import { SEO, organizationSchema, websiteSchema, localBusinessSchema } from '@/components/SEO';

// Lazy load below-the-fold sections to improve TTI
const PracticeAreasSection = lazy(() => import('@/components/home/PracticeAreasSection'));
const FAQSection = lazy(() => import('@/components/home/FAQSection'));
const CTASection = lazy(() => import('@/components/home/CTASection'));

const SectionLoader = () => (
  <div className="min-h-[200px]" />
);

const Index = () => {
  return (
    <Layout>
      <SEO
        titleEn="Maya Ziv Law | Israel Real Estate, Commercial & Cross-Border Counsel"
        titleHe="מאיה זיו עורכי דין | מקרקעין, פיננסי ומסחרי בינלאומי | ניהול עזבונות"
        descriptionEn="Israeli law firm advising private clients and businesses on real estate, commercial transactions, cross-border matters and estate planning, combining international legal and financial expertise."
        descriptionHe="ניהול סיכונים משפטי ואסטרטגיית מיסוי עבור תושבי ישראל ולקוחות בזירה הגלובלית. התמחות בבדיקת נאותות למקרקעין, ציות בנקאי וניהול עזבונות חוצי גבולות."
        path="/"
        schema={[organizationSchema, websiteSchema, localBusinessSchema]}
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