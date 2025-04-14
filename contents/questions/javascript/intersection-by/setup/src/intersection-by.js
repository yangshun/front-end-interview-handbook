/**
 * @param {Function} iteratee - The iteratee function to apply to each value.
 * @param {Array[]} arrays - The arrays to perform the intersection on.
 * @returns {Array} - A new array containing the unique values present in all given arrays.
 */
export default function intersectionBy(iteratee, ...arrays) {
  if (arrays.length === 0) {
    return [];
  }

  const mappedArrays = arrays.map((array) => array.map(iteratee));
  let intersectedValues = mappedArrays[0].filter((value) => {
    return mappedArrays.every((mappedArray) => mappedArray.includes(value));
  });

  intersectedValues = intersectedValues.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });

  return intersectedValues.map((value) => {
    const index = mappedArrays[0].indexOf(value);
    return arrays[0][index];
  });
}
