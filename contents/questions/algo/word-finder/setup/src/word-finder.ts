class TrieNode {
  // A map to hold child nodes
  children: Map<string, TrieNode> = new Map();
  // Indicates whether this node is the end of a word
  word: boolean = false;
}

export default class WordFinder {
  private trie: TrieNode;

  constructor() {
    // Initialize the root of the trie
    this.trie = new TrieNode();
  }

  addWord(word: string): void {
    let node = this.trie;

    for (const ch of word) {
      // If the character is not already a child node, add it
      if (!node.children.has(ch)) {
        node.children.set(ch, new TrieNode());
      }
      // Move to the next node in the trie
      node = node.children.get(ch)!;
    }
    // Mark the end of the word
    node.word = true;
  }

  private searchInNode(word: string, node: TrieNode): boolean {
    for (let i = 0; i < word.length; i++) {
      const ch = word[i];
      // If the character is not found, check if it's a '.'
      if (!node.children.has(ch)) {
        if (ch === '.') {
          // Iterate over all children nodes using forEach
          let found = false;
          node.children.forEach((child) => {
            // Recursively search for the remaining substring in each child node
            if (this.searchInNode(word.substring(i + 1), child)) {
              found = true;
            }
          });
          return found;
        }
        // If the character is not a '.' and not found, return false
        return false;
      } else {
        // If the character is found, move down to the next level in the trie
        node = node.children.get(ch)!;
      }
    }
    // Return true if the current node marks the end of a word
    return node.word;
  }

  search(word: string): boolean {
    return this.searchInNode(word, this.trie);
  }
}
