/**
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {Number | undefined} Returns the sum.
 */
export default function sumBy(array, iteratee) {
  let sum = 0,
    found = false;

  if (array.length == 0) {
    return 0;
  }

  // Iterate through `array` to find the sum.
  for (const value of array) {
    const current = iteratee(value);
    if (current != null) {
      sum += current; // Store the calculated value of the current `result`.
      found = true; // Check if there is any element that fulfills `iteratee`.
    }
  }

  if (!found) {
    return undefined;
  }
  return sum;
}
