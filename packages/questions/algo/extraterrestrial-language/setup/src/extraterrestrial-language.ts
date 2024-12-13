export default function extraterrestrialLanguage(words: string[]): string {
  // Step 0: Create data structures and find all unique letters.
  const adjList: { [key: string]: string[] } = {};
  const counts: { [key: string]: number } = {};

  // Initialize the adjacency list and the counts map
  for (const word of words) {
    for (const c of word) {
      if (!counts[c]) {
        counts[c] = 0;
        adjList[c] = [];
      }
    }
  }

  // Step 1: Find all edges.
  for (let i = 0; i < words.length - 1; i++) {
    const word1 = words[i];
    const word2 = words[i + 1];

    // Check that word2 is not a prefix of word1.
    if (word1.length > word2.length && word1.startsWith(word2)) {
      return '';
    }

    // Find the first non-match and insert the corresponding relation.
    for (let j = 0; j < Math.min(word1.length, word2.length); j++) {
      if (word1[j] !== word2[j]) {
        adjList[word1[j]].push(word2[j]);
        counts[word2[j]]++;
        break;
      }
    }
  }

  // Step 2: Breadth-first search.
  const sb: string[] = [];
  const queue: string[] = [];

  // Enqueue characters with no incoming edges (counts[c] === 0)
  for (const c in counts) {
    if (counts[c] === 0) {
      queue.push(c);
    }
  }

  // Perform BFS to build the result string
  while (queue.length > 0) {
    const c = queue.shift()!;
    sb.push(c);
    for (const next of adjList[c]) {
      counts[next]--;
      if (counts[next] === 0) {
        queue.push(next);
      }
    }
  }

  // If the result length is less than the number of unique characters, return an empty string
  if (sb.length < Object.keys(counts).length) {
    return '';
  }

  return sb.join('');
}
