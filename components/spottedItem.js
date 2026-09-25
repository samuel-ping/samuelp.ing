'use client';

import Image from 'next/image';

/**
 * A found item sitting on the sidewalk. Position and size come from the
 * item's MDX frontmatter:
 * - `x`: the item's horizontal center as a fraction (0-1) of the full street
 *   width.
 * - `y`: where the item's bottom edge rests as a fraction (0-1) of the
 *   sidewalk band height.
 * - `size`: the rendered height in rem (the sidewalk band is 11rem tall, so
 *   sensible values are roughly 2-8).
 */
const SpottedItem = ({ item }) => {
  const { x, y, size, image, alt, width, height, title } = item.details;

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
        aria-label={title}
        className="-translate-x-1/2 block transition-transform duration-150 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
        style={{
          height: `${size}rem`,
          width: `${(size * width) / height}rem`,
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
