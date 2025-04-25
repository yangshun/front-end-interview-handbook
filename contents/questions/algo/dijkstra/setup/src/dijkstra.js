/**
 * MinHeap: A minimum heap implementation to serve as a priority queue.
 * Each heap element is an object of the form { vertex, weight }.
 */
class MinHeap {
  constructor() {
    this.heap = [];
    this.position = {}; // Maps each vertex to its index in the heap.
  }

  // Helper method to swap two elements and update their positions.
  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    this.position[this.heap[i].vertex] = i;
    this.position[this.heap[j].vertex] = j;
  }

  // Bubbles up the element at index i to restore heap property.
  percolateUp(i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.heap[parent].weight > this.heap[i].weight) {
        this.swap(i, parent);
        i = parent;
      } else {
        break;
      }
    }
  }

  // Bubbles down the element at index i to restore heap property.
  percolateDown(i) {
    const n = this.heap.length;
    while (true) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      let smallest = i;

      if (left < n && this.heap[left].weight < this.heap[smallest].weight) {
        smallest = left;
      }
      if (right < n && this.heap[right].weight < this.heap[smallest].weight) {
        smallest = right;
      }
      if (smallest !== i) {
        this.swap(i, smallest);
        i = smallest;
      } else {
        break;
      }
    }
  }

  /**
   * Inserts a new item into the heap or updates it if it already exists.
   * @param {{vertex: string, weight: number}} item The item to insert or update.
   */
  insert(item) {
    // If the vertex exists, perform a decrease-key operation.
    if (this.position.hasOwnProperty(item.vertex)) {
      const i = this.position[item.vertex];
      if (item.weight < this.heap[i].weight) {
        this.heap[i].weight = item.weight;
        this.percolateUp(i);
      }
      return;
    }
    // Otherwise, add it as a new item.
    this.heap.push(item);
    const idx = this.heap.length - 1;
    this.position[item.vertex] = idx;
    this.percolateUp(idx);
  }

  /**
   * Removes and returns the minimum element (the root) from the heap.
   * @return {{vertex: string, weight: number}|undefined} The removed element.
   */
  delete() {
    if (this.heap.length === 0) return undefined;
    const min = this.heap[0];
    const last = this.heap.pop();
    // Remove mapping for the vertex being removed.
    delete this.position[min.vertex];
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.position[last.vertex] = 0;
      this.percolateDown(0);
    }
    return min;
  }

  /**
   * Checks if the heap is empty.
   * @return {boolean} True if the heap is empty; otherwise, false.
   */
  isEmpty() {
    return this.heap.length === 0;
  }

  /**
   * Returns the minimum element of the heap without removing it.
   * @return {{vertex: string, weight: number}|undefined}
   */
  findMin() {
    return this.heap.length > 0 ? this.heap[0] : undefined;
  }
}

/**
 * Executes Dijkstra's algorithm to find the shortest paths from a source node
 * in a weighted graph.
 *
 * @param {Record<string, Record<string, number>>} graph - The adjacency list representing the graph with weights.
 * @param {string} source - The source node from which to calculate shortest paths.
 * @return {Record<string, number>} - A dictionary where keys are node labels and values represent the shortest distances from the source node.
 */
export default function dijkstra(graph, source) {
  const distances = {};
  const minHeap = new MinHeap();

  // Initialize distances for every vertex.
  for (const vertex in graph) {
    // Set the source distance to 0 and all others to Infinity.
    distances[vertex] = vertex === source ? 0 : Infinity;
    // Insert the source with weight 0.
    // Optionally, we can insert only the source and then add vertices as needed.
    minHeap.insert({ vertex, weight: distances[vertex] });
  }

  const visited = new Set();

  while (!minHeap.isEmpty()) {
    // Extract the vertex with the smallest tentative distance.
    const { vertex: u, weight } = minHeap.delete();
    if (visited.has(u)) continue;
    visited.add(u);

    // For each neighbor of u, try to update its distance.
    for (const neighbor in graph[u]) {
      const newDist = distances[u] + graph[u][neighbor];
      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        minHeap.insert({ vertex: neighbor, weight: newDist });
      }
    }
  }

  return distances;
}
