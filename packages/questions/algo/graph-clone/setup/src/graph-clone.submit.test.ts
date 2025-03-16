import graphClone from './graph-clone';
import submitTestCases from './submit.tests.json';

class GraphNode {
  val: number;
  neighbors: GraphNode[];

  constructor(val: number) {
    this.val = val;
    this.neighbors = [];
  }
}

function createGraphFromAdjList(adjList: number[][]): GraphNode | null {
  if (adjList.length === 0) {
    return null;
  }

  const nodes = new Map<number, GraphNode>();

  // Create nodes
  for (let i = 0; i < adjList.length; i++) {
    nodes.set(i, new GraphNode(i));
  }

  // Create edges
  for (let i = 0; i < adjList.length; i++) {
    const node = nodes.get(i)!;
    for (const neighbor of adjList[i]) {
      node.neighbors.push(nodes.get(neighbor)!);
    }
  }

  // Return the head node (node with value 0)
  return nodes.get(0)!;
}

function createAdjListFromGraph(head: GraphNode | null): number[][] {
  if (head === null) {
    return [];
  }

  const adjListMap = new Map<number, number[]>();
  const visited = new Set<GraphNode>();
  const stack: GraphNode[] = [head];

  while (stack.length > 0) {
    const node = stack.pop()!;
    if (visited.has(node)) continue;
    visited.add(node);

    const neighbors: number[] = [];
    for (const neighbor of node.neighbors) {
      neighbors.push(neighbor.val);
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
      }
    }
    adjListMap.set(node.val, neighbors);
  }

  // Convert map to adjacency list
  const maxVal = Math.max(...Array.from(adjListMap.keys()));
  const adjList: number[][] = new Array(maxVal + 1).fill(0).map(() => []);

  Array.from(adjListMap.entries()).forEach(([key, value]) => {
    adjList[key] = value;
  });

  return adjList;
}

describe('graphClone', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`adjList = ${JSON.stringify(example.input[0][1], null, 2)}`, () => {
      const originalGraph = createGraphFromAdjList(example.input[0][1]);
      const clonedGraph = graphClone(originalGraph);

      // Additional check to ensure that the original graph and cloned graph are not the same instance
      expect(Object.is(clonedGraph, originalGraph)).toBe(false);

      expect(createAdjListFromGraph(clonedGraph)).toStrictEqual(example.output);
    });
  });
});
