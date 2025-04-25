export default class LinkedList<T> {
  constructor() {
    throw 'Not implemented!';
  }

  /**
   * Adds an item to the head of the linked list.
   * @param {T} value The item to be added to the head of the list.
   */
  insertHead(value: T): void {
    throw 'Not implemented!';
  }

  /**
   * Adds an item to the tail of the linked list.
   * @param {T} value The item to be added to the tail of the list.
   */
  insertTail(value: T): void {
    throw 'Not implemented!';
  }

  /**
   * Remove the item in the given index and return its value or `undefined` if index is out of bounds.
   * @param {number} i The index of the item to be removed.
   * @return {T | undefined} The value at index i if it exists, `undefined` otherwise.
   */
  remove(i: number): T | undefined {
    throw 'Not implemented!';
  }

  /**
   * Return the value of the item at the given index or `undefined` if index is out of bounds.
   * @param {number} i The index of the value to retrieve.
   * @return {T | undefined} The value at index i if it exists, `undefined` otherwise.
   */
  get(i: number): T | undefined {
    throw 'Not implemented!';
  }

  /**
   * Return an array containing all the values in the linked list from head to tail.
   * @return {Array<T>} The array of all values in the linked list from head to tail.
   */
  toArray(): Array<T> {
    throw 'Not implemented!';
  }

  /**
   * Return the number of elements in the linked list.
   * @return {number} The length of the list.
   */
  length(): number {
    throw 'Not implemented!';
  }
}
