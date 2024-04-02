/**
 * @param {Function} iteratee The iteratee invoked per element.
 * @param {...Array} arrays Array from which the elements are all numbers.
 * @return {Array} Returns the new array of combined values.
 */
export default function unionBy(iteratee, ...arrays) {
  const result = [];
  const compare = new Set();

  // Push the unique `item` based on `iteratee` into `result` while keeping the comparison value in `compare`.
  arrays.forEach((array) => {
    array.forEach((item) => {
      if (!compare.has(iteratee(item))) {
        result.push(item);
        compare.add(iteratee(item));
      }
    });
  });

  return result;
}
