export default function maxProductSubArray(numbers: number[]): number {
  // Edge case: if the array is empty, return 0
  if (numbers.length === 0) return 0;

  // Initialize the result with the first element
  let result = numbers[0];

  // Iterate through each element as the starting point
  for (let i = 0; i < numbers.length; i++) {
    // Initialize accumulator for the product of subarrays
    let accu = 1;

    // Iterate through subarrays starting from index i
    for (let j = i; j < numbers.length; j++) {
      // Multiply the current element
      accu *= numbers[j];

      // Update the result if the current product is larger
      result = Math.max(result, accu);
    }
  }

  // Return the maximum product found
  return result;
}
