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

const About = () => {
  const { t, isRTL, language } = useLanguage();
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: language === 'he' ? 'בית' : 'Home', url: 'https://mayaziv-law.com/' },
    { name: language === 'he' ? 'אודות' : 'About', url: 'https://mayaziv-law.com/about' },
  ]);
  const localePath = useLocalePath();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  // Scroll animations
  const philosophyAnim = useScrollAnimation();
  const serveAnim = useScrollAnimation();
  const ctaAnim = useScrollAnimation();

  return (
    <Layout>
      <SEO
        titleEn="About Maya Ziv Law | Premier Legal Counsel in Israel"
        titleHe="מאיה זיו משרד עורכי דין | מקרקעין | מיסוי בינלאומי | ניהול עזבונות וצוואות"
        descriptionEn="Maya Ziv Law operates as a dedicated partner to each client, creating original solutions for complex domestic and cross border matters. Real estate, taxation, estate planning, and commercial law in Israel."
        descriptionHe="ניהול סיכונים משפטי ואסטרטגיית מיסוי עבור תושבי ישראל ולקוחות בזירה הגלובלית. התמחות בבדיקת נאותות למקרקעין, ציות בנקאי וניהול עזבונות חוצי גבולות."
        path="/about"
        schema={[attorneySchema, breadcrumbSchema]}
      />

      {/* Hero Section - Clean image, no overlay box */}
      <section className="relative min-h-[70vh] sm:min-h-[75vh] flex items-end overflow-visible -mt-0 lg:-mt-20">
        <div className="absolute inset-0 z-0">
          <img
            src={aboutHeroBg}
            alt={t('about.hero.title')}
            className="w-full h-full object-cover"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            width={1920}
            height={1080}
          />
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="pt-12 sm:pt-16 pb-12 gradient-stone">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={philosophyAnim.ref}
            className={cn(
              "max-w-4xl mx-auto transition-all duration-700",
              isRTL && "font-hebrew text-right",
              philosophyAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            {t('about.philosophy.title') && (
              <>
                <h2 className="text-4xl sm:text-5xl font-display font-semibold text-foreground mb-5">
                  {t('about.philosophy.title')}
                </h2>
                <div className={cn("w-16 h-0.5 bg-accent mb-6", isRTL && "mr-0 ml-auto")} />
              </>
            )}
            <div className="space-y-5">
              <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                {t('about.philosophy.body')}
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                {t('about.philosophy.body2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve Section - Bridges between sections */}
      <section className="relative z-20 pb-0 pt-12 bg-background overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={serveAnim.ref}
            className={cn(
              "relative max-w-6xl mx-auto transition-all duration-700",
              serveAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            {/* Offset beige background that extends down into next section */}
            <div className={cn(
              "absolute -top-12 w-[95%] bg-secondary",
              "h-[calc(100%+9rem)]",
              isRTL ? "left-0 -ml-4 lg:-ml-16" : "right-0 -mr-4 lg:-mr-16"
            )} />
            
            {/* White content card - overlaps next section */}
            <div className={cn(
              "relative z-10 bg-background py-8 px-6 lg:py-10 lg:px-10 w-full sm:w-[92%] shadow-sm",
              isRTL ? "mr-auto ml-0" : "ml-auto mr-0"
            )}>
              <div className={cn(isRTL && "font-hebrew text-right")}>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-foreground mb-5">
                  {t('about.serve.title')}
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed text-lg sm:text-xl">
                    {t('about.serve.body')}
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-lg sm:text-xl">
                    {t('about.serve.body2')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <MethodologySection />

      {/* CTA Section */}
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={ctaAnim.ref}
            className={cn(
              "max-w-3xl mx-auto text-center transition-all duration-700",
              isRTL && "font-hebrew",
              ctaAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-body font-semibold text-primary-foreground mb-5">
              {t('about.cta.title')}
            </h2>
            
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              {t('about.cta.body')}
            </p>

            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-4 sm:px-6 lg:px-10 py-4 sm:py-6 text-base group max-w-full"
            >
              <Link to={localePath('/contact')} className={cn("flex items-center gap-2 whitespace-normal text-center", isRTL && "flex-row-reverse")}>
                {t('about.cta.button')}
                <Arrow className="h-4 w-4 flex-shrink-0 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
