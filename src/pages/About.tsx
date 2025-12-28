import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { FileCheck, Clock, MessageCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';

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
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
                    alt="Maya Ziv - Attorney & Notary"
                    className="w-full h-full object-cover object-center"
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

      {/* Who We Serve Section */}
      <section className="py-20 gradient-stone">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("max-w-4xl mx-auto", isRTL && "font-hebrew text-right")}>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mb-6">
              {t('about.serve.title')}
            </h2>
            <div className={cn("w-16 h-0.5 bg-accent mb-8", isRTL && "mr-0 ml-auto")} />
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('about.serve.body')}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('about.serve.body2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("text-center mb-12", isRTL && "font-hebrew")}>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mb-4">
              {t('about.expect.title')}
            </h2>
            <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('about.expect.intro')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {expectations.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "bg-card p-8 rounded-sm border border-border hover:border-accent/50 transition-colors",
                  isRTL && "font-hebrew text-right"
                )}
              >
                <div className={cn(
                  "flex items-center gap-4 mb-4",
                  isRTL && "flex-row-reverse"
                )}>
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-display font-medium text-foreground">
                    {t(item.titleKey)}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
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
