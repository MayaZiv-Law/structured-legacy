import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalePath } from '@/hooks/useLocalePath';
import { cn } from '@/lib/utils';
import { ArrowRight, ArrowLeft, Calendar, Loader2 } from 'lucide-react';
import fallbackImage from '@/assets/about-hero-bg.webp';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLatestArticles } from '@/hooks/useArticles';
const InsightsSection = () => {
  const {
    t,
    isRTL,
    language
  } = useLanguage();
  const localePath = useLocalePath();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const sectionAnim = useScrollAnimation();
  const {
    data: articles,
    isLoading
  } = useLatestArticles(3);
  return <section aria-label="Insights" className="bg-background section-spacer-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionAnim.ref} className={cn("transition-all duration-700", sectionAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <div className={cn("flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4", isRTL && "font-hebrew")}>
            <div>
              <h2 className="text-fluid-4xl font-display font-semibold text-foreground mb-2">
                {t('insights.title')}
              </h2>
            </div>
            <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Link to={localePath('/insights')} className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
                {t('insights.viewAll')}
                <Arrow className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className={cn("w-12 h-[2px] bg-accent mb-6", isRTL && "ml-auto")} />

          {isLoading ? <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div> : <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles?.map((article, index) => {
            const title = language === 'he' ? article.title_he : article.title_en;
            const excerpt = language === 'he' ? article.excerpt_he : article.excerpt_en;
            const category = language === 'he' ? article.category_he : article.category_en;
            return <Link to={localePath(`/insights/${article.slug}`)} key={article.id} className={cn("group bg-card border border-border rounded-sm overflow-hidden hover:border-accent/50 transition-all duration-500 hover:shadow-lg block", isRTL && "font-hebrew text-right", "opacity-100 translate-y-0 animate-fade-in")} style={{
              animationDelay: `${index * 150}ms`
            }}>
                    {/* Image Container */}
                    <div className="relative h-40 sm:h-48 md:h-52 overflow-hidden bg-secondary">
                      <img src={article.image_url || fallbackImage} alt={title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" decoding="async" onError={(e) => { (e.target as HTMLImageElement).src = fallbackImage; }} />
                      <div className={cn("absolute top-4", isRTL ? "right-4" : "left-4")}>
                        <span className="bg-accent text-accent-foreground text-xs font-medium px-3 py-1 rounded-full">
                          {category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className={cn("flex items-center gap-2 text-muted-foreground text-sm mb-3", isRTL && "flex-row-reverse")}>
                        <Calendar className="h-4 w-4" />
                        <span>
                          {article.published_at ? new Date(article.published_at).toLocaleDateString(language === 'he' ? 'he-IL' : 'en-US') : ''}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-display font-medium text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-2">
                        {title}
                      </h3>

                      <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-2 text-base">
                        {excerpt}
                      </p>

                      <span className={cn("inline-flex items-center gap-2 text-accent font-medium text-sm hover:gap-3 transition-all", isRTL && "flex-row-reverse")}>
                        {t('insights.readMore')}
                        <Arrow className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>;
          })}
            </div>}
        </div>
      </div>
    </section>;
};
export default InsightsSection;
