// Depth-First Search (DFS) to explore all nodes in a component
function dfs(adjList: number[][], visited: number[], src: number): void {
  // Mark the current node as visited
  visited[src] = 1;

  // Traverse all adjacent nodes
  for (const neighbor of adjList[src]) {
    if (visited[neighbor] === 0) {
      dfs(adjList, visited, neighbor);
    }
  }
}

export default function graphCountConnectedComponents(
  num: number,
  edges: Array<[number, number]>,
): number {
  // Edge case: if there are no nodes, return 0
  if (num === 0) return 0;

  // Initialize the count of connected components
  let components = 0;
  // Create an array to track visited nodes
  const visited = new Array(num).fill(0);
  // Create an adjacency list to represent the graph
  const adjList: number[][] = Array.from({ length: num }, () => []);

  // Build the adjacency list from edges
  for (const [u, v] of edges) {
    adjList[u].push(v);
    adjList[v].push(u);
  }

  // Perform DFS for each unvisited node to count components
  for (let i = 0; i < num; i++) {
    if (visited[i] === 0) {
      components++;
      dfs(adjList, visited, i);
    }
  }

  return components;
}
