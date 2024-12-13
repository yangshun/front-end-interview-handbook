export default function smallestInRotatedArray(numbers: number[]): number {
  // Initialize variables to store starting and ending indices for searching
  let low = 0;
  let high = numbers.length - 1;

  // Initialize a variable to store the minimum element found so far
  let ans = Number.MAX_SAFE_INTEGER;

  // Iterate while the search space (low <= high) exists
  while (low <= high) {
    // Calculate the middle index (avoiding potential overflow)
    const mid = Math.floor((low + high) / 2);

    // Check if the left part of the array is sorted (nums[low] <= nums[mid])
    if (numbers[low] <= numbers[mid]) {
      // If left part is sorted, the minimum element could be there
      ans = Math.min(ans, numbers[low]); // Update minimum if a smaller element is found

      // Since the left part is sorted, eliminate it from the search space
      low = mid + 1;
    } else {
      // If the left part is not sorted, the right part must be sorted
      // The minimum element must be in the right half of the array
      ans = Math.min(ans, numbers[mid]); // Update minimum if a smaller element is found

      // Eliminate the right half from the search space
      high = mid - 1;
    }
  }

  // After the loop, the minimum element is stored in 'ans'
  return ans;
}
