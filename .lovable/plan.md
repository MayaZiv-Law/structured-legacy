

# תוכנית שיפור SEO לאתר Maya Ziv Law

## מצב נוכחי - סיכום

### מה קיים ועובד טוב:
- קומפוננטת SEO מרכזית (`src/components/SEO.tsx`) עם תמיכה ב:
  - Meta tags בסיסיים (title, description, canonical)
  - Open Graph ו-Twitter Cards
  - Hreflang לתמיכה דו-לשונית
  - Schema.org structured data
- Sitemap סטטי ב-`public/sitemap.xml`
- robots.txt מותאם לבוטים של מנועי חיפוש ו-AI
- SEO מותאם לכל עמוד שירות

### חולשות שזוהו:

1. **Sitemap סטטי** - ללא `lastmod`, לא כולל מאמרים דינמיים
2. **חסר FAQPage Schema** - לא מנצל FAQ sections לתוצאות עשירות
3. **חסר BreadcrumbList Schema** - לניווט בתוצאות חיפוש
4. **תמונות חסרות alt מותאם לשפה** - חלק מהתמונות ללא alt דינמי
5. **חסר LocalBusiness Schema** - לתוצאות מפות גוגל
6. **אין sitemap דינמי למאמרים** - מאמרים חדשים לא נכללים אוטומטית
7. **חסר meta keywords** (פחות חשוב אבל עדיין רלוונטי)
8. **חסר WebPage Schema** לעמודים ספציפיים

---

## תוכנית השיפורים

### שלב 1: Schema.org מורחב

**1.1 הוספת FAQPage Schema**
עמודים עם שאלות נפוצות (RealEstate, Taxation, EstatePlanning) יקבלו:

```text
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "שאלה",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "תשובה"
      }
    }
  ]
}
```

**קבצים לעדכון:**
- `src/components/SEO.tsx` - הוספת `createFAQSchema` function
- `src/pages/RealEstate.tsx`
- `src/pages/Taxation.tsx`
- `src/pages/EstatePlanning.tsx`

**1.2 הוספת BreadcrumbList Schema**

```text
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "position": 1, "name": "Home", "item": "https://mayaziv-law.com/" },
    { "position": 2, "name": "Real Estate", "item": "https://mayaziv-law.com/real-estate" }
  ]
}
```

**1.3 הוספת LocalBusiness Schema**
לשיפור הופעה ב-Google Maps ותוצאות מקומיות:

```text
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Maya Ziv Law",
  "address": {...},
  "geo": {...},
  "openingHours": "Mo-Fr 09:00-18:00"
}
```

---

### שלב 2: Sitemap דינמי

**יצירת Edge Function לגנרציית sitemap:**

```text
supabase/functions/sitemap/index.ts
```

הפונקציה תעשה:
1. שליפת כל המאמרים מ-DB עם `updated_at`
2. גנרציית XML עם `lastmod` לכל URL
3. החזרת sitemap מעודכן בזמן אמת

**עדכון robots.txt:**
```text
Sitemap: https://mayaziv-law.com/api/sitemap.xml
```

---

### שלב 3: שיפור Meta Tags

**3.1 הוספת meta נוספים לקומפוננטת SEO:**

```typescript
// geo tags לתוצאות מקומיות
<meta name="geo.region" content="IL-TA" />
<meta name="geo.placename" content="Tel Aviv" />

// author tag
<meta name="author" content="Maya Ziv" />

// robots עם max-snippet
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
```

**3.2 שיפור alt text דינמי לתמונות:**
עדכון תמונות בעמודי השירות עם alt מותאם לשפה.

---

### שלב 4: שיפור ביצועים (Core Web Vitals)

**4.1 הוספת preload לתמונות קריטיות:**
בכל עמוד שירות, preload לתמונת ה-hero.

**4.2 Lazy loading מתקדם:**
וידוא שכל התמונות מתחת ל-fold משתמשות ב-`loading="lazy"`.

---

### שלב 5: Internal Linking מובנה

**5.1 הוספת "Related Services" לעמודי שירות:**
בסוף כל עמוד שירות, הוספת קישורים לשירותים קשורים.

**5.2 הוספת קישורים במאמרים:**
בקומפוננטת Article, הוספת קישורים אוטומטיים לעמודי שירות רלוונטיים.

---

## סיכום השינויים

| קובץ | סוג שינוי |
|------|----------|
| `src/components/SEO.tsx` | הרחבה - schemas חדשים |
| `src/pages/RealEstate.tsx` | הוספת FAQ schema |
| `src/pages/Taxation.tsx` | הוספת FAQ schema |
| `src/pages/EstatePlanning.tsx` | הוספת FAQ schema |
| `src/pages/Index.tsx` | הוספת LocalBusiness schema |
| `supabase/functions/sitemap/index.ts` | יצירה חדשה |
| `public/robots.txt` | עדכון sitemap URL |
| `index.html` | הוספת geo meta tags |

---

## תועלות צפויות

1. **Rich Snippets** - שאלות נפוצות יופיעו ישירות בתוצאות גוגל
2. **Breadcrumbs בתוצאות** - ניווט ברור בתוצאות חיפוש
3. **Google Maps** - הופעה טובה יותר בחיפושים מקומיים
4. **אינדוקס מהיר יותר** - sitemap דינמי עם lastmod
5. **CTR גבוה יותר** - תוצאות עשירות מושכות יותר קליקים

---

## עדיפות ביצוע

1. **גבוהה**: FAQ Schema (תוצאה מיידית בתוצאות חיפוש)
2. **גבוהה**: Sitemap דינמי (אינדוקס מאמרים)
3. **בינונית**: LocalBusiness Schema (חיפושים מקומיים)
4. **בינונית**: Breadcrumb Schema (UX בתוצאות)
5. **נמוכה**: Geo meta tags ו-internal linking

