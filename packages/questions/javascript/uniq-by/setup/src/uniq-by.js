/**
 * @param {Array} array The array to iterate over.
 * @param {Function|string} iteratee The iteratee invoked per element.
 * @returns {Array} Returns the unique array.
 */
export default function uniqBy(array, iteratee = (value) => value) {
  const result = [];
  const compare = [];

  // Convert string `iteratee` into function.
  const iterateeFunc =
    typeof iteratee === 'function' ? iteratee : (value) => value[iteratee];

  array.forEach((item) => {
    if (
      (iterateeFunc(item) != null || item == array[0]) &&
      !compare.includes(iterateeFunc(item))
    ) {
      result.push(item);
      compare.push(iterateeFunc(item));
    }
  });

  return result;
}
