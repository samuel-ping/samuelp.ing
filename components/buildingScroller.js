'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/**
 * A street of storefront illustrations that pans horizontally as the page is
 * scrolled vertically. The section is made as tall as the strip is wide (plus
 * one viewport), and a sticky, full-height viewport translates the strip
 * according to scroll progress.
 */
const BuildingScroller = ({ buildings }) => {
  const sectionRef = useRef(null);
  const stripRef = useRef(null);
  // Horizontal distance (px) the strip needs to travel to reveal its end.
  const [distance, setDistance] = useState(0);

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
          className="flex h-full w-max items-end will-change-transform"
        >
          {buildings.map((building) => (
            <Image
              key={building.name}
              src={building.src}
              alt={building.name}
              width={building.width}
              height={building.height}
              className="h-[50vh] w-auto shrink-0 md:h-[60vh]"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuildingScroller;
