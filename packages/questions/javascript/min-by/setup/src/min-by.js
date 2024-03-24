/**
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {*} Returns the minimum value.
 */
export default function minBy(array, iteratee) {
  let result, computed;

  // Iterate through array to find the minimum `result`.
  for (const value of array) {
    const current = iteratee(value);
    if (current != null && (current < computed || computed === undefined)) {
      computed = current; // Store the calculated value of the current `result`.
      result = value;
    }
  }

  return result;
}
