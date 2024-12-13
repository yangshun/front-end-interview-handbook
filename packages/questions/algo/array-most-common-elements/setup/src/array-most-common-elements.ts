export default function mostCommonElements(
  numbers: number[],
  k: number,
): number[] {
  // If k equals the size of numbers, return numbers as the result since all elements are required
  if (k === numbers.length) {
    return numbers;
  }

  // Step 1: Create a hash map to count the frequency of each element in numbers
  const countMap = new Map<number, number>();
  numbers.forEach((k) => {
    countMap.set(k, (countMap.get(k) || 0) + 1);
  });

  // Step 2: Initialize a min-heap with a custom comparator to keep the most frequent elements
  const heap: number[] = [];
  const comp = (n1: number, n2: number) =>
    (countMap.get(n1) || 0) - (countMap.get(n2) || 0);

  // Step 3: Insert elements into the heap and maintain the size of the heap to k
  countMap.forEach((_, key) => {
    heap.push(key);
    heap.sort(comp); // Maintain heap order after insertion
    if (heap.length > k) heap.shift(); // Remove the least frequent element if heap exceeds size k
  });

  // Step 4: The heap now contains the k most frequent elements; return them as the result
  return heap;
}
