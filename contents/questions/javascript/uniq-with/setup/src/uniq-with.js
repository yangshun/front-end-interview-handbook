/**
 * @param {Array} array The array to iterate over.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {Array} Returns the unique array.
 */
export default function uniqWith(array, comparator = (a, b) => a === b) {
  const result = [];

  array.forEach((item) => {
    // Check if result array contains the same value when compared with `comparator`.
    const isUnique =
      result.findIndex((resultItem) => comparator(item, resultItem)) === -1;
    if (isUnique) {
      result.push(item);
    }
  });

  return result;
}
