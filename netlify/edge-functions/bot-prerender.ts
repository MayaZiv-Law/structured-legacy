// Netlify Edge Function: Bot Prerender
// Detects crawler user agents and redirects them to Prerender.io (free tier: 250 pages/month)
// Normal users pass through to the standard SPA.

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
  'claude-web',
  'claudebot',
  'perplexitybot',
];

// File extensions that should never be prerendered
const STATIC_EXTENSIONS = /\.(js|css|xml|txt|ico|webp|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|mp4|webm|json|map)$/i;

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

  // For bots: fetch pre-rendered HTML from Prerender.io free tier
  const prerenderToken = Deno.env.get('PRERENDER_TOKEN') || '';
  const targetUrl = url.toString();

  // If no prerender token is configured, fall through to SPA
  if (!prerenderToken) {
    console.log(`[bot-prerender] No PRERENDER_TOKEN set. Bot "${userAgent}" served SPA for: ${url.pathname}`);
    return context.next();
  }

  try {
    const prerenderUrl = `https://service.prerender.io/${targetUrl}`;
    const response = await fetch(prerenderUrl, {
      headers: {
        'X-Prerender-Token': prerenderToken,
        'User-Agent': 'Mozilla/5.0 (compatible; Prerender/1.0)',
      },
    });

    if (response.ok) {
      const html = await response.text();
      return new Response(html, {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=86400, s-maxage=604800',
          'X-Prerendered': 'true',
        },
      });
    }

    // If prerender.io returns an error, log and fall through
    console.log(`[bot-prerender] Prerender.io returned ${response.status} for: ${url.pathname}`);
  } catch (error) {
    console.log(`[bot-prerender] Prerender.io fetch failed for: ${url.pathname}`, error);
  }

  // Fallback: serve the SPA as-is
  return context.next();
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
