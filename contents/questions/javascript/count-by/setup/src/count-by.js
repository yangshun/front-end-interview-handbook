/**
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns the composed aggregate object.
 */
export default function countBy(array, iteratee) {
  const result = {};

  for (const element of array) {
    const key = String(iteratee(element));
    if (!Object.prototype.hasOwnProperty.call(result, key)) {
      result[key] = 0;
    }

    result[key]++;
  }

  return result;
}
