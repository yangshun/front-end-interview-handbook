/**
 * Performs a depth-first search to detect cycles in the graph.
 * @param node - The current node being visited.
 * @param adj - The adjacency list representing the graph.
 * @param visit - Array to track visited nodes.
 * @param inStack - Array to track nodes in the current recursion stack.
 * @returns True if a cycle is detected, false otherwise.
 */
function dfs(
  node: number,
  adj: number[][],
  visit: boolean[],
  inStack: boolean[],
): boolean {
  // If the node is already in the stack, we have a cycle.
  if (inStack[node]) {
    return true;
  }
  // If the node is already visited, no need to visit it again.
  if (visit[node]) {
    return false;
  }
  // Mark the current node as visited and part of the current recursion stack.
  visit[node] = true;
  inStack[node] = true;
  // Visit all the neighbors of the current node.
  for (const neighbor of adj[node]) {
    if (dfs(neighbor, adj, visit, inStack)) {
      return true;
    }
  }
  // Remove the node from the recursion stack.
  inStack[node] = false;
  return false;
}

/**
 * Determines if it is possible to finish all courses given the prerequisites.
 * @param courses - The total number of courses.
 * @param prerequisites - The list of prerequisite pairs.
 * @returns True if it is possible to finish all courses, false otherwise.
 */
export default function canCompleteCourse(
  courses: number,
  prerequisites: number[][],
): boolean {
  const adj: number[][] = Array.from({ length: courses }, () => []);

  // Build the adjacency list from the prerequisites.
  for (const prerequisite of prerequisites) {
    adj[prerequisite[1]].push(prerequisite[0]);
  }

  const visit: boolean[] = new Array(courses).fill(false);
  const inStack: boolean[] = new Array(courses).fill(false);

  // Perform DFS for each course to check for cycles.
  for (let i = 0; i < courses; i++) {
    if (dfs(i, adj, visit, inStack)) {
      return false;
    }
  }

  return true;
}
