export default function maxProductSubArray(numbers: number[]): number {
  // Edge case: if the array is empty, return 0
  if (numbers.length === 0) return 0;

  // Initialize variables to track the maximum and minimum products so far
  let maxSoFar: number = numbers[0];
  let minSoFar: number = numbers[0];
  let result: number = maxSoFar;

  // Iterate through the array starting from the second element
  for (let i = 1; i < numbers.length; i++) {
    let curr: number = numbers[i];

    // Calculate the temporary maximum product
    let tempMax: number = Math.max(curr, maxSoFar * curr, minSoFar * curr);

    // Update the minimum product
    minSoFar = Math.min(curr, maxSoFar * curr, minSoFar * curr);

    // Update the maximum product with the temporary value
    maxSoFar = tempMax;

    // Update the result with the maximum product found so far
    result = Math.max(maxSoFar, result);
  }

  // Return the maximum product of any subarray
  return result;
}
