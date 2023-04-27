/**
 * @param {Array} array - The array to iterate over.
 * @param {Function} predicate - The function invoked per iteration.
 * @return {Array} Returns the slice of `array`.
 */
export default function dropWhile(array, predicate) {
  let dropCount = 0;

  while (
    dropCount < array.length &&
    predicate(array[dropCount], dropCount, array)
  ) {
    dropCount++;
  }

  return array.slice(dropCount);
}
