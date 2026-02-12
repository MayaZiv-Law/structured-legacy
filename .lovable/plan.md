
# מעבר למבנה סאב-פולדרים לשפות (`/en/...`, `/he/...`)

## מצב נוכחי

האתר משתמש במנגנון שפה מבוסס **state בלבד** (React Context + localStorage). כל הנתיבים זהים לשתי השפות -- למשל `/about` משרת גם אנגלית וגם עברית, בהתאם להעדפת המשתמש. אין שום הבחנה ב-URL בין השפות.

### בעיות במצב הנוכחי

1. **Google לא יכול לאנדקס שתי גרסאות** -- כי אין URL נפרד לכל שפה, ה-crawler תמיד רואה רק שפה אחת (אנגלית, ברירת מחדל)
2. **hreflang לא עובד** -- ה-SEO component מפנה את `hreflang="en"` ו-`hreflang="he"` לאותו URL בדיוק, מה שלא עוזר למנועי חיפוש
3. **שיתוף קישורים** -- כשמשתפים לינק, הנמען מקבל את השפה לפי ה-localStorage שלו, לא לפי כוונת השולח
4. **Canonical URL** -- אין הבדל ב-canonical בין השפות

## המבנה החדש המוצע

```text
/en/           --> דף הבית באנגלית
/he/           --> דף הבית בעברית
/en/about      --> אודות באנגלית
/he/about      --> אודות בעברית
/en/insights/slug --> מאמר באנגלית
/he/insights/slug --> מאמר בעברית
/              --> redirect ל-/en/ (ברירת מחדל)
```

## שינויים נדרשים

### 1. שכבת הראוטינג (Router)

**קובץ: `src/App.tsx`**
- עטיפת כל הנתיבים בתוך prefix של `:lang` (en/he)
- יצירת רכיב `LanguageRouter` שקורא את `:lang` מה-URL ומסנכרן אותו עם ה-LanguageContext
- הוספת redirect מ-`/` ל-`/en/` (או `/he/` לפי localStorage/browser language)
- הוספת redirect מנתיבים ישנים ללא prefix (למשל `/about` -> `/en/about`) לשמירה על תאימות

מבנה הנתיבים:
```text
/                     --> <RedirectToLang />
/:lang                --> <Index />
/:lang/about          --> <About />
/:lang/real-estate    --> <RealEstate />
/:lang/insights/:slug --> <Article />
...וכן הלאה
```

### 2. LanguageContext

**קובץ: `src/contexts/LanguageContext.tsx`**
- שינוי `setLanguage` כך שבמקום לשמור ב-state, ינווט לנתיב המקביל בשפה החדשה (למשל מ-`/en/about` ל-`/he/about`)
- קריאת השפה מה-URL (פרמטר `:lang`) במקום מ-localStorage
- localStorage ישמש רק בשביל ה-redirect הראשוני מ-`/`

### 3. כל הלינקים הפנימיים

**כל הרכיבים שמשתמשים ב-`<Link to="...">`**
- כל לינק צריך לכלול את prefix השפה: במקום `<Link to="/about">` -> `<Link to={/\${lang}/about}>`
- יצירת helper function `localePath(path)` שמחזיר את הנתיב עם prefix השפה הנוכחית
- רכיבים שמושפעים: Header, Footer, CTASection, GuideSection, InsightsSection, PracticeAreasSection, RelatedServices, About, Article, ועוד

### 4. SEO Component

**קובץ: `src/components/SEO.tsx`**
- Canonical URL ייחודי לכל שפה: `https://mayaziv-law.com/en/about` vs `https://mayaziv-law.com/he/about`
- hreflang tags יפנו לנתיבים הנכונים:
  - `hreflang="en"` -> `https://mayaziv-law.com/en/about`
  - `hreflang="he"` -> `https://mayaziv-law.com/he/about`
  - `hreflang="x-default"` -> `https://mayaziv-law.com/en/about`
- ה-path prop יתעדכן בכל הדפים

### 5. Sitemap (Edge Function)

**קובץ: `supabase/functions/sitemap/index.ts`**
- כל URL סטטי יוכפל לשתי גרסאות (`/en/...` ו-`/he/...`)
- הוספת `xhtml:link` עם `hreflang` לכל URL (best practice ל-sitemap רב-לשוני)
- מאמרים יופיעו בשתי הגרסאות

### 6. כפתור החלפת שפה (Header)

**קובץ: `src/components/layout/Header.tsx`**
- במקום `setLanguage('he')`, הכפתור ינווט לנתיב המקביל בשפה השנייה
- למשל: אם המשתמש ב-`/en/about` ולוחץ "עב" -- מנווט ל-`/he/about`

### 7. index.html

- עדכון ה-`lang` הסטטי ל-`en` (ברירת מחדל)
- שאר ה-meta tags יטופלו דינמית דרך ה-SEO component

### 8. robots.txt ו-llms.txt

- עדכון כתובות לדוגמה אם קיימות

## משמעויות נוספות

### ויזואליות
- **אין שינוי ויזואלי** -- העיצוב, הפונטים, כיווניות RTL/LTR, והתוכן נשארים זהים לגמרי
- כפתור החלפת השפה יעבוד באותו אופן, רק הפעולה מאחורי הקלעים תשתנה

### טכניות
- **Redirects מנתיבים ישנים** -- כל הנתיבים הישנים (ללא prefix) ימופו אוטומטית לגרסה האנגלית כדי לא לשבור לינקים קיימים
- **Admin routes** -- נתיבי `/admin/*` יישארו ללא prefix שפה (הם לא מיועדים לאינדוקס)
- **Pre-render (ostr.io)** -- יצטרך לסרוק גם `/en/...` וגם `/he/...`. ה-sitemap המעודכן ידאג לזה
- **localStorage** -- ישמש רק כ-fallback לניווט הראשוני מ-`/` (לאיזו שפה להפנות)
- **Google Search Console** -- אחרי השינוי, יש להגיש את ה-sitemap מחדש. Google יזהה את הגרסאות הנפרדות

## סדר ביצוע

1. יצירת helper function `localePath` ורכיב `LanguageRouter`
2. עדכון `LanguageContext` לקריאה מ-URL
3. עדכון `App.tsx` עם מבנה הנתיבים החדש + redirects
4. עדכון כל הלינקים הפנימיים (Header, Footer, כל הדפים)
5. עדכון SEO component (canonical, hreflang)
6. עדכון Edge Function של ה-sitemap
7. עדכון robots.txt

## סיכום ההשפעה

| תחום | השפעה |
|-------|--------|
| ויזואלי | ללא שינוי |
| URLs | כל URL מקבל prefix שפה |
| SEO | hreflang תקין, canonical נפרד לכל שפה, sitemap כפול |
| לינקים ישנים | redirect אוטומטי ל-/en/... |
| Admin | ללא שינוי |
| ביצועים | ללא השפעה |
| Pre-render | סריקה כפולה (שתי גרסאות לכל עמוד) |
