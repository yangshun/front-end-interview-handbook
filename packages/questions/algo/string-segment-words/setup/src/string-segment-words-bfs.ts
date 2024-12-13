export default function segmentWords(str: string, dict: string[]): boolean {
  // Convert dict to a set for O(1) average time complexity lookups
  const words = new Set(dict);

  // Check for empty string as a base case
  if (str.length === 0) return true;

  // Initialize variables
  const queue: number[] = [0];
  const seen = new Set<number>();

  // Breadth-first search loop
  while (queue.length !== 0) {
    // Check if queue is empty before dequeueing
    if (queue.length === 0) return false; // String cannot be formed from words

    const start = queue.shift()!; // Use non-null assertion after the check

    // If we reached the end of the string, return true
    if (start === str.length) return true;

    // Iterate over all possible end indices from start + 1 to end of string
    for (let end = start + 1; end <= str.length; end++) {
      // Skip already processed end indices
      if (seen.has(end)) continue;

      // Check if substring from start to end exists in dict
      if (words.has(str.substring(start, end))) {
        // If found, enqueue the end index and mark as visited
        queue.push(end);
        seen.add(end);
      }
    }
  }

  // If no segmentation found, return false
  return false;
}
