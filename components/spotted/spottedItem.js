'use client';

import Image from 'next/image';

/**
 * A found item sitting on the sidewalk. Position (`x`/`y`), `size`, and
 * `rotate` are merged into the item's details from SpottedItemLayout in
 * config/spotted.config.js — see that file for what each value means.
 */
const SpottedItem = ({ item, onSelect }) => {
  const { x, y, size, rotate, image, alt, width, height, title } =
    item.details;

  const clamp = (v, fallback) => Math.min(1, Math.max(0, v ?? fallback));

  return (
    <div
      className="absolute"
      style={{
        left: `${clamp(x, 0.5) * 100}%`,
        bottom: `${clamp(y, 0.25) * 100}%`,
      }}
    >
      <button
        type="button"
        onClick={() => onSelect(item)}
        aria-label={`View details for ${title}`}
        className="-translate-x-1/2 block origin-center motion-safe:hover:animate-wiggle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
        style={{
          height: `${size}rem`,
          width: `${(size * width) / height}rem`,
          // The standalone `rotate` property, so it composes with the
          // hover wiggle (which animates `transform`) instead of being
          // overridden by it.
          rotate: `${rotate ?? 0}deg`,
        }}
      >
        {/* Decorative: the button's aria-label already names it. */}
        <Image
          src={image}
          alt=""
          width={width}
          height={height}
          className="h-full w-full object-contain drop-shadow-md"
        />
      </button>
    </div>
  );
};

export default SpottedItem;
