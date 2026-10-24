'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useTheme } from 'next-themes';
import Globe from 'react-globe.gl';
import * as THREE from 'three';

// Land ramps run from "no visitors" to "most visitors". Light mode ramps light
// to dark so the map reads on a pale panel; dark mode ramps dark to light.
const THEMES = {
  light: {
    ocean: '#9cbec9',
    land: ['#e2ecdb', '#aec8ac', '#577a5d', '#375954', '#233835'],
    side: 'rgba(35, 56, 53, 0.28)',
    stroke: 'rgba(35, 56, 53, 0.22)',
    highlight: '#233835',
    atmosphere: '#b6d0d8',
  },
  dark: {
    ocean: '#0b1a17',
    land: ['#29413c', '#375954', '#4a6e50', '#86ab8a', '#c8e6c9'],
    side: 'rgba(15, 32, 28, 0.9)',
    stroke: 'rgba(238, 231, 218, 0.18)',
    highlight: '#fff8eb',
    atmosphere: '#86ab8a',
  },
};

const numberFormat = new Intl.NumberFormat('en-US');

const detectWebgl = () => {
  if (typeof document === 'undefined') return null;

  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
    return Boolean(context);
  } catch {
    return false;
  }
};

const capColor = (visitors, maxVisitors, land) => {
  if (!visitors || maxVisitors <= 0) return land[0];

  const ratio = Math.sqrt(visitors / maxVisitors);
  const index = Math.min(
    land.length - 1,
    1 + Math.floor(ratio * (land.length - 1)),
  );

  return land[index];
};

export default function VisitorGlobe({
  countries,
  highlightedCode,
  onHoverCountry,
}) {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);
  const globeRef = useRef(null);
  const tooltipRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  const [features, setFeatures] = useState(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [hovered, setHovered] = useState(null);
  // Pinned by tap/click so touch devices, which have no hover, can still read a
  // country's count. Hover wins while it lasts, then the selection shows again.
  const [selected, setSelected] = useState(null);
  const [rotating, setRotating] = useState(true);
  const [pointerInside, setPointerInside] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [webglOk] = useState(detectWebgl);
  const [geoError, setGeoError] = useState(null);

  const { resolvedTheme } = useTheme();
  const themeReady = resolvedTheme !== undefined;
  const theme = resolvedTheme === 'dark' ? THEMES.dark : THEMES.light;

  const visitorsByCode = useMemo(
    () => new Map(countries.map((country) => [country.code, country.visitors])),
    [countries],
  );

  const namesByCode = useMemo(
    () => new Map(countries.map((country) => [country.code, country.name])),
    [countries],
  );

  const polygonData = useMemo(() => {
    if (!features) return [];

    return features.map((feature) => ({
      ...feature,
      visitors: visitorsByCode.get(feature.id) ?? 0,
    }));
  }, [features, visitorsByCode]);

  const maxVisitors = useMemo(
    () =>
      countries.reduce((max, country) => Math.max(max, country.visitors), 0),
    [countries],
  );

  const globeMaterial = useMemo(
    () =>
      new THREE.MeshPhongMaterial({
        color: theme.ocean,
        shininess: 0.3,
      }),
    [theme.ocean],
  );

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      setPrefersReducedMotion(query.matches);
      if (query.matches) setRotating(false);
    };

    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetch('/data/countries-110m.geojson', { cache: 'force-cache' })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to load country geometry: ${response.status}`,
          );
        }
        return response.json();
      })
      .then((data) => {
        if (cancelled) return;
        if (!Array.isArray(data.features) || data.features.length === 0) {
          throw new Error('Country geometry is empty.');
        }
        setFeatures(data.features);
      })
      .catch(() => {
        if (!cancelled) setGeoError('Map unavailable.');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      setSize({
        width: container.clientWidth,
        height: container.clientHeight,
      });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!features || !webglOk) return;

    const frame = requestAnimationFrame(() => {
      const controls = globeRef.current?.controls();
      if (!controls) return;

      controls.enableZoom = false;
      controls.enablePan = false;
      controls.autoRotateSpeed = 0.35;
      controls.autoRotate = rotating && !pointerInside;

      // OrbitControls sets `touch-action: none` on the canvas, which makes the
      // globe swallow every swipe. `pan-y` hands vertical gestures back to the
      // page (so a phone can scroll past the globe) while horizontal drags
      // still rotate it.
      if (controls.domElement) {
        controls.domElement.style.touchAction = 'pan-y';
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [features, webglOk, rotating, pointerInside]);

  useEffect(() => {
    if (!features || !webglOk) return;

    const frame = requestAnimationFrame(() => {
      globeRef.current?.pointOfView({ lat: 20, lng: -30, altitude: 2.2 }, 0);
    });

    return () => cancelAnimationFrame(frame);
  }, [features, webglOk]);

  const updateTooltipPosition = useCallback(() => {
    const tooltip = tooltipRef.current;
    const wrapper = wrapperRef.current;
    if (!tooltip || !wrapper) return;

    const width = wrapper.clientWidth;
    const halfWidth = Math.min(88, width / 2);
    const x = Math.min(
      Math.max(pointerRef.current.x, halfWidth),
      width - halfWidth,
    );
    const y = Math.max(pointerRef.current.y - 12, 48);

    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
  }, []);

  const setPointerFromEvent = useCallback(
    (event) => {
      const wrapper = wrapperRef.current;
      if (!wrapper || !event) return;

      const rect = wrapper.getBoundingClientRect();
      pointerRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
      updateTooltipPosition();
    },
    [updateTooltipPosition],
  );

  const active = hovered ?? selected;

  useLayoutEffect(() => {
    updateTooltipPosition();
  }, [active, size, updateTooltipPosition]);

  const handlePointerEnter = () => setPointerInside(true);

  const handlePointerLeave = () => {
    setPointerInside(false);
    setHovered(null);
    onHoverCountry?.(selected?.id ?? null);
  };

  const handlePolygonHover = (polygon) => {
    setHovered(polygon ?? null);
    onHoverCountry?.(polygon?.id ?? selected?.id ?? null);
  };

  const handlePolygonClick = (polygon, event) => {
    if (!polygon) return;

    // Mouse users already get the tooltip on hover; only pin for touch/pen,
    // where hover does not exist.
    if (event?.pointerType === 'mouse') return;

    setPointerFromEvent(event);

    // Tapping the same country again clears the pin.
    if (selected?.id === polygon.id) {
      setSelected(null);
      onHoverCountry?.(hovered?.id ?? null);
      return;
    }

    setSelected(polygon);
    onHoverCountry?.(polygon.id);
  };

  const handleGlobeClick = (coords, event) => {
    if (event?.pointerType === 'mouse') return;

    setSelected(null);
    onHoverCountry?.(hovered?.id ?? null);
  };

  const showGlobe =
    themeReady &&
    webglOk === true &&
    features !== null &&
    size.width > 0 &&
    size.height > 0 &&
    !geoError;

  let panelContent = null;

  if (geoError || webglOk === false) {
    panelContent = (
      <div className="flex h-full items-center justify-center px-6 text-center text-sm text-green-700/80 dark:text-beige-200/80">
        Map unavailable.
      </div>
    );
  } else if (!showGlobe) {
    panelContent = (
      <div className="flex h-full items-center justify-center px-6 text-center text-sm text-green-700/80 dark:text-beige-200/80">
        Loading globe…
      </div>
    );
  } else {
    panelContent = (
      <>
        <div aria-hidden="true" className="size-full">
          <Globe
            ref={globeRef}
            width={size.width}
            height={size.height}
            backgroundColor="rgba(0,0,0,0)"
            globeMaterial={globeMaterial}
            showAtmosphere
            atmosphereColor={theme.atmosphere}
            atmosphereAltitude={0.15}
            polygonsData={polygonData}
            polygonGeoJsonGeometry="geometry"
            polygonAltitude={(country) =>
              0.006 +
              0.14 * Math.sqrt((country.visitors ?? 0) / (maxVisitors || 1))
            }
            polygonCapColor={(country) =>
              capColor(country.visitors, maxVisitors, theme.land)
            }
            polygonSideColor={() => theme.side}
            polygonStrokeColor={(country) =>
              country.id === highlightedCode ? theme.highlight : theme.stroke
            }
            polygonsTransitionDuration={prefersReducedMotion ? 0 : 600}
            animateIn={!prefersReducedMotion}
            onPolygonHover={handlePolygonHover}
            onPolygonClick={handlePolygonClick}
            onGlobeClick={handleGlobeClick}
          />
        </div>
      </>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className="relative h-full"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerMove={setPointerFromEvent}
    >
      <div
        ref={containerRef}
        className="relative size-full min-h-80 overflow-hidden rounded-xl bg-beige-200 shadow-card ring-1 ring-green-200/70 sm:min-h-105 lg:min-h-120 dark:bg-green-700 dark:shadow-none dark:ring-green-600/60"
      >
        {panelContent}
      </div>

      {active && (
        <div
          ref={tooltipRef}
          className="pointer-events-none absolute z-10 max-w-[calc(100%-1rem)] min-w-36 rounded-md bg-beige-100 px-3 py-2 text-sm text-green-800 shadow-card ring-1 ring-green-700/20"
          style={{ transform: 'translate(-50%, -100%)' }}
        >
          <p className="font-medium">
            {namesByCode.get(active.id) ?? active.properties?.name ?? active.id}
          </p>
          <p className="text-green-600">
            {active.visitors > 0
              ? `${numberFormat.format(active.visitors)} visitors`
              : 'No recorded visitors'}
          </p>
        </div>
      )}
    </div>
  );
}
