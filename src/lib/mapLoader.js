/**
 * Dynamic map loader utility for ParaguayReal.
 * Handles loading Google Maps API and Leaflet from CDNs dynamically on the client side.
 */

export function getMapEngine() {
  if (typeof window === 'undefined') return 'none';
  
  if (process.env.NEXT_PUBLIC_MAPBOX_TOKEN && process.env.NEXT_PUBLIC_MAPBOX_TOKEN.trim() !== '') {
    return 'mapbox';
  }
  
  if (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY.trim() !== '') {
    return 'google';
  }
  
  return 'leaflet';
}

export function useMapKeys() {
  // Keys come only from build-time env vars. They must be restricted by domain
  // in the Mapbox / Google consoles, since NEXT_PUBLIC_* values are public.
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  let engine = 'leaflet';
  if (mapboxToken.trim() !== '') engine = 'mapbox';
  else if (googleMapsApiKey.trim() !== '') engine = 'google';

  return { mapboxToken, googleMapsApiKey, engine, loading: false };
}

export function loadGoogleMapsScript(apiKey, callback) {
  if (typeof window === 'undefined') return;

  if (window.google && window.google.maps) {
    callback();
    return;
  }

  const existingScript = document.getElementById('google-maps-script');
  if (existingScript) {
    existingScript.addEventListener('load', callback);
    return;
  }

  const script = document.createElement('script');
  script.id = 'google-maps-script';
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,marker`;
  script.async = true;
  script.defer = true;

  script.addEventListener('load', () => {
    callback();
  });

  script.addEventListener('error', (err) => {
    console.error('Failed to load Google Maps script:', err);
  });

  document.head.appendChild(script);
}

export function loadLeafletScript(callback) {
  if (typeof window === 'undefined') return;

  if (window.L) {
    callback();
    return;
  }

  // Load CSS
  if (!document.getElementById('leaflet-css')) {
    const link = document.createElement('link');
    link.id = 'leaflet-css';
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';
    document.head.appendChild(link);
  }

  const existingScript = document.getElementById('leaflet-script');
  if (existingScript) {
    existingScript.addEventListener('load', callback);
    return;
  }

  const script = document.createElement('script');
  script.id = 'leaflet-script';
  script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
  script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
  script.crossOrigin = '';
  script.async = true;

  script.addEventListener('load', () => {
    callback();
  });

  script.addEventListener('error', (err) => {
    console.error('Failed to load Leaflet script:', err);
  });

  document.body.appendChild(script);
}

/** Escape text for safe interpolation into HTML strings (popups). */
export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Only allow http(s) URLs in popup links. */
export function safeUrl(value) {
  try {
    const u = new URL(value);
    return u.protocol === 'https:' || u.protocol === 'http:' ? escapeHtml(u.href) : '';
  } catch {
    return '';
  }
}
