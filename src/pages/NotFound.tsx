import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalePath } from '@/hooks/useLocalePath';
import { cn } from '@/lib/utils';

const NotFound = () => {
  const { language, isRTL } = useLanguage();
  const localePath = useLocalePath();

  return (
    <Layout>
      <section className="pt-32 pb-20 bg-background min-h-[60vh] flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className={cn("text-4xl sm:text-5xl font-display font-semibold text-foreground mb-6", isRTL && "font-hebrew")}>
            {language === 'he' ? 'הדף לא נמצא' : 'Page Not Found'}
          </h1>
          <p className={cn("text-xl text-muted-foreground mb-8", isRTL && "font-hebrew")}>
            {language === 'he'
              ? 'הדף שחיפשתם אינו זמין. אנא חזרו לדף הבית.'
              : 'The page you are looking for is not available. Please return to the homepage.'}
          </p>
          <Link
            to={localePath('/')}
            className="inline-flex items-center justify-center px-8 py-3 bg-accent text-accent-foreground font-medium rounded hover:bg-accent/90 transition-colors"
          >
            {language === 'he' ? 'חזרה לדף הבית' : 'Return to Homepage'}
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
