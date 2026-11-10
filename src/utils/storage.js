/**
 * LocalStorage utility for WearLab customization state.
 * Validates stored data strictly against available product options and defaults.
 */

export const STORAGE_KEY = 'wearlab-customization-v1';

/**
 * Loads customization state from localStorage, validating each field.
 * Returns default values if storage is missing, malformed, or corrupt.
 *
 * @param {Object} defaults - Default customization configuration
 * @param {Object} options - Valid product options { colors, sizes, prints }
 * @returns {Object} Validated customization object
 */
export function loadSavedCustomization(defaults, options) {
  if (typeof window === 'undefined' || !window.localStorage) {
    return { ...defaults };
  }

  try {
    const rawData = window.localStorage.getItem(STORAGE_KEY);
    if (!rawData) {
      return { ...defaults };
    }

    const parsed = JSON.parse(rawData);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return { ...defaults };
    }

    const validColorIds = new Set(options.colors.map((c) => c.id));
    const validSizeIds = new Set(options.sizes.map((s) => s.id));
    const validPrintIds = new Set(options.prints.map((p) => p.id));

    return {
      color: validColorIds.has(parsed.color) ? parsed.color : defaults.color,
      size: validSizeIds.has(parsed.size) ? parsed.size : defaults.size,
      print: validPrintIds.has(parsed.print) ? parsed.print : defaults.print,
      giftPackaging:
        typeof parsed.giftPackaging === 'boolean'
          ? parsed.giftPackaging
          : defaults.giftPackaging,
    };
  } catch (error) {
    // Malformed JSON or blocked storage
    console.warn('WearLab: Could not load saved customization, using defaults.', error);
    return { ...defaults };
  }
}

/**
 * Saves customization state to localStorage safely.
 *
 * @param {Object} customization - State containing color, size, print, giftPackaging
 */
export function saveCustomization(customization) {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }

  try {
    // Persist only the four user selection fields
    const payload = {
      color: customization.color,
      size: customization.size,
      print: customization.print,
      giftPackaging: Boolean(customization.giftPackaging),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (error) {
    // Gracefully handle storage quota or privacy mode errors
    console.warn('WearLab: Could not save customization to localStorage.', error);
  }
}
