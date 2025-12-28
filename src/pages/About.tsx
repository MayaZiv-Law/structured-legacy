import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Eye, Layout as LayoutIcon, Lightbulb, GraduationCap, LineChart, Languages, Award } from 'lucide-react';
import CTASection from '@/components/home/CTASection';

const About = () => {
  const { t, isRTL, language } = useLanguage();

  const values = [
    {
      icon: Eye,
      titleKey: 'about.values.clarity',
      descKey: 'about.values.clarity.desc',
    },
    {
      icon: LayoutIcon,
      titleKey: 'about.values.structure',
      descKey: 'about.values.structure.desc',
    },
    {
      icon: Lightbulb,
      titleKey: 'about.values.foresight',
      descKey: 'about.values.foresight.desc',
    },
  ];

  const credentials = [
    {
      icon: GraduationCap,
      title: language === 'he' ? 'השכלה' : 'Education',
      items: [
        language === 'he' ? 'תואר ראשון במשפטים (LL.B)' : 'LL.B in Law',
        language === 'he' ? 'תואר בחשבונאות' : 'Degree in Accounting',
        language === 'he' ? 'הסמכה בינלאומית' : 'International Certification',
      ],
    },
    {
      icon: LineChart,
      title: language === 'he' ? 'ניסיון' : 'Experience',
      items: [
        language === 'he' ? 'עריכת דין מאז 2010' : 'Legal practice since 2010',
        language === 'he' ? 'ניסיון בחברות רב-לאומיות' : 'Multinational company experience',
        language === 'he' ? 'מאות עסקאות חוצות גבולות' : 'Hundreds of cross-border transactions',
      ],
    },
    {
      icon: Languages,
      title: language === 'he' ? 'שפות' : 'Languages',
      items: [
        language === 'he' ? 'עברית - שפת אם' : 'Hebrew - Native',
        language === 'he' ? 'אנגלית - שפת אם' : 'English - Native',
        language === 'he' ? 'צרפתית - שוטף' : 'French - Fluent',
      ],
    },
    {
      icon: Award,
      title: language === 'he' ? 'חברויות' : 'Memberships',
      items: [
        language === 'he' ? 'לשכת עורכי הדין בישראל' : 'Israel Bar Association',
        language === 'he' ? 'איגוד המשפט הבינלאומי' : 'International Law Association',
      ],
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("max-w-4xl", isRTL && "font-hebrew text-right mr-auto")}>
            <div className={cn("w-16 h-1 bg-accent mb-8", isRTL && "mr-0")} />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-foreground mb-6">
              {t('about.title')}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('about.approach.desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Maya Ziv Profile */}
      <section className="py-20 gradient-stone">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn(
            "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start",
            isRTL && "lg:grid-flow-dense"
          )}>
            {/* Image */}
            <div className={cn(isRTL && "lg:col-start-2")}>
              <div className="sticky top-32">
                <div className="aspect-[3/4] overflow-hidden rounded-sm shadow-premium">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
                    alt="Maya Ziv"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className={cn(isRTL && "lg:col-start-1 font-hebrew text-right")}>
              <h2 className="text-3xl font-display font-semibold text-foreground mb-2">
                {t('guide.title')}
              </h2>
              <p className="text-accent font-medium mb-8">{t('guide.role')}</p>

              <p className="text-muted-foreground leading-relaxed mb-8">
                {t('guide.bio')}
              </p>

              <p className="text-muted-foreground leading-relaxed mb-12">
                {language === 'he' 
                  ? 'הגישה של מאיה מבוססת על האמונה שהכנה יסודית מונעת בעיות לפני שהן מתעוררות. על ידי יישום משמעת אנליטית בכל מקרה, היא מספקת ללקוחותיה בהירות ושקט נפשי בעסקאות המשמעותיות ביותר שלהם.'
                  : "Maya's approach is grounded in the belief that thorough preparation prevents problems before they arise. By applying analytical discipline to every case, she provides her clients with clarity and peace of mind in their most significant transactions."
                }
              </p>

              {/* Credentials Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {credentials.map((cred, index) => (
                  <div key={index} className="bg-card p-6 rounded-sm border border-border">
                    <div className={cn("flex items-center gap-3 mb-4", isRTL && "flex-row-reverse")}>
                      <cred.icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                      <h3 className="font-display font-medium text-foreground">{cred.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {cred.items.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground">{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("text-center mb-16", isRTL && "font-hebrew")}>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mb-4">
              {t('about.values.title')}
            </h2>
            <div className="w-16 h-0.5 bg-accent mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className={cn(
                  "text-center p-8 rounded-sm bg-card border border-border",
                  isRTL && "font-hebrew"
                )}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-6">
                  <value.icon className="h-7 w-7 text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-display font-medium text-foreground mb-4">
                  {t(value.titleKey)}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t(value.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default About;