/**
 * @param {Array<number>} arr The input integer array to be sorted.
 * @return {Array<number>}
 */
export default function bubbleSort(arr) {
  // Do multiple iterations over the array.
  for (let i = 0; i < arr.length; i++) {
    // For each iteration, compare every adjacent pairs while ignoring the last i elements that are already sorted.
    for (let j = 0; j < arr.length - i; j++) {
      // If the left element in the pair is larger than the right one, swap their positions to ensure that elements are sorted ascendingly.
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  // Return the sorted array.
  return arr;
}
