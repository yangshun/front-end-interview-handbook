export default class Stack<T> {
  constructor() {}

  /**
   * Pushes an item onto the top of the stack.
   * @param {T} item The item to be pushed onto the stack.
   * @return {number} The new length of the stack.
   */
  push(item: T): number {
    throw 'Not implemented!';
  }

  /**
   * Remove an item at the top of the stack.
   * @return {T | undefined} The item at the top of the stack if it is not empty, `undefined` otherwise.
   */
  pop(): T | undefined {
    throw 'Not implemented!';
  }

  /**
   * Determines if the stack is empty.
   * @return {boolean} `true` if the stack has no items, `false` otherwise.
   */
  isEmpty(): boolean {
    throw 'Not implemented!';
  }

  /**
   * Returns the item at the top of the stack without removing it from the stack.
   * @return {T | undefined} The item at the top of the stack if it is not empty, `undefined` otherwise.
   */
  peek(): T | undefined {
    throw 'Not implemented!';
  }

  /**
   * Returns the number of items in the stack.
   * @return {number} The number of items in the stack.
   */
  length(): number {
    throw 'Not implemented!';
  }
}
