/**
 * Creates an object from an array of key-value pairs.
 *
 * @param {Array} pairs - An array of key-value pairs.
 * @returns {Object} - The object composed from the key-value pairs.
 */
export default function fromPairs(pairs) {
  const result = {};

  for (const [key, value] of pairs) {
    result[key] = value;
  }

  return result;
}
