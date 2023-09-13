/**
 * This function returns the index of the last element in the array that satisfies the provided testing function.
 * Otherwise, it returns -1.
 *
 * @param {Array} array - The array to search.
 * @param {Function} predicate - The function invoked per iteration.
 * @param {number} [fromIndex=array.length-1] - The index to start searching from.
 * @returns The index of the found element, else -1.
 */
export default function findLastIndex(
  array,
  predicate,
  fromIndex = array.length - 1,
) {
  let startIndex =
    fromIndex < 0
      ? Math.max(array.length + fromIndex, 0)
      : Math.min(fromIndex, array.length - 1);

  let index = startIndex;
  // Iterate from the right.
  while (index >= 0) {
    if (predicate(array[index], index, array)) {
      return index;
    }
    index--;
  }

  return -1;
}
