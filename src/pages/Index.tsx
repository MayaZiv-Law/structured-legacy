import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import ConflictSection from '@/components/home/ConflictSection';
import GuideSection from '@/components/home/GuideSection';
import ParallaxSection from '@/components/home/ParallaxSection';
import MethodologySection from '@/components/home/MethodologySection';
import PracticeAreasSection from '@/components/home/PracticeAreasSection';
import InsightsSection from '@/components/home/InsightsSection';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <Layout>
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