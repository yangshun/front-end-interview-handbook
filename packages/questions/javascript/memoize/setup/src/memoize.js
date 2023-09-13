/**
 * @param {Function} func
 * @returns Function
 */
export default function memoize(func) {
  const cache = new Map();

  return function (arg) {
    if (cache.has(arg)) {
      return cache.get(arg);
    }

    const result = func.call(this, arg);
    cache.set(arg, result);

    return result;
  };
}
