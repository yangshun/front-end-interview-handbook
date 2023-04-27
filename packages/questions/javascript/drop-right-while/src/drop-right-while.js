/**
 * @param {Array} array - The array to iterate over.
 * @param {Function} predicate - The function invoked per iteration.
 * @return {Array} Returns the slice of `array`.
 */
export default function dropRightWhile(array, predicate) {
  let i = array.length - 1;

  while (i >= 0 && predicate(array[i], i, array)) {
    i--;
  }

  return array.slice(0, i + 1);
}
