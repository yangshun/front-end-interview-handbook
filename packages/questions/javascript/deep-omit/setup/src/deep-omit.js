/**
 * @param {Object} obj
 * @param {Array<string>} keys
 * @returns any
 */
export default function deepOmit(obj, keys) {
  // Handle arrays.
  if (Array.isArray(obj)) {
    return obj.map((item) => deepOmit(item, keys));
  }

  // Handle objects.
  if (isPlainObject(obj)) {
    const newObj = {};
    for (const key in obj) {
      if (!keys.includes(key)) {
        newObj[key] = deepOmit(obj[key], keys);
      }
    }

    return newObj;
  }

  // Other values can be returned directly.
  return obj;
}

function isPlainObject(value) {
  if (value == null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}
