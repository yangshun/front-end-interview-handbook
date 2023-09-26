export default function intersectionWith<T>(
  comparator: (a: T, b: T) => boolean,
  ...arrays: Array<Array<T>>
): Array<T> {
  if (!arrays.length) {
    return [];
  }

  const firstArray = arrays[0];

  // Perform intersection
  return firstArray.filter((value) =>
    arrays
      .slice(1)
      .every((arr) => arr.some((otherValue) => comparator(value, otherValue))),
  );
}
