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
import Chip from '@/components/ui/chip';

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

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/40" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-xl rounded-2xl bg-beige-100 p-6 text-black shadow-xl md:p-8">
            <div className="flex items-start justify-between gap-4">
              <DialogTitle className="text-2xl font-semibold md:text-3xl">
                {title}
              </DialogTitle>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="text-2xl leading-none"
              >
                &times;
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <Chip text={`Found ${found}`} />
              <Chip text={neighborhood} />
            </div>
            <Image
              src={image}
              alt={alt}
              width={width}
              height={height}
              className="mx-auto my-6 max-h-64 w-auto"
            />
            {Body && <Body components={MDXComponents} />}
            {lat != null && lng != null && (
              <div className="mt-6">
                <SpottedItemMap lat={lat} lng={lng} />
              </div>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default SpottedItemModal;
