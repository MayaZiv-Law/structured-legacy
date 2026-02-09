
# תוכנית לשיפור GEO (Generative Engine Optimization)

## רקע

GEO (אופטימיזציה למנועי AI גנרטיביים) מתמקד בכך שתוכן האתר יהיה נגיש, מובנה ואמין עבור מערכות AI כמו ChatGPT, Perplexity, Google AI Overviews ו-Claude. בניגוד ל-SEO מסורתי שמתמקד בדירוג בתוצאות חיפוש, GEO מתמקד בכך שה-AI **יצטט** את האתר כמקור סמכותי.

## מצב קיים (מה כבר טוב)

- robots.txt כבר מאפשר גישה ל-GPTBot, ClaudeBot, PerplexityBot ועוד
- Structured Data (Schema.org) קיים: LegalService, Attorney, Article, FAQ, BreadcrumbList, LocalBusiness
- ostr.io prerendering בהקמה (כך שבוטים יקבלו HTML מלא)
- SEO component עם meta tags מלאים בכל עמוד
- sitemap דינמי כולל מאמרים

## שינויים מוצעים

### 1. יצירת קובץ llms.txt (קובץ חדש)

קובץ `public/llms.txt` הוא תקן מתפתח (בדומה ל-robots.txt) שמספק ל-AI סיכום מובנה של האתר. הוא עוזר למודלים להבין מה האתר מציע, מי מפעיל אותו ואיפה למצוא מידע ספציפי.

**קובץ: `public/llms.txt`**
- שם המשרד, תיאור, תחומי התמחות
- רשימת כל הדפים עם תיאור קצר לכל אחד
- פרטי יצירת קשר
- שפות נתמכות

### 2. העשרת Structured Data קיים

**קובץ: `src/components/SEO.tsx`**

- הוספת `sameAs` לסכמת `localBusinessSchema` -- קישורים לפרופילים חיצוניים (LinkedIn, Google Business Profile) שמחזקים אמינות
- הוספת סכמת `WebSite` עם `SearchAction` -- מאפשרת ל-AI להבין את מבנה האתר
- הוספת `Speakable` property לסכמות מאמרים -- מסמן תוכן מתאים לקריאה קולית ולציטוט על ידי AI
- הוספת `dateModified` לסכמות מאמרים לצד `datePublished`

### 3. סיגנל prerenderReady (נדרש לפרירנדר)

**קובץ: `index.html`** -- הוספת `window.prerenderReady = false` בטעינה
**קובץ: `src/components/layout/Layout.tsx`** -- הגדרת `window.prerenderReady = true` לאחר mount

זה מבטיח שבוטים של AI יקבלו את הדף המלא דרך ostr.io ולא shell ריק.

### 4. הוספת מטא-תגים ייעודיים ל-AI

**קובץ: `src/components/SEO.tsx`**

- הוספת `<meta name="ai-content-declaration">` -- הצהרה שהתוכן נכתב על ידי אנושי ולא AI (מגביר אמינות)
- הוספת `<meta name="citation_title">` ו-`<meta name="citation_author">` למאמרים -- תקן ציטוט אקדמי שמערכות AI מזהות

### 5. שיפור robots.txt

**קובץ: `public/robots.txt`**

- הוספת בוטים חדשים: `Bytespider` (TikTok), `cohere-ai`, `Amazonbot`
- הוספת הפניה ל-`llms.txt`

## סיכום השינויים

| קובץ | שינוי | מטרה |
|-------|--------|------|
| `public/llms.txt` | קובץ חדש | הנגשת מידע מובנה ל-AI |
| `public/robots.txt` | עדכון | בוטים נוספים + הפניה ל-llms.txt |
| `index.html` | הוספת סקריפט | prerenderReady signal |
| `src/components/layout/Layout.tsx` | useEffect | prerenderReady = true |
| `src/components/SEO.tsx` | העשרת סכמות | sameAs, WebSite, Speakable, citation meta |

## מה אי אפשר לעשות ב-Lovable

- הגדרת Cloudflare Worker (נדרש בדשבורד Cloudflare)
- הגדרת פרופילים חיצוניים (Google Business, LinkedIn) -- אלו כתובות URL שצריך לספק

## הערה

לפני היישום, אשמח לדעת אם יש לך קישורים לפרופילים חיצוניים (LinkedIn של המשרד, Google Business Profile, פרופיל בלשכת עורכי הדין וכדומה) כדי להוסיף אותם ל-`sameAs`.
