export default function unionBy(
  iteratee: Function | string,
  ...arrays: Array<any>
): Array<any> {
  const result: Array<any> = [];
  const compare: Array<any> = [];

  // If `iteratee` is a string, convert into function.
  const iterateeFunc =
    typeof iteratee === 'function' ? iteratee : (value: any) => value[iteratee];

  // Push the unique `item` based on `iteratee` into `result` while keeping the comparison value in `compare`.
  arrays.forEach((array) => {
    array.forEach((item: any) => {
      if (!compare.includes(iterateeFunc(item))) {
        result.push(item);
        compare.push(iterateeFunc(item));
      }
    });
  });

  return result;
}
