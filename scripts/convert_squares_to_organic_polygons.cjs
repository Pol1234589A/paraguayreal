const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'Map', 'neighborhoodsData.js');
let code = fs.readFileSync(filePath, 'utf8');

// Function to generate organic multi-vertex boundary polygon around center
function generateOrganicCoords(centerLng, centerLat, sizeLng = 0.016, sizeLat = 0.013, seedStr = 'seed') {
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
  const numPoints = 16;
  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * 2 * Math.PI;
    const wave1 = Math.sin(angle * 3 + pseudoRand(1) * Math.PI) * 0.18;
    const wave2 = Math.cos(angle * 2 + pseudoRand(2) * Math.PI) * 0.12;
    const noise = (pseudoRand(i + 5) - 0.5) * 0.1;
    const rFactor = 1.0 + wave1 + wave2 + noise;

    const lng = Number((centerLng + Math.cos(angle) * sizeLng * rFactor).toFixed(6));
    const lat = Number((centerLat + Math.sin(angle) * sizeLat * rFactor).toFixed(6));
    points.push([lng, lat]);
  }
  // Close polygon
  points.push([points[0][0], points[0][1]]);
  return [points];
}

// 1. Update generatedFeatures block at the end of neighborhoodsData.js
// Replace generatedFeatures push geometry box with organic shape
code = code.replace(
  /geometry:\s*\{\s*type:\s*"Polygon",\s*coordinates:\s*\[\[\s*\[lng - size, lat - size\],[\s\S]*?\]\]\s*\}/g,
  `geometry: {
          type: "Polygon",
          coordinates: (function() {
            let hash = 0;
            const seedStr = deptId + '-' + cleaned;
            for (let i = 0; i < seedStr.length; i++) { hash = (hash << 5) - hash + seedStr.charCodeAt(i); hash |= 0; }
            const pseudoRand = (idx) => { const x = Math.sin(hash + idx * 9999) * 10000; return x - Math.floor(x); };
            const pts = [];
            const numPts = 16;
            for (let i = 0; i < numPts; i++) {
              const angle = (i / numPts) * 2 * Math.PI;
              const wave1 = Math.sin(angle * 3 + pseudoRand(1) * Math.PI) * 0.20;
              const wave2 = Math.cos(angle * 2 + pseudoRand(2) * Math.PI) * 0.12;
              const rFactor = 0.9 + wave1 + wave2 + (pseudoRand(i+3) - 0.5) * 0.1;
              pts.push([Number((lng + Math.cos(angle) * size * 1.1 * rFactor).toFixed(6)), Number((lat + Math.sin(angle) * size * 0.9 * rFactor).toFixed(6))]);
            }
            pts.push([pts[0][0], pts[0][1]]);
            return [pts];
          })()
        }`
);

fs.writeFileSync(filePath, code, 'utf8');
console.log('Updated generatedFeatures in neighborhoodsData.js to organic polygon generator');
