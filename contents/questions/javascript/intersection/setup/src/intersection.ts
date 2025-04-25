export default function intersection<T>(...arrays: Array<Array<T>>): Array<T> {
  if (arrays.length === 0) {
    return [];
  }

  if (arrays.length === 1) {
    const uniqueSet = new Set<T>();
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

  const subsequentSets = arrays.slice(1).map((arr) => new Set<T>(arr));
  const result = [];
  const addedValues = new Set<T>();

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
