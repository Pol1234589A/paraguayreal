'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import PlacePopup from './PlacePopup';
import { Eye, Compass } from 'lucide-react';
import { useMapKeys, loadGoogleMapsScript, loadLeafletScript } from '../../lib/mapLoader';

const CATEGORY_COLORS = {
  turismo: "#10b981",
  restaurantes: "#f97316",
  barrios: "#3b82f6",
  coworking: "#8b5cf6",
  hospitales: "#ef4444",
  supermercados: "#eab308",
  embajadas: "#6b7280",
  bancos: "#d97706",
  transporte: "#4b5563"
};

const CATEGORY_EMOJIS = {
  turismo: "📸",
  restaurantes: "🍴",
  barrios: "🏠",
  coworking: "💻",
  hospitales: "🏥",
  supermercados: "🛒",
  embajadas: "🏢",
  bancos: "💵",
  transporte: "🚌"
};

export default function CityMap({ cityKey, places = [], locale = 'es' }) {
  const mapContainerRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const activeInfoWindowRef = useRef(null);
  const { mapboxToken, googleMapsApiKey, engine, loading } = useMapKeys();

  // Filter places for this city, or show all if cityKey is 'all'
  const cityPlaces = React.useMemo(() => {
    return cityKey && cityKey !== 'all'
      ? places.filter((place) => place.properties.city === cityKey)
      : places;
  }, [cityKey, places]);

  useEffect(() => {
    if (loading) return;
    if (!mapContainerRef.current) return;
    if (cityPlaces.length === 0) return;

    let mapInstance = null;
    let cleanup = () => {};

    // 1. MAPBOX ENGINE
    if (engine === 'mapbox' && mapboxToken) {
      mapboxgl.accessToken = mapboxToken;
      let center = [-57.6362, -25.2867];
      let zoom = 12;

      if (cityPlaces.length > 0) {
        center = cityPlaces[0].geometry.coordinates;
        zoom = 13;
      }

      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: center,
        zoom: zoom,
        scrollZoom: true,
        pitchWithRotate: false,
        dragRotate: false
      });

      mapInstance = map;

      map.addControl(new mapboxgl.NavigationControl({ showCompass: true, showZoom: true }), 'bottom-right');

      map.on('load', () => {
        setMapLoaded(true);
        if (cityPlaces.length > 1) {
          const bounds = new mapboxgl.LngLatBounds();
          cityPlaces.forEach((place) => bounds.extend(place.geometry.coordinates));
          map.fitBounds(bounds, { padding: 40, maxZoom: 15 });
        }
      });

      // Render Mapbox markers
      const markers = [];
      cityPlaces.forEach((place) => {
        const { coordinates } = place.geometry;
        const { category } = place.properties;
        const color = CATEGORY_COLORS[category] || '#6b7280';
        const emoji = CATEGORY_EMOJIS[category] || '📍';

        const el = document.createElement('div');
        el.className = 'w-7 h-7 rounded-full flex items-center justify-center text-sm border-2 border-white shadow-md hover:scale-110 transition cursor-pointer';
        el.style.backgroundColor = color;
        el.innerText = emoji;

        const popupNode = document.createElement('div');
        const root = createRoot(popupNode);
        root.render(<PlacePopup place={place.properties} />);

        const popup = new mapboxgl.Popup({ offset: 25, maxWidth: '280px' })
          .setDOMContent(popupNode);

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat(coordinates)
          .setPopup(popup)
          .addTo(map);

        el.addEventListener('click', () => {
          map.easeTo({
            center: coordinates,
            zoom: 14,
            duration: 800
          });
        });

        markers.push(marker);
      });

      cleanup = () => {
        markers.forEach(m => m.remove());
        map.remove();
      };
    }
    // 2. GOOGLE MAPS ENGINE
    else if (engine === 'google' && googleMapsApiKey) {
      loadGoogleMapsScript(googleMapsApiKey, () => {
        if (!mapContainerRef.current) return;

        let center = { lat: -25.2867, lng: -57.6362 };
        if (cityPlaces.length > 0) {
          center = { lat: cityPlaces[0].geometry.coordinates[1], lng: cityPlaces[0].geometry.coordinates[0] };
        }

        const map = new window.google.maps.Map(mapContainerRef.current, {
          center: center,
          zoom: 13,
          scrollwheel: true,
          zoomControl: true,
          mapId: 'DEMO_MAP_ID', // Enables AdvancedMarkerElement
          mapTypeControl: false,
          streetViewControl: false
        });

        mapInstance = {
          remove: () => {}
        };

        setMapLoaded(true);

        const bounds = new window.google.maps.LatLngBounds();
        const googleMarkers = [];

        cityPlaces.forEach((place) => {
          const coords = place.geometry.coordinates;
          const latLng = { lat: coords[1], lng: coords[0] };
          bounds.extend(latLng);

          const { category, name } = place.properties;
          const color = CATEGORY_COLORS[category] || '#6b7280';
          const emoji = CATEGORY_EMOJIS[category] || '📍';

          const el = document.createElement('div');
          el.className = 'w-7 h-7 rounded-full flex items-center justify-center text-sm border-2 border-white shadow-md hover:scale-110 transition cursor-pointer';
          el.style.backgroundColor = color;
          el.innerText = emoji;

          const popupNode = document.createElement('div');
          const root = createRoot(popupNode);
          root.render(<PlacePopup place={place.properties} />);

          const infowindow = new window.google.maps.InfoWindow({
            content: popupNode,
            maxWidth: 280
          });

          let marker;
          if (window.google.maps.marker && window.google.maps.marker.AdvancedMarkerElement) {
            marker = new window.google.maps.marker.AdvancedMarkerElement({
              map: map,
              position: latLng,
              content: el,
              title: name
            });
          } else {
            marker = new window.google.maps.Marker({
              map: map,
              position: latLng,
              title: name,
              label: emoji
            });
          }

          const clickListener = () => {
            if (activeInfoWindowRef.current) {
              activeInfoWindowRef.current.close();
            }
            infowindow.open(map, marker);
            activeInfoWindowRef.current = infowindow;
            map.panTo(latLng);
            if (map.getZoom() < 14) map.setZoom(14);
          };

          if (el) {
            el.addEventListener('click', clickListener);
          } else {
            marker.addListener('click', clickListener);
          }

          googleMarkers.push({ marker, infowindow });
        });

        if (cityPlaces.length > 1) {
          map.fitBounds(bounds);
        }

        cleanup = () => {
          googleMarkers.forEach(({ marker, infowindow }) => {
            if (marker.setMap) marker.setMap(null);
            infowindow.close();
          });
        };
      });
    }
    // 3. LEAFLET ENGINE (FREE / FALLBACK)
    else if (engine === 'leaflet') {
      loadLeafletScript(() => {
        if (!mapContainerRef.current) return;
        const container = mapContainerRef.current;

        if (container._leaflet_id && window.L) {
          return;
        }

        let center = [-25.2867, -57.6362];
        if (cityPlaces.length > 0) {
          center = [cityPlaces[0].geometry.coordinates[1], cityPlaces[0].geometry.coordinates[0]];
        }

        const map = window.L.map(container, {
          scrollWheelZoom: true,
          zoomControl: true
        }).setView(center, 13);

        mapInstance = map;
        setMapLoaded(true);

        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap'
        }).addTo(map);

        const leafletMarkers = [];
        const latLngs = [];

        cityPlaces.forEach((place) => {
          const coords = place.geometry.coordinates;
          latLngs.push([coords[1], coords[0]]);

          const { category } = place.properties;
          const color = CATEGORY_COLORS[category] || '#6b7280';
          const emoji = CATEGORY_EMOJIS[category] || '📍';

          const myIcon = window.L.divIcon({
            html: `<div class="w-7 h-7 rounded-full flex items-center justify-center text-sm border-2 border-white shadow-md hover:scale-110 transition cursor-pointer" style="background-color: ${color};">${emoji}</div>`,
            className: 'custom-leaflet-icon',
            iconSize: [28, 28],
            iconAnchor: [14, 14],
            popupAnchor: [0, -10]
          });

          const popupNode = document.createElement('div');
          const root = createRoot(popupNode);
          root.render(<PlacePopup place={place.properties} />);

          const marker = window.L.marker([coords[1], coords[0]], { icon: myIcon })
            .addTo(map)
            .bindPopup(popupNode, { maxWidth: 280 });

          marker.on('click', () => {
            map.setView([coords[1], coords[0]], Math.max(map.getZoom(), 14));
          });

          leafletMarkers.push(marker);
        });

        if (cityPlaces.length > 1) {
          map.fitBounds(latLngs, { padding: [40, 40] });
        }

        cleanup = () => {
          leafletMarkers.forEach(m => m.remove());
          map.remove();
        };
      });
    }

    return () => {
      cleanup();
      if (mapInstance && typeof mapInstance.remove === 'function') {
        try {
          mapInstance.remove();
        } catch (e) {
          // ignore already removed issues
        }
      }
    };
  }, [cityKey, engine, cityPlaces, loading, mapboxToken, googleMapsApiKey]);

  return (
    <div className="relative w-full rounded-xl overflow-hidden shadow-lg border border-slate-200 bg-slate-50">
      {/* Header Info */}
      <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm shadow px-3 py-1.5 rounded-lg flex items-center gap-2 border border-slate-100">
        <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
        <span className="text-xs font-bold text-slate-800">
          {cityPlaces.length} {cityKey === 'all' ? 'lugares turísticos' : `lugares en ${cityKey.toUpperCase()}`}
        </span>
      </div>

      {/* Full Map Link */}
      <div className="absolute bottom-4 left-4 z-10">
        <a
          href={cityKey === 'all' ? `/${locale}/mapa` : `/${locale}/mapa?ciudad=${cityKey}`}
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow transition"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Ver mapa completo</span>
        </a>
      </div>

      {/* Map */}
      <div className="h-[450px] w-full relative">
        {loading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-900/90 text-white p-6 text-center">
            <div className="max-w-md space-y-2">
              <Compass className="w-10 h-10 text-amber-500 mx-auto animate-spin" />
              <p className="text-xs font-semibold animate-pulse">
                Cargando mapa...
              </p>
            </div>
          </div>
        )}
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>
    </div>
  );
}
