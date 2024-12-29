export default function findInRotatedArray(
  numbers: number[],
  target: number,
): number {
  // Helper function to find the pivot index
  function findPivotIndex(nums: number[]): number {
    let low = 0;
    let high = nums.length - 1;

    while (low < high) {
      let mid = Math.floor((low + high) / 2);

      // Pivot point is where the rotation happens; find the smallest element
      if (nums[mid] > nums[high]) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return low; // Pivot index where the smallest element is located
  }

  // Helper function to perform binary search
  function binarySearch(
    nums: number[],
    target: number,
    low: number,
    high: number,
  ): number {
    while (low <= high) {
      let mid = Math.floor((low + high) / 2);

      if (nums[mid] === target) {
        return mid;
      } else if (nums[mid] < target) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    return -1; // Target not found
  }

  const n = numbers.length;
  if (n === 0) return -1;

  const pivot = findPivotIndex(numbers);

  // Decide which part of the array to search
  if (numbers[pivot] <= target && target <= numbers[n - 1]) {
    // Search in the right (rotated) half
    return binarySearch(numbers, target, pivot, n - 1);
  } else {
    // Search in the left (non-rotated) half
    return binarySearch(numbers, target, 0, pivot - 1);
  }
}
