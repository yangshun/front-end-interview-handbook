/**
 * @param {Object} graph Node to array of neighboring nodes.
 * @param {string=} source Source node to start traversal from. Has to be a valid node if graph is non-empty.
 * @return {Array<string>} A BFS-traversed order of nodes.
 */
export default function breadthFirstSearch(graph, source) {
  // If there are no nodes in the graph, just return an empty array
  if (Object.keys(graph).length === 0) {
    return [];
  }

  // Create a queue to store the nodes to be visited.
  // Add the root node since we're doing a level-order BFS.
  const queue = new Queue();
  queue.enqueue(source);

  // Initialize a set that tracks visited nodes.
  const visited = new Set();

  // While there are nodes to visit
  while (!queue.isEmpty()) {
    // Dequeue the node at the front of the queue
    const node = queue.dequeue();

    // Skip nodes that have already been visited
    if (visited.has(node)) {
      continue;
    }

    // Mark the node as visited
    visited.add(node);

    // Enqueue the neighbors of the current node
    graph[node].forEach((neighbor) => {
      queue.enqueue(neighbor);
    });
  }

  // The visited nodes is the traversal order.
  return Array.from(visited);
}
