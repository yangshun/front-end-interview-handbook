/**
 * Computes the intersection of arrays, returning a new array containing unique values present in all given arrays.
 *
 * @param {Array[]} arrays - The arrays to perform the intersection on.
 * @returns {Array} - A new array containing the unique values present in all given arrays.
 */
export default function intersection(...arrays) {
  if (arrays.length === 0) {
    return [];
  }

  if (arrays.length === 1) {
    const uniqueSet = new Set();
    const result = [];
    for (const value of arrays[0]) {
      if (!uniqueSet.has(value)) {
        uniqueSet.add(value);
        result.push(value);
      }
    }
    return result;
  }

  // Intersection will be empty if any of the provided array is empty
  if (arrays.some((arr) => arr.length === 0)) {
    return [];
  }

  const subsequentSets = arrays.slice(1).map((arr) => new Set(arr));
  const result = [];
  const addedValues = new Set();

  for (const value of arrays[0]) {
    if (addedValues.has(value)) {
      continue;
    }

    const isInAll = subsequentSets.every((set) => set.has(value));

    if (isInAll) {
      result.push(value);
      addedValues.add(value);
    }
  }

  return result;
}
