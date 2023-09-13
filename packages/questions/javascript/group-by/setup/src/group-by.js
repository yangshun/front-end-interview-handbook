/**
 * @param {Array} array The array to iterate over.
 * @param {Function|string} iteratee The iteratee to transform keys.
 * @returns {Object} Returns the composed aggregate object.
 */
export default function groupBy(array, iteratee) {
  const result = {};
  const iterateeFunc =
    typeof iteratee === 'function' ? iteratee : (value) => value[iteratee];

  for (const element of array) {
    const key = iterateeFunc(element);
    if (!Object.prototype.hasOwnProperty.call(result, key)) {
      result[key] = [];
    }

    result[key].push(element);
  }

  return result;
}
