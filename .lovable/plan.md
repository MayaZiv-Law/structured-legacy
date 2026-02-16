

# תיקון הפניה מ-`/` -- תמיד לגרסה האנגלית

## מצב נוכחי

כרגע שני רכיבים משתמשים בלוגיקה שבודקת localStorage ושפת הדפדפן כדי להחליט לאיזו שפה להפנות:

- **`RedirectToLang`** (שורה 32-37): מפנה מ-`/` ל-`/en` או `/he` לפי localStorage או שפת הדפדפן
- **`LegacyRedirect`** (שורה 42-46): מפנה נתיבים ישנים (כמו `/about`) ל-`/en/about` או `/he/about` לפי localStorage

## השינוי הנדרש

שני הרכיבים צריכים להפנות **תמיד** לגרסה האנגלית (`/en`), ללא תלות ב-localStorage או שפת הדפדפן.

### קובץ: `src/components/LanguageRouter.tsx`

**`RedirectToLang`** -- פישוט ל:
```tsx
export const RedirectToLang = () => {
  return <Navigate to="/en" replace />;
};
```

**`LegacyRedirect`** -- תמיד `/en/...`:
```tsx
export const LegacyRedirect = () => {
  const location = useLocation();
  return <Navigate to={`/en${location.pathname}${location.search}${location.hash}`} replace />;
};
```

## השפעה

- ויזואלית: ללא שינוי
- כניסה ל-`/` תפנה תמיד ל-`/en`
- נתיבים ישנים (למשל `/about`) יפנו תמיד ל-`/en/about`
- משתמשים שכבר נמצאים ב-`/he/...` לא יושפעו -- ההפניה רלוונטית רק בכניסה ללא prefix שפה

