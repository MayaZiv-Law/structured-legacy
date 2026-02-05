import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface RelatedService {
  path: string;
  titleEn: string;
  titleHe: string;
  descEn: string;
  descHe: string;
}

const allServices: RelatedService[] = [
  {
    path: '/real-estate',
    titleEn: 'Real Estate',
    titleHe: 'נדל"ן',
    descEn: 'Property acquisition and due diligence',
    descHe: 'רכישת נכסים ובדיקות נאותות',
  },
  {
    path: '/taxation',
    titleEn: 'Tax & Compliance',
    titleHe: 'מיסוי ותאימות',
    descEn: 'Cross-border tax planning',
    descHe: 'תכנון מס חוצה גבולות',
  },
  {
    path: '/estate-planning',
    titleEn: 'Family & Legacy',
    titleHe: 'משפחה ומורשת',
    descEn: 'Wills and estate planning',
    descHe: 'צוואות ותכנון עיזבון',
  },
  {
    path: '/olim-residents',
    titleEn: 'Olim & Returning Residents',
    titleHe: 'עולים ותושבים חוזרים',
    descEn: 'Legal framework for your transition',
    descHe: 'מסגרת משפטית למעבר לישראל',
  },
  {
    path: '/commercial',
    titleEn: 'Commercial & Civil',
    titleHe: 'מסחרי ואזרחי',
    descEn: 'Contracts and dispute resolution',
    descHe: 'חוזים ויישוב סכסוכים',
  },
];

interface RelatedServicesProps {
  currentPath: string;
  maxServices?: number;
}

const RelatedServices = ({ currentPath, maxServices = 3 }: RelatedServicesProps) => {
  const { language, isRTL } = useLanguage();
  
  const relatedServices = allServices
    .filter(service => service.path !== currentPath)
    .slice(0, maxServices);

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn("max-w-4xl mx-auto", isRTL && "font-hebrew text-right")}>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-8">
            {language === 'he' ? 'תחומי התמחות נוספים' : 'Related Practice Areas'}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {relatedServices.map((service) => (
              <Link
                key={service.path}
                to={service.path}
                className="group p-6 bg-background rounded-lg border border-border hover:border-accent/50 transition-all duration-300"
              >
                <h3 className="text-lg font-medium text-foreground mb-2 group-hover:text-accent transition-colors">
                  {language === 'he' ? service.titleHe : service.titleEn}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {language === 'he' ? service.descHe : service.descEn}
                </p>
                <span className={cn(
                  "inline-flex items-center gap-1 text-sm text-accent font-medium",
                  isRTL && "flex-row-reverse"
                )}>
                  {language === 'he' ? 'למידע נוסף' : 'Learn More'}
                  <ArrowRight className={cn(
                    "h-4 w-4 transition-transform group-hover:translate-x-1",
                    isRTL && "rotate-180 group-hover:-translate-x-1"
                  )} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedServices;
