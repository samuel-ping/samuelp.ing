/**
 * Palette for the static latest-run map and future interactive maps.
 *
 * These hex values mirror the site's Tailwind tokens in
 * app/styles/globals.css. Keep both files in sync when changing them.
 */
export const MAP_PALETTE = Object.freeze({
  light: Object.freeze({
    background: '#fff8eb',
    water: '#d9e6df',
    waterway: '#d9e6df',
    park: '#e6ecdd',
    wood: '#e6ecdd',
    residential: '#f7f0e3',
    roadCasing: '#e6ddcf',
    roadMajor: '#fffdf8',
    roadMinor: '#f3ecdf',
    roadPath: '#f3ecdf',
    routeCasing: '#fff8eb',
    routeLine: '#375954',
    labelText: '#375954',
    labelHalo: '#fff8eb',
  }),
  dark: Object.freeze({
    background: '#233835',
    water: '#1b2e2b',
    waterway: '#1b2e2b',
    park: '#2a453f',
    wood: '#2a453f',
    residential: '#28413d',
    roadCasing: '#2e4b46',
    roadMajor: '#375954',
    roadMinor: '#2e4b46',
    roadPath: '#2e4b46',
    routeCasing: '#233835',
    routeLine: '#aec8ac',
    labelText: '#aec8ac',
    labelHalo: '#233835',
  }),
});
