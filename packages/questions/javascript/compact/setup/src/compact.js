/**
 * @param {Array} array: The array to compact.
 * @return {Array} Returns the new array of filtered values.
 */
export default function compact(array) {
  const result = [];

  for (let i = 0; i < array.length; i++) {
    const value = array[i];

    // Skip falsey values
    if (value) {
      result.push(value);
    }
  }

  return result;
}
