export default function arrayProductExcludingCurrent(
  numbers: number[],
): number[] {
  const n = numbers.length;

  // Create prefix and suffix arrays
  const prefix: number[] = new Array(n).fill(1);
  const suffix: number[] = new Array(n).fill(1);
  const result: number[] = new Array(n).fill(1);

  // Step 1: Fill prefix array
  prefix[0] = 1; // First element has no elements to its left
  for (let i = 1; i < n; i++) {
    prefix[i] = prefix[i - 1] * numbers[i - 1];
  }

  // Step 2: Fill suffix array
  suffix[n - 1] = 1; // Last element has no elements to its right
  for (let i = n - 2; i >= 0; i--) {
    suffix[i] = suffix[i + 1] * numbers[i + 1];
  }

  // Step 3: Calculate result array by combining prefix and suffix
  for (let i = 0; i < n; i++) {
    result[i] = prefix[i] * suffix[i];
  }

  // Step 4: Convert -0 to 0 if needed
  for (let i = 0; i < n; i++) {
    if (result[i] === -0) {
      result[i] = 0;
    }
  }

  return result;
}
