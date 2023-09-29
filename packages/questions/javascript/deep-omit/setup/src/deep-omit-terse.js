/**
 * @param {any} val
 * @param {Array<string>} keys
 * @returns any
 */
export default function deepOmit(val, keys) {
  if (!Array.isArray(val) && !isPlainObject(val)) {
    return val;
  }

  // Both arrays and objects can be traversed using `for...in` statements.
  const newObj = Array.isArray(val) ? [] : {};
  for (const key in val) {
    if (!keys.includes(key)) {
      newObj[key] = deepOmit(val[key], keys);
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
