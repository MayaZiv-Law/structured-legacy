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
        titleEn="Maya Ziv Law | Real Estate, Commercial, Cross Border | International Legal Counsel in Israel"
        titleHe="משרד עורכי דין מאיה זיו | מקרקעין | פיננסי ומסחרי | ניהול עזבונות | בינלאומי"
        descriptionEn="Israeli law firm advising private clients and businesses on real estate, commercial transactions, cross border matters and estate planning. International legal and financial expertise combined."
        descriptionHe="ייעוץ משפטי ואסטרטגיה מסחרית עבור תושבי ישראל ולקוחות בזירה הגלובלית. התמחות במקרקעין, פיננסי ומסחרי בינלאומי, וניהול עזבונות חוצי גבולות."
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