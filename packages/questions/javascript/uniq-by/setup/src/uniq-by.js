/**
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {Array} Returns the unique array.
 */
export default function uniqBy(array, iteratee = (value) => value) {
  const result = [];
  const compare = [];

  array.forEach((item) => {
    if (!compare.includes(iteratee(item))) {
      result.push(item);
      compare.push(iteratee(item));
    }
  });

  return result;
}
