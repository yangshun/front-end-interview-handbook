/**
 * @param {any} val
 * @param {Array<string>} keys
 * @returns any
 */
export default function deepOmit(val, keys) {
  // Handle arrays.
  if (Array.isArray(val)) {
    return val.map((item) => deepOmit(item, keys));
  }

  // Handle objects.
  if (isPlainObject(val)) {
    const newObj = {};
    for (const key in val) {
      if (!keys.includes(key)) {
        newObj[key] = deepOmit(val[key], keys);
      }
    }

    return newObj;
  }

  // Other values can be returned directly.
  return val;
}

function isPlainObject(value) {
  if (value == null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}
