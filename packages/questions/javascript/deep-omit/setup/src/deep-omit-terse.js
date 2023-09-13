/**
 * @param {Object} obj
 * @param {Array<string>} keys
 * @returns any
 */
export default function deepOmit(obj, keys) {
  if (!Array.isArray(obj) && !isPlainObject(obj)) {
    return obj;
  }

  // Both arrays and objects can be traversed using `for...in` statements.
  const newObj = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (!keys.includes(key)) {
      newObj[key] = deepOmit(obj[key], keys);
    }
  }

  return newObj;
}

function isPlainObject(value) {
  if (value == null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}
