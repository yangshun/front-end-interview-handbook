/**
 * @param {Array} array - Array from which the elements are all numbers.
 * @return {Number} Returns the mean.
 */
export default function mean(array) {
  return array.reduce((a, b) => a + b, 0) / array.length;
}
