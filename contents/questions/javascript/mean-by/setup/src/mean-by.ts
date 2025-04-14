export default function meanBy<T>(
  array: Array<T>,
  iteratee: (value: T) => number | undefined,
): number {
  let sum = 0,
    found = false;

  // Iterate through array to find the mean.
  for (const value of array) {
    const current = iteratee(value);
    if (current != null) {
      sum += current; // Store the calculated value of the current `result`.
      found = true; // To indicate if there exists a valid value that fulfills `iteratee`.
    }
  }

  if (!found) {
    return NaN;
  }
  return sum / array.length;
}
