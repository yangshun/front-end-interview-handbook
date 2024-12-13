export default class NumberStream {
  // Max heap to store the smaller half of the numbers
  private maxHeap: number[] = [];

  // Min heap to store the larger half of the numbers
  private minHeap: number[] = [];

  // Adds a number into the data structure
  add(num: number): void {
    // Add the new number to the max heap (lo)
    this.addNumberToHeap(this.maxHeap, num, (a, b) => b - a);

    // Balance the heaps: move the largest number from maxHeap to minHeap
    this.addNumberToHeap(
      this.minHeap,
      this.removeTopFromHeap(this.maxHeap),
      (a, b) => a - b,
    );

    // Ensure that maxHeap has more elements than minHeap if their sizes differ
    if (this.maxHeap.length < this.minHeap.length) {
      this.addNumberToHeap(
        this.maxHeap,
        this.removeTopFromHeap(this.minHeap),
        (a, b) => b - a,
      );
    }
  }

  // Returns the median of the current data stream
  getMedian(): number {
    // If maxHeap has more elements, the median is its top element
    if (this.maxHeap.length > this.minHeap.length) {
      return this.maxHeap[0];
    }
    // Otherwise, the median is the average of the tops of maxHeap and minHeap
    else {
      return (this.maxHeap[0] + this.minHeap[0]) * 0.5;
    }
  }

  // Utility function to add a number to a heap, maintaining the heap property
  private addNumberToHeap(
    heap: number[],
    num: number,
    comparator: (a: number, b: number) => number,
  ): void {
    heap.push(num);
    let i = heap.length - 1;

    while (i > 0) {
      let parent = Math.floor((i - 1) / 2);
      if (comparator(heap[i], heap[parent]) > 0) {
        [heap[i], heap[parent]] = [heap[parent], heap[i]];
        i = parent;
      } else {
        break;
      }
    }
  }

  // Utility function to remove the top element from a heap, maintaining the heap property
  private removeTopFromHeap(heap: number[]): number {
    if (heap.length === 0) return NaN;
    const top = heap[0];
    const last = heap.pop();

    if (heap.length > 0 && last !== undefined) {
      heap[0] = last;
      this.heapify(heap, 0, (a, b) => (heap === this.maxHeap ? b - a : a - b));
    }

    return top;
  }

  // Utility function to maintain the heap property from the given index downwards
  private heapify(
    heap: number[],
    i: number,
    comparator: (a: number, b: number) => number,
  ): void {
    const length = heap.length;
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < length && comparator(heap[left], heap[largest]) > 0) {
      largest = left;
    }

    if (right < length && comparator(heap[right], heap[largest]) > 0) {
      largest = right;
    }

    if (largest !== i) {
      [heap[i], heap[largest]] = [heap[largest], heap[i]];
      this.heapify(heap, largest, comparator);
    }
  }
}
