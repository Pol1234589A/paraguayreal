import placesData from '../../data/places.json';
import placesI18n from '../../data/places.i18n.json';

/** Place features with name/description/hours/tags translated for the locale (falls back to Spanish). */
export function getPlaces(locale = 'es') {
  if (locale === 'es') return placesData.features;
  return placesData.features.map((feature) => {
    const tr = placesI18n[feature.properties.id]?.[locale];
    if (!tr) return feature;
    return {
      ...feature,
      properties: { ...feature.properties, ...tr, tagsOriginal: feature.properties.tags }
    };
  });
}
