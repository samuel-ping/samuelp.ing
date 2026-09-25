'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { getMDXComponent } from 'mdx-bundler/client';
import dynamic from 'next/dynamic';

import { Components as MDXComponents } from '@/components/mdx/components';

// Leaflet touches `window` at import time, so the map loads client-only.
const SpottedItemMap = dynamic(
  () => import('@/components/spotted/spottedItemMap'),
  { ssr: false }
);

/**
 * Detail modal for a found item: the cutout floats half-in, half-out of the
 * panel's top edge — the object dropped onto its own label — with the
 * title, found line, map, and story in a single column below.
 *
 * Headless UI owns the focus trap, Escape, scroll locking, and focus
 * restore. The outer container scrolls (not the panel), so the floating
 * cutout scrolls away with the content instead of sticking in place; the
 * panel itself never clips it. `min-h-full` + `items-center` keeps short
 * panels centered, and the extra `pt` reserves headroom for the overhang.
 *
 * No `dark:` classes — the /spotted page is pinned to the light theme (see
 * `body.spotted-theme` in globals.css, which also reaches this portal).
 */
const SpottedItemModal = ({ item, onClose }) => {
  // Keep the last-open item around while the dialog fades out, so the
  // contents don't vanish mid-transition. On open, `item` wins immediately.
  const [lastItem, setLastItem] = useState(null);
  useEffect(() => {
    if (item) setLastItem(item);
  }, [item]);
  const shown = item ?? lastItem;

  // getMDXComponent evaluates the bundled MDX code string; memoize per item.
  const Body = useMemo(
    () => (shown ? getMDXComponent(shown.code) : null),
    [shown]
  );

  const details = shown?.details;
  const hasCoords = details?.lat != null && details?.lng != null;

  return (
    <Dialog open={item != null} onClose={onClose} className="relative z-50">
      {/* Dim the street behind. */}
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-green-700/75 transition-opacity duration-300 ease-out data-closed:pointer-events-none data-closed:opacity-0"
      />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 pt-20 sm:p-8 sm:pt-24">
          <DialogPanel
            transition
            className="relative w-full max-w-xl rounded-2xl bg-beige-100 text-black shadow-2xl ring-1 ring-green-500/25 transition duration-300 ease-out data-closed:pointer-events-none data-closed:opacity-0"
          >
          {/* Quiet close control. Esc and the backdrop also close, but touch
          users have neither, and the trap needs a focusable to cycle. */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-beige-200 text-green-600 ring-1 ring-green-500/25 transition hover:bg-green-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
          >
            <svg
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
            </svg>
          </button>
          {details && (
            <>
              {/* The cutout, breaking the panel's top edge. `-top-*` is half
              of `max-h-*` so exactly half sticks out; the panel's `pt-*`
              below clears the half that overlaps. */}
              <Image
                src={details.image}
                alt={details.alt}
                width={details.width}
                height={details.height}
                className="absolute -top-16 left-1/2 z-10 max-h-32 w-auto max-w-3/5 -translate-x-1/2 object-contain drop-shadow-lg md:-top-20 md:max-h-40"
              />
              <div className="p-6 pt-20 md:p-8 md:pt-24">
                <DialogTitle className="text-center text-2xl font-semibold md:text-3xl">
                  {details.title}
                </DialogTitle>
                <p className="mt-2 text-center text-sm uppercase tracking-wide text-green-500">
                  Found {details.found} · {details.neighborhood}
                </p>

                {hasCoords && (
                  <div className="mt-5">
                    <SpottedItemMap lat={details.lat} lng={details.lng} />
                  </div>
                )}

                <div className="mt-5">
                  {Body && <Body components={MDXComponents} />}
                </div>
              </div>
            </>
          )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default SpottedItemModal;
