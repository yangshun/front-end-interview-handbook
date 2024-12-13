export default function arrayProductExcludingCurrent(
  numbers: number[],
): number[] {
  const n = numbers.length;
  const result: number[] = new Array(n).fill(1);

  // Calculate prefix products
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    result[i] = prefix;
    prefix *= numbers[i];
  }

  // Calculate suffix products and final result
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= suffix;
    suffix *= numbers[i];
  }

  // Convert -0 or +0 to normal 0
  for (let i = 0; i < n; i++) {
    if (result[i] === -0) {
      result[i] = 0;
    }
  }

  return result;
}
