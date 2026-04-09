// Netlify Edge Function: Bot Prerender
// Detects crawler user agents and serves pre-rendered HTML so bots/AI tools
// don't receive an empty CSR shell. Uses Prerender.io with retry + exponential
// backoff, then falls back to a static HTML snapshot with real site content.

const BOT_AGENTS = [
  'googlebot',
  'bingbot',
  'yandex',
  'baiduspider',
  'facebookexternalhit',
  'twitterbot',
  'rogerbot',
  'linkedinbot',
  'embedly',
  'quora link preview',
  'showyoubot',
  'outbrain',
  'pinterest',
  'pinterestbot',
  'slackbot',
  'vkshare',
  'w3c_validator',
  'redditbot',
  'applebot',
  'whatsapp',
  'flipboard',
  'tumblr',
  'bitlybot',
  'skypeuripreview',
  'nuzzel',
  'discordbot',
  'google page speed',
  'qwantify',
  'bitrix link preview',
  'xing-contenttabreceiver',
  'chrome-lighthouse',
  'telegrambot',
  'integration-test',
  'google-inspectiontool',
  'petalbot',
  'semrushbot',
  'ahrefsbot',
  'gptbot',
  'chatgpt-user',
  'claude-web',
  'claudebot',
  'perplexitybot',
  'cohere-ai',
  'amazonbot',
  'bytespider',
  'tavily',
];

// File extensions that should never be prerendered
const STATIC_EXTENSIONS = /\.(js|css|xml|txt|ico|webp|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|mp4|webm|json|map)$/i;

// Retry fetch with exponential backoff
async function fetchWithRetry(url: string, options: RequestInit, maxRetries = 2): Promise<Response | null> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);
      const response = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timeout);
      if (response.ok) return response;
      // Don't retry on 4xx client errors (rate limit, auth, etc.)
      if (response.status >= 400 && response.status < 500) return null;
    } catch (_err) {
      // Network error or timeout - retry
    }
    if (attempt < maxRetries) {
      await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, attempt)));
    }
  }
  return null;
}

// Static HTML fallback with real site content for when Prerender.io is unavailable
function buildFallbackHtml(url: URL): string {
  const path = url.pathname;
  const isHebrew = path.startsWith('/he');
  const lang = isHebrew ? 'he' : 'en';
  const dir = isHebrew ? 'rtl' : 'ltr';
  const baseUrl = 'https://mayaziv-law.com';

  const content = isHebrew ? {
    siteTitle: 'משרד עורכי דין מאיה זיו',
    tagline: 'מאיה זיו עורכי דין',
    heroText: 'בעולם המשתנה ללא הרף, משרד מאיה זיו עומד לצד לקוחותיו כשותף משפטי מסור, המשלב היכרות מעמיקה עם המציאות המקומית, עם ידע ונסיון בזירה הבינלאומית.',
    introText: 'ייעוץ משפטי מהשורה הראשונה חייב להיות ייחודי לא פחות מהלקוחות שהוא משרת. במשרד עורכי הדין מאיה זיו, כל תיק זוכה לתשומת הלב האישית המגיעה לו, כמו גם לעומק ולהיקף הנדרשים לעבודה מקצועית.',
    practiceTitle: 'תחומי עיסוק',
    practices: [
      { name: 'מקרקעין והשקעות', desc: 'רכישה בטוחה ותכנון מס', href: '/he/real-estate' },
      { name: 'מיסוי בינלאומי', desc: 'דיווח חוצה גבולות ורגולציה בנקאית', href: '/he/taxation' },
      { name: 'תכנון משפחתי ותכנון ירושה', desc: 'צוואות, ירושה והעברת נכסים בין-דורית', href: '/he/estate-planning' },
      { name: 'עולים חדשים ותושבים חוזרים', desc: 'ייעוץ משפטי לעולים חדשים ולתושבים שחזרו לארץ', href: '/he/olim-residents' },
      { name: 'מסחרי ואזרחי', desc: 'חוזים, חלוקת סיכונים וייעוץ עסקי', href: '/he/commercial' },
    ],
    ctaTitle: 'כאשר העניין מצריך שיקול דעת משפטי וכלכלי כאחד',
    ctaText: 'לקוחות בישראל ומחוצה לה פונים למשרד עורכי הדין מאיה זיו בעסקאות שבהן הדיוק הוא גורם מכריע. ניתן לפנות אלינו בעברית ובאנגלית.',
    ctaButton: 'קבעו פגישת ייעוץ',
    nav: [
      { label: 'דף הבית', href: '/he/' },
      { label: 'אודות', href: '/he/about' },
      { label: 'נדל"ן', href: '/he/real-estate' },
      { label: 'מיסוי', href: '/he/taxation' },
      { label: 'צוואות ועיזבונות', href: '/he/estate-planning' },
      { label: 'מסחרי', href: '/he/commercial' },
      { label: 'עולים ותושבים חוזרים', href: '/he/olim-residents' },
      { label: 'תובנות משפטיות', href: '/he/insights' },
      { label: 'צור קשר', href: '/he/contact' },
    ],
  } : {
    siteTitle: 'Maya Ziv Law | Israeli Attorney for Real Estate, Tax and Cross-Border Transactions',
    tagline: 'Maya Ziv Attorney at Law',
    heroText: 'In an ever-changing world, Maya Ziv Law stands as a dedicated legal partner, combining on-the-ground knowledge with global perspective.',
    introText: 'First-rate legal advice must be as unique as the clients it serves. At Maya Ziv Law, every matter receives the personal attention it deserves, as well as the depth and scope required for professional work.',
    practiceTitle: 'Practice Areas',
    practices: [
      { name: 'Real Estate and Investments', desc: 'Safe acquisitions and tax planning', href: '/en/real-estate' },
      { name: 'International Taxation', desc: 'Cross-border reporting and banking regulation', href: '/en/taxation' },
      { name: 'Estate Planning and Family Succession', desc: 'Wills, inheritance and intergenerational asset transfer', href: '/en/estate-planning' },
      { name: 'New Olim and Returning Residents', desc: 'Legal counsel for newcomers and returning residents', href: '/en/olim-residents' },
      { name: 'Commercial and Civil', desc: 'Contracts, risk allocation and business counsel', href: '/en/commercial' },
    ],
    ctaTitle: 'When the Matter Requires Both Legal and Financial Judgment',
    ctaText: 'Clients in Israel and abroad turn to Maya Ziv Law on transactions where precision is the deciding factor. We can be reached in Hebrew and English.',
    ctaButton: 'Schedule a Consultation',
    nav: [
      { label: 'Home', href: '/en/' },
      { label: 'About', href: '/en/about' },
      { label: 'Real Estate', href: '/en/real-estate' },
      { label: 'Taxation', href: '/en/taxation' },
      { label: 'Estate Planning', href: '/en/estate-planning' },
      { label: 'Commercial', href: '/en/commercial' },
      { label: 'Olim & Residents', href: '/en/olim-residents' },
      { label: 'Insights', href: '/en/insights' },
      { label: 'Contact', href: '/en/contact' },
    ],
  };

  const navLinks = content.nav.map((n) => `<li><a href="${baseUrl}${n.href}">${n.label}</a></li>`).join('\n        ');
  const practiceItems = content.practices.map((p) =>
    `<li><a href="${baseUrl}${p.href}"><strong>${p.name}</strong> — ${p.desc}</a></li>`
  ).join('\n        ');

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content.siteTitle}</title>
  <meta name="description" content="${content.heroText}">
  <meta property="og:title" content="${content.siteTitle}">
  <meta property="og:description" content="${content.heroText}">
  <meta property="og:image" content="${baseUrl}/og-image.webp">
  <meta property="og:url" content="${baseUrl}${path}">
  <link rel="alternate" hreflang="en" href="${baseUrl}/en/${path.replace(/^\/(en|he)\/?/, '')}">
  <link rel="alternate" hreflang="he" href="${baseUrl}/he/${path.replace(/^\/(en|he)\/?/, '')}">
  <link rel="canonical" href="${baseUrl}${path}">
</head>
<body>
  <nav>
    <ul>
      ${navLinks}
    </ul>
  </nav>
  <main>
    <header>
      <p>${content.tagline}</p>
      <h1>${content.siteTitle}</h1>
      <p>${content.heroText}</p>
    </header>
    <section>
      <p>${content.introText}</p>
    </section>
    <section>
      <h2>${content.practiceTitle}</h2>
      <ul>
        ${practiceItems}
      </ul>
    </section>
    <section>
      <h2>${content.ctaTitle}</h2>
      <p>${content.ctaText}</p>
      <a href="${baseUrl}/${lang}/contact">${content.ctaButton}</a>
    </section>
    <footer>
      <p>Maya Ziv Law | +972-54-494-3597 | info@mayaziv-law.com | 18 Moshe Sneh Street, Tel Aviv, Israel</p>
      <p><a href="${baseUrl}/llms.txt">llms.txt</a> | <a href="${baseUrl}/llms-full.txt">llms-full.txt</a></p>
    </footer>
  </main>
</body>
</html>`;
}

import type { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);

  // Skip static assets entirely
  if (STATIC_EXTENSIONS.test(url.pathname)) {
    return context.next();
  }

  // Skip if this is already a prerender request (avoid infinite loop)
  if (request.headers.get('x-prerender') === '1') {
    return context.next();
  }

  const userAgent = (request.headers.get('user-agent') || '').toLowerCase();
  const isBot = BOT_AGENTS.some((bot) => userAgent.includes(bot));

  if (!isBot) {
    return context.next(); // Normal users get the SPA
  }

  // For bots: fetch pre-rendered HTML from Prerender.io with retry
  const prerenderToken = Deno.env.get('PRERENDER_TOKEN') || '';
  const targetUrl = url.toString();

  if (prerenderToken) {
    const prerenderUrl = `https://service.prerender.io/${targetUrl}`;
    const response = await fetchWithRetry(prerenderUrl, {
      headers: {
        'X-Prerender-Token': prerenderToken,
        'User-Agent': 'Mozilla/5.0 (compatible; Prerender/1.0)',
      },
    });

    if (response) {
      const html = await response.text();
      if (html.length > 200) {
        return new Response(html, {
          status: 200,
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=86400, s-maxage=3600',
            'X-Prerendered': 'true',
          },
        });
      }
      console.log(`[bot-prerender] Prerender.io returned near-empty body for: ${url.pathname}`);
    } else {
      console.log(`[bot-prerender] Prerender.io unavailable for: ${url.pathname}, serving static fallback`);
    }
  } else {
    console.log(`[bot-prerender] No PRERENDER_TOKEN set, serving static fallback for: ${url.pathname}`);
  }

  // Fallback: serve static HTML with real site content instead of empty SPA shell
  const fallbackHtml = buildFallbackHtml(url);
  return new Response(fallbackHtml, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'X-Prerendered': 'static-fallback',
    },
  });
};

export const config = {
  path: "/*",
  excludedPath: [
    "/assets/*",
    "/images/*",
    "/_next/*",
    "/*.js",
    "/*.css",
    "/*.webp",
    "/*.png",
    "/*.jpg",
    "/*.ico",
    "/*.txt",
    "/*.xml",
    "/*.json",
    "/*.svg",
    "/*.woff",
    "/*.woff2",
    "/sitemap.xml",
    "/robots.txt",
    "/llms.txt",
    "/favicon.ico",
  ],
};
