/**
 * @param {Array} array - The array to iterate over.
 * @param {Function} predicate - The function invoked per iteration.
 * @return {Array} Returns the slice of `array`.
 */
export default function dropWhile(array, predicate) {
  let index = 0;

  while (index < array.length && predicate(array[index], index, array)) {
    index++;
  }

  return array.slice(index);
}
