export default class Heap<T> {
  values: T[];

  constructor(array: T[] = []) {
    this.values = [];
    if (array.length > 0) {
      this.heapify(array);
    }
  }

  /**
   * Constructs the initial heap structure with a given `array`.
   * @param array The initial array to be used for the heap.
   */
  heapify(array: T[]): void {
    this.values = [];
    array.forEach((element) => this.insert(element));
  }

  /**
   * Adds an item to the heap.
   * @param value The item to be added into the heap.
   */
  insert(value: T): void {
    this.values.push(value);
    let index = this.values.length - 1;
    let parentIndex = Math.floor((index - 1) / 2);

    // Move up the newly added value until the heap property is restored.
    while (index > 0 && this.values[parentIndex] < this.values[index]) {
      [this.values[parentIndex], this.values[index]] = [
        this.values[index],
        this.values[parentIndex],
      ];
      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
    }
  }

  /**
   * Removes the top of the heap / maximum element.
   * @return The element removed, or undefined if the heap is empty.
   */
  delete(): T | undefined {
    if (this.values.length === 0) {
      return undefined;
    }
    const max = this.values[0];
    const last = this.values.pop();
    if (this.values.length > 0 && last !== undefined) {
      this.values[0] = last;
      let index = 0;

      // Restore heap property by moving down the root value.
      while (true) {
        const left = 2 * index + 1;
        const right = 2 * index + 2;
        let largest = index;

        // If left child exists and is larger than the current largest, replace largest with value of left child.
        if (
          left < this.values.length &&
          this.values[left] > this.values[largest]
        ) {
          largest = left;
        }

        // If right child exists and is larger than the current largest, replace largest with value of right child.
        if (
          right < this.values.length &&
          this.values[right] > this.values[largest]
        ) {
          largest = right;
        }

        if (largest === index) {
          break; // The current root is already the largest, heap property is satisfied.
        }

        // Swap the position such that the largest value is above `index`, following the heap property.
        [this.values[index], this.values[largest]] = [
          this.values[largest],
          this.values[index],
        ];
        index = largest;
      }
    }
    return max;
  }

  /**
   * Returns the value of the maximum element.
   * @return The maximum element.
   */
  findMax(): T | undefined {
    return this.values.length > 0 ? this.values[0] : undefined;
  }
}
