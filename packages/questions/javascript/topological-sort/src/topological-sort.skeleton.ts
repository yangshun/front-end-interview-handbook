export default function topologicalSort(
  graph: Record<string, Array<string>>,
): Array<string> {
  throw 'Not implemented!';
}

// `Queue` data structure is provided in case you want to use it.
class QueueNode<T> {
  next: QueueNode<T> | null;
  prev: QueueNode<T> | null;

  constructor() {
    this.next = null;
    this.prev = null;
  }
}
class QueueNodeWithValue<T> extends QueueNode<T> {
  value: T;

  constructor(value: T) {
    super();
    this.value = value;
  }
}

class Queue<T> {
  _dummyHead: QueueNode<T>;
  _dummyTail: QueueNode<T>;
  _length: number;

  constructor() {
    this._dummyHead = new QueueNode();
    this._dummyTail = new QueueNode();
    this._length = 0;
  }

  /**
   * Adds an item to the back of the queue.
   * @param {T} item The item to be pushed onto the queue.
   * @return {number} The new length of the queue.
   */
  enqueue(item: T): number {
    const node = new QueueNodeWithValue(item);
    const prevLast = this._dummyTail.next;
    prevLast!.prev = node;

    node.next = prevLast;
    node.prev = this._dummyTail;
    this._dummyTail.next = node;
    this._length++;
    return this._length;
  }

  /**
   * Remove an item from the front of the queue.
   * @return {*} The item at the front of the queue if it is not empty, `undefined` otherwise.
   */
  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const node = this._dummyHead.prev;
    const newFirst = node!.prev;
    this._dummyHead.prev = newFirst;
    newFirst!.next = this._dummyHead;
    // Unlink the node to be dequeued.
    node!.prev = null;
    node!.next = null;
    this._length--;
    return (node as QueueNodeWithValue<T>).value;
  }

  /**
   * Determines if the queue is empty.
   * @return {boolean} `true` if the queue has no items, `false` otherwise.
   */
  isEmpty(): boolean {
    return this._length === 0;
  }

  /**
   * Returns the item at the front of the queue without removing it from the queue.
   * @return {*} The item at the front of the queue if it is not empty, `undefined` otherwise.
   */
  front(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    return (this._dummyHead!.prev as QueueNodeWithValue<T>).value;
  }

  /**
   * Returns the item at the back of the queue without removing it from the queue it.
   * @return {*} The item at the back of the queue if it is not empty, `undefined` otherwise.
   */
  back(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    return (this._dummyTail!.next as QueueNodeWithValue<T>).value;
  }

  /**
   * Returns the number of items in the queue.
   * @return {number} The number of items in the queue.
   */
  length(): number {
    return this._length;
  }
}
