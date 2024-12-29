export default function bitCounting(n: number): number[] {
  const ans: number[] = [];

  // Iterate through each number from 0 to n
  for (let i = 0; i <= n; i++) {
    // Count the number of 1s in the binary representation of i
    let count = 0;
    let num = i;

    while (num > 0) {
      count += num & 1; // Add the least significant bit
      num >>= 1; // Right shift to process the next bit
    }

    ans.push(count);
  }

  return ans;
}
