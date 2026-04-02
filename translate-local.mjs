#!/usr/bin/env node
/**
 * translate-local.mjs
 *
 * Extracts all English text from the website source files and translates
 * them to Hebrew using the DeepL API.
 *
 * Usage:
 *   DEEPL_API_KEY=your-key-here node translate-local.mjs
 *
 * Output:
 *   translations_output.json — contains all translated Hebrew strings
 */

import fs from 'fs';
import path from 'path';

const DEEPL_KEY = process.env.DEEPL_API_KEY;
if (!DEEPL_KEY) {
  console.error('ERROR: Set DEEPL_API_KEY environment variable first.');
  console.error('  DEEPL_API_KEY=your-key node translate-local.mjs');
  process.exit(1);
}

// DeepL Free uses api-free.deepl.com, Pro uses api.deepl.com
const DEEPL_URL = DEEPL_KEY.endsWith(':fx')
  ? 'https://api-free.deepl.com/v2/translate'
  : 'https://api.deepl.com/v2/translate';

// ─── Rate-limit helper ───────────────────────────────────────────────
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function translateBatch(texts, retries = 3) {
  for (let attempt = 0; attempt < retries; attempt++) {
    const res = await fetch(DEEPL_URL, {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${DEEPL_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: texts,
        source_lang: 'EN',
        target_lang: 'HE',
        formality: 'default',
      }),
    });

    if (res.status === 429 || res.status >= 500) {
      const wait = (attempt + 1) * 2000;
      console.warn(`  ⏳ Rate limited / server error (${res.status}), retrying in ${wait}ms...`);
      await sleep(wait);
      continue;
    }

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`DeepL error ${res.status}: ${body}`);
    }

    const data = await res.json();
    return data.translations.map(t => t.text);
  }
  throw new Error('Exceeded retry limit');
}

// Translate an array of strings in batches of `batchSize`
async function translateAll(strings, batchSize = 40) {
  const results = [];
  for (let i = 0; i < strings.length; i += batchSize) {
    const batch = strings.slice(i, i + batchSize);
    console.log(`  Translating ${i + 1}–${Math.min(i + batchSize, strings.length)} of ${strings.length}...`);
    const translated = await translateBatch(batch);
    results.push(...translated);
    // Small delay between batches to stay within rate limits
    if (i + batchSize < strings.length) await sleep(500);
  }
  return results;
}

// ─── Extract English strings ─────────────────────────────────────────

// 1) LanguageContext.tsx — extract the en: { ... } block
function extractContextTranslations() {
  const src = fs.readFileSync(
    path.join('src', 'contexts', 'LanguageContext.tsx'), 'utf8'
  );

  const entries = {};
  // Match lines like:  'key.name': 'value',  or  'key.name': "value",
  const re = /^\s*'([^']+)':\s*'((?:[^'\\]|\\.)*)'\s*,?\s*$/gm;
  let inEn = false;
  let braceDepth = 0;

  for (const line of src.split('\n')) {
    // Detect start of en block
    if (/^\s*en:\s*\{/.test(line)) { inEn = true; braceDepth = 1; continue; }
    if (!inEn) continue;

    // Track brace depth
    for (const ch of line) {
      if (ch === '{') braceDepth++;
      if (ch === '}') braceDepth--;
    }
    if (braceDepth <= 0) break; // end of en block

    const m = line.match(/^\s*'([^']+)':\s*'((?:[^'\\]|\\.)*)'\s*,?\s*$/);
    if (m) {
      entries[m[1]] = m[2].replace(/\\'/g, "'");
    }
  }

  return entries;
}

// 2) Privacy.tsx & Terms.tsx — extract from the en: { ... } block
function extractPageTranslations(filename) {
  const src = fs.readFileSync(path.join('src', 'pages', filename), 'utf8');

  // Simple approach: eval the en object from between "en: {" and the matching "}"
  // Find the en block
  const enStart = src.indexOf('en: {');
  if (enStart === -1) throw new Error(`Cannot find en block in ${filename}`);

  let depth = 0;
  let start = -1;
  for (let i = enStart + 4; i < src.length; i++) {
    if (src[i] === '{') { if (start === -1) start = i; depth++; }
    if (src[i] === '}') { depth--; if (depth === 0) {
      const jsonish = src.slice(start, i + 1);
      // Convert JS object literal to JSON-parseable form
      const json = jsonish
        .replace(/'/g, '"')
        .replace(/,\s*([}\]])/g, '$1') // trailing commas
        .replace(/(\w+):/g, '"$1":');   // unquoted keys
      try {
        return JSON.parse(json);
      } catch {
        // Fallback: manual extraction
        return extractPageManual(src, enStart);
      }
    }}
  }
  throw new Error(`Cannot parse en block in ${filename}`);
}

function extractPageManual(src, enStart) {
  // Extract title, lastUpdated, and sections manually
  const result = { title: '', lastUpdated: '', sections: [] };

  // Find content between en: { ... }
  let depth = 0;
  let blockEnd = -1;
  for (let i = enStart; i < src.length; i++) {
    if (src[i] === '{') depth++;
    if (src[i] === '}') { depth--; if (depth === 0) { blockEnd = i; break; } }
  }
  const block = src.slice(enStart, blockEnd + 1);

  // title
  const titleM = block.match(/title:\s*'((?:[^'\\]|\\.)*)'/);
  if (titleM) result.title = titleM[1].replace(/\\'/g, "'");

  // lastUpdated
  const luM = block.match(/lastUpdated:\s*'((?:[^'\\]|\\.)*)'/);
  if (luM) result.lastUpdated = luM[1].replace(/\\'/g, "'");

  // sections
  const sectionRe = /\{\s*title:\s*'((?:[^'\\]|\\.)*)'\s*,\s*content:\s*'((?:[^'\\]|\\.)*)'\s*\}/g;
  let sm;
  while ((sm = sectionRe.exec(block)) !== null) {
    result.sections.push({
      title: sm[1].replace(/\\'/g, "'"),
      content: sm[2].replace(/\\'/g, "'"),
    });
  }
  return result;
}

// ─── Main ────────────────────────────────────────────────────────────

async function main() {
  console.log('Extracting English text...\n');

  // 1. LanguageContext translations
  const contextEN = extractContextTranslations();
  const contextKeys = Object.keys(contextEN);
  const contextValues = Object.values(contextEN);
  console.log(`LanguageContext: ${contextKeys.length} keys found`);

  // Filter out empty strings — no point translating them
  const nonEmptyIndices = [];
  const nonEmptyValues = [];
  contextValues.forEach((v, i) => {
    if (v.trim()) { nonEmptyIndices.push(i); nonEmptyValues.push(v); }
  });

  // 2. Privacy page
  const privacyEN = extractPageTranslations('Privacy.tsx');
  console.log(`Privacy: title + lastUpdated + ${privacyEN.sections.length} sections`);

  // 3. Terms page
  const termsEN = extractPageTranslations('Terms.tsx');
  console.log(`Terms: title + lastUpdated + ${termsEN.sections.length} sections`);

  // Collect all strings to translate in one go
  const allStrings = [
    ...nonEmptyValues,
    privacyEN.title,
    privacyEN.lastUpdated,
    ...privacyEN.sections.flatMap(s => [s.title, s.content]),
    termsEN.title,
    termsEN.lastUpdated,
    ...termsEN.sections.flatMap(s => [s.title, s.content]),
  ];

  console.log(`\nTotal strings to translate: ${allStrings.length}`);
  console.log('Starting DeepL translation (EN → HE)...\n');

  const allTranslated = await translateAll(allStrings);

  // Split results back
  let idx = 0;

  // Context translations
  const contextHE = {};
  for (let i = 0; i < contextKeys.length; i++) {
    if (contextValues[i].trim()) {
      contextHE[contextKeys[i]] = allTranslated[idx++];
    } else {
      contextHE[contextKeys[i]] = ''; // preserve empty strings
    }
  }

  // Privacy
  const privacyHE = {
    title: allTranslated[idx++],
    lastUpdated: allTranslated[idx++],
    sections: privacyEN.sections.map(s => ({
      title: allTranslated[idx++],
      content: allTranslated[idx++],
    })),
  };

  // Terms
  const termsHE = {
    title: allTranslated[idx++],
    lastUpdated: allTranslated[idx++],
    sections: termsEN.sections.map(s => ({
      title: allTranslated[idx++],
      content: allTranslated[idx++],
    })),
  };

  const output = {
    context: contextHE,
    privacy: privacyHE,
    terms: termsHE,
  };

  fs.writeFileSync('translations_output.json', JSON.stringify(output, null, 2), 'utf8');
  console.log('\n✅ Done! Translations written to translations_output.json');
  console.log('Share this file back so the translations can be applied to the source code.');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
