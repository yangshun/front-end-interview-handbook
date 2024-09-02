export default function topologicalSort(
  graph: Record<string, Array<string>>,
): Array<string> {
  // Initialize a Map object to store each node's incoming and outgoing edges,
  // an array to store the output topological sort order,
  // and a Queue object to store nodes to be processed
  const nodes = new Map<string, { in: number; out: Set<string> }>();
  const queue = new Queue<string>();
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
      nodes.get(neighbor)!.in += 1;
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
    const node = queue.dequeue()!;

    // For each neighbor of this dequeued node decrease its `in` property by 1,
    // if the `in` becomes 0, enqueue the neighbor node.
    nodes.get(node)?.out.forEach((neighbor) => {
      nodes.get(neighbor)!.in -= 1;
      if (nodes.get(neighbor)!.in === 0) {
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

class Node<T> {
  value: T | undefined;
  next: Node<T> | null;
  prev: Node<T> | null;

  constructor(value?: T) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class Queue<T> {
  _dummyHead: Node<T>;
  _dummyTail: Node<T>;
  _length: number;

  constructor() {
    this._dummyHead = new Node<T>();
    this._dummyTail = new Node<T>();
    this._dummyHead.prev = this._dummyTail;
    this._dummyTail.next = this._dummyHead;
    this._length = 0;
  }

  /**
   * Adds an item to the back of the queue.
   */
  enqueue(item: T) {
    const node = new Node(item);
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
    return node!.value;
  }

  /**
   * Determines if the queue is empty.
   */
  isEmpty(): boolean {
    return this._length === 0;
  }

  /**
   * Returns the item at the front of the queue without removing it from the queue.
   */
  front(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    return this._dummyHead.prev!.value;
  }

  /**
   * Returns the item at the back of the queue without removing it from the queue it.
   */
  back(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    return this._dummyTail.next!.value;
  }

  /**
   * Returns the number of items in the queue.
   * @return {number} The number of items in the queue.
   */
  length(): number {
    return this._length;
  }
}
