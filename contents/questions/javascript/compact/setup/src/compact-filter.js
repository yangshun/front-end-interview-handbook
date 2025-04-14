/**
 * @param {Array} array: The array to compact.
 * @return {Array} Returns the new array of filtered values.
 */
export default function compact(array) {
  return array.filter(Boolean);
}
