/**
 * @param {Function} iteratee - The iteratee function to apply to each value.
 * @param {Array[]} arrays - The arrays to perform the intersection on.
 * @returns {Array} - A new array containing the unique values present in all given arrays.
 */
export default function intersectionBy(iteratee, ...arrays) {
  if (arrays.length == 0) {
    return [];
  }

  if (arrays.length === 1) {
    const uniqueSet = new Set();
    const result = [];
    for (const value of arrays[0]) {
      const transformedValue = iteratee(value);

      if (!uniqueSet.has(transformedValue)) {
        uniqueSet.add(transformedValue);
        result.push(value);
      }
    }
    return result;
  }

  // If any array is empty, the intersection is empty
  if (arrays.some((arr) => arr.length === 0)) {
    return [];
  }

  // Create Sets of transformed values for arrays 2 onwards for O(1) lookup
  const subsequentSets = arrays
    .slice(1)
    .map((array) => new Set(array.map(iteratee)));

  const result = [];
  const includedTransformedValues = new Set();

  // Check elements from the first array against the sets.
  for (const value of arrays[0]) {
    const transformedValue = iteratee(value);

    if (
      !includedTransformedValues.has(transformedValue) &&
      subsequentSets.every((set) => set.has(transformedValue))
    ) {
      result.push(value); // Add the original value.
      includedTransformedValues.add(transformedValue); // Mark transformed value as included.
    }
  }

  return result;
}
