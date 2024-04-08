/**
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property to match.
 * @returns {boolean} Returns true if object is a match, else false.
 */
export default function isMatch(object, source) {
  for (const key in source) {
    // Check if both values are objects (including arrays, but not null).
    if (
      typeof object[key] === 'object' &&
      typeof source[key] === 'object' &&
      object[key] !== null &&
      source[key] !== null
    ) {
      // Recursively call isMatch for nested objects or arrays.
      if (!isMatch(object[key], source[key])) {
        return false;
      }
    } else if (object[key] !== source[key]) {
      return false;
    }
  }
  return true;
}
