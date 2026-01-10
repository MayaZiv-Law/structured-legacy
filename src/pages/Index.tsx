import { lazy, Suspense } from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import ConflictSection from '@/components/home/ConflictSection';
import GuideSection from '@/components/home/GuideSection';
import { SEO, organizationSchema } from '@/components/SEO';

// Lazy load below-the-fold sections to improve TTI
const ParallaxSection = lazy(() => import('@/components/home/ParallaxSection'));
const MethodologySection = lazy(() => import('@/components/home/MethodologySection'));
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
        titleEn="Maya Ziv Law | Attorney & Notary in Tel Aviv for Cross-Border Matters"
        titleHe="מאיה זיו עו״ד ונוטריון | ייצוג משפטי בינלאומי בתל אביב"
        descriptionEn="Maya Ziv Law provides legal services for real estate, taxation, estate planning, and cross-border transactions in Israel. Attorney & Notary in Tel Aviv."
        descriptionHe="משרד מאיה זיו מספק שירותים משפטיים בנדל״ן, מיסוי, תכנון עיזבון ועסקאות בינלאומיות בישראל. עורכת דין ונוטריון בתל אביב."
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
        <MethodologySection />
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