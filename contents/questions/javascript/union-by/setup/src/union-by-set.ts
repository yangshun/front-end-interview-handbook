export default function unionBy<T>(
  iteratee: (value: T) => any,
  ...arrays: Array<any>
): Array<T> {
  const result: Array<T> = [];
  const compare = new Set<number>();

  // Push the unique `item` based on `iteratee` into `result` while keeping the comparison value in `compare`.
  arrays.forEach((array) => {
    array.forEach((item: T) => {
      if (!compare.has(iteratee(item))) {
        result.push(item);
        compare.add(iteratee(item));
      }
    });
  });

  return result;
}
