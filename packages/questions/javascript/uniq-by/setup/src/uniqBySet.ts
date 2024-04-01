export default function uniqBy<T>(
  array: Array<T>,
  iteratee: Function = (value: T) => value,
): Array<T> {
  const result: Array<T> = [];
  const compare = new Set<T>();

  array.forEach((item) => {
    if (!compare.has(iteratee(item))) {
      result.push(item);
      compare.add(iteratee(item));
    }
  });

  return result;
}
