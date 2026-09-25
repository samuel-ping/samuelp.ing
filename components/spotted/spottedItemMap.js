'use client';

import { divIcon } from 'leaflet';
import { useEffect } from 'react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

// OpenStreetMap's keyless tile CDN. (CARTO's basemaps — used by the old
// specimen lightbox — now require an API key.)
const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_ATTRIBUTION = '© OpenStreetMap contributors';

const DEFAULT_ZOOM = 16;

// A pin drawn as a DOM element instead of Leaflet's default marker image —
// the default icon's asset URLs break under bundlers. Styled from the site
// palette's CSS variables (the ones @theme emits in globals.css).
const pinIcon = divIcon({
  className: '',
  html: `<div style="
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--color-green-500);
    border: 3px solid var(--color-beige-100);
    box-shadow: 0 0 0 1px var(--color-green-500), 0 1px 4px rgb(0 0 0 / 0.35);
  "></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

/**
 * A map initialized inside a freshly-opened dialog measures its container
 * before the panel has settled and renders gray or quarter-drawn. Calling
 * invalidateSize once the dialog transition has had its duration fixes that.
 */
function SizeSettler() {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 350);
    return () => {
      clearTimeout(timer);
    };
  }, [map]);
  return null;
}

/**
 * Map showing where a found item was spotted. Loaded client-only via
 * `next/dynamic` in the modal — Leaflet touches `window` at import time.
 * No `dark:` classes — the /spotted page is pinned to the light theme.
 */
const SpottedItemMap = ({ lat, lng }) => (
  // relative + z-0 gives the map its own stacking context, so Leaflet's
  // high internal pane z-indexes can never climb over the panel's close
  // button. The fixed height keeps the layout stable while the chunk loads.
  <div className="relative z-0 h-44 w-full overflow-hidden rounded-lg ring-1 ring-green-500/25 md:h-56">
    <MapContainer
      center={[lat, lng]}
      zoom={DEFAULT_ZOOM}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} />
      <Marker position={[lat, lng]} icon={pinIcon} keyboard={false} />
      <SizeSettler />
    </MapContainer>
  </div>
);

export default SpottedItemMap;
