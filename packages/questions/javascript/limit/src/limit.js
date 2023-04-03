/**
 * @callback func
 * @param {number} n
 * @return {Function}
 */
export default function limit(func, n) {
  let count = 0;
  let value;

  return function (...args) {
    if (count < n) {
      value = func.apply(this, args);
      count++;
    }

    return value;
  };
}
