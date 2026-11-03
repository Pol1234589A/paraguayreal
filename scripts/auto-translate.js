const fs = require('fs');
const path = require('path');

// Target file paths
const MESSAGES_DIR = path.join(__dirname, '../messages');
const PRICES_PATH = path.join(__dirname, '../data/prices.json');

// Helper to delay between requests to avoid rate limiting
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Translation helper using Google Translate's free public endpoint
async function translateText(text, targetLang) {
  if (!text || typeof text !== 'string' || text.trim() === '') return '';

  // 1. Protect interpolation variables like {city} or {count} from being translated
  const vars = [];
  let processedText = text.replace(/\{([^}]+)\}/g, (match) => {
    vars.push(match);
    return `__VAR_${vars.length - 1}__`;
  });

  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=${targetLang}&dt=t&q=${encodeURIComponent(processedText)}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
    const json = await res.json();
    let translated = json[0].map(segment => segment[0]).join('');

    // 2. Restore protected variables, handling case or spacing changes from Google Translate
    vars.forEach((v, idx) => {
      const pattern = new RegExp(`__\\s*VAR_${idx}\\s*__`, 'gi');
      translated = translated.replace(pattern, v);
    });

    return translated.trim();
  } catch (error) {
    console.error(`[Error] Failed to translate "${text}" to "${targetLang}":`, error.message);
    return ''; // Return empty string so it is retried next time
  }
}

// Recursively traverse and translate object structure
async function syncObject(source, target, lang, path = '') {
  const result = {};
  for (const key in source) {
    const currentPath = path ? `${path}.${key}` : key;
    const sourceVal = source[key];
    const targetVal = target ? target[key] : undefined;

    if (sourceVal && typeof sourceVal === 'object' && !Array.isArray(sourceVal)) {
      result[key] = await syncObject(
        sourceVal,
        (targetVal && typeof targetVal === 'object') ? targetVal : {},
        lang,
        currentPath
      );
    } else if (Array.isArray(sourceVal)) {
      // Keep arrays consistent
      if (Array.isArray(targetVal) && targetVal.length === sourceVal.length) {
        result[key] = [];
        for (let i = 0; i < sourceVal.length; i++) {
          if (typeof sourceVal[i] === 'string') {
            if (targetVal[i] !== undefined && targetVal[i] !== '') {
              result[key].push(targetVal[i]);
            } else {
              console.log(`[Auto-Translate] Translating array item [${lang.toUpperCase()}] "${currentPath}[${i}]": "${sourceVal[i]}"`);
              const trans = await translateText(sourceVal[i], lang);
              result[key].push(trans || sourceVal[i]);
              await sleep(150);
            }
          } else {
            result[key].push(sourceVal[i]);
          }
        }
      } else {
        result[key] = sourceVal;
      }
    } else if (typeof sourceVal === 'string') {
      // Translate only if target key is missing or empty
      if (targetVal !== undefined && targetVal !== '') {
        result[key] = targetVal;
      } else {
        console.log(`[Auto-Translate] Translating [${lang.toUpperCase()}] "${currentPath}": "${sourceVal}"`);
        const trans = await translateText(sourceVal, lang);
        if (trans) {
          result[key] = trans;
          await sleep(150);
        } else {
          result[key] = ''; // Retain empty for subsequent runs
        }
      }
    } else {
      // Copy primitive non-string values
      result[key] = sourceVal;
    }
  }
  return result;
}

// Sync UI translation JSON files
async function syncUIFiles() {
  const sourcePath = path.join(MESSAGES_DIR, 'es.json');
  if (!fs.existsSync(sourcePath)) {
    console.error(`[Error] Source translation file not found at ${sourcePath}`);
    return;
  }

  console.log(`[Auto-Translate] Reading source messages/es.json...`);
  const sourceData = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
  const targetLanguages = ['en', 'pt'];

  for (const lang of targetLanguages) {
    const targetPath = path.join(MESSAGES_DIR, `${lang}.json`);
    let targetData = {};
    if (fs.existsSync(targetPath)) {
      try {
        targetData = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
      } catch (e) {
        console.warn(`[Warning] Could not parse existing ${lang}.json. Overwriting.`);
      }
    }

    console.log(`[Auto-Translate] Syncing translations for [${lang.toUpperCase()}]...`);
    const updatedData = await syncObject(sourceData, targetData, lang);

    // Save formatted JSON back
    fs.writeFileSync(targetPath, JSON.stringify(updatedData, null, 2), 'utf8');
    console.log(`[Auto-Translate] Saved updated translations in messages/${lang}.json`);
  }
}

// Sync cost-of-living items database (prices.json)
async function syncPrices() {
  if (!fs.existsSync(PRICES_PATH)) {
    console.log(`[Auto-Translate] Prices file not found at ${PRICES_PATH}`);
    return;
  }

  console.log(`[Auto-Translate] Checking data/prices.json for missing translations...`);
  const data = JSON.parse(fs.readFileSync(PRICES_PATH, 'utf8'));
  let updated = false;

  for (const category in data) {
    if (Array.isArray(data[category])) {
      for (const item of data[category]) {
        if (item.item_es) {
          if (!item.item_en || item.item_en.trim() === '') {
            console.log(`[Auto-Translate] Translating [EN] price item: "${item.item_es}"`);
            const trans = await translateText(item.item_es, 'en');
            if (trans) {
              item.item_en = trans;
              updated = true;
              await sleep(150);
            }
          }
          if (!item.item_pt || item.item_pt.trim() === '') {
            console.log(`[Auto-Translate] Translating [PT] price item: "${item.item_es}"`);
            const trans = await translateText(item.item_es, 'pt');
            if (trans) {
              item.item_pt = trans;
              updated = true;
              await sleep(150);
            }
          }
        }
      }
    }
  }

  if (updated) {
    fs.writeFileSync(PRICES_PATH, JSON.stringify(data, null, 2), 'utf8');
    console.log(`[Auto-Translate] Updated data/prices.json successfully.`);
  } else {
    console.log(`[Auto-Translate] data/prices.json is already fully translated.`);
  }
}

// Main execution entry point
async function run() {
  console.log('==================================================');
  console.log('[Auto-Translate] Starting Automatic Translation Sync...');
  console.log('==================================================');
  
  try {
    await syncUIFiles();
    await syncPrices();
    console.log('==================================================');
    console.log('[Auto-Translate] Sincronización finalizada con éxito.');
    console.log('==================================================');
  } catch (error) {
    console.error('[Error] Translation runner failed:', error);
  }
}

run();
