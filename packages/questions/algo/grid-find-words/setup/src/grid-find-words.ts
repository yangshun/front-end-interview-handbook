class TrieNode {
  // Map to hold child nodes
  children: Map<string, TrieNode> = new Map();
  // To store the word at the end of the Trie path
  word: string = '';

  constructor() {}
}

// Helper function to perform backtracking on the grid
function backtracking(
  row: number,
  col: number,
  board: string[][],
  parent: TrieNode,
  result: string[],
) {
  const letter = board[row][col];
  const currNode = parent.children.get(letter)!;

  // Check if the current node represents a word
  if (currNode.word !== '') {
    result.push(currNode.word);
    currNode.word = ''; // Prevent duplicate entries
  }

  // Mark the current cell as visited
  board[row][col] = '#';

  // Explore neighboring cells: up, right, down, left
  const rowOffset = [-1, 0, 1, 0];
  const colOffset = [0, 1, 0, -1];
  for (let i = 0; i < 4; i++) {
    const newRow = row + rowOffset[i];
    const newCol = col + colOffset[i];
    if (
      newRow < 0 ||
      newRow >= board.length ||
      newCol < 0 ||
      newCol >= board[0].length
    ) {
      continue;
    }
    if (currNode.children.has(board[newRow][newCol])) {
      backtracking(newRow, newCol, board, currNode, result);
    }
  }

  // Restore the original letter in the board
  board[row][col] = letter;

  // Optimization: remove leaf nodes
  if (currNode.children.size === 0) {
    parent.children.delete(letter);
  }
}

// Main function to find words in the grid
export default function findWordsInGrid(
  grid: string[][],
  words: string[],
): string[] {
  // Step 1: Construct the Trie
  const root = new TrieNode();
  for (const word of words) {
    let node = root;
    for (const letter of word) {
      if (!node.children.has(letter)) {
        node.children.set(letter, new TrieNode());
      }
      node = node.children.get(letter)!;
    }
    node.word = word; // Store words in Trie
  }

  const result: string[] = [];

  // Step 2: Backtracking starting from each cell in the grid
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (root.children.has(grid[row][col])) {
        backtracking(row, col, grid, root, result);
      }
    }
  }

  return result;
}
