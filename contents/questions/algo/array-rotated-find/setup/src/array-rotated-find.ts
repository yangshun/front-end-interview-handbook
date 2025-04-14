export default function findInRotatedArray(
  numbers: number[],
  target: number,
): number {
  let low: number = 0;
  let high: number = numbers.length - 1;

  while (low <= high) {
    let mid: number = Math.floor((low + high) / 2);

    // Check if the middle element is the target value
    if (numbers[mid] === target) {
      return mid;
    }

    // Determine if the left half of the array is sorted
    if (numbers[low] <= numbers[mid]) {
      // Check if the target is within the sorted left half
      if (numbers[low] <= target && target <= numbers[mid]) {
        // If target is in the left half, adjust the search range to exclude the right half
        high = mid - 1;
      } else {
        // If target is not in the left half, adjust to search in the right half
        low = mid + 1;
      }
    } else {
      // The right half must be sorted
      // Check if the target is within the sorted right half
      if (target <= numbers[high] && target >= numbers[mid]) {
        // If target is in the right half, adjust the search range to exclude the left half
        low = mid + 1;
      } else {
        // If target is not in the right half, adjust to search in the left half
        high = mid - 1;
      }
    }
  }

  // If we exit the loop, it means the target was not found in the array
  // Return -1 to indicate that the target is not present
  return -1;
}
