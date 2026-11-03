const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'Map', 'neighborhoodsData.js');
let code = fs.readFileSync(filePath, 'utf8');

// Parse coordinates arrays in GeoJSON features
// A polygon ring is an array of [lng, lat] arrays: [[lng1, lat1], [lng2, lat2], ...]
// In GeoJSON, if ring[0] != ring[last], we must append ring[0] to close it.

let openCount = 0;

// Regex match all coordinate arrays in polygons
// Format: "coordinates": [ [ [ lng, lat ], ... ] ]
code = code.replace(/("geometry"\s*:\s*\{\s*"type"\s*:\s*"Polygon"\s*,\s*"coordinates"\s*:\s*\[\s*\[)([\s\S]*?)(\]\s*\]\s*\})/g, (fullMatch, prefix, coordsBody, suffix) => {
  try {
    const ringStr = '[' + coordsBody + ']';
    const ring = JSON.parse(ringStr);
    if (Array.isArray(ring) && ring.length > 0) {
      const first = ring[0];
      const last = ring[ring.length - 1];
      if (first[0] !== last[0] || first[1] !== last[1]) {
        openCount++;
        ring.push([first[0], first[1]]);
        const newCoordsStr = ring.map(pt => `[${pt[0]}, ${pt[1]}]`).join(', ');
        return `${prefix}${newCoordsStr}${suffix}`;
      }
    }
  } catch (e) {
    console.error('Error parsing ring:', e);
  }
  return fullMatch;
});

fs.writeFileSync(filePath, code, 'utf8');
console.log(`Successfully fixed ${openCount} open polygon(s) in neighborhoodsData.js`);
