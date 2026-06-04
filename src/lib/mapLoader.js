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
  // Include standard visual markers capability (marker library)
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
  script.async = true;

  script.addEventListener('load', () => {
    callback();
  });

  script.addEventListener('error', (err) => {
    console.error('Failed to load Leaflet script:', err);
  });

  document.body.appendChild(script);
}
