'use client';

import L from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

// Leaflet's default marker image URLs break under bundlers, so draw the pin
// as an inline SVG divIcon instead. `className` is blanked to skip the
// default white-square divIcon styles.
const pinIcon = L.divIcon({
  html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
    <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="#e11d48"/>
    <circle cx="12" cy="12" r="5" fill="#ffffff"/>
  </svg>`,
  className: '',
  iconSize: [24, 36],
  iconAnchor: [12, 36],
});

/**
 * Map showing where a found item was spotted. Loaded client-only via
 * `next/dynamic` in the modal — Leaflet touches `window` at import time.
 * No `dark:` classes — the /spotted page is pinned to the light theme.
 */
const SpottedItemMap = ({ lat, lng }) => (
  // `relative z-0` keeps Leaflet's absolutely-positioned, high-z-index panes
  // from escaping the modal's stacking context.
  <MapContainer
    center={[lat, lng]}
    zoom={16}
    scrollWheelZoom={false}
    className="relative z-0 h-64 w-full rounded-xl"
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[lat, lng]} icon={pinIcon} />
  </MapContainer>
);

export default SpottedItemMap;
