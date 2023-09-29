export default function deepMerge(valA: unknown, valB: unknown): unknown {
  // Both values are arrays.
  if (Array.isArray(valA) && Array.isArray(valB)) {
    return [...valA, ...valB];
  }

  // Both values are objects.
  if (isPlainObject(valA) && isPlainObject(valB)) {
    const objA = valA as any;
    const objB = valB as any;
    const newObj = { ...objA };

    for (const key in objB) {
      if (Object.prototype.hasOwnProperty.call(valA, key)) {
        newObj[key] = deepMerge(objA[key], objB[key]);
      } else {
        newObj[key] = objB[key];
      }
    }
    return newObj;
  }

  // Return the second value as it will "win" in case of an overlap.
  return valB;
}

function isPlainObject(value: unknown): boolean {
  if (value == null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}
