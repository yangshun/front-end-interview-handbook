/**
 * @param {...Array} [arrays] Array from which the elements are all numbers.
 * @return {Array} Returns the new array of combined values.
 */
export default function union(...arrays) {
  const result = [];

  arrays.forEach((array) => {
    array.forEach((item) => {
      // Check if the result array contains the `item`; if not, add it to the result.
      if (!result.includes(item)) {
        result.push(item);
      }
    });
  });

  return result;
}
