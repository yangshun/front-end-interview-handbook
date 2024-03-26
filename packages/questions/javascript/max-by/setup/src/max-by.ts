export default function maxBy(array: Array<any>, iteratee: Function): any {
  let result: any, computed: any;

  // Iterate through array to find the maximum `result`.
  for (const value of array) {
    const current: any = iteratee(value);
    if (current != null && (current > computed || computed === undefined)) {
      computed = current; // Store the calculated value of the current `result`.
      result = value;
    }
  }
  return result;
}
