import React from 'react';
import { Navigation } from 'lucide-react';
import MapLinkButton from './MapLinkButton';

export default function DirectionsButton({ label = "Cómo llegar", url }) {
  return <MapLinkButton url={url} label={label} variant="primary" icon={<Navigation className="w-3.5 h-3.5 text-white" />} />;
}
