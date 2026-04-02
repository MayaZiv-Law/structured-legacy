#!/usr/bin/env node
/**
 * Fetches all English text from the live site mayaziv-law.com/en/*
 * and translates it to Hebrew using DeepL API, then updates LanguageContext.tsx.
 *
 * Usage:
 *   npm install node-fetch cheerio
 *   node translate-site.mjs
 */

import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

const DEEPL_API_KEY = 'e4c2d924-f456-4f15-8cbf-dc5412b0868a:fx';
const DEEPL_URL = 'https://api-free.deepl.com/v2/translate';
const SITE_BASE = 'https://mayaziv-law.com';

const PAGES = [
  '/en',
  '/en/about',
  '/en/real-estate',
  '/en/taxation',
  '/en/estate-planning',
  '/en/olim-residents',
  '/en/commercial',
  '/en/insights',
  '/en/contact',
  '/en/privacy',
  '/en/terms',
];

// ── 1. Fetch page text ──────────────────────────────────────────────
async function fetchPageText(url) {
  console.log(`  Fetching ${url} ...`);
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

function extractTexts(html) {
  const $ = cheerio.load(html);
  // Remove script/style
  $('script, style, noscript, svg').remove();

  const texts = new Set();
  const walk = (el) => {
    $(el).contents().each((_, node) => {
      if (node.type === 'text') {
        const t = $(node).text().trim();
        if (t && t.length > 1) texts.add(t);
      } else if (node.type === 'tag') {
        walk(node);
      }
    });
  };
  walk($('body'));
  return [...texts];
}

// ── 2. Translate via DeepL ──────────────────────────────────────────
async function translateBatch(texts) {
  // DeepL allows up to 50 texts per request
  const results = [];
  for (let i = 0; i < texts.length; i += 50) {
    const batch = texts.slice(i, i + 50);
    console.log(`  Translating batch ${Math.floor(i / 50) + 1} (${batch.length} texts)...`);
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
  }
  return results;
}

// ── 3. Read current LanguageContext and map EN keys → values ────────
function readTranslationKeys(filePath) {
  const src = fs.readFileSync(filePath, 'utf8');
  const enBlock = src.match(/en:\s*\{([\s\S]*?)\n\s*\},\s*\n\s*he:/);
  if (!enBlock) throw new Error('Could not parse EN translations block');

  const entries = [];
  const re = /^\s*'([^']+)':\s*'((?:[^'\\]|\\.)*)'/gm;
  let m;
  while ((m = re.exec(enBlock[1]))) {
    const key = m[1];
    const value = m[2].replace(/\\'/g, "'");
    if (value.trim()) entries.push({ key, value });
  }
  return entries;
}

// ── 4. Update HE block in LanguageContext.tsx ───────────────────────
function updateHeTranslations(filePath, keyValueMap) {
  let src = fs.readFileSync(filePath, 'utf8');

  for (const [key, heValue] of Object.entries(keyValueMap)) {
    // Escape single quotes for JS string
    const escaped = heValue.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    // Match the HE key line and replace its value
    const regex = new RegExp(`('${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}':\\s*')(?:[^'\\\\]|\\\\.)*'`);
    src = src.replace(regex, `$1${escaped}'`);
  }

  fs.writeFileSync(filePath, src, 'utf8');
}

// ── Main ────────────────────────────────────────────────────────────
async function main() {
  const langCtxPath = path.resolve('src/contexts/LanguageContext.tsx');

  console.log('\n=== Step 1: Reading translation keys from LanguageContext.tsx ===');
  const enEntries = readTranslationKeys(langCtxPath);
  console.log(`  Found ${enEntries.length} English translation keys.\n`);

  console.log('=== Step 2: Fetching live site pages ===');
  const liveTexts = new Map(); // text → Set<pages>
  for (const pagePath of PAGES) {
    try {
      const html = await fetchPageText(`${SITE_BASE}${pagePath}`);
      const texts = extractTexts(html);
      for (const t of texts) {
        if (!liveTexts.has(t)) liveTexts.set(t, new Set());
        liveTexts.get(t).add(pagePath);
      }
    } catch (err) {
      console.error(`  ERROR on ${pagePath}: ${err.message}`);
    }
  }
  console.log(`  Extracted ${liveTexts.size} unique text fragments from live site.\n`);

  // Match live texts to EN keys
  const enValueToKey = new Map();
  for (const { key, value } of enEntries) {
    // Use the value as-is for matching
    enValueToKey.set(value, key);
    // Also try first 80 chars for partial matching on long texts
    if (value.length > 80) {
      enValueToKey.set(value.substring(0, 80), key);
    }
  }

  // Collect EN values that appear on the live site
  const toTranslate = [];
  const keysToTranslate = [];
  for (const { key, value } of enEntries) {
    toTranslate.push(value);
    keysToTranslate.push(key);
  }

  console.log(`=== Step 3: Translating ${toTranslate.length} texts via DeepL ===`);
  const heTranslations = await translateBatch(toTranslate);
  console.log(`  Received ${heTranslations.length} Hebrew translations.\n`);

  // Build key → HE value map
  const keyHeMap = {};
  for (let i = 0; i < keysToTranslate.length; i++) {
    keyHeMap[keysToTranslate[i]] = heTranslations[i];
  }

  // Save raw translations for review
  const reviewPath = path.resolve('deepl-translations.json');
  const reviewData = keysToTranslate.map((key, i) => ({
    key,
    en: toTranslate[i],
    he: heTranslations[i],
  }));
  fs.writeFileSync(reviewPath, JSON.stringify(reviewData, null, 2), 'utf8');
  console.log(`  Saved translations for review: ${reviewPath}`);

  console.log('\n=== Step 4: Updating LanguageContext.tsx HE translations ===');
  updateHeTranslations(langCtxPath, keyHeMap);
  console.log('  Done! Hebrew translations updated.\n');

  console.log('=== Summary ===');
  console.log(`  Pages fetched:       ${PAGES.length}`);
  console.log(`  Live text fragments: ${liveTexts.size}`);
  console.log(`  Keys translated:     ${keysToTranslate.length}`);
  console.log(`  Review file:         ${reviewPath}`);
  console.log('\nPlease review deepl-translations.json and verify the changes in LanguageContext.tsx');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
