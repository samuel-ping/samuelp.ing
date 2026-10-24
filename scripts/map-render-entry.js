/* global window, document, requestAnimationFrame */

const maplibregl = window.maplibregl;
const data = window.__MAP_RENDER_DATA__;

function fail(message) {
  window.__MAP_RENDER_ERROR__ = String(message);
}

if (!maplibregl) {
  fail('MapLibre failed to load.');
} else if (!data || !data.style || !data.bounds) {
  fail('Map render data is missing.');
} else {
  try {
    const map = new maplibregl.Map({
      container: 'map',
      style: data.style,
      bounds: data.bounds,
      fitBoundsOptions: {
        padding: data.padding,
        duration: 0,
        maxZoom: data.maxZoom,
      },
      interactive: false,
      attributionControl: false,
      fadeDuration: 0,
      preserveDrawingBuffer: true,
    });

    window.__MAP_RENDER_MAP__ = map;

    map.on('error', (event) => {
      const message =
        event?.error?.message ?? event?.error ?? 'Map render error.';
      fail(message);
    });

    map.on('load', () => {
      map.resize();
      map.fitBounds(data.bounds, {
        padding: data.padding,
        duration: 0,
        maxZoom: data.maxZoom,
      });

      map.once('idle', () => {
        requestAnimationFrame(() => {
          map.resize();
          requestAnimationFrame(() => {
            window.__MAP_RENDER_READY__ = true;
          });
        });
      });
    });
  } catch (error) {
    fail(error?.stack ?? error?.message ?? error);
  }
}
