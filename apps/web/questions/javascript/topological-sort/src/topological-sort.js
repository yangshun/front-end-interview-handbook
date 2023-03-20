/**
 * @param {Object} graph Node to array of neighboring nodes.
 * @return {Array<string>} A topological traversal of nodes.
 */
export default function topologicalSort(graph) {
  // Initialize a Map object to store each node's incoming and outgoing edges,
  // an array to store the output topological sort order,
  // and a Queue object to store nodes to be processed
  const nodes = new Map();
  const queue = new Queue();
  const order = [];

  // Iterating over all the keys in the input graph object
  // add each key to the "nodes" Map object
  // with properties "in" with value 0
  // and "out" with the value of set of neighboring nodes.
  Object.keys(graph).forEach((node) => {
    nodes.set(node, { in: 0, out: new Set(graph[node]) });
  });

  // Set the Map with the correct `in` values.
  // Iterating over all the keys in the input graph object,
  // for each node increase the `in` property of its neighbor node by 1.
  Object.keys(graph).forEach((node) => {
    graph[node].forEach((neighbor) => {
      nodes.get(neighbor).in += 1;
    });
  });

  // Iterate over the nodes and add all the nodes with `in: 0` to the queue.
  nodes.forEach((value, node) => {
    if (value.in === 0) {
      queue.enqueue(node);
    }
  });

  // While queue is not empty.
  while (queue.length()) {
    // Dequeue a node from the front of the queue.
    const node = queue.dequeue();

    // For each neighbor of this dequeued node decrease its `in` property by 1,
    // if the `in` becomes 0, enqueue the neighbor node.
    nodes.get(node).out.forEach((neighbor) => {
      nodes.get(neighbor).in -= 1;
      if (nodes.get(neighbor).in === 0) {
        queue.enqueue(neighbor);
      }
    });

    // Add the dequeued node to the output array.
    order.push(node);
  }

  // Return topological-ordered array if it has the same length as
  // the number of keys in the graph, otherwise there is a cycle
  // and we return an empty array.
  return order.length === Object.keys(graph).length ? order : [];
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class Queue {
  constructor() {
    this._dummyHead = new Node();
    this._dummyTail = new Node();
    this._dummyHead.prev = this._dummyTail;
    this._dummyTail.next = this._dummyHead;
    this._length = 0;
  }

  /**
   * Adds an item to the back of the queue.
   * @param {*} item The item to be pushed onto the queue.
   * @return {number} The new length of the queue.
   */
  enqueue(item) {
    const node = new Node(item);
    const prevLast = this._dummyTail.next;
    prevLast.prev = node;

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
  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }

    const node = this._dummyHead.prev;
    const newFirst = node.prev;
    this._dummyHead.prev = newFirst;
    newFirst.next = this._dummyHead;
    // Unlink the node to be dequeued.
    node.prev = null;
    node.next = null;
    this._length--;
    return node.value;
  }

  /**
   * Determines if the queue is empty.
   * @return {boolean} `true` if the queue has no items, `false` otherwise.
   */
  isEmpty() {
    return this._length === 0;
  }

  /**
   * Returns the item at the front of the queue without removing it from the queue.
   * @return {*} The item at the front of the queue if it is not empty, `undefined` otherwise.
   */
  front() {
    if (this.isEmpty()) {
      return undefined;
    }

    return this._dummyHead.prev.value;
  }

  /**
   * Returns the item at the back of the queue without removing it from the queue it.
   * @return {*} The item at the back of the queue if it is not empty, `undefined` otherwise.
   */
  back() {
    if (this.isEmpty()) {
      return undefined;
    }

    return this._dummyTail.next.value;
  }

  /**
   * Returns the number of items in the queue.
   * @return {number} The number of items in the queue.
   */
  length() {
    return this._length;
  }
}
