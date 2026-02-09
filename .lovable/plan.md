

# שיפור גרסת ה-Pre-Render לסריקה מלאה

## בעיות שזוהו

לאחר סקירת הקוד, זוהו 4 בעיות עיקריות שעלולות לגרום לכך שגרסת ה-Pre-Render לא תכלול את כל התוכן:

### 1. `contentVisibility: 'auto'` מסתיר תוכן מהפרירנדר

5 רכיבים משתמשים ב-CSS `contentVisibility: 'auto'` שגורם לדפדפן לדלג על רינדור של אלמנטים שמחוץ לחלון הצפייה. כש-ostr.io מרנדר את הדף בגודל viewport קבוע, סקשנים תחתונים עלולים לא להירנדר כלל:

- `PracticeAreasSection` -- תחומי עיסוק
- `ParallaxSection` -- ציטוט
- `FAQSection` -- שאלות ותשובות (דף הבית)
- `CTASection` -- קריאה לפעולה
- `MethodologySection` -- מתודולוגיה

**פתרון:** הסרת `contentVisibility: 'auto'` מכל הרכיבים. ההשפעה על ביצועים זניחה מול הפגיעה בסריקה.

### 2. אנימציות סקרול מסתירות תוכן

הפונקציה `useScrollAnimation` מתחילה אלמנטים עם `opacity-0 translate-y-8` ומציגה אותם רק כש-IntersectionObserver מזהה שהם נכנסים לחלון. בגרסת Pre-Render, אם ה-headless browser לא גולל -- התוכן נשאר בלתי נראה ב-HTML הסופי.

הטקסט קיים ב-DOM (סורקים שקוראים HTML רואים אותו), אבל ב-snapshot של ostr.io הוא יהיה שקוף.

**פתרון:** לעדכן את `useScrollAnimation` כך שיזהה סביבת prerender (באמצעות User-Agent או דגל גלובלי) ויתחיל עם `isVisible = true`, כך שכל התוכן מוצג מיד.

### 3. אקורדיונים (FAQ) סגורים בברירת מחדל

בדפי שירות (נדל"ן, מיסוי וכו') ובדף הבית, תוכן ה-FAQ נמצא בתוך אקורדיונים סגורים. התוכן קיים ב-DOM (Radix מרנדר אותו עם `height: 0`) כך שטקסט הוא נגיש לפרסר, אבל ב-snapshot הוא לא מוצג.

**פתרון:** שתי אפשרויות:
- א. בסביבת prerender -- לפתוח את כל האקורדיונים (להעביר `defaultValue` שפותח הכל)
- ב. להוסיף `<noscript>` fallback עם כל תוכן ה-FAQ כטקסט גלוי -- גישה פשוטה יותר ועובדת גם ללא JS

הגישה המומלצת היא (א) -- זיהוי סביבת prerender ופתיחת כל הפריטים.

### 4. סיגנל `prerenderReady` מוקדם מדי

כרגע `window.prerenderReady = true` מופעל ב-`Layout.tsx` ברגע שהרכיב נטען (mount). אבל בשלב זה:
- סקשנים עם `React.lazy` (Suspense) עדיין לא נטענו
- נתונים מהדאטאבייס (מאמרים) עדיין לא הגיעו
- ostr.io עלול לשמור snapshot חלקי

**פתרון:** לעכב את הסיגנל עד שהנתונים הקריטיים נטענו. ניתן להשתמש ב-`setTimeout` כ-fallback (למשל 3 שניות) או לחבר את הסיגנל למצב טעינת הנתונים.

## שינויים מוצעים

### קובץ: `src/hooks/useScrollAnimation.tsx`
- הוספת זיהוי סביבת prerender (בדיקת User-Agent לבוטים או דגל גלובלי)
- אם prerender -- החזרת `isVisible = true` מיד ללא IntersectionObserver

### קבצים: 5 רכיבים עם `contentVisibility`
- `src/components/home/PracticeAreasSection.tsx`
- `src/components/home/ParallaxSection.tsx`
- `src/components/home/FAQSection.tsx`
- `src/components/home/CTASection.tsx`
- `src/components/home/MethodologySection.tsx`

הסרת `style={{ contentVisibility: 'auto', containIntrinsicSize: '...' }}` מכולם.

### קובץ: `src/components/home/FAQSection.tsx`
- בסביבת prerender: פתיחת כל פריטי האקורדיון (שימוש ב-`type="multiple"` עם `defaultValue` של כל הפריטים)

### קובץ: `src/pages/RealEstate.tsx` (ודפי שירות דומים)
- אותו טיפול באקורדיוני FAQ

### קובץ: `src/components/layout/Layout.tsx`
- עדכון הסיגנל `prerenderReady` עם עיכוב קצר (setTimeout של 3-5 שניות) כדי לתת לכל התוכן האסינכרוני להיטען

## סדר ביצוע

1. יצירת utility function לזיהוי סביבת prerender
2. עדכון `useScrollAnimation` 
3. הסרת `contentVisibility` מ-5 רכיבים (במקביל)
4. עדכון אקורדיונים ב-FAQ sections
5. עדכון סיגנל `prerenderReady` ב-Layout

## סיכום

| בעיה | השפעה | פתרון |
|-------|--------|-------|
| contentVisibility: auto | סקשנים שלמים נעלמים | הסרה |
| אנימציות opacity-0 | תוכן שקוף ב-snapshot | זיהוי prerender, הצגה מיידית |
| אקורדיונים סגורים | FAQ מוסתר | פתיחה אוטומטית ב-prerender |
| prerenderReady מוקדם | snapshot חלקי | עיכוב הסיגנל |

