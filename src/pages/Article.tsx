import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Calendar, ArrowLeft, Clock, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useArticle } from '@/hooks/useArticles';
import { SEO, createArticleSchema } from '@/components/SEO';

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, isRTL } = useLanguage();
  const { data: article, isLoading, error } = useArticle(slug);

  // Safe function to render bold text without dangerouslySetInnerHTML
  const renderBoldText = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) => 
      i % 2 === 1 ? <strong key={i} className="text-foreground">{part}</strong> : part
    );
  };

  const renderContent = (content: string[]) => {
    return content.map((paragraph, index) => {
      // H1 heading
      if (paragraph.startsWith('# ') && !paragraph.startsWith('## ')) {
        return (
          <h1 key={index} className="text-3xl font-display font-bold text-foreground mt-10 mb-6">
            {paragraph.replace('# ', '')}
          </h1>
        );
      }
      // H2 heading
      if (paragraph.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-display font-semibold text-foreground mt-10 mb-4">
            {paragraph.replace('## ', '')}
          </h2>
        );
      }
      // H3 heading
      if (paragraph.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl font-display font-medium text-foreground mt-8 mb-3">
            {paragraph.replace('### ', '')}
          </h3>
        );
      }
      // Italic disclaimer
      if (paragraph.startsWith('*') && paragraph.endsWith('*') && !paragraph.startsWith('**')) {
        return (
          <p key={index} className="text-muted-foreground italic text-sm border-l-2 border-accent/30 pl-4 my-6">
            {paragraph.slice(1, -1)}
          </p>
        );
      }
      // Bullet list item
      if (paragraph.startsWith('- ') || paragraph.startsWith('• ')) {
        return (
          <li key={index} className="text-muted-foreground leading-relaxed ml-4 mb-2">
            {renderBoldText(paragraph.replace(/^[-•]\s*/, ''))}
          </li>
        );
      }
      // Numbered list
      if (paragraph.match(/^\d+\./)) {
        return (
          <li key={index} className="text-muted-foreground leading-relaxed ml-4 mb-2 list-decimal">
            {renderBoldText(paragraph.replace(/^\d+\.\s*/, ''))}
          </li>
        );
      }
      // Bold only paragraph
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        return (
          <p key={index} className="text-foreground font-medium mt-6 mb-2">
            {paragraph.replace(/\*\*/g, '')}
          </p>
        );
      }
      // Paragraph with inline bold
      if (paragraph.includes('**')) {
        return (
          <p key={index} className="text-muted-foreground leading-relaxed mb-4">
            {renderBoldText(paragraph)}
          </p>
        );
      }
      // Regular paragraph
      return (
        <p key={index} className="text-muted-foreground leading-relaxed mb-4">
          {paragraph}
        </p>
      );
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </div>
      </Layout>
    );
  }

  if (error || !article) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-display font-semibold mb-4">
              {language === 'he' ? 'המאמר לא נמצא' : 'Article Not Found'}
            </h1>
            <Button asChild>
              <Link to="/insights">
                {language === 'he' ? 'חזרה למאמרים' : 'Back to Insights'}
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const title = language === 'he' ? article.title_he : article.title_en;
  const excerpt = language === 'he' ? article.excerpt_he : article.excerpt_en;
  const content = language === 'he' ? article.content_he : article.content_en;
  const category = language === 'he' ? article.category_he : article.category_en;
  const author = language === 'he' ? article.author_he : article.author_en;
  const readTime = language === 'he' ? article.read_time_he : article.read_time_en;

  const articleSchema = createArticleSchema({
    title,
    description: excerpt,
    image: article.image_url || undefined,
    publishedTime: article.published_at || article.created_at,
    author,
    url: `https://mayaziv.law/insights/${article.slug}`,
  });

  return (
    <Layout>
      <SEO
        titleEn={`${article.title_en} | Maya Ziv Law`}
        titleHe={`${article.title_he} | משרד מאיה זיו`}
        descriptionEn={article.excerpt_en}
        descriptionHe={article.excerpt_he}
        path={`/insights/${article.slug}`}
        image={article.image_url || undefined}
        type="article"
        article={{
          publishedTime: article.published_at || article.created_at,
          author,
        }}
        schema={articleSchema}
      />
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("max-w-4xl mx-auto", isRTL && "font-hebrew text-right")}>
            <Link 
              to="/insights" 
              className={cn(
                "inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-8",
                isRTL && "flex-row-reverse"
              )}
            >
              <ArrowLeft className={cn("h-4 w-4", isRTL && "rotate-180")} />
              {language === 'he' ? 'חזרה למאמרים' : 'Back to Insights'}
            </Link>

            <span className="inline-block bg-accent text-accent-foreground text-sm font-medium px-3 py-1 rounded-full mb-4">
              {category}
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-foreground mb-6 leading-tight">
              {title}
            </h1>

            <div className={cn(
              "flex flex-wrap items-center gap-6 text-muted-foreground",
              isRTL && "flex-row-reverse"
            )}>
              <div className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
                <User className="h-4 w-4" />
                <span>{author}</span>
              </div>
              <div className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
                <Calendar className="h-4 w-4" />
                <span>
                  {article.published_at 
                    ? new Date(article.published_at).toLocaleDateString(language === 'he' ? 'he-IL' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                    : ''}
                </span>
              </div>
              <div className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
                <Clock className="h-4 w-4" />
                <span>{readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {article.image_url && (
        <section className="pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="aspect-[21/9] overflow-hidden rounded-xl">
                <img 
                  src={article.image_url} 
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <article className={cn(
            "max-w-3xl mx-auto prose prose-lg",
            isRTL && "font-hebrew text-right"
          )}>
            {renderContent(content)}
          </article>
        </div>
      </section>

      {/* Related Articles CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("text-center", isRTL && "font-hebrew")}>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
              {language === 'he' ? 'רוצים לקרוא עוד?' : 'Want to Read More?'}
            </h2>
            <p className="text-muted-foreground mb-6">
              {language === 'he' 
                ? 'חזרו לדף התובנות שלנו לעוד מאמרים ותכנים מקצועיים.'
                : 'Return to our insights page for more articles and professional content.'}
            </p>
            <Button asChild>
              <Link to="/insights">
                {language === 'he' ? 'כל המאמרים' : 'All Articles'}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Article;
