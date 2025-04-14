class TrieNode {
  // Array to hold child nodes
  private links: TrieNode[] = [];
  private static readonly NUM_ALPHABETS = 26; // Number of possible links (a-z)
  private isEnd: boolean = false; // Indicates if this node is the end of a word

  constructor() {
    this.links = new Array(TrieNode.NUM_ALPHABETS); // Initialize the array with 26 slots
  }

  // Check if a child node for the given character exists
  public containsKey(ch: string): boolean {
    return this.links[ch.charCodeAt(0) - 'a'.charCodeAt(0)] !== undefined;
  }

  // Get the child node for the given character
  public get(ch: string): TrieNode | undefined {
    return this.links[ch.charCodeAt(0) - 'a'.charCodeAt(0)];
  }

  // Put a child node for the given character
  public put(ch: string, node: TrieNode): void {
    this.links[ch.charCodeAt(0) - 'a'.charCodeAt(0)] = node;
  }

  // Set this node as the end of a word
  public setEnd(): void {
    this.isEnd = true;
  }

  // Check if this node is the end of a word
  public isEndNode(): boolean {
    return this.isEnd;
  }
}

export default class Trie {
  private root: TrieNode = new TrieNode();

  constructor() {
    this.root = new TrieNode();
  }

  // Inserts a word into the trie
  public insert(word: string): void {
    let node: TrieNode = this.root;

    for (let i = 0; i < word.length; i++) {
      const currentChar: string = word.charAt(i);
      if (!node.containsKey(currentChar)) {
        node.put(currentChar, new TrieNode());
      }
      node = node.get(currentChar)!; // Non-null assertion since containsKey checks existence
    }

    node.setEnd();
  }

  // Search for the prefix or whole key in the trie
  private searchPrefix(word: string): TrieNode | null {
    let node: TrieNode = this.root;
    for (let i = 0; i < word.length; i++) {
      const curLetter: string = word.charAt(i);
      if (node.containsKey(curLetter)) {
        node = node.get(curLetter)!; // Non-null assertion since containsKey checks existence
      } else {
        return null;
      }
    }
    return node;
  }

  // Returns if the word is in the trie
  public search(word: string): boolean {
    const node: TrieNode | null = this.searchPrefix(word);
    return node !== null && node.isEndNode();
  }

  // Returns if there is any word in the trie that starts with the given prefix
  public startsWith(prefix: string): boolean {
    const node: TrieNode | null = this.searchPrefix(prefix);
    return node !== null;
  }
}
