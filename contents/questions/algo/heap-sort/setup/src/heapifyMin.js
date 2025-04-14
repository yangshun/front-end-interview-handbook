function heapifyMin(arr, size, parentIdx) {
  let smallest = parentIdx; // initiate smallest value's index with parent index
  const leftChildIdx = 2 * parentIdx + 1; // calculate index of left child
  const rightChildIdx = 2 * parentIdx + 2; // calculate index of right child
  // set 'smallest' to index with lowest value between parent, left and right child
  if (leftChildIdx < size && arr[leftChildIdx] < arr[smallest]) {
    smallest = leftChildIdx;
  }
  if (rightChildIdx < size && arr[rightChildIdx] < arr[smallest]) {
    smallest = rightChildIdx;
  }
  // if 'smallest' is not the current parent, swap positions with the current parent
  if (smallest !== parentIdx) {
    [arr[parentIdx], arr[smallest]] = [arr[smallest], arr[parentIdx]];
    // continue to recursively heapify the affected subtree
    heapifyMin(arr, size, smallest);
  }
}
