export default function sumBy(array: any[], iteratee: Function | string): any {
  let sum = 0,
    found = false;
  if (array.length == 0) {
    return 0;
  }
  // Convert string `iteratee` into function.
  const iterateeFunc =
    typeof iteratee === 'function' ? iteratee : (value: any) => value[iteratee];

  // Iterate through `array` to find the sum.
  for (const value of array) {
    const current = iterateeFunc(value);
    if (current != null) {
      sum += current; // Store the calculated value of the current `result`.
      found = true; // Check if there is any element that fulfills `iteratee`.
    }
  }

  if (!found) {
    return undefined;
  }
  return sum;
}
