

# הוספת מטא טאג ostr.io לאתר

## מה יבוצע

הוספת תג האימות של ostr.io ל-`<head>` בקובץ `index.html`, יחד עם תג ה-fragment שנדרש לשירות ה-prerendering (כפי שתוכנן קודם).

## שינויים

### קובץ: `index.html`
- הוספת `<meta name="ostrio-domain" content="LjlbL6w10i6EW-k8pqA0T54ckOMsPOFMHqyYjWQNN-l">` בתוך ה-`<head>`
- הוספת `<meta name="fragment" content="!">` (סימון SPA עבור שירות ה-prerendering)

שני התגים יתווספו מתחת לתג ה-`meta description` הקיים.

