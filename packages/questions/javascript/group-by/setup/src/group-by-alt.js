/**
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee to transform keys.
 * @returns {Object} Returns the composed aggregate object.
 */
export default function groupBy(array, iteratee) {
  const result = Object.create(null);

  for (const element of array) {
    const key = iteratee(element);
    result[key] ??= [];
    result[key].push(element);
  }

  return result;
}
