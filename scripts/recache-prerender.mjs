#!/usr/bin/env node
/**
 * Prerender.io recache utility.
 *
 * Forces Prerender.io to refetch and re-cache the listed URLs so that bots
 * (Googlebot, ChatGPT, Gemini, LinkedIn, Tavily, etc.) see the latest content
 * from the React app instead of an old snapshot.
 *
 * Runs as part of the Netlify build, but ONLY when the RECACHE_NOW environment
 * variable is set to a truthy value. Without that gate it exits cleanly so it
 * doesn't slow down every build or hit Prerender.io's rate limits unnecessarily.
 *
 * To trigger a recache:
 *   1. Set RECACHE_NOW=1 in Netlify env vars (production context)
 *   2. Push any commit to main (or trigger a redeploy)
 *   3. After the build succeeds, unset RECACHE_NOW so it doesn't run again
 *
 * Required env vars:
 *   - PRERENDER_TOKEN — the Prerender.io API token
 *   - RECACHE_NOW    — gate ("1" / "true" to run, anything else skips)
 */

const PRERENDER_TOKEN = process.env.PRERENDER_TOKEN;
const RECACHE_NOW = process.env.RECACHE_NOW;

const URLS = [
  'https://mayaziv-law.com/',
  'https://mayaziv-law.com/en/',
  'https://mayaziv-law.com/en/about',
  'https://mayaziv-law.com/en/real-estate',
  'https://mayaziv-law.com/en/taxation',
  'https://mayaziv-law.com/en/estate-planning',
  'https://mayaziv-law.com/en/olim-residents',
  'https://mayaziv-law.com/en/commercial',
  'https://mayaziv-law.com/en/contact',
  'https://mayaziv-law.com/en/insights',
  'https://mayaziv-law.com/he/',
  'https://mayaziv-law.com/he/about',
  'https://mayaziv-law.com/he/real-estate',
  'https://mayaziv-law.com/he/taxation',
  'https://mayaziv-law.com/he/estate-planning',
  'https://mayaziv-law.com/he/olim-residents',
  'https://mayaziv-law.com/he/commercial',
  'https://mayaziv-law.com/he/contact',
  'https://mayaziv-law.com/he/insights',
];

function gateOpen(value) {
  if (!value) return false;
  const v = String(value).trim().toLowerCase();
  return v === '1' || v === 'true' || v === 'yes' || v === 'on';
}

async function main() {
  if (!gateOpen(RECACHE_NOW)) {
    console.log('[recache-prerender] RECACHE_NOW not set — skipping. Set RECACHE_NOW=1 to run.');
    return;
  }

  if (!PRERENDER_TOKEN) {
    console.warn('[recache-prerender] PRERENDER_TOKEN missing — cannot recache. Build will continue.');
    return;
  }

  console.log(`[recache-prerender] Recaching ${URLS.length} URLs at api.prerender.io ...`);

  const results = [];
  for (const url of URLS) {
    try {
      const response = await fetch('https://api.prerender.io/recache', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prerenderToken: PRERENDER_TOKEN, url }),
      });
      const ok = response.status >= 200 && response.status < 300;
      results.push({ url, status: response.status, ok });
      console.log(`  ${ok ? 'OK ' : 'ERR'} ${response.status}  ${url}`);
      // Be polite — Prerender.io recommends spacing requests
      await new Promise((r) => setTimeout(r, 300));
    } catch (err) {
      results.push({ url, status: 'error', ok: false, error: String(err) });
      console.error(`  ERR fetch  ${url}  ${err && err.message ? err.message : err}`);
    }
  }

  const succeeded = results.filter((r) => r.ok).length;
  const failed = results.length - succeeded;
  console.log(`[recache-prerender] Done. Succeeded: ${succeeded}/${results.length}, Failed: ${failed}.`);

  // Don't fail the build if recache fails — recache is best-effort.
}

main().catch((err) => {
  console.error('[recache-prerender] Unexpected error:', err);
  // Best effort — exit 0 so the build doesn't fail
  process.exit(0);
});
