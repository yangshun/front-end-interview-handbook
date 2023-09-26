export default function intersectionBy<T, R>(
  iteratee: (value: T) => R,
  ...arrays: Array<Array<T>>
): Array<T> {
  if (arrays.length === 0) {
    return [];
  }

  const mappedArrays = arrays.map((array) => array.map(iteratee));
  const intersectedValues = mappedArrays[0].filter((value) => {
    return mappedArrays.every((mappedArray) => mappedArray.includes(value));
  });

  return intersectedValues.map((value) => {
    const index = mappedArrays[0].indexOf(value);
    return arrays[0][index];
  });
}
