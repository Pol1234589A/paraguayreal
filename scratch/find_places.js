const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data/places.json', 'utf8'));

const badImgUrl = '1590487988256';
const matchingPlaces = data.features.filter(f => f.properties.photo && f.properties.photo.includes(badImgUrl));

matchingPlaces.forEach(f => {
  console.log(`ID: ${f.properties.id}`);
  console.log(`Name: ${f.properties.name}`);
  console.log(`Coordinates: ${f.geometry.coordinates}`);
  console.log(`Address: ${f.properties.address}`);
  console.log('---');
});
