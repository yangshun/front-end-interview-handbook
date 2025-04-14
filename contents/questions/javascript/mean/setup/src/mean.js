/**
 * @param {Array} array - Array from which the elements are all numbers.
 * @return {Number} Returns the mean.
 */
export default function mean(array) {
  let total = 0;

  // Calculate the sum of all numbers in the array.
  for (let i = 0; i < array.length; i++) {
    total += array[i];
  }

  // Calculate the mean from the sum.
  return total / array.length;
}
