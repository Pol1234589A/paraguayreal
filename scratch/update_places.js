const fs = require('fs');

// Load places database
const filePath = 'data/places.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Exact coordinate corrections (longitude, latitude)
const coordinateCorrections = {
  'palacio-lopez': [-57.637569, -25.277636],
  'panteon-heroes': [-57.6353, -25.2823],
  'costanera-asuncion': [-57.6316, -25.2760],
  'loma-san-jeronimo': [-57.6456, -25.2773],
  'catedral-metropolitana': [-57.6324, -25.2816],
  'casa-independencia': [-57.6362, -25.2806],
  'basilica-caacupe': [-57.1435, -25.3861],
  'parroquia-san-roque': [-57.6335, -25.2818],
  'cabildo-cultural': [-57.6337, -25.2798],
  'manzana-rivera': [-57.6348, -25.2825]
};

// Photo updates (locally-served generated images or relevant Unsplash placeholders)
const photoUpdates = {
  'palacio-lopez': '/images/places/palacio_lopez.png',
  'panteon-heroes': '/images/places/panteon_heroes.png',
  'costanera-asuncion': '/images/places/costanera_asuncion.png',
  'ruinas-trinidad': '/images/places/ruinas_trinidad.png',
  'basilica-caacupe': '/images/places/basilica_caacupe.png',
  'loma-san-jeronimo': 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500&q=80',
  'catedral-metropolitana': 'https://images.unsplash.com/photo-1548625361-155deea223d0?w=500&q=80',
  'casa-independencia': 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=500&q=80',
  'parroquia-san-roque': 'https://images.unsplash.com/photo-1548625361-155deea223d0?w=500&q=80',
  'cabildo-cultural': 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=500&q=80',
  'manzana-rivera': 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500&q=80',
  'aregua-iglesia': 'https://images.unsplash.com/photo-1548625361-155deea223d0?w=500&q=80',
  'altos-centro': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80'
};

let coordCount = 0;
let photoCount = 0;

data.features.forEach((feature) => {
  const id = feature.properties.id;

  // Apply coordinate corrections if matching
  if (coordinateCorrections[id]) {
    feature.geometry.coordinates = coordinateCorrections[id];
    coordCount++;
  }

  // Apply photo updates if matching
  if (photoUpdates[id]) {
    feature.properties.photo = photoUpdates[id];
    photoCount++;
  }
});

// Save updated places database
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

console.log(`Successfully updated ${coordCount} coordinates and ${photoCount} photo URLs in data/places.json`);
