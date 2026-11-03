'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Shield, DollarSign, MapPin, AlertOctagon, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMapKeys, loadGoogleMapsScript, loadLeafletScript } from '../../lib/mapLoader';
import securityData from '../../../data/security.json';

import { NEIGHBORHOODS_DATA, CITY_COORDINATES, CITY_DESCRIPTIONS, CITIES } from './neighborhoodsData';

const DEPT_CENTERS = {
  "distrito-capital": [-57.635, -25.285],
  "concepcion": [-57.434, -23.407],
  "san-pedro": [-57.076, -24.089],
  "cordillera": [-57.142, -25.386],
  "guaira": [-56.446, -25.749],
  "caaguazu": [-56.440, -25.446],
  "caazapa": [-56.368, -26.196],
  "itapua": [-55.867, -27.331],
  "misiones": [-57.144, -26.635],
  "paraguari": [-57.150, -25.621],
  "alto-parana": [-54.611, -25.510],
  "central": [-57.433, -25.350],
  "neembucu": [-58.292, -26.867],
  "amambay": [-55.733, -22.567],
  "canindeyu": [-54.306, -24.063],
  "presidente-hayes": [-57.524, -25.093],
  "boqueron": [-60.032, -22.350],
  "alto-paraguay": [-57.873, -21.039]
};

export default function NeighborhoodMap({ locale = 'es', currentCity = 'asuncion', setCurrentCity }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [viewMode, setViewMode] = useState('safety'); // 'safety' or 'rent'
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(null);
  const [selectedDept, setSelectedDept] = useState('all');
  const [mapLoaded, setMapLoaded] = useState(false);
  const t = useTranslations();
  const leafletGeoJsonRef = useRef(null);
  const { mapboxToken, googleMapsApiKey, engine, loading } = useMapKeys();

  const [localCity, setLocalCity] = useState('asuncion');
  const activeCity = currentCity || localCity;
  const changeCity = setCurrentCity || setLocalCity;

  // Sync selected neighborhood's city back to activeCity state
  useEffect(() => {
    if (selectedNeighborhood && selectedNeighborhood.city && selectedNeighborhood.city !== activeCity) {
      changeCity(selectedNeighborhood.city);
    }
  }, [selectedNeighborhood, activeCity, changeCity]);

  // Color helper functions for Google Maps and Leaflet styling
  const getPolygonColor = (featureProps, mode) => {
    if (mode === 'safety') {
      const safety = featureProps.safety;
      if (safety === 'muy-seguro') return '#059669'; // Emerald
      if (safety === 'seguro') return '#10b981'; // Green
      if (safety === 'precaucion') return '#fbbf24'; // Amber
      if (safety === 'evitar') return '#ef4444'; // Red
      return '#cbd5e1';
    } else {
      const rent = featureProps.rentPrice;
      if (rent <= 500) return '#a7f3d0'; // Light Green
      if (rent <= 1100) return '#f97316'; // Orange
      return '#dc2626'; // Red
    }
  };

  // Map viewport flying logic helper
  const flyToCityViewport = useCallback((cityKey) => {
    const coords = CITY_COORDINATES[cityKey];
    if (!coords || !mapRef.current) return;

    if (engine === 'mapbox') {
      mapRef.current.flyTo({
        center: coords.center,
        zoom: coords.zoom,
        essential: true,
        duration: 1500
      });
    } else if (engine === 'google') {
      mapRef.current.panTo({ lat: coords.center[1], lng: coords.center[0] });
      mapRef.current.setZoom(coords.zoom);
    } else if (engine === 'leaflet') {
      mapRef.current.setView([coords.center[1], coords.center[0]], coords.zoom);
    }
  }, [engine]);

  // Fly/pan map whenever activeCity changes
  useEffect(() => {
    if (mapLoaded && mapRef.current) {
      flyToCityViewport(activeCity);
    }
  }, [activeCity, mapLoaded, flyToCityViewport]);

  // Map Initialization Effect
  useEffect(() => {
    if (loading) return;
    if (!mapContainerRef.current) return;

    // Guard: Prevent re-initialization if map is already created with the same engine
    if (mapRef.current) {
      if (mapRef.current._initializedEngine === engine) {
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

    let mapInstance = null;
    let cleanup = () => {};

    const activeCityCoords = CITY_COORDINATES[activeCity] || CITY_COORDINATES.asuncion;

    // 1. MAPBOX INITIALIZATION
    if (engine === 'mapbox' && mapboxToken) {
      mapboxgl.accessToken = mapboxToken;
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: activeCityCoords.center,
        zoom: activeCityCoords.zoom,
        pitchWithRotate: false,
        dragRotate: false
      });

      map._initializedEngine = 'mapbox';
      mapRef.current = map;
      mapInstance = map;

      map.on('load', () => {
        setMapLoaded(true);

        map.addSource('neighborhoods', {
          type: 'geojson',
          data: NEIGHBORHOODS_DATA
        });

        map.addLayer({
          id: 'neighborhoods-fill',
          type: 'fill',
          source: 'neighborhoods',
          paint: {
            'fill-color': [
              'case',
              ['==', ['get', 'safety'], 'muy-seguro'], '#059669',
              ['==', ['get', 'safety'], 'seguro'], '#10b981',
              ['==', ['get', 'safety'], 'precaucion'], '#fbbf24',
              ['==', ['get', 'safety'], 'evitar'], '#ef4444',
              '#cbd5e1'
            ],
            'fill-opacity': 0.45
          }
        });

        map.addLayer({
          id: 'neighborhoods-line',
          type: 'line',
          source: 'neighborhoods',
          paint: {
            'line-color': '#475569',
            'line-width': 1.5,
            'line-opacity': 0.8
          }
        });

        map.on('click', 'neighborhoods-fill', (e) => {
          if (e.features.length > 0) {
            const props = e.features[0].properties;
            setSelectedNeighborhood(props);
            if (props.city === 'nacional' && props.departmentId) {
              setSelectedDept(props.departmentId);
            }
          }
        });

        map.on('mouseenter', 'neighborhoods-fill', () => {
          map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'neighborhoods-fill', () => {
          map.getCanvas().style.cursor = '';
        });
      });

      cleanup = () => {
        map.remove();
      };
    }
    // 2. GOOGLE MAPS INITIALIZATION
    else if (engine === 'google' && googleMapsApiKey) {
      loadGoogleMapsScript(googleMapsApiKey, () => {
        if (!mapContainerRef.current) return;

        const map = new window.google.maps.Map(mapContainerRef.current, {
          center: { lat: activeCityCoords.center[1], lng: activeCityCoords.center[0] },
          zoom: activeCityCoords.zoom,
          zoomControl: true,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          styles: [
            {
              featureType: "all",
              elementType: "labels.text.fill",
              color: "#616161"
            }
          ]
        });

        map._initializedEngine = 'google';
        mapRef.current = map;
        setMapLoaded(true);

        // Add GeoJSON directly to Google Maps Data layer with sanitization
        try {
          const sanitizeGeoJSON = (geojson) => {
            if (!geojson || !Array.isArray(geojson.features)) return geojson;
            const cleanFeatures = geojson.features.map(f => {
              if (!f.geometry || !f.geometry.coordinates) return f;
              const type = f.geometry.type;
              let coords = f.geometry.coordinates;
              if (type === 'Polygon') {
                // If 2D array passed, wrap into 3D array
                if (Array.isArray(coords) && coords.length > 0 && typeof coords[0][0] === 'number') {
                  coords = [coords];
                }
                coords = coords.map(ring => {
                  if (!Array.isArray(ring) || ring.length === 0) return ring;
                  const first = ring[0];
                  const last = ring[ring.length - 1];
                  if (first[0] !== last[0] || first[1] !== last[1]) {
                    return [...ring, [first[0], first[1]]];
                  }
                  return ring;
                });
              } else if (type === 'MultiPolygon') {
                coords = coords.map(poly => poly.map(ring => {
                  if (!Array.isArray(ring) || ring.length === 0) return ring;
                  const first = ring[0];
                  const last = ring[ring.length - 1];
                  if (first[0] !== last[0] || first[1] !== last[1]) {
                    return [...ring, [first[0], first[1]]];
                  }
                  return ring;
                }));
              }
              return { ...f, geometry: { ...f.geometry, coordinates: coords } };
            });
            return { ...geojson, features: cleanFeatures };
          };
          const safeData = sanitizeGeoJSON(NEIGHBORHOODS_DATA);
          map.data.addGeoJson(safeData);
        } catch (geojsonErr) {
          console.warn('GeoJSON loading warning:', geojsonErr);
        }

        // Click listener
        map.data.addListener('click', (event) => {
          const properties = {};
          event.feature.forEachProperty((val, key) => {
            properties[key] = val;
          });
          setSelectedNeighborhood(properties);
          if (properties.city === 'nacional' && properties.departmentId) {
            setSelectedDept(properties.departmentId);
          }
        });

        cleanup = () => {
          // Clean Google maps references if needed
        };
      });
    }
    // 3. LEAFLET INITIALIZATION
    else if (engine === 'leaflet') {
      loadLeafletScript(() => {
        if (!mapContainerRef.current) return;
        const container = mapContainerRef.current;

        if (container._leaflet_id && window.L) {
          return;
        }

        const map = window.L.map(container, {
          zoomControl: true
        }).setView([activeCityCoords.center[1], activeCityCoords.center[0]], activeCityCoords.zoom);

        map._initializedEngine = 'leaflet';
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
  }, [engine, loading, mapboxToken, googleMapsApiKey]);

  // Update paint styles or GeoJSON layers when viewMode or mapLoaded changes
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;

    if (engine === 'mapbox') {
      const map = mapRef.current;
      if (map.getLayer('neighborhoods-fill')) {
        if (viewMode === 'safety') {
          map.setPaintProperty('neighborhoods-fill', 'fill-color', [
            'case',
            ['==', ['get', 'safety'], 'muy-seguro'], '#059669',
            ['==', ['get', 'safety'], 'seguro'], '#10b981',
            ['==', ['get', 'safety'], 'precaucion'], '#fbbf24',
            ['==', ['get', 'safety'], 'evitar'], '#ef4444',
            '#cbd5e1'
          ]);
        } else {
          map.setPaintProperty('neighborhoods-fill', 'fill-color', [
            'interpolate',
            ['linear'],
            ['get', 'rentPrice'],
            150, '#a7f3d0',
            1000, '#f97316',
            2000, '#dc2626'
          ]);
        }
      }
    } 
    else if (engine === 'google') {
      const map = mapRef.current;
      map.data.setStyle((feature) => {
        const properties = {};
        feature.forEachProperty((val, key) => {
          properties[key] = val;
        });

        const color = getPolygonColor(properties, viewMode);
        return {
          fillColor: color,
          fillOpacity: 0.45,
          strokeColor: '#475569',
          strokeWeight: 1.5,
          strokeOpacity: 0.8,
          clickable: true
        };
      });
    } 
    else if (engine === 'leaflet') {
      const map = mapRef.current;

      // Remove existing Leaflet GeoJSON layer if initialized
      if (leafletGeoJsonRef.current) {
        leafletGeoJsonRef.current.remove();
      }

      const geoJson = window.L.geoJSON(NEIGHBORHOODS_DATA, {
        style: (feature) => {
          const color = getPolygonColor(feature.properties, viewMode);
          return {
            fillColor: color,
            fillOpacity: 0.45,
            color: '#475569',
            weight: 1.5,
            opacity: 0.8
          };
        },
        onEachFeature: (feature, layer) => {
          layer.on('click', () => {
            setSelectedNeighborhood(feature.properties);
            if (feature.properties.city === 'nacional' && feature.properties.departmentId) {
              setSelectedDept(feature.properties.departmentId);
            }
          });
          layer.on('mouseover', () => {
            layer.setStyle({ fillOpacity: 0.65 });
          });
          layer.on('mouseout', () => {
            layer.setStyle({ fillOpacity: 0.45 });
          });
        }
      }).addTo(map);

      leafletGeoJsonRef.current = geoJson;
    }
  }, [viewMode, mapLoaded, engine]);

  const safetyText = selectedNeighborhood ? (selectedNeighborhood[`safetyText_${locale}`] || selectedNeighborhood.safetyText_es || selectedNeighborhood.safetyText) : '';
  const rentText = selectedNeighborhood ? (selectedNeighborhood[`rentText_${locale}`] || selectedNeighborhood.rentText_es || selectedNeighborhood.rentText) : '';
  const pros = selectedNeighborhood ? (selectedNeighborhood[`pros_${locale}`] || selectedNeighborhood.pros_es || selectedNeighborhood.pros) : '';
  const cons = selectedNeighborhood ? (selectedNeighborhood[`cons_${locale}`] || selectedNeighborhood.cons_es || selectedNeighborhood.cons) : '';

  const activeCityDesc = CITY_DESCRIPTIONS[activeCity] ? (CITY_DESCRIPTIONS[activeCity][locale] || CITY_DESCRIPTIONS[activeCity].es) : '';

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-50 flex flex-col lg:flex-row h-[650px]">
      
      {/* Controls panel */}
      <div className="w-full lg:w-80 bg-white p-6 border-b lg:border-b-0 lg:border-r border-slate-200 z-10 flex flex-col justify-between shrink-0 overflow-y-auto max-h-full scrollbar-none">
        <div>
          {/* City Pill Switcher */}
          <div className="flex gap-1 overflow-x-auto pb-2 mb-4 scrollbar-none border-b border-slate-100">
            {CITIES.map((city) => (
              <button
                key={city.key}
                onClick={() => {
                  changeCity(city.key);
                  setSelectedNeighborhood(null);
                  setSelectedDept('all');
                }}
                className={`px-3 py-1.5 text-[10px] font-bold rounded-full transition shrink-0 ${
                  activeCity === city.key
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {city.label[locale] || city.label.es}
              </button>
            ))}
          </div>

          {/* Department selector (Only in National mode) */}
          {activeCity === 'nacional' && (
            <div className="mb-4 animate-fadeIn">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                {locale === 'en' ? "Filter by Department:" : locale === 'pt' ? "Filtrar por Estado:" : "Filtrar por Departamento:"}
              </span>
              <div className="relative">
                <select
                  value={selectedDept}
                  onChange={(e) => {
                    const deptId = e.target.value;
                    setSelectedDept(deptId);
                    setSelectedNeighborhood(null);
                    if (deptId === 'all') {
                      flyToCityViewport('nacional');
                    } else {
                      const coords = DEPT_CENTERS[deptId];
                      if (coords && mapRef.current) {
                        if (engine === 'mapbox') {
                          mapRef.current.flyTo({ center: coords, zoom: 8.5, duration: 1500 });
                        } else if (engine === 'google') {
                          mapRef.current.panTo({ lat: coords[1], lng: coords[0] });
                          mapRef.current.setZoom(8);
                        } else if (engine === 'leaflet') {
                          mapRef.current.setView([coords[1], coords[0]], 8);
                        }
                      }
                    }
                  }}
                  className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-10 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                >
                  <option value="all">
                    {locale === 'en' ? "All Departments" : locale === 'pt' ? "Todos os Estados" : "Todos los Departamentos"}
                  </option>
                  {securityData.map((d) => (
                    <option key={d.id} value={d.id}>{d.department}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-3.5 text-slate-500 w-3.5 h-3.5 pointer-events-none" />
              </div>
            </div>
          )}

          <h3 className="text-lg font-extrabold text-slate-900 font-display mb-1 flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-600" />
            <span>{t ? t("Barrios.mapTitle") : "Mapa de Barrios"}</span>
          </h3>
          <p className="text-xs text-slate-500 mb-5 leading-relaxed">
            {activeCityDesc}
          </p>

          {/* Toggle buttons */}
          <div className="space-y-1.5 mb-5">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
              {t ? t("Barrios.filterBy") : "Filtrar mapa por:"}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('safety')}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold rounded-lg border transition ${
                  viewMode === 'safety'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>{t ? t("Barrios.safety") : "Seguridad"}</span>
              </button>
              <button
                onClick={() => setViewMode('rent')}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold rounded-lg border transition ${
                  viewMode === 'rent'
                    ? 'bg-red-50 text-red-800 border-red-300'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>{t ? t("Barrios.rent") : "Alquileres"}</span>
              </button>
            </div>
          </div>

          {/* Neighborhood list for dynamic selection */}
          <div className="space-y-1.5 mb-5">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
              {locale === 'en' ? "Neighborhoods:" : locale === 'pt' ? "Bairros:" : "Zonas e Barrios:"}
            </span>
            <div className="grid grid-cols-2 gap-1.5 max-h-[140px] overflow-y-auto scrollbar-none pr-1">
              {NEIGHBORHOODS_DATA.features
                .filter((f) => {
                  if (f.properties.city !== activeCity) return false;
                  if (activeCity === 'nacional' && selectedDept !== 'all') {
                    return f.properties.departmentId === selectedDept;
                  }
                  return true;
                })
                .map((f) => (
                  <button
                    key={f.properties.id}
                    onClick={() => {
                      setSelectedNeighborhood(f.properties);
                      const center = f.properties.center;
                      if (center && mapRef.current) {
                        if (engine === 'mapbox') {
                          mapRef.current.flyTo({ center, zoom: 14.2, duration: 1200 });
                        } else if (engine === 'google') {
                          mapRef.current.panTo({ lat: center[1], lng: center[0] });
                          mapRef.current.setZoom(14.2);
                        } else if (engine === 'leaflet') {
                          mapRef.current.setView([center[1], center[0]], 14.2);
                        }
                      }
                    }}
                    className={`px-2 py-1.5 text-[10px] font-semibold rounded-lg border text-left truncate transition ${
                      selectedNeighborhood && selectedNeighborhood.id === f.properties.id
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {f.properties.name}
                  </button>
                ))}
            </div>
          </div>

          {/* Legends */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              {t ? t("Barrios.legend") : "Leyenda"}
            </span>
            {viewMode === 'safety' ? (
              <div className="space-y-1.5 text-[11px] text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded bg-[#059669] shrink-0" />
                  <span>{t ? t("Barrios.legendSafetyVery") : "Muy seguro / Residencial"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded bg-[#10b981] shrink-0" />
                  <span>{t ? t("Barrios.legendSafetySafe") : "Seguro"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded bg-[#fbbf24] shrink-0" />
                  <span>{t ? t("Barrios.legendSafetyCaution") : "Precaución de noche"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded bg-[#ef4444] shrink-0" />
                  <span>{t ? t("Barrios.legendSafetyAvoid") : "Evitar / Zona Roja"}</span>
                </div>
              </div>
            ) : (
              <div className="space-y-1.5 text-[11px] text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded bg-[#a7f3d0] shrink-0" />
                  <span>{t ? t("Barrios.legendRentLow") : "Alquiler Bajo (< $500 USD)"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded bg-[#f97316] shrink-0" />
                  <span>{t ? t("Barrios.legendRentMed") : "Alquiler Medio ($500 - $1100 USD)"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded bg-[#dc2626] shrink-0" />
                  <span>{t ? t("Barrios.legendRentHigh") : "Alquiler Premium (+$1100 USD)"}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Selected Neighborhood Box */}
        {selectedNeighborhood ? (
          <div className="mt-5 border-t border-slate-100 pt-4 animate-fadeIn">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <h4 className="font-extrabold text-xs text-slate-900">{selectedNeighborhood.name}</h4>
            </div>
            <div className="space-y-2 text-[11px] leading-relaxed">
              <div>
                <span className="text-[9px] font-bold text-slate-400 block uppercase">{t ? t("Barrios.safetyHeader") : "SEGURIDAD"}:</span>
                <span className="font-semibold text-slate-700">{safetyText}</span>
              </div>
              <div>
                <span className="text-[9px] font-bold text-slate-400 block uppercase">{t ? t("Barrios.rentHeader") : "ALQUILER PROMEDIO"}:</span>
                <span className="font-semibold text-slate-700">{rentText}</span>
              </div>
              <div>
                <span className="text-[9px] font-bold text-slate-400 block uppercase">{t ? t("Barrios.prosHeader") : "PROS"}:</span>
                <span className="text-slate-600">{pros}</span>
              </div>
              {cons && (
                <div>
                  <span className="text-[9px] font-bold text-slate-400 block uppercase">{t ? t("Barrios.consHeader") : "CONTRAS"}:</span>
                  <span className="text-slate-600">{cons}</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-[10px] text-slate-400 italic text-center p-3 border border-dashed border-slate-200 rounded-xl mt-5">
            {t ? t("Barrios.clickPrompt") : "Haz clic en un barrio para ver estadísticas detalladas."}
          </div>
        )}
      </div>

      {/* Map container */}
      <div className="flex-1 relative h-full">
        {loading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-900/95 text-white p-4 text-center">
            <p className="text-xs font-semibold animate-pulse">
              {locale === 'en' ? "Loading neighborhoods map..." : locale === 'pt' ? "Carregando mapa de bairros..." : "Cargando mapa de barrios..."}
            </p>
          </div>
        )}
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>
    </div>
  );
}
