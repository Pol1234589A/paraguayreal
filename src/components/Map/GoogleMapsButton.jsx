import React from 'react';
import { MapPin } from 'lucide-react';
import MapLinkButton from './MapLinkButton';

export default function GoogleMapsButton({ label = "Ver en Google Maps", url, variant = "outline" }) {
  return <MapLinkButton url={url} label={label} variant={variant} icon={<MapPin className="w-3.5 h-3.5 text-red-500" />} />;
}
