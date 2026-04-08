import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useLocalePath } from '@/hooks/useLocalePath';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import aboutHeroBg from '@/assets/about-hero-globe.webp';
import { SEO, attorneySchema, createBreadcrumbSchema } from '@/components/SEO';
import MethodologySection from '@/components/home/MethodologySection';
import PageHero from '@/components/shared/PageHero';

const About = () => {
  const { t, isRTL, language } = useLanguage();
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: language === 'he' ? 'בית' : 'Home', url: 'https://mayaziv-law.com/' },
    { name: language === 'he' ? 'אודות' : 'About', url: 'https://mayaziv-law.com/about' },
  ]);
  const localePath = useLocalePath();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const mainBodyAnim = useScrollAnimation();
  const ctaAnim = useScrollAnimation();

  return (
    <Layout>
      <SEO
        titleEn="About Maya Ziv Law | Premier Legal Counsel in Israel"
        titleHe="מאיה זיו משרד עורכי דין | מקרקעין | מיסוי בינלאומי | ניהול עזבונות וצוואות"
        descriptionEn="Maya Ziv Law operates as a dedicated partner to each client, creating original solutions for complex domestic and cross-border matters. Real estate, taxation, estate planning, and commercial law in Israel."
        descriptionHe="ניהול סיכונים משפטי ואסטרטגיית מיסוי עבור תושבי ישראל ולקוחות בזירה הגלובלית. התמחות בבדיקת נאותות למקרקעין, ציות בנקאי וניהול עזבונות חוצי גבולות."
        path="/about"
        schema={[attorneySchema, breadcrumbSchema]}
      />

      {/* Hero Section - Same style as expertise pages */}
      <PageHero backgroundImage={aboutHeroBg} title={t('about.hero.title')} />

      {/* Main Body */}
      <section className="section-spacer-md gradient-stone">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={mainBodyAnim.ref}
            className={cn(
              "max-w-4xl mx-auto transition-all duration-700",
              isRTL && "font-hebrew text-right",
              mainBodyAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
              {t('about.mainBody').split('. ').map((sentence, i, arr) => (
                <span key={i}>
                  {sentence}{i < arr.length - 1 ? '.' : ''}
                  {i < arr.length - 1 && <><br /><br /></>}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* 6 Image+Text Blocks */}
      <MethodologySection />

      {/* CTA Section */}
      <section className="section-spacer-lg bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={ctaAnim.ref}
            className={cn(
              "max-w-3xl mx-auto text-center transition-all duration-700",
              isRTL && "font-hebrew",
              ctaAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <div className="w-12 h-[2px] bg-accent mx-auto mb-6" />

            <h2 className="text-fluid-4xl font-display font-semibold text-primary-foreground mb-5">
              {t('about.cta.title')}
            </h2>

            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              {t('about.cta.body')}
            </p>

            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-6 sm:px-8 lg:px-12 py-5 sm:py-6 text-base group max-w-full transition-shadow hover:shadow-premium"
            >
              <Link to={localePath('/contact')} className={cn("flex items-center gap-2 whitespace-normal text-center", isRTL && "flex-row-reverse")}>
                {t('about.cta.button')}
                <Arrow className={cn("h-4 w-4 flex-shrink-0 transition-transform duration-300", isRTL ? "group-hover:-translate-x-1" : "group-hover:translate-x-1")} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
