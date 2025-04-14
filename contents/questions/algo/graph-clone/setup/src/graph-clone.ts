class GraphNode {
  val: number;
  neighbors: GraphNode[];

  constructor(val?: number, neighbors?: GraphNode[]) {
    this.val = val ?? 0;
    this.neighbors = neighbors ?? [];
  }
}

export default function graphClone(node: GraphNode | null): GraphNode | null {
  if (node === null) {
    return null;
  }

  const visited = new Map<GraphNode, GraphNode>();

  function dfs(node: GraphNode): GraphNode {
    // If the node was already visited before
    // Return the clone from the visited dictionary
    if (visited.has(node)) {
      return visited.get(node)!;
    }

    // Create a clone for the given node
    // Note that we don't have cloned neighbors as of now, hence []
    let cloneNode = new GraphNode(node.val, []);
    // The key is original node and value being the clone node
    visited.set(node, cloneNode);

    // Iterate through each neighbor and push the clone of the neighbor
    // to the neighbors of the cloned node
    for (let neighbor of node.neighbors) {
      cloneNode.neighbors.push(dfs(neighbor));
    }

    return cloneNode;
  }

  return dfs(node);
}
