export default function uniqBy<T>(
  array: Array<T>,
  iteratee: Function = (value: T) => value,
): Array<T> {
  const result: Array<T> = [];
  const compare: Array<T> = [];

  array.forEach((item) => {
    if (!compare.includes(iteratee(item))) {
      result.push(item);
      compare.push(iteratee(item));
    }
  });
  return result;
}
