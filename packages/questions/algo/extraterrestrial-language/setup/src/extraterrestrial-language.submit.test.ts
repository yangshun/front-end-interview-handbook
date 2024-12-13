import extraterrestrialLanguage from './extraterrestrial-language';
import submitTestCases from './submit.tests.json';

type AdjacencyList = { [key: string]: string[] };

function createGraph(words: string[]): AdjacencyList {
  const adjList: AdjacencyList = {};

  // Initialize the adjacency list with empty arrays for each unique character
  for (const word of words) {
    for (const c of word) {
      if (!adjList[c]) {
        adjList[c] = [];
      }
    }
  }

  // Step 1: Find all edges.
  for (let i = 0; i < words.length - 1; i++) {
    const word1 = words[i];
    const word2 = words[i + 1];

    // Find the first non-match and insert the corresponding relation.
    for (let j = 0; j < Math.min(word1.length, word2.length); j++) {
      if (word1[j] !== word2[j]) {
        adjList[word1[j]].push(word2[j]);
        break;
      }
    }
  }

  return adjList;
}

function isValidTopologicalSort(
  adjList: AdjacencyList,
  topologicalOrder: string,
): boolean {
  // Map to store the position of each character in the given topological order
  const position: { [key: string]: number } = {};
  for (let i = 0; i < topologicalOrder.length; i++) {
    position[topologicalOrder[i]] = i;
  }

  // Iterate over each node and its adjacency list
  for (const node in adjList) {
    const neighbors = adjList[node];

    // Ensure that for each neighbor, the current node appears before it in the topological order
    for (const neighbor of neighbors) {
      if (position[node] > position[neighbor]) {
        return false; // The topological order is invalid
      }
    }
  }

  return true; // The topological order is valid
}

function arePermutations(str1: string, str2: string): boolean {
  // If the lengths of the strings are different, they cannot be permutations
  if (str1.length !== str2.length) {
    return false;
  }

  // Create a frequency map for characters in str1
  const charCount: { [key: string]: number } = {};

  // Count characters in str1
  for (const char of str1) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  // Decrease the count based on characters in str2
  for (const char of str2) {
    if (!charCount[char]) {
      // If a character in str2 is not found in charCount, they are not permutations
      return false;
    }
    charCount[char] -= 1;
  }

  // If all counts are zero, the strings are permutations of each other
  return Object.values(charCount).every((count) => count === 0);
}

describe('extraterrestrialLanguage', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`${example.input[0][0]} = ${JSON.stringify(
      example.input[0][1],
      null,
      2,
    )}`, () => {
      const output = extraterrestrialLanguage(example.input[0][1]);
      if (output === '') {
        expect(output).toStrictEqual(example.output);
      } else {
        const graph = createGraph(example.input[0][1]);
        const isValid = isValidTopologicalSort(graph, output);
        expect(arePermutations(output, example.output)).toBe(true);
        expect(isValid).toBe(true);
      }
    });
  });
});
