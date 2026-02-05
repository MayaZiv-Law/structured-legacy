import { lazy, Suspense } from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import ConflictSection from '@/components/home/ConflictSection';
import GuideSection from '@/components/home/GuideSection';
import { SEO, organizationSchema } from '@/components/SEO';

// Lazy load below-the-fold sections to improve TTI
const ParallaxSection = lazy(() => import('@/components/home/ParallaxSection'));
const PracticeAreasSection = lazy(() => import('@/components/home/PracticeAreasSection'));
const InsightsSection = lazy(() => import('@/components/home/InsightsSection'));
const FAQSection = lazy(() => import('@/components/home/FAQSection'));
const CTASection = lazy(() => import('@/components/home/CTASection'));

const SectionLoader = () => (
  <div className="min-h-[200px]" />
);

const Index = () => {
  return (
    <Layout>
      <SEO
        titleEn="Maya Ziv Law | Attorney in Israel for domestic and International Clients"
        titleHe="משרד עורכי דין מאיה זיו | מקרקעין | מיסוי בינלאומי | ניהול עזבונות"
        descriptionEn="Premium legal services for domestic clients and international clients in Israel and abroad. Attorney services, real estate, taxation, wills and estate planning, commercial and civil."
        descriptionHe="ניהול סיכונים משפטי ואסטרטגיית מיסוי עבור תושבי ישראל ולקוחות בזירה הגלובלית. התמחות בבדיקת נאותות למקרקעין, ציות בנקאי וניהול עזבונות חוצי גבולות."
        path="/"
        schema={organizationSchema}
      />
      <HeroSection />
      <ConflictSection />
      <GuideSection />
      <Suspense fallback={<SectionLoader />}>
        <ParallaxSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <PracticeAreasSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <InsightsSection />
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