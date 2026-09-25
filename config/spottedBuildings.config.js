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
