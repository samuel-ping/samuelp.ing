export const Sidewalk = {
  src: '/assets/spotted/buildings/Sidewalk.webp',
  width: 1575,
  height: 978,
  // Rendered px. The art is semi-transparent watercolor with soft,
  // fully transparent margins on its left and right edges (~100px and ~75px
  // in source pixels), so tiles overlap by more than the combined margin
  // width and the transparent paint blends between neighbors instead of
  // leaving gaps.
  tileHeight: 176,
  tileOverlap: 40,
  // How far the buildings' bottoms tuck under the top of the sidewalk.
  buildingOverlap: 32,
};

// Display placement for each found item, keyed by its MDX slug
// (content/spotted/<slug>.mdx):
// - `x`: the item's horizontal center as a fraction (0-1) of the full street
//   width.
// - `y`: where the item's bottom edge rests as a fraction (0-1) of the
//   sidewalk band height.
// - `size`: the rendered height in rem (the sidewalk band is 11rem tall, so
//   sensible values are roughly 2-8).
export const SpottedItemLayout = {
  'contact-lens': { x: 0.12, y: 0.45, size: 1 },
  photostrip: { x: 0.38, y: 0.3, size: 1 },
  'movie-binder': { x: 0.62, y: 0.5, size: 3 },
  'planty-card': { x: 0.85, y: 0.35, size: 1 },
};

// Storefront illustrations for the /spotted street, in the order they appear
// along the sidewalk (left to right).
const SpottedBuildings = [
  {
    name: 'NAYTEA',
    src: '/assets/spotted/buildings/Naytea.webp',
    width: 2271,
    height: 2154,
    sidewalkOverlap: 22,
  },
  {
    name: 'Fiora',
    src: '/assets/spotted/buildings/Fiora.webp',
    width: 2233,
    height: 1566,
  },
  {
    name: 'Bila De Boba',
    src: '/assets/spotted/buildings/BilaDeBoba.webp',
    width: 1955,
    height: 2103,
  },
  {
    name: 'Big Banchan Stall',
    src: '/assets/spotted/buildings/BigBanchanStall.webp',
    width: 2336,
    height: 2048,
  },
  {
    name: 'Izakaya Edamame',
    src: '/assets/spotted/buildings/IzakayaEdamame.webp',
    width: 2512,
    height: 2144,
    sidewalkOverlap: 70,
  },
  {
    name: 'Caffe Nanna',
    src: '/assets/spotted/buildings/CaffeNanna.webp',
    width: 3249,
    height: 1271,
  },
  {
    name: "Merchant Moe's",
    src: '/assets/spotted/buildings/MerchantMoes.webp',
    width: 3288,
    height: 1383,
    sidewalkOverlap: 36,
  },
];

export default SpottedBuildings;
