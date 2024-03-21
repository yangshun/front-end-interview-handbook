/**
 * @param {Array} array The array to iterate over.
 * @param {Function | string} comparator The comparator invoked per element.
 * @returns {Array} Returns the unique array.
 */
export default function uniqWith(array, comparator = (a, b) => a === b) {
  const result = [];

  // Ensure `comparator` is a function.
  const comparatorFunc =
    typeof comparator === 'function' ? comparator : (a, b) => a === b;

  array.forEach((item) => {
    // Check if result array contains the same value when compared with `comparator`.
    const isUnique =
      result.findIndex((resultItem) => comparatorFunc(item, resultItem)) === -1;
    if (isUnique) {
      result.push(item);
    }
  });

  return result;
}
