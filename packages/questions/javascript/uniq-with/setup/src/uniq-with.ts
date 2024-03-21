export default function uniqWith<T>(
  array: Array<T>,
  comparator: ((a: T, b: T) => boolean) | string = (a, b) => a === b,
): Array<T> {
  const result: Array<T> = [];

  // Ensure `comparator` is a function.
  const comparatorFunc =
    typeof comparator === 'function' ? comparator : (a: any, b: any) => a === b;

  array.forEach((item) => {
    // Check if result array contains the same value when compared with `comparator`.
    const isUnique =
      result.findIndex((resultItem) => comparatorFunc(item, resultItem)) === -1;
    if (isUnique) {
      result.push(item);
    }
  });

  return result;
}
