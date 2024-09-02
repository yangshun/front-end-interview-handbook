export default class Stack<T> {
  _items: Array<T>;

  constructor() {
    this._items = [];
  }

  /**
   * Pushes an item onto the top of the stack.
   */
  push(item: T): number {
    return this._items.push(item);
  }

  /**
   * Remove an item at the top of the stack.
   */
  pop(): T | undefined {
    return this._items.pop();
  }

  /**
   * Determines if the stack is empty.
   */
  isEmpty(): boolean {
    return this.length() === 0;
  }

  /**
   * Returns the item at the top of the stack without removing it from the stack.
   */
  peek(): T | undefined {
    return this.isEmpty() ? undefined : this._items[this.length() - 1];
  }

  /**
   * Returns the number of items in the stack.
   */
  length(): number {
    return this._items.length;
  }
}
