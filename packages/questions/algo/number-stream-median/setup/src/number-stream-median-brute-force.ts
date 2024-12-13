export default class NumberStream {
  // Array to store the numbers
  private store: number[] = [];

  // Adds a number into the data structure
  add(num: number): void {
    // Add the number to the array
    this.store.push(num);
  }

  // Returns the median of the current number stream
  getMedian(): number {
    // Sort the array
    this.store.sort((a, b) => a - b);

    const n = this.store.length;

    // Compute the median
    if (n % 2 === 1) {
      // If the size is odd, return the middle element
      return this.store[Math.floor(n / 2)];
    }

    // If the size is even, return the average of the two middle elements
    const mid1 = this.store[n / 2 - 1];
    const mid2 = this.store[n / 2];
    return (mid1 + mid2) * 0.5;
  }
}
