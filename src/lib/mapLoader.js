/**
 * Dynamic map loader utility for ParaguayReal.
 * Handles loading Google Maps API and Leaflet from CDNs dynamically on the client side.
 * Also retrieves Mapbox / Google Maps API Keys dynamically from Firestore if configured.
 */

import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

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
  const [keys, setKeys] = useState({
    mapboxToken: '',
    googleMapsApiKey: '',
    engine: 'none',
    loading: true
  });

  useEffect(() => {
    const defaultMapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
    const defaultGoogleMapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

    const determineEngine = (mbToken, gKey) => {
      if (mbToken && mbToken.trim() !== '') return 'mapbox';
      if (gKey && gKey.trim() !== '') return 'google';
      return 'leaflet';
    };

    if (!db) {
      // Fallback to environment variables if Firebase Firestore is not initialized
      setKeys({
        mapboxToken: defaultMapboxToken,
        googleMapsApiKey: defaultGoogleMapsKey,
        engine: determineEngine(defaultMapboxToken, defaultGoogleMapsKey),
        loading: false
      });
      return;
    }

    let active = true;

    async function fetchKeys() {
      try {
        const docRef = doc(db, 'config', 'keys');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists() && active) {
          const data = docSnap.data();
          const mbToken = data.mapboxToken || data.mapbox_token || defaultMapboxToken;
          const gKey = data.googleMapsApiKey || data.google_maps_key || defaultGoogleMapsKey;
          
          setKeys({
            mapboxToken: mbToken,
            googleMapsApiKey: gKey,
            engine: determineEngine(mbToken, gKey),
            loading: false
          });
        } else if (active) {
          setKeys({
            mapboxToken: defaultMapboxToken,
            googleMapsApiKey: defaultGoogleMapsKey,
            engine: determineEngine(defaultMapboxToken, defaultGoogleMapsKey),
            loading: false
          });
        }
      } catch (err) {
        console.error('Error fetching map keys from Firestore:', err);
        if (active) {
          setKeys({
            mapboxToken: defaultMapboxToken,
            googleMapsApiKey: defaultGoogleMapsKey,
            engine: determineEngine(defaultMapboxToken, defaultGoogleMapsKey),
            loading: false
          });
        }
      }
    }

    fetchKeys();

    return () => {
      active = false;
    };
  }, []);

  return keys;
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
