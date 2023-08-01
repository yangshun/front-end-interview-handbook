/**
 * @param {Function} func
 * @returns Function
 */
export default function memoize(func) {
  const cache = new Trie();

  return function (...args) {
    if (cache.has(args)) {
      return cache.get(args);
    }

    const result = func.apply(this, args);
    cache.set(args, result);

    return result;
  };
}

class TrieNode {
  constructor(value) {
    this._value = value;
    this._nodes = new Map();
  }

  getValue() {
    return this._value;
  }

  setValue(value) {
    this._value = value;
  }

  hasKey(nodeKey) {
    return this._nodes.has(nodeKey);
  }

  getNode(nodeKey) {
    return this._nodes.get(nodeKey);
  }

  addNode(nodeKey) {
    const newNode = new TrieNode();
    this._nodes.set(nodeKey, newNode);
    return newNode;
  }
}

class Trie {
  constructor() {
    this._rootNode = new TrieNode();
    this._hasValueForUndefined = false;
  }

  set(args, value) {
    if (args.length === 0) {
      if (this._hasValueForUndefined) {
        return this._rootNode.getValue();
      }

      this._hasValueForUndefined = true;
      this._rootNode.setValue(value);
      return;
    }

    let currNode = this._rootNode;
    for (const arg of args) {
      if (currNode.hasKey(arg)) {
        currNode = currNode.getNode(arg);
      } else {
        currNode = currNode.addNode(arg);
      }
    }

    currNode.setValue(value);
  }

  has(args) {
    if (args.length === 0) {
      return this._hasValueForUndefined;
    }

    let currNode = this._rootNode;
    for (const arg of args) {
      if (!currNode.hasKey(arg)) {
        return false;
      }
      currNode = currNode.getNode(arg);
    }

    return true;
  }

  get(args) {
    if (args.length === 0) {
      return this._rootNode.getValue();
    }

    let currNode = this._rootNode;
    for (const arg of args) {
      currNode = currNode.getNode(arg);
    }

    return currNode.getValue();
  }
}
