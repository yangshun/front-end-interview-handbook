/**
 * @param {Object} obj
 * @param {Function} fn
 * @returns Object
 */
export default function objectMap(obj, fn) {
  const result = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = fn.call(obj, obj[key]);
    }
  }

  return result;
}
