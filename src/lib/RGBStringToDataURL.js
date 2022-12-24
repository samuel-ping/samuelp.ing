// Adapted from next/image color effect demo code: https://github.com/vercel/next.js/blob/canary/examples/image-component/pages/color.tsx
const keyStr =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

const triplet = (e1, e2, e3) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);

const rgbDataURL = (r, g, b) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

export default function RGBStringToDataURL(rgbString) {
  if (rgbString) {
    const rgb = rgbString.split(',');
    return rgbDataURL(parseInt(rgb[0]), parseInt(rgb[1]), parseInt(rgb[2]));
  }

  return rgbDataURL(255, 255, 255); // return white if no rgbString
}

// Adapted from next/image shimmer effect demo code: https://github.com/vercel/next.js/blob/canary/examples/image-component/pages/shimmer.tsx
// const shimmer = (w, h) => `
// <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
//   <defs>
//     <linearGradient id="g">
//       <stop stop-color="#333" offset="20%" />
//       <stop stop-color="#222" offset="50%" />
//       <stop stop-color="#333" offset="70%" />
//     </linearGradient>
//   </defs>
//   <rect width="${w}" height="${h}" fill="#333" />
//   <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
//   <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
// </svg>`

// const toBase64 = (str) =>
//   typeof window === 'undefined'
//     ? Buffer.from(str).toString('base64')
//     : window.btoa(str)

// export default function getBase64Shimmer(w, h) {
//   return `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`
// }
