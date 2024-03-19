/**
 * @param {Array} array The array to iterate over.
 * @param {Function|string} iteratee The iteratee invoked per element.
 * @returns {Number} Returns the mean value.
 */
export default function meanBy(array, iteratee) {
  let sum = 0,
    found = false;

  // Convert string iteratee into function.
  const iterateeFunc =
    typeof iteratee === 'function' ? iteratee : (value) => value[iteratee];

  // Iterate through array to find the mean.
  for (const value of array) {
    const current = iterateeFunc(value);
    if (current != null) {
      sum += current; // Store the calculated value of the current `result`.
      found = true; // To indicate if there exists a valid value that fulfills `iteratee`.
    }
  }

  if (!found) {
    return NaN;
  }
  return sum / array.length;
}
