const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'Map', 'neighborhoodsData.js');
let code = fs.readFileSync(filePath, 'utf8');

// Ensure coordinates lines end with a comma if followed by closing brace or property
code = code.replace(/(coordinates:\s*\[\[\[[\s\S]*?\]\]\])(?!\s*[,}])/g, '$1,');

fs.writeFileSync(filePath, code, 'utf8');
console.log('Fixed syntax commas in neighborhoodsData.js');
