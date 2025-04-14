export default function uniqWith<T>(
  array: Array<T>,
  comparator: (a: T, b: T) => boolean,
): Array<T> {
  const result: Array<T> = [];

  array.forEach((item) => {
    // Check if result array contains the same value when compared with `comparator`.
    const isUnique =
      result.findIndex((resultItem) => comparator(item, resultItem)) === -1;
    if (isUnique) {
      result.push(item);
    }
  });

  return result;
}
