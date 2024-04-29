export default function minBy<T>(
  array: Array<T>,
  iteratee: (value: T) => any,
): any {
  let result, computed;

  // Iterate through array to find the minimum `result`.
  for (const value of array) {
    const current = iteratee(value);
    // Check whether `computed` is assigned any value yet then compare with `current`, else assign an initial value to `computed` where `current` is not `null`.
    if (current != null && (computed === undefined || current < computed)) {
      result = value;
      computed = current; // Store the computed value of the current `result`.
    }
  }

  return result;
}
