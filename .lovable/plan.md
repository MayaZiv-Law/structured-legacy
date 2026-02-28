

# עדכון Sitemap לתאימות Google Search Console

## בעיות נוכחיות

1. **Content-Type מעורב עם CORS headers** -- ה-header של `Content-Type: application/xml` מוגדר בתוך `corsHeaders`, מה שאומר שגם תשובת OPTIONS מחזירה Content-Type של XML במקום שתחזיר ריק. GSC עלול לקבל headers לא נקיים.

2. **חסר charset** -- GSC מעדיף `application/xml; charset=utf-8` כדי לפרש נכון תווים בעברית.

3. **lastmod דינמי מדי** -- עמודים סטטיים משתמשים ב-`today` בתור lastmod, מה שגורם לתאריך להשתנות כל יום. GSC עלול להתעלם מ-lastmod אם הוא משתנה ללא סיבה אמיתית.

4. **חסר XML processing instruction** -- אין בעיה טכנית, אבל הכל תקין מבחינת מבנה.

## שינויים מתוכננים

### קובץ: `supabase/functions/sitemap/index.ts`

- **הפרדת CORS מ-Content-Type**: הגדרת `corsHeaders` נפרד ללא Content-Type, והוספת Content-Type רק בתשובה הסופית.
- **הוספת charset=utf-8** ל-Content-Type.
- **תאריכי lastmod קבועים לעמודים סטטיים**: שימוש בתאריך קבוע (למשל תאריך העדכון האחרון של האתר) במקום `today`, כך ש-GSC יתייחס ל-lastmod כאמין.
- **תשובת OPTIONS נקייה**: החזרת status 204 (No Content) במקום 'ok' עם Content-Type של XML.

### פירוט טכני

```text
corsHeaders (CORS בלבד):
  Access-Control-Allow-Origin: *
  Access-Control-Allow-Headers: ...

Response headers (תשובה סופית):
  ...corsHeaders
  Content-Type: application/xml; charset=utf-8
  Cache-Control: public, max-age=3600, s-maxage=86400

OPTIONS response:
  status: 204
  headers: corsHeaders בלבד
```

- הוספת `Cache-Control` header כדי ש-GSC ושרתי CDN יוכלו לשמור cache של ה-sitemap (שעה ל-browser, יום ל-CDN).
- lastmod לעמודים סטטיים ישתנה לתאריך קבוע שניתן לעדכן ידנית בקוד כשיש שינוי אמיתי באתר.

