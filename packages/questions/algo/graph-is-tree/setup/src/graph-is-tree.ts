// Create an adjacency list to represent the graph
function createAdjacencyList(
  num: number,
  edges: Array<[number, number]>,
): Map<number, number[]> {
  const adjacencyList = new Map<number, number[]>();
  for (let i = 0; i < num; i++) {
    adjacencyList.set(i, []);
  }
  for (const edge of edges) {
    adjacencyList.get(edge[0])!.push(edge[1]);
    adjacencyList.get(edge[1])!.push(edge[0]);
  }
  return adjacencyList;
}

// Depth First Search (DFS) function
function dfs(
  node: number,
  parent: number,
  adjacencyList: Map<number, number[]>,
  seen: Set<number>,
): boolean {
  if (seen.has(node)) return false;
  seen.add(node);
  for (const neighbor of adjacencyList.get(node)!) {
    if (parent !== neighbor) {
      const result = dfs(neighbor, node, adjacencyList, seen);
      if (!result) return false;
    }
  }
  return true;
}

// Main function to check if a given graph is a valid tree
export default function graphIsTree(
  num: number,
  edges: Array<[number, number]>,
): boolean {
  if (edges.length !== num - 1) {
    return false;
  }

  const adjacencyList = createAdjacencyList(num, edges);
  const seen = new Set<number>();

  // We return true if no cycles were detected,
  // AND the entire graph has been reached.
  return dfs(0, -1, adjacencyList, seen) && seen.size === num;
}
