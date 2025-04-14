export default function maxBy(array: Array<any>, iteratee: Function): any {
  let result: any, computed: any;

  // Iterate through array to find the maximum `result`.
  for (const value of array) {
    const current: any = iteratee(value);
    // Check whether `computed` is assigned any value yet then compare with `current`, else assign an initial value to `computed` where `current` is not `null`.
    if (current != null && (computed === undefined || current > computed)) {
      computed = current; // Store the calculated value of the current `result`.
      result = value;
    }
  }
  return result;
}
