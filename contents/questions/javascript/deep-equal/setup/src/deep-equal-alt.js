/**
 * @param {*} valueA
 * @param {*} valueB
 * @return {boolean}
 */
export default function deepEqual(valueA, valueB) {
  // Check primitives for equality.
  if (Object.is(valueA, valueB)) {
    return true;
  }

  const bothObjects =
    Object.prototype.toString.call(valueA) === '[object Object]' &&
    Object.prototype.toString.call(valueB) === '[object Object]';
  const bothArrays = Array.isArray(valueA) && Array.isArray(valueB);

  // At this point, they can still be primitives but of different types.
  // If they had the same value, they would have been handled earlier in Object.is().
  // So if they're not both objects or both arrays, they're definitely not equal.
  if (!bothObjects && !bothArrays) {
    return false;
  }

  // Compare the keys of arrays and objects.
  if (Object.keys(valueA).length !== Object.keys(valueB).length) {
    return false;
  }

  for (const key in valueA) {
    if (!deepEqual(valueA[key], valueB[key])) {
      return false;
    }
  }

  // All checks passed, the arrays/objects are equal.
  return true;
}
