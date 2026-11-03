const fs = require('fs');
const path = require('path');

// Helper to generate a smooth, natural-looking organic polygon around a center (lng, lat)
// numPoints: number of vertices (e.g. 16 to 24 for smooth natural boundary)
// baseRadiusLng / baseRadiusLat: scale of the polygon
// seed: string identifier to produce deterministic, realistic natural variations
function createOrganicPolygon(centerLng, centerLat, radiusLng = 0.018, radiusLat = 0.014, seedStr = 'seed') {
  const points = [];
  const numPoints = 18;
  
  // Simple deterministic hash for seed
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = (hash << 5) - hash + seedStr.charCodeAt(i);
    hash |= 0;
  }
  const pseudoRand = (idx) => {
    const x = Math.sin(hash + idx * 9999) * 10000;
    return x - Math.floor(x);
  };

  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * 2 * Math.PI;
    
    // Add smooth organic harmonic variation + slight deterministic noise
    const harmonic1 = Math.sin(angle * 3 + pseudoRand(1) * Math.PI) * 0.15;
    const harmonic2 = Math.cos(angle * 2 + pseudoRand(2) * Math.PI) * 0.12;
    const noise = (pseudoRand(i + 10) - 0.5) * 0.1;
    
    const rFactor = 1.0 + harmonic1 + harmonic2 + noise;
    
    const lng = centerLng + Math.cos(angle) * radiusLng * rFactor;
    const lat = centerLat + Math.sin(angle) * radiusLat * rFactor;
    
    points.push([Number(lng.toFixed(6)), Number(lat.toFixed(6))]);
  }
  
  // Close the polygon ring
  points.push([points[0][0], points[0][1]]);
  return [points];
}

console.log('Organic polygon generator ready');
