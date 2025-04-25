/**
 * @param {Object} graph Node to array of neighboring nodes.
 * @param {string} source Source node to start traversal from. Has to be a valid node if graph is non-empty.
 * @return {Array<string>} A BFS-traversed order of nodes.
 */
export default function breadthFirstSearch(graph, source) {
  // If there are no nodes in the graph, just return an empty array
  if (Object.keys(graph).length === 0) {
    return [];
  }

  // Initialize a queue to keep track of nodes to visit.
  const queue = new Queue();
  const visited = new Set();

  // Add the source node to the queue and mark it as visited.
  queue.enqueue(source);
  visited.add(source);

  function traverse() {
    // If the queue is empty, we have visited all nodes, so return the visited nodes.
    if (queue.isEmpty()) {
      return Array.from(visited);
    }

    // Get the next node to visit from the queue.
    const node = queue.dequeue();

    // Visit each neighbor that hasn't been visited before.
    graph[node].forEach((neighbor) => {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.enqueue(neighbor);
      }
    });

    // Recursively call traverse to visit the next node in the queue.
    return traverse();
  }

  // Call traverse to start the traversal.
  return traverse();
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
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  isEmpty() {
    return this.length === 0;
  }

  enqueue(item) {
    const newNode = new Node(item);
    if (this.isEmpty()) {
      this.head = newNode;
    } else if (this.tail) {
      this.tail.next = newNode;
    }
    this.tail = newNode;
    this.length++;
  }

  dequeue() {
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
