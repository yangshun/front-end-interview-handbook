export default function uniqBy<T>(
  array: Array<any>,
  iteratee: Function | string = (value: any) => value,
): Array<T> {
  const result: Array<T> = [];
  const compare: Array<T> = [];

  // Convert string `iteratee` into function.
  const iterateeFunc =
    typeof iteratee === 'function' ? iteratee : (value: any) => value[iteratee];

  array.forEach((item) => {
    if (
      (iterateeFunc(item) != null || item == array[0]) &&
      !compare.includes(iterateeFunc(item))
    ) {
      result.push(item);
      compare.push(iterateeFunc(item));
    }
  });
  return result;
}
