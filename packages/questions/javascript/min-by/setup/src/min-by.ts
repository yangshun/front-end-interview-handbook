export default function minBy<T>(
  array: Array<T>,
  iteratee: (value: T) => any,
): any {
  let result, computed;

  // Iterate through array to find the minimum `result`.
  for (const value of array) {
    const currComputed = iteratee(value);
    if (
      currComputed != null &&
      (currComputed < computed || computed === undefined)
    ) {
      result = value;
      computed = currComputed; // Store the computed value of the current `result`.
    }
  }

  return result;
}
