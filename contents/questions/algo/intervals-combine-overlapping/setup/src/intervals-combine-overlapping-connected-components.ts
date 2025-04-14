const overlap = (a: number[], b: number[]): boolean => {
  return a[0] <= b[1] && b[0] <= a[1];
};

const buildGraph = (intervals: number[][]): Map<number[], number[][]> => {
  let graph: Map<number[], number[][]> = new Map();
  // Iterate through each pair of intervals
  for (let i = 0; i < intervals.length; i++) {
    for (let j = i + 1; j < intervals.length; j++) {
      // If intervals overlap, add an edge in the graph
      if (overlap(intervals[i], intervals[j])) {
        if (graph.has(intervals[i])) {
          graph.get(intervals[i])?.push(intervals[j]);
        } else {
          graph.set(intervals[i], [intervals[j]]);
        }
        if (graph.has(intervals[j])) {
          graph.get(intervals[j])?.push(intervals[i]);
        } else {
          graph.set(intervals[j], [intervals[i]]);
        }
      }
    }
  }
  return graph;
};

const mergeNodes = (nodes: number[][]): number[] => {
  let minStart: number = Infinity;
  let maxEnd: number = -Infinity;
  // Find the minimum start and maximum end among the nodes
  for (let node of nodes) {
    minStart = Math.min(minStart, node[0]);
    maxEnd = Math.max(maxEnd, node[1]);
  }
  return [minStart, maxEnd];
};

const markComponentDFS = (
  start: number[],
  graph: Map<number[], number[][]>,
  nodesInComp: Record<number, number[][]>,
  compNumber: number,
  visited: Set<number[]>,
): void => {
  let stack: number[][] = [start];
  // Perform DFS
  while (stack.length) {
    let node: number[] | undefined = stack.pop();
    if (node && !visited.has(node)) {
      visited.add(node);
      if (nodesInComp[compNumber]) {
        nodesInComp[compNumber].push(node);
      } else {
        nodesInComp[compNumber] = [node];
      }
      // Add all unvisited neighbors to the stack
      if (graph.has(node)) {
        for (let child of graph.get(node) as number[][]) {
          stack.push(child);
        }
      }
    }
  }
};

// Main function to merge all overlapping intervals
export default function mergeOverlappingIntervals(
  intervals: number[][],
): number[][] {
  // Build the graph
  let graph: Map<number[], number[][]> = buildGraph(intervals);
  let nodesInComp: Record<number, number[][]> = {};
  let visited: Set<number[]> = new Set();
  let compNumber: number = 0;
  // Perform DFS to find all connected components
  for (let interval of intervals) {
    if (!visited.has(interval)) {
      markComponentDFS(interval, graph, nodesInComp, compNumber, visited);
      compNumber++;
    }
  }
  let merged: number[][] = [];
  // Merge each connected component
  for (let comp = 0; comp < compNumber; comp++) {
    merged.push(mergeNodes(nodesInComp[comp]));
  }
  return merged;
}
