/**
 * @param {Object|Array} valA
 * @param {Object|Array} valB
 * @returns Object|Array
 */
export default function deepMerge(valA, valB) {
  // Both values are arrays.
  if (Array.isArray(valA) && Array.isArray(valB)) {
    return [...valA, ...valB];
  }

  // Both values are objects.
  if (isPlainObject(valA) && isPlainObject(valB)) {
    const newObj = { ...valA };
    for (const key in valB) {
      if (Object.prototype.hasOwnProperty.call(valA, key)) {
        newObj[key] = deepMerge(valA[key], valB[key]);
      } else {
        newObj[key] = valB[key];
      }
    }
    return newObj;
  }

  // Return the second value as it will "win" in case of an overlap.
  return valB;
}

function isPlainObject(value) {
  if (value == null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}
