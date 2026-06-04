'use client';

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ExternalLink } from 'lucide-react';
import { useMapKeys, loadGoogleMapsScript, loadLeafletScript } from '../../lib/mapLoader';

export default function MiniMap({ lat, lng, name, address, googleMapsUrl }) {
  const mapContainerRef = useRef(null);
  const { mapboxToken, googleMapsApiKey, engine, loading } = useMapKeys();

  useEffect(() => {
    if (loading) return;
    if (!mapContainerRef.current) return;
    if (!lat || !lng) return;

    let mapInstance = null;

    if (engine === 'mapbox' && mapboxToken) {
      mapboxgl.accessToken = mapboxToken;
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: 14,
        scrollZoom: true,
        doubleClickZoom: true,
        dragRotate: false
      });

      mapInstance = map;

      // Add navigation controls
      map.addControl(new mapboxgl.NavigationControl({ showCompass: false, showZoom: true }), 'bottom-right');

      // Create marker
      const marker = new mapboxgl.Marker({ color: '#10b981' })
        .setLngLat([lng, lat])
        .addTo(map);

      if (name) {
        const popup = new mapboxgl.Popup({ offset: 35 })
          .setHTML(`
            <div style="font-family: inherit; font-size: 12px; color: #1e293b; padding: 2px;">
              <strong style="display:block; margin-bottom: 2px; color: #0f172a;">${name}</strong>
              ${address ? `<span style="color:#64748b; font-size:10px; display:block; margin-bottom:6px;">📍 ${address}</span>` : ''}
              ${googleMapsUrl ? `<a href="${googleMapsUrl}" target="_blank" rel="noopener noreferrer" style="color:#10b981; font-weight:bold; text-decoration:none; display:inline-flex; align-items:center; gap:2px;">Ver en Google Maps ↗</a>` : ''}
            </div>
          `);
        marker.setPopup(popup);
      }
    } 
    else if (engine === 'google' && googleMapsApiKey) {
      loadGoogleMapsScript(googleMapsApiKey, () => {
        if (!mapContainerRef.current) return;
        const center = { lat: parseFloat(lat), lng: parseFloat(lng) };
        
        const map = new window.google.maps.Map(mapContainerRef.current, {
          center: center,
          zoom: 14,
          scrollwheel: true,
          disableDoubleClickZoom: false,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false
        });

        mapInstance = {
          remove: () => {}
        };

        const marker = new window.google.maps.Marker({
          position: center,
          map: map,
          title: name
        });

        if (name) {
          const contentString = `
            <div style="font-family: sans-serif; font-size: 12px; color: #1e293b; padding: 4px; max-width: 200px;">
              <strong style="display:block; margin-bottom: 2px; color: #0f172a;">${name}</strong>
              ${address ? `<span style="color:#64748b; font-size:10px; display:block; margin-bottom:6px;">📍 ${address}</span>` : ''}
              ${googleMapsUrl ? `<a href="${googleMapsUrl}" target="_blank" rel="noopener noreferrer" style="color:#10b981; font-weight:bold; text-decoration:none; display:inline-flex; align-items:center; gap:2px;">Ver en Google Maps ↗</a>` : ''}
            </div>
          `;
          const infowindow = new window.google.maps.InfoWindow({
            content: contentString,
          });

          marker.addListener('click', () => {
            infowindow.open(map, marker);
          });
        }
      });
    } 
    else if (engine === 'leaflet') {
      loadLeafletScript(() => {
        if (!mapContainerRef.current) return;
        const container = mapContainerRef.current;
        
        if (container._leaflet_id && window.L) {
          return;
        }

        const map = window.L.map(container, {
          scrollWheelZoom: true,
          doubleClickZoom: true,
          zoomControl: true
        }).setView([lat, lng], 14);

        mapInstance = map;

        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap'
        }).addTo(map);

        const marker = window.L.marker([lat, lng]).addTo(map);

        if (name) {
          const popupContent = `
            <div style="font-family: sans-serif; font-size: 12px; color: #1e293b; padding: 2px; max-width: 200px;">
              <strong style="display:block; margin-bottom: 2px; color: #0f172a;">${name}</strong>
              ${address ? `<span style="color:#64748b; font-size:10px; display:block; margin-bottom:6px;">📍 ${address}</span>` : ''}
              ${googleMapsUrl ? `<a href="${googleMapsUrl}" target="_blank" rel="noopener noreferrer" style="color:#10b981; font-weight:bold; text-decoration:none;">Ver en Google Maps ↗</a>` : ''}
            </div>
          `;
          marker.bindPopup(popupContent);
        }
      });
    }

    return () => {
      if (mapInstance && typeof mapInstance.remove === 'function') {
        try {
          mapInstance.remove();
        } catch (e) {
          console.warn('Map cleanup error:', e);
        }
      }
    };
  }, [lat, lng, name, address, googleMapsUrl, engine, loading, mapboxToken, googleMapsApiKey]);

  return (
    <div className="relative w-full rounded-xl overflow-hidden shadow border border-slate-200 bg-slate-50 my-6">
      {/* Top Banner */}
      <div className="p-3 bg-white border-b border-slate-100 flex items-center justify-between">
        <div>
          <h5 className="text-xs font-bold text-slate-800">{name}</h5>
          {address && <p className="text-[10px] text-slate-500 truncate">{address}</p>}
        </div>
        {googleMapsUrl && (
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 hover:text-emerald-700 transition"
          >
            <span>Ver en Google Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      {/* Map */}
      <div className="h-[250px] w-full relative">
        {loading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-900/90 text-white p-4 text-center">
            <p className="text-[10px] font-semibold animate-pulse">
              Cargando Mini Mapa...
            </p>
          </div>
        )}
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>
    </div>
  );
}
