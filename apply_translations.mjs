import fs from 'fs';

const data = JSON.parse(fs.readFileSync('translations_output.json', 'utf8'));

// === 1. LanguageContext.tsx ===
{
  const file = 'src/contexts/LanguageContext.tsx';
  let src = fs.readFileSync(file, 'utf8');
  const lines = src.split('\n');
  
  // Find he: { line
  let heStart = -1;
  let heEnd = -1;
  let depth = 0;
  
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*he:\s*\{/.test(lines[i]) && heStart === -1) {
      heStart = i;
      depth = 1;
      continue;
    }
    if (heStart !== -1 && heEnd === -1) {
      for (const ch of lines[i]) {
        if (ch === '{') depth++;
        if (ch === '}') { depth--; if (depth === 0) { heEnd = i; break; } }
      }
    }
  }
  
  console.log(`LanguageContext: he block lines ${heStart+1} to ${heEnd+1}`);
  
  // Build new he block
  const heLines = ['  he: {'];
  for (const [key, value] of Object.entries(data.context)) {
    const escaped = value.replaceAll("\\", "\\\\").replaceAll("'", "\\'");
    heLines.push(`    '${key}': '${escaped}',`);
  }
  heLines.push('  }');
  
  // Replace
  const newLines = [
    ...lines.slice(0, heStart),
    ...heLines,
    ...lines.slice(heEnd + 1)
  ];
  
  fs.writeFileSync(file, newLines.join('\n'), 'utf8');
  console.log(`LanguageContext: wrote ${Object.keys(data.context).length} he keys`);
}

// === 2. Privacy.tsx ===
{
  const file = 'src/pages/Privacy.tsx';
  let src = fs.readFileSync(file, 'utf8');
  const lines = src.split('\n');
  
  let heStart = -1;
  let heEnd = -1;
  let depth = 0;
  
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*he:\s*\{/.test(lines[i]) && heStart === -1) {
      heStart = i;
      depth = 1;
      continue;
    }
    if (heStart !== -1 && heEnd === -1) {
      for (const ch of lines[i]) {
        if (ch === '{') depth++;
        if (ch === '}') { depth--; if (depth === 0) { heEnd = i; break; } }
      }
    }
  }
  
  console.log(`Privacy: he block lines ${heStart+1} to ${heEnd+1}`);
  
  const p = data.privacy;
  const heLines = ['    he: {'];
  heLines.push(`      title: '${p.title.replace(/'/g, "\'")}',`);
  heLines.push(`      lastUpdated: '${p.lastUpdated.replace(/'/g, "\'")}',`);
  heLines.push('      sections: [');
  for (const s of p.sections) {
    heLines.push('        {');
    heLines.push(`          title: '${s.title.replace(/'/g, "\'")}',`);
    heLines.push(`          content: '${s.content.replace(/'/g, "\'")}',`);
    heLines.push('        },');
  }
  heLines.push('      ],');
  heLines.push('    }');
  
  const newLines = [...lines.slice(0, heStart), ...heLines, ...lines.slice(heEnd + 1)];
  fs.writeFileSync(file, newLines.join('\n'), 'utf8');
  console.log(`Privacy: wrote ${p.sections.length} sections`);
}

// === 3. Terms.tsx ===
{
  const file = 'src/pages/Terms.tsx';
  let src = fs.readFileSync(file, 'utf8');
  const lines = src.split('\n');
  
  let heStart = -1;
  let heEnd = -1;
  let depth = 0;
  
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*he:\s*\{/.test(lines[i]) && heStart === -1) {
      heStart = i;
      depth = 1;
      continue;
    }
    if (heStart !== -1 && heEnd === -1) {
      for (const ch of lines[i]) {
        if (ch === '{') depth++;
        if (ch === '}') { depth--; if (depth === 0) { heEnd = i; break; } }
      }
    }
  }
  
  console.log(`Terms: he block lines ${heStart+1} to ${heEnd+1}`);
  
  const t = data.terms;
  const heLines = ['    he: {'];
  heLines.push(`      title: '${t.title.replace(/'/g, "\'")}',`);
  heLines.push(`      lastUpdated: '${t.lastUpdated.replace(/'/g, "\'")}',`);
  heLines.push('      sections: [');
  for (const s of t.sections) {
    heLines.push('        {');
    heLines.push(`          title: '${s.title.replace(/'/g, "\'")}',`);
    heLines.push(`          content: '${s.content.replace(/'/g, "\'")}',`);
    heLines.push('        },');
  }
  heLines.push('      ],');
  heLines.push('    }');
  
  const newLines = [...lines.slice(0, heStart), ...heLines, ...lines.slice(heEnd + 1)];
  fs.writeFileSync(file, newLines.join('\n'), 'utf8');
  console.log(`Terms: wrote ${t.sections.length} sections`);
}

console.log('\nAll translations applied!');
