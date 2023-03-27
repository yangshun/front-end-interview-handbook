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
