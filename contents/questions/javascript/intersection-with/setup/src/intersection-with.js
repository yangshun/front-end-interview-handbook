/**
 * @param {Function} comparator - The comparator function used to determine equality between elements.
 * @param {...Array} arrays - The arrays to perform the intersection on.
 * @returns {Array} - A new array containing the elements that are present in all given arrays.
 */
export default function intersectionWith(comparator, ...arrays) {
  if (!arrays.length) {
    return [];
  }

  const firstArray = arrays[0];

  // Perform intersection
  return firstArray.filter((value) =>
    arrays
      .slice(1)
      .every((arr) => arr.some((otherValue) => comparator(value, otherValue))),
  );
}
