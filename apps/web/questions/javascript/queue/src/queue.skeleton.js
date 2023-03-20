export default class Queue {
  constructor() {}

  /**
   * Adds an item to the back of the queue.
   * @param {*} item The item to be pushed onto the queue.
   * @return {number} The new length of the queue.
   */
  enqueue(item) {}

  /**
   * Remove an item from the front of the queue.
   * @return {*} The item at the front of the queue if it is not empty, `undefined` otherwise.
   */
  dequeue() {}

  /**
   * Determines if the queue is empty.
   * @return {boolean} `true` if the queue has no items, `false` otherwise.
   */
  isEmpty() {}

  /**
   * Returns the item at the front of the queue without removing it from the queue.
   * @return {*} The item at the front of the queue if it is not empty, `undefined` otherwise.
   */
  front() {}

  /**
   * Returns the item at the back of the queue without removing it from the queue it.
   * @return {*} The item at the back of the queue if it is not empty, `undefined` otherwise.
   */
  back() {}

  /**
   * Returns the number of items in the queue.
   * @return {number} The number of items in the queue.
   */
  length() {}
}
