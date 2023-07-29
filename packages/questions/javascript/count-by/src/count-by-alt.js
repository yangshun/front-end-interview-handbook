/**
 * @param {Array} array The array to iterate over.
 * @param {Function|string} iteratee The function invoked per iteration.
 * @returns {Object} Returns the composed aggregate object.
 */
export default function countBy(array, iteratee) {
  const result = Object.create(null);

  for (const element of array) {
    const key =
      typeof iteratee === 'function' ? iteratee(element) : element[iteratee];
    result[key] ??= 0;
    result[key]++;
  }

  return result;
}
