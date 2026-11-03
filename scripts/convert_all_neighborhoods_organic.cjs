const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'Map', 'neighborhoodsData.js');
let code = fs.readFileSync(filePath, 'utf8');

// Function to generate organic multi-vertex boundary polygon around center
function getOrganicRing(centerLng, centerLat, sizeLng, sizeLat, seedStr) {
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = (hash << 5) - hash + seedStr.charCodeAt(i);
    hash |= 0;
  }
  const pseudoRand = (idx) => {
    const x = Math.sin(hash + idx * 9999) * 10000;
    return x - Math.floor(x);
  };

  const points = [];
  const numPoints = 18;
  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * 2 * Math.PI;
    const wave1 = Math.sin(angle * 3 + pseudoRand(1) * Math.PI) * 0.22;
    const wave2 = Math.cos(angle * 2 + pseudoRand(2) * Math.PI) * 0.14;
    const noise = (pseudoRand(i + 7) - 0.5) * 0.12;
    const rFactor = 1.0 + wave1 + wave2 + noise;

    const lng = Number((centerLng + Math.cos(angle) * sizeLng * rFactor).toFixed(6));
    const lat = Number((centerLat + Math.sin(angle) * sizeLat * rFactor).toFixed(6));
    points.push([lng, lat]);
  }
  points.push([points[0][0], points[0][1]]);
  return points;
}

// Transform all 4-point rectangle polygons in staticFeatures to 18-point organic polygons
let staticCount = 0;
code = code.replace(/id:\s*"([^"]+)"[\s\S]*?center:\s*\[\s*([\d.-]+)\s*,\s*([\d.-]+)\s*\][\s\S]*?geometry:\s*\{\s*type:\s*"Polygon",\s*coordinates:\s*\[\[([\s\S]*?)\]\]\s*\}/g, (fullMatch, id, centerLngStr, centerLatStr, oldCoordsStr) => {
  const centerLng = parseFloat(centerLngStr);
  const centerLat = parseFloat(centerLatStr);
  
  if (isNaN(centerLng) || isNaN(centerLat)) return fullMatch;

  // Calculate size based on center and old bounding box
  const ring = getOrganicRing(centerLng, centerLat, 0.015, 0.012, id);
  const newCoordsStr = JSON.stringify(ring);

  staticCount++;
  return fullMatch.replace(/coordinates:\s*\[\[[\s\S]*?\]\]/, `coordinates: [${newCoordsStr}]`);
});

fs.writeFileSync(filePath, code, 'utf8');
console.log(`Converted ${staticCount} static neighborhood features to organic contour polygons`);
