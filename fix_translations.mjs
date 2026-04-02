import fs from 'fs';

let data = JSON.parse(fs.readFileSync('translations_output.json', 'utf8'));

function fixValue(val) {
  if (typeof val !== 'string') return val;
  // נדל"ן -> מקרקעין
  val = val.replace(/נדל"ן/g, 'מקרקעין');
  // Remove ותאימות / תאימות
  val = val.replace(/ ותאימות/g, '');
  val = val.replace(/ותאימות/g, '');
  val = val.replace(/ תאימות/g, '');
  val = val.replace(/תאימות/g, '');
  // תובנות -> מאמרים
  val = val.replace(/תובנות/g, 'מאמרים');
  // Remove specific phrase (after תובנות->מאמרים replacement)
  val = val.replace(/מאמרים משפטיות והערות אסטרטגיות/g, '');
  // Remove em dashes
  val = val.replace(/—/g, ' ');
  val = val.replace(/–/g, ' ');
  // Remove /
  val = val.replace(/\//g, ' ');
  // Remove :
  val = val.replace(/:/g, '');
  // Clean up double spaces
  val = val.replace(/  +/g, ' ').trim();
  return val;
}

function fixObject(obj) {
  if (typeof obj === 'string') return fixValue(obj);
  if (Array.isArray(obj)) return obj.map(fixObject);
  if (typeof obj === 'object' && obj !== null) {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = fixObject(value);
    }
    return result;
  }
  return obj;
}

data = fixObject(data);
fs.writeFileSync('translations_output.json', JSON.stringify(data, null, 2), 'utf8');
console.log('Done!');
