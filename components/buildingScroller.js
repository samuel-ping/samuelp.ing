'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import SpottedItem from '@/components/spottedItem';
import SpottedItemModal from '@/components/spottedItemModal';

/**
 * A street of storefront illustrations that pans horizontally as the page is
 * scrolled vertically. The section is made as tall as the strip is wide (plus
 * one viewport), and a sticky, full-height viewport translates the strip
 * according to scroll progress.
 */
const BuildingScroller = ({ buildings, sidewalk, items = [] }) => {
  const sectionRef = useRef(null);
  const stripRef = useRef(null);
  // The item whose detail modal is open, if any.
  const [selected, setSelected] = useState(null);
  // Horizontal distance (px) the strip needs to travel to reveal its end.
  const [distance, setDistance] = useState(0);
  // Number of sidewalk tiles needed to cover the strip's full width.
  const [tileCount, setTileCount] = useState(0);

  const scale = sidewalk.tileHeight / sidewalk.height;
  const tileWidth = sidewalk.width * scale;
  const tileStep = tileWidth - sidewalk.tileOverlap;

  useEffect(() => {
    const updateTransform = () => {
      const section = sectionRef.current;
      const strip = stripRef.current;
      if (!section || !strip) return;

      const total = section.offsetHeight - window.innerHeight;
      const progress =
        total > 0
          ? Math.min(1, Math.max(0, -section.getBoundingClientRect().top / total))
          : 0;
      const maxShift = strip.scrollWidth - window.innerWidth;
      strip.style.transform = `translateX(${-progress * maxShift}px)`;
    };

    const measure = () => {
      const strip = stripRef.current;
      if (!strip) return;
      setDistance(Math.max(0, strip.scrollWidth - window.innerWidth));
      setTileCount(Math.ceil(strip.scrollWidth / tileStep) + 1);
      updateTransform();
    };

    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', updateTransform, { passive: true });
    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', updateTransform);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full"
      style={{ height: `calc(100vh + ${distance}px)` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          ref={stripRef}
          className="relative flex h-full w-max flex-col justify-end will-change-transform"
        >
          {/* Each building's bottom margin lifts it so the sidewalk band
              overlaps its bottom by its own `sidewalkOverlap`, falling back
              to the shared `buildingOverlap`. */}
          <div className="relative z-10 flex items-end">
            {buildings.map((building) => (
              <Image
                key={building.name}
                src={building.src}
                alt={building.name}
                width={building.width}
                height={building.height}
                className="h-[50vh] w-auto shrink-0 md:h-[60vh]"
                style={{
                  marginBottom:
                    sidewalk.tileHeight -
                    (building.sidewalkOverlap ?? sidewalk.buildingOverlap),
                }}
              />
            ))}
          </div>
          {/* Sidewalk ground below the buildings, tiled across the full width
              of the strip so it pans along with them. Absolutely positioned
              so the tiles never affect the strip's width, each tile overlaps
              its neighbor slightly so no gap appears between repeats, and it
              sits behind the buildings so their bottoms tuck in front of it. */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 z-0 flex overflow-hidden"
            style={{ height: sidewalk.tileHeight }}
          >
            {Array.from({ length: tileCount }).map((_, i) => (
              <Image
                key={i}
                src={sidewalk.src}
                alt=""
                width={sidewalk.width}
                height={sidewalk.height}
                className="shrink-0"
                style={{
                  width: tileWidth,
                  height: sidewalk.tileHeight,
                  marginLeft: i === 0 ? 0 : -sidewalk.tileOverlap,
                }}
              />
            ))}
          </div>
          {/* Found items scattered on the sidewalk. A separate layer from the
              aria-hidden, overflow-hidden tile band; absolute so it never
              affects the strip's measured width. z-20 keeps items clickable
              above the building bases. Sorted by x so tab order follows the
              street left to right. */}
          <div
            className="absolute inset-x-0 bottom-0 z-20"
            style={{ height: sidewalk.tileHeight }}
          >
            {[...items]
              .sort((a, b) => (a.details.x ?? 0.5) - (b.details.x ?? 0.5))
              .map((item) => (
                <SpottedItem
                  key={item.details.slug}
                  item={item}
                  onSelect={setSelected}
                />
              ))}
          </div>
        </div>
      </div>
      <SpottedItemModal item={selected} onClose={() => setSelected(null)} />
    </section>
  );
};

export default BuildingScroller;
