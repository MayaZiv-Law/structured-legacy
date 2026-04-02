/**
 * One-time script: Translate all English website text to Hebrew via DeepL API.
 * Usage: node translate.mjs
 * Output: translations_output.json
 */

import { readFileSync, writeFileSync } from 'fs';

const DEEPL_KEY = 'e4c2d924-f456-4f15-8cbf-dc5412b0868a:fx';
const DEEPL_URL = 'https://api-free.deepl.com/v2/translate';
const BATCH_SIZE = 40; // texts per API call

// --- Extract translations from LanguageContext.tsx ---
function extractTranslations(filePath) {
  const content = readFileSync(filePath, 'utf-8');

  // Extract the en: { ... } block
  const enStart = content.indexOf("  en: {");
  const heStart = content.indexOf("  he: {");
  const enBlock = content.slice(enStart, heStart);

  const pairs = {};
  const regex = /^\s+'([^']+)':\s*'((?:[^'\\]|\\.|'')*?)'/gm;
  let match;
  while ((match = regex.exec(enBlock)) !== null) {
    const key = match[1];
    // Unescape the value
    let value = match[2].replace(/\\'/g, "'").replace(/\\n/g, "\n");
    pairs[key] = value;
  }
  return pairs;
}

// --- Extract Privacy.tsx content ---
function extractPageContent(filePath) {
  const content = readFileSync(filePath, 'utf-8');

  // Extract en block
  const enStart = content.indexOf("en: {");
  const heStart = content.indexOf("he: {");
  const enBlock = content.slice(enStart, heStart);

  const texts = [];

  // Extract title
  const titleMatch = enBlock.match(/title:\s*'([^']*)'/);
  if (titleMatch) texts.push({ field: 'title', text: titleMatch[1] });

  const lastUpdatedMatch = enBlock.match(/lastUpdated:\s*'([^']*)'/);
  if (lastUpdatedMatch) texts.push({ field: 'lastUpdated', text: lastUpdatedMatch[1] });

  // Extract sections
  const sectionRegex = /\{\s*\n?\s*title:\s*'((?:[^'\\]|\\.)*)'\s*,\s*\n?\s*content:\s*'((?:[^'\\]|\\.)*)'\s*\n?\s*\}/g;
  let sMatch;
  let idx = 0;
  while ((sMatch = sectionRegex.exec(enBlock)) !== null) {
    texts.push({ field: `section.${idx}.title`, text: sMatch[1].replace(/\\'/g, "'") });
    texts.push({ field: `section.${idx}.content`, text: sMatch[2].replace(/\\'/g, "'") });
    idx++;
  }

  return texts;
}

// --- Call DeepL API ---
async function translateBatch(texts, retries = 4) {
  const params = new URLSearchParams();
  for (const t of texts) {
    params.append('text', t);
  }
  params.append('source_lang', 'EN');
  params.append('target_lang', 'HE');
  params.append('formality', 'prefer_more');

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000); // 30s timeout

      const resp = await fetch(DEEPL_URL, {
        method: 'POST',
        headers: {
          'Authorization': `DeepL-Auth-Key ${DEEPL_KEY}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!resp.ok) {
        const body = await resp.text();
        throw new Error(`DeepL API error ${resp.status}: ${body}`);
      }

      const data = await resp.json();
      return data.translations.map(t => t.text);
    } catch (err) {
      if (attempt < retries) {
        const delay = Math.pow(2, attempt + 1) * 1000; // 2s, 4s, 8s, 16s
        console.log(`   Attempt ${attempt + 1} failed: ${err.message}. Retrying in ${delay / 1000}s...`);
        await new Promise(r => setTimeout(r, delay));
      } else {
        throw err;
      }
    }
  }
}

async function translateAll(texts) {
  const results = [];
  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batch = texts.slice(i, i + BATCH_SIZE);
    console.log(`  Translating batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(texts.length / BATCH_SIZE)} (${batch.length} texts)...`);
    const translated = await translateBatch(batch);
    results.push(...translated);
    // Small delay between batches
    if (i + BATCH_SIZE < texts.length) {
      await new Promise(r => setTimeout(r, 500));
    }
  }
  return results;
}

// --- Main ---
async function main() {
  console.log('=== DeepL Translation Script ===\n');

  // 1. Extract LanguageContext translations
  console.log('1. Extracting English translations from LanguageContext.tsx...');
  const enTranslations = extractTranslations('src/contexts/LanguageContext.tsx');
  const keys = Object.keys(enTranslations);
  const nonEmptyKeys = keys.filter(k => enTranslations[k].trim() !== '');
  console.log(`   Found ${keys.length} keys, ${nonEmptyKeys.length} non-empty\n`);

  // 2. Extract Privacy page
  console.log('2. Extracting Privacy.tsx content...');
  const privacyTexts = extractPageContent('src/pages/Privacy.tsx');
  console.log(`   Found ${privacyTexts.length} text fields\n`);

  // 3. Extract Terms page
  console.log('3. Extracting Terms.tsx content...');
  const termsTexts = extractPageContent('src/pages/Terms.tsx');
  console.log(`   Found ${termsTexts.length} text fields\n`);

  // 4. Combine all texts for translation
  const allTexts = [];
  const mapping = []; // track what each index maps to

  for (const key of nonEmptyKeys) {
    mapping.push({ source: 'context', key });
    allTexts.push(enTranslations[key]);
  }
  for (const item of privacyTexts) {
    mapping.push({ source: 'privacy', field: item.field });
    allTexts.push(item.text);
  }
  for (const item of termsTexts) {
    mapping.push({ source: 'terms', field: item.field });
    allTexts.push(item.text);
  }

  const totalChars = allTexts.reduce((s, t) => s + t.length, 0);
  console.log(`Total texts to translate: ${allTexts.length}`);
  console.log(`Total characters: ${totalChars}\n`);

  // 5. Translate
  console.log('4. Calling DeepL API...');
  const translated = await translateAll(allTexts);
  console.log(`   Received ${translated.length} translations\n`);

  // 6. Build output
  const output = {
    context: {},
    privacy: {},
    terms: {},
  };

  // Add empty keys
  for (const key of keys) {
    if (enTranslations[key].trim() === '') {
      output.context[key] = '';
    }
  }

  for (let i = 0; i < mapping.length; i++) {
    const m = mapping[i];
    if (m.source === 'context') {
      output.context[m.key] = translated[i];
    } else if (m.source === 'privacy') {
      output.privacy[m.field] = translated[i];
    } else if (m.source === 'terms') {
      output.terms[m.field] = translated[i];
    }
  }

  // 7. Write output
  writeFileSync('translations_output.json', JSON.stringify(output, null, 2), 'utf-8');
  console.log('5. Written to translations_output.json');
  console.log('\nDone!');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
