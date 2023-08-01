/**
 * @param {Object} objA
 * @param {Object} objB
 * @returns Object
 */
export default function deepMerge(objA, objB) {
  // Both values are arrays.
  if (Array.isArray(objA) && Array.isArray(objB)) {
    return [...objA, ...objB];
  }

  // Both values are objects.
  if (isPlainObject(objA) && isPlainObject(objB)) {
    const newObj = { ...objA };
    for (const key in objB) {
      if (Object.prototype.hasOwnProperty.call(objA, key)) {
        newObj[key] = deepMerge(objA[key], objB[key]);
      } else {
        newObj[key] = objB[key];
      }
    }
    return newObj;
  }

  // Return the second value as it will "win" in case of an overlap.
  return objB;
}

function isPlainObject(value) {
  if (value == null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}
