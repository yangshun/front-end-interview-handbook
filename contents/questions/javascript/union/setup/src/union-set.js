/**
 * @param {...Array} [arrays] Array from which the elements are all numbers.
 * @return {Array} Returns the new array of combined values.
 */
export default function union(...arrays) {
  const result = new Set();

  arrays.forEach((array) => {
    array.forEach((item) => {
      // Add `item` to the `result`. Set will automatically ensure uniqueness.
      result.add(item);
    });
  });

  // Convert the `result` back to an array before returning.
  return Array.from(result);
}
