'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapSidebar from './MapSidebar';
import PlacePopup from './PlacePopup';
import { Compass, Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
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

const GOOGLE_PLACES_MAPPING = {
  turismo: { type: 'tourist_attraction' },
  restaurantes: { type: 'restaurant' },
  coworking: { keyword: 'coworking' },
  hospitales: { type: 'hospital' },
  supermercados: { type: 'supermarket' },
  embajadas: { keyword: 'embassy' },
  bancos: { type: 'bank' },
  transporte: { type: 'transit_station' }
};

export default function InteractiveMap({ initialPlaces = [], t: tProp, filterCity, searchParams, locale = 'es' }) {
  const tIntl = useTranslations();
  const t = tProp || tIntl;
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const activePopupRef = useRef(null);

  const { mapboxToken, googleMapsApiKey, engine, loading } = useMapKeys();
  const [searchQuery, setSearchQuery] = useState(searchParams?.q || '');
  const [selectedCategories, setSelectedCategories] = useState(Object.keys(CATEGORIES));
  const [googlePlaces, setGooglePlaces] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [shareStatus, setShareStatus] = useState(false);

  const selectedCategoriesRef = useRef(selectedCategories);
  const filterCityRef = useRef(filterCity);

  useEffect(() => {
    selectedCategoriesRef.current = selectedCategories;
  }, [selectedCategories]);

  useEffect(() => {
    filterCityRef.current = filterCity;
  }, [filterCity]);

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

  // Sync search query state when URL param changes
  useEffect(() => {
    if (searchParams?.q) {
      setSearchQuery(searchParams.q);
    }
  }, [searchParams?.q]);

  // Combine static initialPlaces and dynamically fetched googlePlaces
  const allPlaces = React.useMemo(() => {
    const merged = [...initialPlaces];
    const names = new Set(merged.map(p => p.properties.name.toLowerCase()));
    
    googlePlaces.forEach(gp => {
      if (!names.has(gp.properties.name.toLowerCase())) {
        merged.push(gp);
      }
    });
    return merged;
  }, [initialPlaces, googlePlaces]);

  // Filter places based on search, categories, and city
  const filteredPlaces = allPlaces.filter((place) => {
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
  const triggerPlacesSearch = (map) => {
    if (!window.google || !window.google.maps || !window.google.maps.places) return;

    const zoom = map.getZoom();
    if (zoom < 13) {
      // Don't search if zoomed out too far (to save Google API credits and keep map responsive)
      return;
    }

    const center = map.getCenter();
    const service = new window.google.maps.places.PlacesService(map);
    const activeCats = selectedCategoriesRef.current.filter(cat => GOOGLE_PLACES_MAPPING[cat]);
    const radius = Math.min(5000, 4000000 / Math.pow(2, zoom));

    if (activeCats.length === 0) {
      setGooglePlaces([]);
      return;
    }

    let allFoundPlaces = [];
    let completedRequests = 0;

    activeCats.forEach(cat => {
      const config = GOOGLE_PLACES_MAPPING[cat];
      const request = {
        location: center,
        radius: radius,
        ...config
      };

      service.nearbySearch(request, (results, status) => {
        completedRequests++;
        
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
          const geojsonFeatures = results.map(place => {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            
            // Format photo URL if present
            const photoUrl = place.photos && place.photos.length > 0 
              ? place.photos[0].getUrl({ maxWidth: 200, maxHeight: 150 }) 
              : null;

            return {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [lng, lat]
              },
              properties: {
                id: `google-${place.place_id}`,
                name: place.name,
                category: cat,
                description: `${place.vicinity || ''}. Calificación: ${place.rating || 'N/A'} ⭐`,
                address: place.vicinity || '',
                photo: photoUrl,
                rating: place.rating || null,
                googleMapsUrl: `https://www.google.com/maps/place/?q=place_id:${place.place_id}`,
                googleMapsDirections: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
                hours: place.opening_hours ? (place.opening_hours.isOpen() ? "Abierto ahora" : "Cerrado") : "Ver detalles",
                city: filterCityRef.current || "asuncion",
                tags: [cat]
              }
            };
          });
          
          allFoundPlaces = [...allFoundPlaces, ...geojsonFeatures];
        }

        if (completedRequests === activeCats.length) {
          // Merge with unique keys
          setGooglePlaces(prev => {
            const existingMap = new Map(prev.map(p => [p.properties.id, p]));
            allFoundPlaces.forEach(p => {
              existingMap.set(p.properties.id, p);
            });
            return Array.from(existingMap.values());
          });
        }
      });
    });
  };

  // Trigger Places search when selected categories or city filters change
  useEffect(() => {
    if (!mapRef.current || !mapLoaded || engine !== 'google') return;
    triggerPlacesSearch(mapRef.current);
  }, [selectedCategories, filterCity, mapLoaded, engine]);

  // Initialize Map
  useEffect(() => {
    if (loading) return;
    if (!mapContainerRef.current) return;

    // Guard: Prevent re-initialization if map is already created with the same engine and city
    if (mapRef.current) {
      if (mapRef.current._initializedEngine === engine && mapRef.current._initializedCity === filterCity) {
        return;
      }
      // Clean up old map if configuration changed
      if (typeof mapRef.current.remove === 'function') {
        try {
          mapRef.current.remove();
        } catch (e) {
          console.warn('Map cleanup error:', e);
        }
      }
      if (mapContainerRef.current) {
        mapContainerRef.current.innerHTML = '';
      }
      mapRef.current = null;
      setMapLoaded(false);
    }

    // Default center on Paraguay (or city if specified)
    let center = [-57.6362, -25.2867]; // Asuncion
    let zoom = 12;

    let hasTargetOverride = false;
    if (searchParams?.id) {
      const targetPlace = initialPlaces.find(p => p.properties.id === searchParams.id);
      if (targetPlace) {
        center = targetPlace.geometry.coordinates;
        zoom = 15;
        hasTargetOverride = true;
      }
    }

    if (!hasTargetOverride && searchParams?.q) {
      const cleanQ = searchParams.q.toLowerCase();
      const matchedPlace = initialPlaces.find(p => 
        p.properties.name.toLowerCase().includes(cleanQ) ||
        p.properties.description.toLowerCase().includes(cleanQ) ||
        p.properties.address.toLowerCase().includes(cleanQ) ||
        p.properties.city.toLowerCase().includes(cleanQ) ||
        p.properties.tags.some(t => t.toLowerCase().includes(cleanQ))
      );
      if (matchedPlace) {
        center = matchedPlace.geometry.coordinates;
        zoom = 15;
        hasTargetOverride = true;
      }
    }

    if (!hasTargetOverride) {
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

      map._initializedEngine = 'mapbox';
      map._initializedCity = filterCity;
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
        
        // Guard against race conditions where another map got initialized while loading
        if (mapRef.current && mapRef.current._initializedEngine === 'google') return;

        const gCenter = { lat: center[1], lng: center[0] };
        const map = new window.google.maps.Map(mapContainerRef.current, {
          center: gCenter,
          zoom: zoom,
          mapId: 'DEMO_MAP_ID',
          zoomControl: true,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true
        });

        map._initializedEngine = 'google';
        map._initializedCity = filterCity;
        mapRef.current = map;

        // Set up dynamic places search on map idle with a debounce
        let searchTimeout;
        const idleListener = map.addListener('idle', () => {
          clearTimeout(searchTimeout);
          searchTimeout = setTimeout(() => {
            triggerPlacesSearch(map);
          }, 500);
        });

        setMapLoaded(true);

        cleanup = () => {
          if (idleListener && typeof idleListener.remove === 'function') {
            idleListener.remove();
          }
          clearTimeout(searchTimeout);
        };
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

        map._initializedEngine = 'leaflet';
        map._initializedCity = filterCity;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterCity, engine, initialPlaces, loading, mapboxToken, googleMapsApiKey]);

  // Handle panning/zooming to a place when searchParams changes after map is loaded
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;

    const flyToCoordinates = (coords) => {
      if (engine === 'mapbox') {
        mapRef.current.easeTo({
          center: coords,
          zoom: 15,
          duration: 1000
        });
      } else if (engine === 'google') {
        const latLng = { lat: coords[1], lng: coords[0] };
        mapRef.current.panTo(latLng);
        mapRef.current.setZoom(15);
      } else if (engine === 'leaflet') {
        mapRef.current.setView([coords[1], coords[0]], 15);
      }
    };

    if (searchParams?.id) {
      const targetPlace = initialPlaces.find(p => p.properties.id === searchParams.id);
      if (targetPlace) {
        flyToCoordinates(targetPlace.geometry.coordinates);
      }
    } else if (searchParams?.q) {
      const cleanQ = searchParams.q.toLowerCase();
      const matchedPlace = initialPlaces.find(p => 
        p.properties.name.toLowerCase().includes(cleanQ) ||
        p.properties.description.toLowerCase().includes(cleanQ) ||
        p.properties.address.toLowerCase().includes(cleanQ) ||
        p.properties.city.toLowerCase().includes(cleanQ) ||
        p.properties.tags.some(t => t.toLowerCase().includes(cleanQ))
      );
      if (matchedPlace) {
        flyToCoordinates(matchedPlace.geometry.coordinates);
      }
    }
  }, [searchParams, mapLoaded, engine, initialPlaces]);

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
        root.render(<PlacePopup place={place.properties} locale={locale} />);

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

        if (searchParams?.id && place.properties.id === searchParams.id) {
          setTimeout(() => {
            if (mapRef.current) {
              marker.togglePopup();
              activePopupRef.current = popup;
            }
          }, 600);
        }

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
        root.render(<PlacePopup place={place.properties} locale={locale} />);

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

        if (searchParams?.id && place.properties.id === searchParams.id) {
          setTimeout(() => {
            if (mapRef.current) {
              if (activePopupRef.current) activePopupRef.current.close();
              infowindow.open(mapRef.current, marker);
              activePopupRef.current = infowindow;
            }
          }, 600);
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
        root.render(<PlacePopup place={place.properties} locale={locale} />);

        const marker = window.L.marker([coordinates[1], coordinates[0]], { icon: myIcon })
          .addTo(mapRef.current)
          .bindPopup(popupNode, { maxWidth: 280 });

        marker.on('click', () => {
          mapRef.current.setView([coordinates[1], coordinates[0]], Math.max(mapRef.current.getZoom(), 14));
        });

        if (searchParams?.id && place.properties.id === searchParams.id) {
          setTimeout(() => {
            if (marker) {
              marker.openPopup();
            }
          }, 600);
        }

        markersRef.current.push(marker);
      });

      cleanupMarkers = () => {
        markersRef.current.forEach(m => m.remove());
      };
    }

    return () => {
      cleanupMarkers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
