class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
  }
}

export default class Stack {
  constructor() {
    this._top = null;
    this._length = 0;
  }

  /**
   * Pushes an item onto the top of the stack.
   * @param {*} item The item to be pushed onto the stack.
   * @return {number} The new length of the stack.
   */
  push(item) {
    const node = new Node(item);
    node.prev = this._top;
    this._top = node;
    this._length++;
    return this._length;
  }

  /**
   * Remove an item at the top of the stack.
   * @return {*} The item at the top of the stack if it is not empty, `undefined` otherwise.
   */
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }

    const node = this._top;
    this._top = node.prev;
    node.prev = null;
    this._length--;
    return node.value;
  }

  /**
   * Determines if the stack is empty.
   * @return {boolean} `true` if the stack has no items, `false` otherwise.
   */
  isEmpty() {
    return this._length === 0;
  }

  /**
   * Returns the item at the top of the stack without removing it from the stack.
   * @return {*} The item at the top of the stack if it is not empty, `undefined` otherwise.
   */
  peek() {
    return this.isEmpty() ? undefined : this._top.value;
  }

  /**
   * Returns the number of items in the stack.
   * @return {number} The number of items in the stack.
   */
  length() {
    return this._length;
  }
}
