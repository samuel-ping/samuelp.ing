const displayNames = new Intl.DisplayNames(['en'], { type: 'region' });

/**
 * Resolves an ISO 3166-1 alpha-2 code to an English country name.
 * Falls back to the supplied name (e.g. a GeoJSON property) and then the code.
 * @param {string} code
 * @param {string} [fallback]
 * @returns {string}
 */
export function GetCountryName(code, fallback) {
  try {
    return displayNames.of(code) ?? fallback ?? code;
  } catch {
    return fallback ?? code;
  }
}
