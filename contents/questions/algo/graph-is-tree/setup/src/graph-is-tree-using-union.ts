// Union-Find data structure with path compression and union by size
function createUnionFind(num: number) {
  const parent: number[] = new Array(num);
  const size: number[] = new Array(num);

  for (let node = 0; node < num; node++) {
    parent[node] = node;
    size[node] = 1;
  }

  // Find method with path compression
  const find = (A: number): number => {
    let root = A;
    while (parent[root] !== root) {
      root = parent[root];
    }
    while (A !== root) {
      const oldRoot = parent[A];
      parent[A] = root;
      A = oldRoot;
    }
    return root;
  };

  // Union method with union by size optimization
  const union = (A: number, B: number): boolean => {
    const rootA = find(A);
    const rootB = find(B);

    if (rootA === rootB) {
      return false;
    }

    if (size[rootA] < size[rootB]) {
      parent[rootA] = rootB;
      size[rootB] += size[rootA];
    } else {
      parent[rootB] = rootA;
      size[rootA] += size[rootB];
    }
    return true;
  };

  return { find, union };
}

export default function graphIsTree(
  num: number,
  edges: Array<[number, number]>,
): boolean {
  // Condition 1: The graph must contain num - 1 edges.
  if (edges.length !== num - 1) {
    return false;
  }

  // Condition 2: The graph must contain a single connected component.
  const { union } = createUnionFind(num);

  // Add each edge. Check if a merge happened, because if it didn't, there must be a cycle.
  for (const edge of edges) {
    const [A, B] = edge;
    if (!union(A, B)) {
      return false;
    }
  }

  // If we got this far, there are no cycles.
  return true;
}
