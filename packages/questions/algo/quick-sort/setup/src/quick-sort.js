/**
 * Partitions an array into two parts according to a pivot.
 * @param {Array<number>} arr The array to be sorted.
 * @param {number} lo Starting index of the array to partition
 * @param {number} hi Ending index (inclusive) of the array to partition
 * @return {number} The pivot index that was chosen.
 */
function partition(arr, lo, hi) {
  const pivot = arr[hi];
  let i = lo - 1;

  for (let j = lo; j < hi; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  if (arr[hi] < arr[i + 1]) {
    [arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]];
  }

  return i + 1;
}

/**
 * Sorts an array of elements in-place.
 * @param {Array<number>} arr The array to be sorted
 * @param {number} lo Starting index of the array to sort
 * @param {number} hi Ending index (inclusive) of the array to sort
 */
function quickSortImpl(arr, lo, hi) {
  if (lo >= hi) {
    return;
  }

  const pivot = partition(arr, lo, hi);
  quickSortImpl(arr, lo, pivot - 1);
  quickSortImpl(arr, pivot + 1, hi);
}

/**
 * Sorts an array of elements
 * @param {number[]} arr The array to be sorted.
 * @return {number[]}
 */
export default function quickSort(arr) {
  quickSortImpl(arr, 0, arr.length - 1);
  return arr;
}
