export default function maxProductSubArray(numbers: number[]): number {
  // Get the size of the input array
  const n = numbers.length;

  // Initialize variables to store prefix product, suffix product, and maximum product
  let pre = 1; // Stores the product of all elements up to the current element (inclusive)
  let suff = 1; // Stores the product of all elements from the end up to the current element (inclusive)
  let maxProduct = Number.NEGATIVE_INFINITY; // Tracks the maximum product of any subarray found so far

  // Iterate through the array
  for (let i = 0; i < n; i++) {
    // Handle the case where the previous product was 0 (requires reset to 1)
    pre = pre === 0 ? numbers[i] : pre * numbers[i];

    // Handle the case where the previous product was 0 (requires reset to 1)
    suff = suff === 0 ? numbers[n - i - 1] : suff * numbers[n - i - 1];

    // Update the maximum product considering both prefix and suffix products
    maxProduct = Math.max(maxProduct, Math.max(pre, suff));
  }

  // Return the maximum product of any subarray found
  return maxProduct;
}
