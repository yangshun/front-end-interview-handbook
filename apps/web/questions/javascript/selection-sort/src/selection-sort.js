/**
 * @param {Array<number>} arr The input integer array to be sorted.
 * @return {Array<number>}
 */
export default function selectionSort(arr) {
  // Iterate through the unsorted portion of the array.
  for (let i = 0; i < arr.length; i++) {
    // Initialize index of min element to the start
    // of the unsorted section.
    let minIndex = i;
    // Find the min element.
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    // Swap the found min element with the first element of the
    // unsorted section.
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];

    // By the end of each outer loop iteration,
    // [0, i] are sorted.
  }

  return arr;
}
