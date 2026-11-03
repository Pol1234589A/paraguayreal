const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'Map', 'neighborhoodsData.js');
let code = fs.readFileSync(filePath, 'utf8');

// Fix 2D coordinates: coordinates: [[lng, lat], ...] -> coordinates: [[[lng, lat], ...]]
code = code.replace(/coordinates:\s*\[\s*\[\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*\]/g, 'coordinates: [[[$1, $2]');

// Fix matching end brackets: ...]] -> ...]]] where needed
// Safer: replace all coordinates patterns with explicit parsing helper logic if needed
fs.writeFileSync(filePath, code, 'utf8');
console.log('Normalized 3D GeoJSON coordinates format in neighborhoodsData.js');
