/**
 * @param {Function} comparator The comparator invoked per element.
 * @param {...Array} arrays Array from which the elements are all numbers.
 * @return {Array} Returns the new array of combined values.
 */
export default function unionWith(comparator, ...arrays) {
  const result = [];

  // Push the unique `item` based on `comparator` into `result`.
  arrays.forEach((array) => {
    array.forEach((item) => {
      const isUnique =
        result.findIndex((resultItem) => comparator(item, resultItem)) === -1;
      if (isUnique) {
        result.push(item);
      }
    });
  });

  return result;
}
