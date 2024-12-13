export default function bitCounting(n: number): number[] {
  // Initialize the counting answer vector with 0s for all values from 0 to n
  const ans: number[] = new Array(n + 1).fill(0);
  let x = 0;
  let b = 1;

  // Iterate through ranges [0, b), [b, 2b), ..., up to n
  while (b <= n) {
    // Generate values for [b, 2b) based on values from [0, b)
    while (x < b && x + b <= n) {
      ans[x + b] = ans[x] + 1;
      ++x;
    }
    x = 0; // Reset x to start from the beginning
    b <<= 1; // Double the range (b = 2b)
  }

  return ans;
}
