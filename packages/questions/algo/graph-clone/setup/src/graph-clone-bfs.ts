class GraphNode {
  val: number;
  neighbors: GraphNode[];

  constructor(val?: number, neighbors?: GraphNode[]) {
    this.val = val ?? 0;
    this.neighbors = neighbors ?? [];
  }
}

export default function graphClone(node: GraphNode | null): GraphNode | null {
  if (!node) {
    return node;
  }

  // Dictionary to save the visited node and it's respective clone
  // as key and value respectively. This helps to avoid cycles
  let visited: Map<GraphNode, GraphNode> = new Map();

  // Put the first node in the queue
  let queue: GraphNode[] = [];
  queue.push(node);

  // Clone the node and put it in the visited dictionary
  visited.set(node, new GraphNode(node.val, []));

  // Start BFS traversal
  while (queue.length > 0) {
    // Pop a node from the from the front of the queue
    let node_: GraphNode = queue.shift()!;

    // Iterate through all the neighbors of the node
    for (let neighbor of node_.neighbors) {
      if (!visited.has(neighbor)) {
        // Clone the neighbor and put in the visited, if not present already
        visited.set(neighbor, new GraphNode(neighbor.val, []));
        // Add the newly encountered node to the queue
        queue.push(neighbor);
      }

      // Add the clone of the neighbor to the neighbors of the cloned node
      visited.get(node_)?.neighbors.push(visited.get(neighbor) as GraphNode);
    }
  }

  // Return the clone of the node from visited
  return visited.get(node) ?? null;
}
