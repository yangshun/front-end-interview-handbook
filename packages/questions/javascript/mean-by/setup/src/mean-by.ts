export default function meanBy(
  array: Array<any>,
  iteratee: Function | string,
): number {
  let sum = 0,
    found = false;

  // Convert string iteratee into function.
  const iterateeFunc: Function =
    typeof iteratee === 'function' ? iteratee : (value: any) => value[iteratee];

  // Iterate through array to find the mean.
  for (const value of array) {
    const current: any = iterateeFunc(value);
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
