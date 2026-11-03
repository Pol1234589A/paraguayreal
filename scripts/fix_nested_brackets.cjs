const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'Map', 'neighborhoodsData.js');
let code = fs.readFileSync(filePath, 'utf8');

// Replace any excessive brackets coordinates: [[[[ ... ]]]] or [[[ ... ]]] with exact [[ ... ]]
code = code.replace(/coordinates:\s*\[\s*\[\s*\[\s*\[/g, 'coordinates: [[');
code = code.replace(/\]\s*\]\s*\]\s*\]/g, ']]');

code = code.replace(/coordinates:\s*\[\s*\[\s*\[/g, 'coordinates: [[');
code = code.replace(/\]\s*\]\s*\]/g, ']]');

fs.writeFileSync(filePath, code, 'utf8');
console.log('Cleaned up bracket nesting in neighborhoodsData.js');
