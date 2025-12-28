import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { FileCheck, Clock, MessageCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';
import mayaPortrait from '@/assets/maya-portrait.webp';

const About = () => {
  const { t, isRTL, language } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const expectations = [
    {
      icon: FileCheck,
      titleKey: 'about.expect.doc.title',
      descKey: 'about.expect.doc.desc',
    },
    {
      icon: Clock,
      titleKey: 'about.expect.timeline.title',
      descKey: 'about.expect.timeline.desc',
    },
    {
      icon: MessageCircle,
      titleKey: 'about.expect.comm.title',
      descKey: 'about.expect.comm.desc',
    },
  ];

  return (
    <Layout>
      <Helmet>
        <title>{language === 'he' ? 'אודות משרד מאיה זיו | עורכת דין ונוטריון בתל אביב' : 'About Maya Ziv Law | Attorney & Notary in Tel Aviv'}</title>
        <meta name="description" content={language === 'he' 
          ? 'משרד מאיה זיו משלב מומחיות משפטית עם משמעת פיננסית. ייצוג לקוחות בינלאומיים בישראל עם בהירות, מבניות וראייה חוצת גבולות.'
          : 'Maya Ziv Law combines legal expertise with financial discipline. Representing international clients in Israel with clarity, structure, and cross-border foresight.'
        } />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("max-w-4xl", isRTL && "font-hebrew text-right mr-auto")}>
            <div className={cn("w-16 h-1 bg-accent mb-8", isRTL && "mr-0")} />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-foreground mb-6">
              {t('about.hero.title')}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('about.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 gradient-stone">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("max-w-4xl mx-auto", isRTL && "font-hebrew text-right")}>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mb-6">
              {t('about.philosophy.title')}
            </h2>
            <div className={cn("w-16 h-0.5 bg-accent mb-8", isRTL && "mr-0 ml-auto")} />
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('about.philosophy.body')}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('about.philosophy.body2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Attorney Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn(
            "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center",
            isRTL && "lg:grid-flow-dense"
          )}>
            {/* Image */}
            <div className={cn(isRTL && "lg:col-start-2")}>
              <div className="relative">
                <div className="aspect-[3/4] overflow-hidden rounded-sm shadow-premium">
                  <img
                    src={mayaPortrait}
                    alt="Maya Ziv - Attorney & Notary"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* Decorative accent */}
                <div className={cn(
                  "absolute -bottom-4 w-24 h-1 bg-accent",
                  isRTL ? "-left-4" : "-right-4"
                )} />
              </div>
            </div>

            {/* Content */}
            <div className={cn(isRTL && "lg:col-start-1 font-hebrew text-right")}>
              <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mb-6">
                {t('about.attorney.title')}
              </h2>
              <div className={cn("w-16 h-0.5 bg-accent mb-8", isRTL && "mr-0 ml-auto")} />
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t('about.attorney.body')}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t('about.attorney.body2')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve Section - Bridges between sections */}
      <section className="relative z-20 pb-0 pt-20 bg-background overflow-visible">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-6xl mx-auto">
            {/* Offset beige background that extends down into next section */}
            <div className={cn(
              "absolute top-0 w-[95%] bg-secondary",
              "h-[calc(100%+14rem)]",
              isRTL ? "left-0 -ml-8 lg:-ml-16" : "right-0 -mr-8 lg:-mr-16"
            )} />
            
            {/* White content card - overlaps next section */}
            <div className={cn(
              "relative z-10 bg-background py-12 px-8 lg:py-16 lg:px-12 w-[92%] shadow-sm",
              isRTL ? "mr-auto ml-0" : "ml-auto mr-0"
            )}>
              <div className={cn(isRTL && "font-hebrew text-right")}>
                <h2 className="text-2xl sm:text-3xl font-display font-semibold text-foreground mb-6">
                  {t('about.serve.title')}
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {t('about.serve.body')}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('about.serve.body2')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="pt-40 lg:pt-52 pb-16 lg:pb-24 bg-secondary/30 -mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("text-center mb-12", isRTL && "font-hebrew")}>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground">
              {t('about.expect.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-16 max-w-5xl mx-auto">
            {expectations.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col items-center text-center",
                  isRTL && "font-hebrew"
                )}
              >
                {/* Icon with outlined circle */}
                <div className="w-12 h-12 rounded-full border border-accent flex items-center justify-center mb-4">
                  <item.icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-display font-medium text-foreground mb-3 italic">
                  {t(item.titleKey)}
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {t(item.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn(
            "max-w-3xl mx-auto text-center",
            isRTL && "font-hebrew"
          )}>
            <div className="w-16 h-0.5 bg-accent mx-auto mb-8" />
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-primary-foreground mb-6">
              {t('about.cta.title')}
            </h2>
            
            <p className="text-primary-foreground/80 text-lg mb-10 max-w-xl mx-auto">
              {t('about.cta.body')}
            </p>

            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-10 py-6 text-base group"
            >
              <Link to="/contact" className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
                {t('about.cta.button')}
                <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
