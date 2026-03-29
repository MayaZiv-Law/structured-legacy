import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalePath } from '@/hooks/useLocalePath';
import { cn } from '@/lib/utils';
import { Calendar, ArrowRight, Loader2 } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLatestArticles } from '@/hooks/useArticles';
import { SEO } from '@/components/SEO';
import fallbackImage from '@/assets/about-hero-bg.webp';

const Insights = () => {
  const { t, isRTL, language } = useLanguage();
  const localePath = useLocalePath();
  const headerAnim = useScrollAnimation();
  const articlesAnim = useScrollAnimation();

  const { data: articles, isLoading } = useLatestArticles(3);

  return (
    <Layout>
      <SEO
        titleEn="Legal Insights and Articles | Maya Ziv Law"
        titleHe="תובנות משפטיות ומאמרים | משרד מאיה זיו"
        descriptionEn="Practical guidance on Israeli real estate, cross border taxation, compliance, and legacy planning from Maya Ziv Law."
        descriptionHe="הנחיות מעשיות בנושאי נדל״ן בישראל, מיסוי חוצה גבולות, ציות ותכנון מורשת ממשרד מאיה זיו."
        path="/insights"
      />

      {/* Clean text header - no hero image */}
      <section className="pt-28 sm:pt-32 pb-10 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={headerAnim.ref}
            className={cn(
              "max-w-4xl transition-all duration-700",
              isRTL && "font-hebrew text-right ml-auto",
              headerAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <div className={cn("w-16 h-0.5 bg-accent mb-6", isRTL && "mr-0 ml-auto")} />
            <h1 className={cn("text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-foreground mb-4", isRTL && "font-hebrew")}>
              {t('insights.hero.title')}
            </h1>
            <p className={cn("text-lg sm:text-xl text-muted-foreground", isRTL && "font-hebrew")}>
              {t('insights.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="pb-16 gradient-stone">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={articlesAnim.ref}>
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {articles?.map((article, i) => {
                  const title = language === 'he' ? article.title_he : article.title_en;
                  const excerpt = language === 'he' ? article.excerpt_he : article.excerpt_en;
                  const category = language === 'he' ? article.category_he : article.category_en;

                  return (
                    <Link
                      to={localePath(`/insights/${article.slug}`)}
                      key={article.id}
                      className={cn(
                        "group bg-card border border-border rounded-sm overflow-hidden hover:border-accent/50 transition-all hover:shadow-lg block duration-500",
                        isRTL && "font-hebrew text-right",
                        articlesAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                      )}
                      style={{ transitionDelay: articlesAnim.isVisible ? `${i * 150}ms` : '0ms' }}
                    >
                      <div className="relative h-40 sm:h-48 md:h-52 overflow-hidden bg-secondary">
                        <img
                          src={article.image_url || fallbackImage}
                          alt={title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => { (e.target as HTMLImageElement).src = fallbackImage; }}
                        />
                        <div className={cn("absolute top-4", isRTL ? "right-4" : "left-4")}>
                          <span className="bg-accent text-accent-foreground text-xs font-medium px-3 py-1 rounded-full">
                            {category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className={cn("flex items-center gap-2 text-muted-foreground text-sm mb-3", isRTL && "flex-row-reverse")}>
                          <Calendar className="h-4 w-4" />
                          <span>
                            {article.published_at
                              ? new Date(article.published_at).toLocaleDateString(language === 'he' ? 'he-IL' : 'en-US')
                              : ''}
                          </span>
                        </div>
                        <h3 className="text-xl font-display font-medium text-foreground mb-3 line-clamp-2">
                          {title}
                        </h3>
                        <p className="text-muted-foreground text-base mb-4 line-clamp-2">
                          {excerpt}
                        </p>
                        <span className={cn("flex items-center gap-2 text-accent font-medium text-sm group-hover:gap-3 transition-all", isRTL && "flex-row-reverse")}>
                          {t('insights.readMore')}
                          <ArrowRight className={cn("h-4 w-4", isRTL && "rotate-180")} />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Insights;
