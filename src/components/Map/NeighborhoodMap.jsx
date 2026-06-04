'use client';

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Shield, DollarSign, MapPin } from 'lucide-react';
import { useMapKeys, loadGoogleMapsScript, loadLeafletScript } from '../../lib/mapLoader';

const NEIGHBORHOODS_DATA = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        id: "villa-morra",
        name: "Villa Morra",
        safety: "seguro",
        safetyText: "Muy Seguro (Seguridad privada y comercial)",
        rentPrice: 1200,
        rentText: "$800 - $1,600 USD/mes",
        pros: "Bares, centros comerciales, gastronomía premium, eje de negocios",
        cons: "Tráfico pesado en horas pico, costo de vida elevado"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-57.598, -25.305],
          [-57.570, -25.305],
          [-57.570, -25.280],
          [-57.598, -25.280],
          [-57.598, -25.305]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "las-mercedes",
        name: "Las Mercedes",
        safety: "seguro",
        safetyText: "Seguro (Zona residencial tranquila y de moda)",
        rentPrice: 900,
        rentText: "$600 - $1,200 USD/mes",
        pros: "Cultura, cafés de especialidad, casonas restauradas, cercanía al centro",
        cons: "Calles angostas para estacionar"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-57.620, -25.292],
          [-57.598, -25.292],
          [-57.598, -25.272],
          [-57.620, -25.272],
          [-57.620, -25.292]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "mburucuya",
        name: "Mburucuyá",
        safety: "muy-seguro",
        safetyText: "Excelente (Muy residencial y exclusivo)",
        rentPrice: 1500,
        rentText: "$1,000 - $2,200 USD/mes",
        pros: "Calles empedradas arboladas, tranquilidad extrema, embajadas cercanas",
        cons: "Comercios dispersos, dependes del vehículo"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-57.570, -25.280],
          [-57.545, -25.280],
          [-57.545, -25.255],
          [-57.570, -25.255],
          [-57.570, -25.280]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "centro",
        name: "Centro Histórico",
        safety: "precaucion",
        safetyText: "Precaución (Seguro de día, solitario de noche)",
        rentPrice: 500,
        rentText: "$350 - $700 USD/mes",
        pros: "Conectividad total, alquileres económicos, patrimonio histórico",
        cons: "Falta de actividad nocturna comercial, edificios descuidados"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-57.645, -25.292],
          [-57.620, -25.292],
          [-57.620, -25.272],
          [-57.645, -25.272],
          [-57.645, -25.292]
        ]]
      }
    }
  ]
};

export default function NeighborhoodMap() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [viewMode, setViewMode] = useState('safety'); // 'safety' or 'rent'
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const leafletGeoJsonRef = useRef(null);
  const { mapboxToken, googleMapsApiKey, engine, loading } = useMapKeys();

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
      if (rent <= 1000) return '#f97316'; // Orange
      return '#dc2626'; // Red
    }
  };

  // Map Initialization Effect
  useEffect(() => {
    if (loading) return;
    if (!mapContainerRef.current) return;

    let mapInstance = null;
    let cleanup = () => {};

    // 1. MAPBOX INITIALIZATION
    if (engine === 'mapbox' && mapboxToken) {
      mapboxgl.accessToken = mapboxToken;
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-57.595, -25.285],
        zoom: 13,
        pitchWithRotate: false,
        dragRotate: false
      });

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
            setSelectedNeighborhood(e.features[0].properties);
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
          center: { lat: -25.285, lng: -57.595 },
          zoom: 13,
          mapTypeControl: false,
          streetViewControl: false,
          styles: [
            {
              featureType: "all",
              elementType: "labels.text.fill",
              color: "#616161"
            }
          ]
        });

        mapRef.current = map;
        setMapLoaded(true);

        // Add GeoJSON directly to Google Maps Data layer
        map.data.addGeoJson(NEIGHBORHOODS_DATA);

        // Click listener
        map.data.addListener('click', (event) => {
          const properties = {};
          event.feature.forEachProperty((val, key) => {
            properties[key] = val;
          });
          setSelectedNeighborhood(properties);
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
        }).setView([-25.285, -57.595], 13);

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
            500, '#a7f3d0',
            1000, '#f97316',
            1500, '#dc2626'
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

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-50 flex flex-col lg:flex-row h-[600px]">
      
      {/* Controls panel */}
      <div className="w-full lg:w-80 bg-white p-6 border-b lg:border-b-0 lg:border-r border-slate-200 z-10 flex flex-col justify-between shrink-0">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 font-display mb-1 flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-600" />
            <span>Mapa de Barrios</span>
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Guía de seguridad y costos promedio de alquiler en las zonas residenciales clave de Asunción.
          </p>

          {/* Toggle buttons */}
          <div className="space-y-2 mb-6">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Filtrar mapa por:
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
                <span>Seguridad</span>
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
                <span>Alquileres</span>
              </button>
            </div>
          </div>

          {/* Legends */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Leyenda
            </span>
            {viewMode === 'safety' ? (
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-[#059669] shrink-0" />
                  <span>Muy seguro / Residencial</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-[#10b981] shrink-0" />
                  <span>Seguro</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-[#fbbf24] shrink-0" />
                  <span>Precaución de noche</span>
                </div>
              </div>
            ) : (
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-[#a7f3d0] shrink-0" />
                  <span>Alquiler Bajo ($500 USD)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-[#f97316] shrink-0" />
                  <span>Alquiler Medio ($1000 USD)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-[#dc2626] shrink-0" />
                  <span>Alquiler Premium (+$1500 USD)</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Selected Neighborhood Box */}
        {selectedNeighborhood ? (
          <div className="mt-6 border-t border-slate-100 pt-4 animate-fadeIn">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <h4 className="font-extrabold text-sm text-slate-900">{selectedNeighborhood.name}</h4>
            </div>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-400 block">SEGURIDAD:</span>
                <span className="font-semibold text-slate-700">{selectedNeighborhood.safetyText}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 block">ALQUILER PROMEDIO:</span>
                <span className="font-semibold text-slate-700">{selectedNeighborhood.rentText}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 block">PROS:</span>
                <span className="text-slate-600">{selectedNeighborhood.pros}</span>
              </div>
              {selectedNeighborhood.cons && (
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block">CONTRAS:</span>
                  <span className="text-slate-600">{selectedNeighborhood.cons}</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-xs text-slate-400 italic text-center p-4 border border-dashed border-slate-200 rounded-xl mt-6">
            Haz clic en un barrio del mapa para ver estadísticas detalladas.
          </div>
        )}
      </div>

      {/* Map container */}
      <div className="flex-1 relative h-full">
        {loading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-900/90 text-white p-4 text-center">
            <p className="text-xs font-semibold animate-pulse">
              Cargando mapa de barrios...
            </p>
          </div>
        )}
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>
    </div>
  );
}
