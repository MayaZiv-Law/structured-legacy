import { lazy, Suspense } from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import IntroSection from '@/components/home/IntroSection';
import GuideSection from '@/components/home/GuideSection';
import { SEO, organizationSchema, websiteSchema, localBusinessSchema } from '@/components/SEO';

// Lazy load below-the-fold sections to improve TTI
const ParallaxSection = lazy(() => import('@/components/home/ParallaxSection'));
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
        titleEn="Maya Ziv Law | Israeli Attorney for Real Estate, Tax and Cross Border Transactions"
        titleHe="משרד עורכי דין מאיה זיו | מקרקעין | מיסוי בינלאומי | ניהול עזבונות"
        descriptionEn="Israeli law firm advising private clients and businesses on real estate, cross border transactions, taxation and estate planning in Israel. Legal and financial expertise combined."
        descriptionHe="ניהול סיכונים משפטי ואסטרטגיית מיסוי עבור תושבי ישראל ולקוחות בזירה הגלובלית. התמחות בבדיקת נאותות למקרקעין, ציות בנקאי וניהול עזבונות חוצי גבולות."
        path="/"
        schema={[organizationSchema, websiteSchema, localBusinessSchema]}
      />
      <HeroSection />
      <IntroSection />
      <GuideSection />
      <Suspense fallback={<SectionLoader />}>
        <ParallaxSection />
      </Suspense>
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