const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data/places.json', 'utf8'));

const badImgUrl = '1590487988256';
const matchingPlaces = data.features.filter(f => f.properties.photo && f.properties.photo.includes(badImgUrl));

console.log('Found', matchingPlaces.length, 'places using the bad placeholder:');
matchingPlaces.forEach(f => {
  console.log(`- ID: ${f.properties.id}, Name: ${f.properties.name}, City: ${f.properties.city}`);
});
