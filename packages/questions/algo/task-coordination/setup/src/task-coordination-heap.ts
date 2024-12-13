export default function leastInterval(tasks: string[], n: number): number {
  // Building frequency map
  const freq: number[] = new Array(26).fill(0);
  for (const ch of tasks) {
    freq[ch.charCodeAt(0) - 'A'.charCodeAt(0)]++;
  }

  // Max heap to store frequencies
  const pq: number[] = [];

  // Helper function to maintain the max heap property
  function heapPush(value: number) {
    pq.push(value);
    let index = pq.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (pq[index] > pq[parentIndex]) {
        [pq[index], pq[parentIndex]] = [pq[parentIndex], pq[index]];
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  // Populate the max heap with frequencies
  for (const count of freq) {
    if (count > 0) {
      heapPush(count);
    }
  }

  let time = 0;
  // Process tasks until the heap is empty
  while (pq.length > 0) {
    let cycle = n + 1;
    const store: number[] = [];
    let taskCount = 0;

    // Execute tasks in each cycle
    while (cycle-- > 0 && pq.length > 0) {
      const top = pq[0];
      if (top > 1) {
        store.push(top - 1);
      }
      pq.shift(); // Remove the top element from the heap
      taskCount++;
    }

    // Restore updated frequencies to the heap
    for (const x of store) {
      heapPush(x);
    }

    // Add time for the completed cycle
    time += pq.length === 0 ? taskCount : n + 1;
  }

  return time;
}
