/**
 * @param {Array} array - Array from which the same items as in `values` are to be removed.
 * @param {...*} values - Values that are to be removed from the original array.
 * @return {Array} Returns filtered array.
 */
export default function without(array, ...values) {
  const result = [];

  // Create a set of all the values in the values arrays.
  const valuesSet = new Set(values);

  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    // Check if the value is in the values set.
    if (!valuesSet.has(value)) {
      result.push(value);
    }
  }

  return result;
}
