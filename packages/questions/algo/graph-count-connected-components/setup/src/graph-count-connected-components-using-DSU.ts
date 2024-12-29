function find(representative: number[], vertex: number): number {
  if (vertex === representative[vertex]) {
    return vertex;
  }
  // Path compression
  representative[vertex] = find(representative, representative[vertex]);
  return representative[vertex];
}

function combine(
  representative: number[],
  size: number[],
  vertex1: number,
  vertex2: number,
): number {
  // Find the root representatives of both vertices
  vertex1 = find(representative, vertex1);
  vertex2 = find(representative, vertex2);

  // If both vertices are already in the same set
  if (vertex1 === vertex2) {
    return 0; // No union occurred
  } else {
    // Union by size
    if (size[vertex1] > size[vertex2]) {
      size[vertex1] += size[vertex2];
      representative[vertex2] = vertex1;
    } else {
      size[vertex2] += size[vertex1];
      representative[vertex1] = vertex2;
    }
    return 1; // Union occurred
  }
}

export default function graphCountConnectedComponents(
  num: number,
  edges: Array<[number, number]>,
): number {
  // Initialize representative and size arrays
  const representative = new Array(num).fill(0).map((_, index) => index);
  const size = new Array(num).fill(1);

  // Initialize the number of components
  let components = num;

  // Process each edge and union the components
  for (const [u, v] of edges) {
    components -= combine(representative, size, u, v);
  }

  return components;
}
