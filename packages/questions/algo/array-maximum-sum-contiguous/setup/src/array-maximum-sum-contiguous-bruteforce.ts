export default function maxSumSubArray(numbers: number[]): number {
  // Initialize the maximum subarray sum to negative infinity
  let maxSubarray = Number.NEGATIVE_INFINITY;

  // Iterate through each element in the array
  for (let i = 0; i < numbers.length; i++) {
    // Initialize current subarray sum to zero
    let currentSubarray = 0;

    // Iterate through the subarray starting from index i
    for (let j = i; j < numbers.length; j++) {
      // Add the current element to the current subarray sum
      currentSubarray += numbers[j];

      // Update the maximum subarray sum if the current subarray sum is larger
      maxSubarray = Math.max(maxSubarray, currentSubarray);
    }
  }

  // Return the maximum subarray sum found
  return maxSubarray;
}
