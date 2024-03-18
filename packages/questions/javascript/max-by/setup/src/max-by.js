/**
 * @param {Array} array The array to iterate over.
 * @param {Function|string} iteratee The iteratee invoked per element.
 * @returns {*} Returns the maximum value.
 */
export default function maxBy(array, iteratee) {
  let result, computed;

  // Convert string iteratee into function.
  const iterateeFunc =
    typeof iteratee === 'function' ? iteratee : (value) => value[iteratee];

  // Iterate through array to find the maximum `result`.
  for (const value of array) {
    const current = iterateeFunc(value);
    if (current != null && (current > computed || computed === undefined)) {
      computed = current; // Store the calculated value of the current `result`.
      result = value;
    }
  }
  return result;
}
