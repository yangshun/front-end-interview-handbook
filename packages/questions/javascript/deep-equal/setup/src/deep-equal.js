function shouldDeepCompare(type) {
  return type === '[object Object]' || type === '[object Array]';
}

function getType(value) {
  return Object.prototype.toString.call(value);
}

/**
 * @param {*} valueA
 * @param {*} valueB
 * @return {boolean}
 */
export default function deepEqual(valueA, valueB) {
  // Check for arrays/objects equality.
  const type1 = getType(valueA);
  const type2 = getType(valueB);

  // Only compare the contents if they're both arrays or both objects.
  if (type1 === type2 && shouldDeepCompare(type1) && shouldDeepCompare(type2)) {
    const entriesA = Object.entries(valueA);
    const entriesB = Object.entries(valueB);

    if (entriesA.length !== entriesB.length) {
      return false;
    }

    return entriesA.every(
      // Make sure the other object has the same properties defined.
      ([k, v]) => Object.hasOwn(valueB, k) && deepEqual(v, valueB[k]),
    );
  }

  // Check for primitives + type equality.
  return Object.is(valueA, valueB);
}
