export default class Heap<T> {
  constructor(array: T[] = []) {
    throw 'Not implemented!';
  }

  /**
   * Constructs the initial heap structure with a given `array`.
   * @param array The initial array to be used for the heap.
   */
  heapify(array: T[]): void {
    throw 'Not implemented!';
  }

  /**
   * Adds an item to the heap.
   * @param value The item to be added into the heap.
   */
  insert(value: T): void {
    throw 'Not implemented!';
  }

  /**
   * Removes the top of the heap / maximum element.
   * @return The element removed, or undefined if the heap is empty.
   */
  delete(): T | undefined {
    throw 'Not implemented!';
  }

  /**
   * Returns the value of the maximum element.
   * @return The maximum element.
   */
  findMax(): T | undefined {
    throw 'Not implemented!';
  }
}
