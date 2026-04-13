import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const { language, isRTL } = useLanguage();

  useEffect(() => {
    if (!localStorage.getItem('cookie-consent')) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={cn("fixed bottom-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-t border-border/20 px-4 py-3", isRTL && "font-hebrew")}>
      <div className="container mx-auto flex items-center justify-between gap-4 flex-wrap">
        <p className="text-primary-foreground/80 text-sm">
          {language === 'he'
            ? 'אתר זה משתמש בעוגיות לשיפור חוויית הגלישה.'
            : 'This website uses cookies to enhance your experience.'}
        </p>
        <button
          onClick={accept}
          className="bg-accent text-accent-foreground px-4 py-1.5 text-sm font-medium rounded hover:bg-accent/90 transition-colors shrink-0"
        >
          {language === 'he' ? 'אישור' : 'Accept'}
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
