'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapSidebar from './MapSidebar';
import PlacePopup from './PlacePopup';
import { Compass, Menu, X } from 'lucide-react';
import { useMapKeys, loadGoogleMapsScript, loadLeafletScript } from '../../lib/mapLoader';

const CATEGORIES = {
  turismo: { label: "Turismo", color: "#10b981", icon: "📸" },
  restaurantes: { label: "Restaurantes", color: "#f97316", icon: "🍴" },
  barrios: { label: "Barrios", color: "#3b82f6", icon: "🏠" },
  coworking: { label: "Coworking", color: "#8b5cf6", icon: "💻" },
  hospitales: { label: "Hospitales", color: "#ef4444", icon: "🏥" },
  supermercados: { label: "Supermercados", color: "#eab308", icon: "🛒" },
  embajadas: { label: "Embajadas", color: "#6b7280", icon: "🏢" },
  bancos: { label: "Bancos", color: "#d97706", icon: "💵" },
  transporte: { label: "Transporte", color: "#4b5563", icon: "🚌" }
};

export default function InteractiveMap({ initialPlaces = [], t, filterCity }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const activePopupRef = useRef(null);

  const { mapboxToken, googleMapsApiKey, engine, loading } = useMapKeys();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(Object.keys(CATEGORIES));
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [shareStatus, setShareStatus] = useState(false);

  // Handle URL parameters for initial map views (coordinates)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const categoryParam = params.get('categoria');
      if (categoryParam && CATEGORIES[categoryParam]) {
        setSelectedCategories([categoryParam]);
      }
    }
  }, []);

  // Filter places based on search, categories, and city
  const filteredPlaces = initialPlaces.filter((place) => {
    const matchesSearch = place.properties.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.properties.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.properties.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.includes(place.properties.category);
    const matchesCity = filterCity ? place.properties.city === filterCity : true;
    return matchesSearch && matchesCategory && matchesCity;
  });

  // Toggle categories helper
  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Initialize Map
  useEffect(() => {
    if (loading) return;
    if (!mapContainerRef.current) return;

    // Default center on Paraguay (or city if specified)
    let center = [-57.6362, -25.2867]; // Asuncion
    let zoom = 12;

    if (filterCity === 'interior') {
      center = [-56.5, -25.5];
      zoom = 7.5;
    } else if (filterCity && filterCity !== 'asuncion') {
      const cityPlace = initialPlaces.find(p => p.properties.city === filterCity);
      if (cityPlace) {
        center = cityPlace.geometry.coordinates;
        zoom = 13;
      }
    } else if (!filterCity) {
      center = [-57.5, -25.3];
      zoom = 7;
    }

    let mapInstance = null;
    let cleanup = () => {};

    // 1. MAPBOX INIT
    if (engine === 'mapbox' && mapboxToken) {
      mapboxgl.accessToken = mapboxToken;
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: center,
        zoom: zoom,
        pitchWithRotate: false,
        dragRotate: false
      });

      mapRef.current = map;
      mapInstance = map;

      map.addControl(new mapboxgl.NavigationControl({ showCompass: true, showZoom: true }), 'bottom-right');
      map.addControl(new mapboxgl.FullscreenControl(), 'bottom-right');
      
      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
        showUserHeading: true
      });
      map.addControl(geolocate, 'bottom-right');

      map.on('load', () => {
        setMapLoaded(true);
      });

      cleanup = () => {
        map.remove();
      };
    }
    // 2. GOOGLE MAPS INIT
    else if (engine === 'google' && googleMapsApiKey) {
      loadGoogleMapsScript(googleMapsApiKey, () => {
        if (!mapContainerRef.current) return;
        
        const gCenter = { lat: center[1], lng: center[0] };
        const map = new window.google.maps.Map(mapContainerRef.current, {
          center: gCenter,
          zoom: zoom,
          mapId: 'DEMO_MAP_ID',
          mapTypeControl: false,
          streetViewControl: false
        });

        mapRef.current = map;
        setMapLoaded(true);
      });
    }
    // 3. LEAFLET INIT
    else if (engine === 'leaflet') {
      loadLeafletScript(() => {
        if (!mapContainerRef.current) return;
        const container = mapContainerRef.current;

        if (container._leaflet_id && window.L) {
          return;
        }

        const map = window.L.map(container, {
          zoomControl: true
        }).setView([center[1], center[0]], zoom);

        mapRef.current = map;
        mapInstance = map;

        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap'
        }).addTo(map);

        setMapLoaded(true);

        cleanup = () => {
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
  }, [filterCity, engine, initialPlaces, loading, mapboxToken, googleMapsApiKey]);

  // Update Markers when filteredPlaces changes
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;

    let cleanupMarkers = () => {};

    // 1. MAPBOX MARKERS
    if (engine === 'mapbox') {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      filteredPlaces.forEach((place) => {
        const { coordinates } = place.geometry;
        const { category, name } = place.properties;
        const catConfig = CATEGORIES[category] || { color: '#6b7280', icon: '📍' };

        const el = document.createElement('div');
        el.className = 'w-7 h-7 rounded-full flex items-center justify-center text-sm border-2 border-white shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer';
        el.style.backgroundColor = catConfig.color;
        el.innerText = catConfig.icon;

        const popupNode = document.createElement('div');
        const root = createRoot(popupNode);
        root.render(<PlacePopup place={place.properties} />);

        const popup = new mapboxgl.Popup({ offset: 25, closeButton: true, maxWidth: '280px' })
          .setDOMContent(popupNode);

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat(coordinates)
          .setPopup(popup)
          .addTo(mapRef.current);

        el.addEventListener('click', () => {
          mapRef.current.easeTo({
            center: coordinates,
            zoom: Math.max(mapRef.current.getZoom(), 14),
            duration: 800
          });
          activePopupRef.current = popup;
        });

        markersRef.current.push(marker);
      });

      cleanupMarkers = () => {
        markersRef.current.forEach(m => m.remove());
      };
    }
    // 2. GOOGLE MAPS MARKERS
    else if (engine === 'google') {
      markersRef.current.forEach((item) => {
        if (item.marker && item.marker.setMap) item.marker.setMap(null);
        if (item.infowindow) item.infowindow.close();
      });
      markersRef.current = [];

      filteredPlaces.forEach((place) => {
        const { coordinates } = place.geometry;
        const latLng = { lat: coordinates[1], lng: coordinates[0] };
        const { category, name } = place.properties;
        const catConfig = CATEGORIES[category] || { color: '#6b7280', icon: '📍' };

        const el = document.createElement('div');
        el.className = 'w-7 h-7 rounded-full flex items-center justify-center text-sm border-2 border-white shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer';
        el.style.backgroundColor = catConfig.color;
        el.innerText = catConfig.icon;

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
            map: mapRef.current,
            position: latLng,
            content: el,
            title: name
          });
        } else {
          marker = new window.google.maps.Marker({
            map: mapRef.current,
            position: latLng,
            title: name,
            label: catConfig.icon
          });
        }

        const clickListener = () => {
          if (activePopupRef.current) activePopupRef.current.close();
          infowindow.open(mapRef.current, marker);
          activePopupRef.current = infowindow;
          mapRef.current.panTo(latLng);
          if (mapRef.current.getZoom() < 14) mapRef.current.setZoom(14);
        };

        if (el) {
          el.addEventListener('click', clickListener);
        } else {
          marker.addListener('click', clickListener);
        }

        markersRef.current.push({ marker, infowindow, coords: coordinates });
      });

      cleanupMarkers = () => {
        markersRef.current.forEach(({ marker, infowindow }) => {
          if (marker.setMap) marker.setMap(null);
          infowindow.close();
        });
      };
    }
    // 3. LEAFLET MARKERS
    else if (engine === 'leaflet') {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      filteredPlaces.forEach((place) => {
        const { coordinates } = place.geometry;
        const { category } = place.properties;
        const catConfig = CATEGORIES[category] || { color: '#6b7280', icon: '📍' };

        const myIcon = window.L.divIcon({
          html: `<div class="w-7 h-7 rounded-full flex items-center justify-center text-sm border-2 border-white shadow-md hover:scale-110 transition cursor-pointer" style="background-color: ${catConfig.color};">${catConfig.icon}</div>`,
          className: 'custom-leaflet-icon',
          iconSize: [28, 28],
          iconAnchor: [14, 14],
          popupAnchor: [0, -10]
        });

        const popupNode = document.createElement('div');
        const root = createRoot(popupNode);
        root.render(<PlacePopup place={place.properties} />);

        const marker = window.L.marker([coordinates[1], coordinates[0]], { icon: myIcon })
          .addTo(mapRef.current)
          .bindPopup(popupNode, { maxWidth: 280 });

        marker.on('click', () => {
          mapRef.current.setView([coordinates[1], coordinates[0]], Math.max(mapRef.current.getZoom(), 14));
        });

        markersRef.current.push(marker);
      });

      cleanupMarkers = () => {
        markersRef.current.forEach(m => m.remove());
      };
    }

    return () => {
      cleanupMarkers();
    };
  }, [filteredPlaces, mapLoaded, engine]);

  // Handler for list item click
  const handlePlaceClick = (place) => {
    if (!mapRef.current) return;
    const { coordinates } = place.geometry;

    if (engine === 'mapbox') {
      mapRef.current.easeTo({
        center: coordinates,
        zoom: 15,
        duration: 1000
      });

      const marker = markersRef.current.find(
        (m) => m.getLngLat().lng === coordinates[0] && m.getLngLat().lat === coordinates[1]
      );

      if (marker) {
        if (activePopupRef.current) activePopupRef.current.remove();
        marker.togglePopup();
        activePopupRef.current = marker.getPopup();
      }
    } 
    else if (engine === 'google') {
      const latLng = { lat: coordinates[1], lng: coordinates[0] };
      mapRef.current.panTo(latLng);
      mapRef.current.setZoom(15);

      const markerObj = markersRef.current.find(
        (m) => m.coords[0] === coordinates[0] && m.coords[1] === coordinates[1]
      );

      if (markerObj) {
        if (activePopupRef.current) activePopupRef.current.close();
        markerObj.infowindow.open(mapRef.current, markerObj.marker);
        activePopupRef.current = markerObj.infowindow;
      }
    } 
    else if (engine === 'leaflet') {
      mapRef.current.setView([coordinates[1], coordinates[0]], 15);

      const marker = markersRef.current.find(
        (m) => m.getLatLng().lng === coordinates[0] && m.getLatLng().lat === coordinates[1]
      );

      if (marker) {
        marker.openPopup();
      }
    }

    // Collapse mobile drawer if open
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  // Copy coordinates to clipboard
  const handleShareLocation = () => {
    if (!mapRef.current) return;

    let lat = -25.2867;
    let lng = -57.6362;
    let zoom = 12;

    if (engine === 'mapbox') {
      const center = mapRef.current.getCenter();
      lat = center.lat;
      lng = center.lng;
      zoom = mapRef.current.getZoom();
    } else if (engine === 'google') {
      const center = mapRef.current.getCenter();
      lat = center.lat();
      lng = center.lng();
      zoom = mapRef.current.getZoom();
    } else if (engine === 'leaflet') {
      const center = mapRef.current.getCenter();
      lat = center.lat;
      lng = center.lng;
      zoom = mapRef.current.getZoom();
    }

    const shareUrl = `${window.location.origin}${window.location.pathname}?lat=${lat.toFixed(4)}&lng=${lng.toFixed(4)}&z=${zoom.toFixed(1)}`;
    
    navigator.clipboard.writeText(shareUrl).then(() => {
      setShareStatus(true);
      setTimeout(() => setShareStatus(false), 2000);
    });
  };

  return (
    <div className="relative flex flex-col md:flex-row h-[calc(100vh-64px)] w-full overflow-hidden">
      {/* Sidebar Controls */}
      <div
        className={`fixed md:relative top-16 md:top-0 left-0 h-[calc(100vh-128px)] md:h-full z-20 w-full md:w-auto transition-transform duration-300 transform md:transform-none ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <MapSidebar
          places={filteredPlaces}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategories={selectedCategories}
          toggleCategory={toggleCategory}
          onPlaceClick={handlePlaceClick}
          categories={CATEGORIES}
          onShareLocation={handleShareLocation}
          t={t}
        />
      </div>

      {/* Share Toast */}
      {shareStatus && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg transition animate-bounce">
          {t ? t("Map.locationCopied") : "¡Enlace de ubicación copiado al portapapeles!"}
        </div>
      )}

      {/* Toggle Sidebar Button for Mobile */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="absolute top-4 left-4 z-30 md:hidden bg-white text-slate-800 hover:bg-slate-50 p-2.5 rounded-lg shadow-lg border border-slate-200 focus:outline-none transition flex items-center gap-2 text-xs font-semibold"
      >
        {isSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        <span>Filtros</span>
      </button>

      {/* Map Container */}
      <div className="flex-1 h-full w-full relative bg-slate-100">
        {loading && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-slate-900/90 text-white p-6 text-center">
            <div className="max-w-md space-y-4">
              <Compass className="w-12 h-12 text-amber-500 mx-auto animate-spin" />
              <p className="text-sm font-semibold animate-pulse">
                Cargando mapa interactivo de Paraguay...
              </p>
            </div>
          </div>
        )}
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>
    </div>
  );
}
