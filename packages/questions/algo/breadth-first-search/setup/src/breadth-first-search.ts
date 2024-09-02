export default function breadthFirstSearch(
  graph: Record<string, Array<string>>,
  source: string,
): Array<string> {
  // If there are no nodes in the graph, just return an empty array
  if (Object.keys(graph).length === 0) {
    return [];
  }

  // Create a queue to store the nodes to be visited.
  // Add the root node since we're doing a level-order BFS.
  const queue = new Queue<string>();
  queue.enqueue(source);

  // Initialize a set that tracks visited nodes.
  const visited = new Set<string>();

  // While there are nodes to visit.
  while (!queue.isEmpty()) {
    // Dequeue the node at the front of the queue.
    const node = queue.dequeue()!;

    // Mark the node as visited.
    visited.add(node);

    // Enqueue the neighbors of the current node.
    graph[node].forEach((neighbor) => {
      // Skip nodes that have already been visited.
      if (visited.has(neighbor)) {
        return;
      }

      queue.enqueue(neighbor);
    });
  }

  // The visited nodes is the traversal order.
  return Array.from(visited);
}

/*  Auxiliary classes */

/**
 * A Queue class with O(1) enqueue and dequeue is provided for you.
 * You can use it directly should you wish to.
 *
 * Example usage:
 * const q = new Queue();
 * q.enqueue('a');
 * q.enqueue('b');
 * q.dequeue(); //'a'
 * q.isEmpty(); // False
 */
class Node<T> {
  value: T;
  next: Node<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

class Queue<T> {
  head: Node<T> | null;
  tail: Node<T> | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  isEmpty(): boolean {
    return this.length === 0;
  }

  enqueue(item: T): void {
    const newNode = new Node(item);
    if (this.isEmpty()) {
      this.head = newNode;
    } else if (this.tail) {
      this.tail.next = newNode;
    }
    this.tail = newNode;
    this.length++;
  }

  dequeue(): T | null {
    if (this.isEmpty() || !this.head) {
      return null;
    } else {
      const removedNode = this.head;
      this.head = this.head.next;
      removedNode.next = null;
      this.length--;
      if (this.isEmpty()) {
        this.tail = null;
      }
      return removedNode.value;
    }
  }
}
