import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';

interface SEOProps {
  titleEn: string;
  titleHe: string;
  descriptionEn: string;
  descriptionHe: string;
  image?: string;
  type?: 'website' | 'article';
  path?: string;
  article?: {
    publishedTime?: string;
    author?: string;
  };
  schema?: object | object[];
}

const SITE_URL = 'https://mayaziv-law.com';
const DEFAULT_IMAGE = '/lovable-uploads/ba3c3a72-3db5-4141-9459-1f85fc39e53f.webp';

export const SEO = ({
  titleEn,
  titleHe,
  descriptionEn,
  descriptionHe,
  image = DEFAULT_IMAGE,
  type = 'website',
  path = '',
  article,
  schema,
}: SEOProps) => {
  const { language } = useLanguage();
  
  const title = language === 'he' ? titleHe : titleEn;
  const description = language === 'he' ? descriptionHe : descriptionEn;
  const langPath = path.startsWith('/') ? path : `/${path}`;
  const canonicalUrl = `${SITE_URL}/${language}${langPath}`;
  const enUrl = `${SITE_URL}/en${langPath}`;
  const heUrl = `${SITE_URL}/he${langPath}`;
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* AI Content Declaration */}
      <meta name="ai-content-declaration" content="This content is authored by humans at Maya Ziv Law, a licensed Israeli law firm." />
      
      {/* Citation meta for articles */}
      {type === 'article' && (
        <>
          <meta name="citation_title" content={title} />
          <meta name="citation_author" content={article?.author || 'Maya Ziv'} />
          {article?.publishedTime && <meta name="citation_date" content={article.publishedTime} />}
          <meta name="citation_publisher" content="Maya Ziv Law" />
        </>
      )}
      
      {/* Hreflang for multilingual support */}
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="he" href={heUrl} />
      <link rel="alternate" hrefLang="x-default" href={enUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="Maya Ziv Law" />
      <meta property="og:locale" content={language === 'he' ? 'he_IL' : 'en_US'} />
      <meta property="og:locale:alternate" content={language === 'he' ? 'en_US' : 'he_IL'} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@MayaZivLaw" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* Article specific meta */}
      {type === 'article' && article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          <meta property="article:author" content={article.author || 'Maya Ziv'} />
        </>
      )}
      
      {/* Structured Data */}
      {schema && (
        Array.isArray(schema) ? (
          schema.map((s, i) => (
            <script key={i} type="application/ld+json">
              {JSON.stringify(s)}
            </script>
          ))
        ) : (
          <script type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        )
      )}
    </Helmet>
  );
};

// Pre-built schemas
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "Maya Ziv Law",
  "description": "Attorney in Israel specializing in cross border legal matters, real estate, taxation, and estate planning.",
  "url": "https://mayaziv-law.com",
  "logo": `${SITE_URL}/lovable-uploads/ba3c3a72-3db5-4141-9459-1f85fc39e53f.webp`,
  "image": `${SITE_URL}/lovable-uploads/ba3c3a72-3db5-4141-9459-1f85fc39e53f.webp`,
  "telephone": "+972544943597",
  "email": "info@mayaziv-law.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "18 Moshe Sneh",
    "addressLocality": "Tel Aviv",
    "addressCountry": "IL"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "32.0853",
    "longitude": "34.7818"
  },
  "areaServed": ["Israel", "United States", "United Kingdom", "Europe"],
  "priceRange": "$$",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Friday",
      "opens": "09:00",
      "closes": "14:00"
    }
  ]
};

export const attorneySchema = {
  "@context": "https://schema.org",
  "@type": "Attorney",
  "name": "Maya Ziv",
  "jobTitle": "Attorney",
  "url": "https://mayaziv-law.com/en/about",
  "image": `${SITE_URL}/lovable-uploads/81459920-5f87-4bcb-8430-47c1c2edc6e4.webp`,
  "worksFor": {
    "@type": "LegalService",
    "name": "Maya Ziv Law"
  },
  "knowsAbout": [
    "Real Estate Law",
    "Cross Border Transactions",
    "Tax Law",
    "Estate Planning",
    "Commercial Law",
    "Immigration Law"
  ]
};

export const createArticleSchema = (article: {
  title: string;
  description: string;
  image?: string;
  publishedTime: string;
  modifiedTime?: string;
  author?: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.description,
  "image": article.image || `${SITE_URL}${DEFAULT_IMAGE}`,
  "datePublished": article.publishedTime,
  "dateModified": article.modifiedTime || article.publishedTime,
  "author": {
    "@type": "Person",
    "name": article.author || "Maya Ziv"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Maya Ziv Law",
    "logo": {
      "@type": "ImageObject",
      "url": `${SITE_URL}/lovable-uploads/ba3c3a72-3db5-4141-9459-1f85fc39e53f.webp`
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": article.url
  },
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", ".article-content p:first-of-type"]
  }
});

export const createServiceSchema = (service: {
  name: string;
  description: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": service.name,
  "name": service.name,
  "description": service.description,
  "provider": {
    "@type": "LegalService",
    "name": "Maya Ziv Law",
    "url": "https://mayaziv-law.com"
  },
  "url": service.url,
  "areaServed": ["Israel", "United States", "United Kingdom", "Europe"]
});

// FAQ Schema for rich snippets
export const createFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

// Breadcrumb Schema for navigation
export const createBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

// LocalBusiness Schema for Google Maps
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Maya Ziv Law",
  "image": `${SITE_URL}/lovable-uploads/ba3c3a72-3db5-4141-9459-1f85fc39e53f.webp`,
  "@id": "https://mayaziv-law.com",
  "url": "https://mayaziv-law.com",
  "telephone": "+972544943597",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "18 Moshe Sneh",
    "addressLocality": "Tel Aviv",
    "postalCode": "6970251",
    "addressCountry": "IL"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 32.0853,
    "longitude": 34.7818
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Friday",
      "opens": "09:00",
      "closes": "14:00"
    }
  ],
  "sameAs": ["https://www.linkedin.com/in/maya-ziv/"]
};

// WebSite schema for site-level identity
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Maya Ziv Law",
  "url": "https://mayaziv-law.com",
  "description": "Attorney in Israel specializing in cross border legal matters, real estate, taxation, and estate planning.",
  "inLanguage": ["en", "he"],
  "publisher": {
    "@type": "LegalService",
    "name": "Maya Ziv Law"
  }
};
