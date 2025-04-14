export default function unionWith<T>(
  comparator: (a: T, b: T) => boolean,
  ...arrays: Array<any>
): Array<T> {
  const result: Array<T> = [];
  const compare: Array<T> = [];

  // Push the unique `item` based on `comparator` into `result`.
  arrays.forEach((array) => {
    array.forEach((item: T) => {
      const isUnique =
        result.findIndex((resultItem) => comparator(item, resultItem)) === -1;
      if (isUnique) {
        result.push(item);
      }
    });
  });

  return result;
}
