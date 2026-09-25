'use client';

import { useMemo } from 'react';
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
 * Detail modal for a found item. Mounted by the parent only while an item is
 * selected. No `dark:` classes — the /spotted page is pinned to the light
 * theme (see `body.spotted-theme` in globals.css, which also reaches this
 * portal).
 */
const SpottedItemModal = ({ item, onClose }) => {
  // getMDXComponent evaluates the bundled MDX code string; memoize per item.
  // Hooks must run unconditionally, so guard inside the memo.
  const Body = useMemo(
    () => (item ? getMDXComponent(item.code) : null),
    [item]
  );

  if (!item) return null;
  const { title, found, neighborhood, lat, lng, image, alt, width, height } =
    item.details;
  const hasCoords = lat != null && lng != null;

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/40" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          {/* `relative` anchors the floating close button. */}
          <DialogPanel className="relative w-full max-w-xl rounded-2xl bg-beige-100 p-6 text-black shadow-xl md:p-8">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 text-2xl leading-none text-green-600 hover:text-green-500"
            >
              &times;
            </button>
            {/* Bare cutout, same treatment as the items on the sidewalk. */}
            <Image
              src={image}
              alt={alt}
              width={width}
              height={height}
              className="mx-auto my-6 max-h-56 w-auto drop-shadow-lg md:max-h-64"
            />
            {/* Info card */}
            <div className="rounded-md bg-green-200 p-4 md:p-5">
              <div className="md:flex md:items-start md:gap-6">
                <div className="min-w-0 md:flex-1">
                  <DialogTitle className="text-xl font-semibold md:text-2xl">
                    {title}
                  </DialogTitle>
                  <dl className="mt-3 space-y-1.5">
                    <div className="flex">
                      <dt className="w-20 shrink-0 text-sm font-medium text-green-500">
                        Found
                      </dt>
                      <dd className="text-sm">{found}</dd>
                    </div>
                    <div className="flex">
                      <dt className="w-20 shrink-0 text-sm font-medium text-green-500">
                        Location
                      </dt>
                      <dd className="text-sm">{neighborhood}</dd>
                    </div>
                  </dl>
                </div>
                {hasCoords && (
                  <figure className="mt-4 md:mt-0 md:w-44 md:shrink-0">
                    <SpottedItemMap
                      lat={lat}
                      lng={lng}
                      className="h-32 rounded-sm border border-green-700/25 md:h-40"
                    />
                  </figure>
                )}
              </div>
            </div>
            <div className="mt-6">{Body && <Body components={MDXComponents} />}</div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default SpottedItemModal;
