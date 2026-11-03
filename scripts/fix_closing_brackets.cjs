const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'Map', 'neighborhoodsData.js');
let code = fs.readFileSync(filePath, 'utf8');

// Ensure coordinates: [[ [...] ]] has exactly 3 closing brackets ]]]
code = code.replace(/(coordinates:\s*\[\[\[[\s\S]*?\]\])(?!\s*\])/g, '$1]');

fs.writeFileSync(filePath, code, 'utf8');
console.log('Fixed closing brackets for 3D coordinates in neighborhoodsData.js');
