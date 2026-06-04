import React from 'react';
import GoogleMapsButton from './GoogleMapsButton';
import DirectionsButton from './DirectionsButton';
import { Star, Clock, MapPin } from 'lucide-react';

export default function PlacePopup({ place }) {
  if (!place) return null;

  return (
    <div className="w-64 p-1 text-slate-800 rounded-xl">
      {place.photo && (
        <img
          src={place.photo}
          alt={place.name}
          className="w-full h-28 object-cover rounded-lg mb-2 shadow-sm"
        />
      )}
      <div className="px-1">
        <h3 className="font-bold text-sm text-slate-900 leading-tight mb-1">{place.name}</h3>
        
        <div className="flex items-center gap-2 mb-1.5">
          <div className="flex items-center text-amber-500 text-xs font-semibold gap-0.5">
            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
            <span>{place.rating || 'N/A'}</span>
          </div>
          <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-semibold capitalize">
            {place.category}
          </span>
        </div>

        <p className="text-xs text-slate-600 line-clamp-3 mb-2 leading-relaxed">
          {place.description}
        </p>

        <div className="space-y-1 mb-2.5">
          <div className="flex items-start gap-1 text-[10px] text-slate-500 leading-normal">
            <MapPin className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
            <span className="line-clamp-2">{place.address}</span>
          </div>
          {place.hours && (
            <div className="flex items-center gap-1 text-[10px] text-slate-500">
              <Clock className="w-3 h-3 text-slate-400 shrink-0" />
              <span>{place.hours}</span>
            </div>
          )}
        </div>

        <div className="flex gap-1.5 pt-2 border-t border-slate-100">
          <DirectionsButton url={place.googleMapsDirections} label="Cómo llegar" />
          <GoogleMapsButton url={place.googleMapsUrl} label="Google Maps" variant="outline" />
        </div>
      </div>
    </div>
  );
}
