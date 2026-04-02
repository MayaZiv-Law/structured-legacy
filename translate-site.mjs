#!/usr/bin/env node
/**
 * Standalone script - run from ANY folder.
 * 1. Fetches all English pages from the live site
 * 2. Sends text to DeepL for Hebrew translation
 * 3. Outputs deepl-translations.json
 *
 * Usage:
 *   npm install node-fetch cheerio  (already done)
 *   node translate-site.mjs
 */

import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import fs from 'fs';

const DEEPL_API_KEY = 'e4c2d924-f456-4f15-8cbf-dc5412b0868a:fx';
const DEEPL_URL = 'https://api-free.deepl.com/v2/translate';
const SITE_BASE = 'https://mayaziv-law.com';

const PAGES = [
  { path: '/en', name: 'Homepage' },
  { path: '/en/about', name: 'About' },
  { path: '/en/real-estate', name: 'Real Estate' },
  { path: '/en/taxation', name: 'Taxation' },
  { path: '/en/estate-planning', name: 'Estate Planning' },
  { path: '/en/olim-residents', name: 'Olim & Returning Residents' },
  { path: '/en/commercial', name: 'Commercial & Civil' },
  { path: '/en/insights', name: 'Insights' },
  { path: '/en/contact', name: 'Contact' },
  { path: '/en/privacy', name: 'Privacy' },
  { path: '/en/terms', name: 'Terms' },
];

// ── Fetch & extract ─────────────────────────────────────────────────
async function fetchPageText(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

function extractTexts(html) {
  const $ = cheerio.load(html);
  $('script, style, noscript, svg, link, meta').remove();

  const texts = [];
  const seen = new Set();

  // Get text from meaningful elements
  $('h1, h2, h3, h4, h5, h6, p, li, a, button, span, label, option, td, th, dt, dd, figcaption, blockquote').each((_, el) => {
    const $el = $(el);
    // Get direct text only (not children's text) for inline elements
    let t;
    if (['SPAN', 'A', 'BUTTON', 'LABEL', 'OPTION'].includes(el.tagName?.toUpperCase())) {
      t = $el.clone().children().remove().end().text().trim();
      if (!t) t = $el.text().trim();
    } else {
      t = $el.text().trim();
    }
    // Filter out very short or numeric-only strings
    if (t && t.length > 1 && !/^\d+$/.test(t) && !seen.has(t)) {
      seen.add(t);
      texts.push(t);
    }
  });

  return texts;
}

// ── DeepL translate ─────────────────────────────────────────────────
async function translateBatch(texts) {
  const results = [];
  // DeepL limit: 50 texts per request, 128KB body
  for (let i = 0; i < texts.length; i += 40) {
    const batch = texts.slice(i, i + 40);
    const batchNum = Math.floor(i / 40) + 1;
    const total = Math.ceil(texts.length / 40);
    console.log(`  DeepL batch ${batchNum}/${total} (${batch.length} texts)...`);

    const res = await fetch(DEEPL_URL, {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: batch,
        source_lang: 'EN',
        target_lang: 'HE',
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`DeepL error ${res.status}: ${body}`);
    }
    const data = await res.json();
    results.push(...data.translations.map((t) => t.text));

    // Small delay between batches to respect rate limits
    if (i + 40 < texts.length) await new Promise(r => setTimeout(r, 500));
  }
  return results;
}

// ── Main ────────────────────────────────────────────────────────────
async function main() {
  console.log('\n========================================');
  console.log('  Maya Ziv Law - DeepL Translation Tool');
  console.log('========================================\n');

  const allPageData = [];

  // Step 1: Fetch all pages
  for (const page of PAGES) {
    const url = `${SITE_BASE}${page.path}`;
    console.log(`[${page.name}] Fetching ${url}...`);
    try {
      const html = await fetchPageText(url);
      const texts = extractTexts(html);
      console.log(`  -> Found ${texts.length} text fragments\n`);
      allPageData.push({ page: page.name, path: page.path, texts });
    } catch (err) {
      console.error(`  -> ERROR: ${err.message}\n`);
      allPageData.push({ page: page.name, path: page.path, texts: [], error: err.message });
    }
  }

  // Step 2: Collect unique texts across all pages
  const uniqueTexts = [];
  const seen = new Set();
  for (const pd of allPageData) {
    for (const t of pd.texts) {
      if (!seen.has(t)) {
        seen.add(t);
        uniqueTexts.push(t);
      }
    }
  }
  console.log(`\nTotal unique texts to translate: ${uniqueTexts.length}\n`);

  if (uniqueTexts.length === 0) {
    console.error('No texts found! The site may be using client-side rendering.');
    console.log('Saving raw HTML for inspection...');
    // Try to save raw HTML for debugging
    try {
      const html = await fetchPageText(`${SITE_BASE}/en`);
      fs.writeFileSync('debug-homepage.html', html, 'utf8');
      console.log('Saved debug-homepage.html - check if content is there.');
    } catch (e) {
      console.error('Could not fetch even for debug:', e.message);
    }
    return;
  }

  // Step 3: Translate via DeepL
  console.log('Sending to DeepL for Hebrew translation...');
  const heTexts = await translateBatch(uniqueTexts);

  // Step 4: Build output
  const translations = uniqueTexts.map((en, i) => ({
    english: en,
    hebrew: heTexts[i],
  }));

  // Also build per-page output
  const perPage = allPageData.map((pd) => ({
    page: pd.page,
    path: pd.path,
    translations: pd.texts.map((t) => {
      const idx = uniqueTexts.indexOf(t);
      return { english: t, hebrew: heTexts[idx] };
    }),
  }));

  const output = {
    generated: new Date().toISOString(),
    totalTexts: uniqueTexts.length,
    allTranslations: translations,
    byPage: perPage,
  };

  const outPath = 'deepl-translations.json';
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');

  console.log(`\n========================================`);
  console.log(`  DONE!`);
  console.log(`  ${uniqueTexts.length} texts translated`);
  console.log(`  Output: ${outPath}`);
  console.log(`========================================\n`);

  // Print a preview
  console.log('Preview (first 10):');
  for (let i = 0; i < Math.min(10, translations.length); i++) {
    console.log(`  EN: ${translations[i].english.substring(0, 60)}...`);
    console.log(`  HE: ${translations[i].hebrew.substring(0, 60)}...`);
    console.log('');
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
