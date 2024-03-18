export default function minBy(
  array: Array<any>,
  iteratee: Function | string,
): any {
  let result: any, computed: any;

  // Convert string iteratee into function.
  const iterateeFunc: Function =
    typeof iteratee === 'function' ? iteratee : (value: any) => value[iteratee];

  // Iterate through array to find the minimum `result`.
  for (const value of array) {
    const current: any = iterateeFunc(value);
    if (current != null && (current < computed || computed === undefined)) {
      computed = current; // Store the calculated value of the current `result`.
      result = value;
    }
  }
  return result;
}
