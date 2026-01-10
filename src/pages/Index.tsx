import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import ConflictSection from '@/components/home/ConflictSection';
import GuideSection from '@/components/home/GuideSection';
import ParallaxSection from '@/components/home/ParallaxSection';
import MethodologySection from '@/components/home/MethodologySection';
import PracticeAreasSection from '@/components/home/PracticeAreasSection';
import InsightsSection from '@/components/home/InsightsSection';
import CTASection from '@/components/home/CTASection';
import { SEO, organizationSchema } from '@/components/SEO';

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
      <ParallaxSection />
      <MethodologySection />
      <PracticeAreasSection />
      <InsightsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;