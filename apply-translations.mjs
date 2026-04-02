#!/usr/bin/env node
/**
 * apply-translations.mjs
 *
 * Reads translations_output.json (produced by translate-local.mjs)
 * and prints the replacement Hebrew blocks for each file.
 *
 * Usage:
 *   node apply-translations.mjs
 *
 * This script prints the replacement code to stdout so you can verify
 * before applying. It does NOT modify source files directly.
 */

import fs from 'fs';

const data = JSON.parse(fs.readFileSync('translations_output.json', 'utf8'));

// Helper: escape single quotes for JS string literals
function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
}

console.log('='.repeat(70));
console.log('LANGUAGE CONTEXT — he: { ... } block');
console.log('='.repeat(70));
console.log('  he: {');
let lastCategory = '';
for (const [key, value] of Object.entries(data.context)) {
  const cat = key.split('.')[0];
  if (cat !== lastCategory) {
    if (lastCategory) console.log('');
    const categoryLabels = {
      nav: 'Navigation', hero: 'Hero', guide: 'Guide Section',
      parallax: 'Parallax', method: 'Methodology', practice: 'Practice Areas',
      insights: 'Insights', article: 'Articles', faq: 'FAQ',
      cta: 'CTA', footer: 'Footer', contact: 'Contact Page',
      about: 'About Page', service: 'Service Pages',
      estate: 'Estate Planning Page', realestate: 'Real Estate Page',
      tax: 'Taxation Page', olim: 'Olim Page', commercial: 'Commercial Page',
      conflict: 'Conflict Section',
    };
    console.log(`    // ${categoryLabels[cat] || cat}`);
    lastCategory = cat;
  }
  console.log(`    '${key}': '${esc(value)}',`);
}
console.log('  },');

console.log('\n' + '='.repeat(70));
console.log('PRIVACY PAGE — he: { ... } block');
console.log('='.repeat(70));
console.log(`    he: {`);
console.log(`      title: '${esc(data.privacy.title)}',`);
console.log(`      lastUpdated: '${esc(data.privacy.lastUpdated)}',`);
console.log(`      sections: [`);
for (const s of data.privacy.sections) {
  console.log(`        {`);
  console.log(`          title: '${esc(s.title)}',`);
  console.log(`          content: '${esc(s.content)}'`);
  console.log(`        },`);
}
console.log(`      ]`);
console.log(`    }`);

console.log('\n' + '='.repeat(70));
console.log('TERMS PAGE — he: { ... } block');
console.log('='.repeat(70));
console.log(`    he: {`);
console.log(`      title: '${esc(data.terms.title)}',`);
console.log(`      lastUpdated: '${esc(data.terms.lastUpdated)}',`);
console.log(`      sections: [`);
for (const s of data.terms.sections) {
  console.log(`        {`);
  console.log(`          title: '${esc(s.title)}',`);
  console.log(`          content: '${esc(s.content)}'`);
  console.log(`        },`);
}
console.log(`      ]`);
console.log(`    }`);

console.log('\n✅ Copy the blocks above into the respective source files.');
