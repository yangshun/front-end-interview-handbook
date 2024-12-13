export default function maxSumSubArray(numbers: number[]): number {
  let currentSum = 0;
  let maxSum = -Infinity; // Use -Infinity to represent the smallest possible number

  for (let num of numbers) {
    // Update current sum, considering starting a new subarray if necessary
    currentSum = Math.max(num, currentSum + num);
    // Update max sum if current sum is larger
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}
