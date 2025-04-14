/**
 * @param {Array<number>} arr The input integer array to be searched.
 * @param {number} target The target integer to search within the array.
 * @return {number} The index of target element in the array, or -1 if not found.
 */
export default function binarySearch(arr, target) {
  // Initialize the left and right indices of the array
  let left = 0;
  let right = arr.length - 1;

  // Keep searching until the left and right indices meet.
  while (left <= right) {
    // Calculate the mid index to retrieve the mid element later.
    const mid = Math.floor((left + right) / 2);

    if (target < arr[mid]) {
      // If the target element is less than the middle element,
      // search the left half of the array.
      // Adjust the right index so the next loop iteration
      // searches the left side.
      right = mid - 1;
    } else if (target > arr[mid]) {
      // If the target element is greater than the middle element,
      // search the right half of the array.
      // Adjust the left index so the next loop iteration
      // searches the left side.
      left = mid + 1;
    } else {
      // If the target element is equal to the middle element,
      // return the index of the middle element.
      return mid;
    }
  }

  // If the element is not found, return -1.
  return -1;
}
