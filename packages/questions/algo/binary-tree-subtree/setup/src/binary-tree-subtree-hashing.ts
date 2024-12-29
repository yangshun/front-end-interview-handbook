interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

// Constants for hashing
const MOD_1 = 1000000007;
const MOD_2 = 2147483647;

// Vector to store hashed values of each node
let memo: Array<[number, number]> = [];

function hashSubtreeAtNode(
  node: TreeNode | null,
  needToAdd: boolean,
): [number, number] {
  if (node === null) {
    return [3, 7]; // Base case for null nodes
  }

  // Recursively hash the left and right subtrees
  const left = hashSubtreeAtNode(node.left, needToAdd);
  const right = hashSubtreeAtNode(node.right, needToAdd);

  // Compute the hash values for the current node
  const left1 = (left[0] << 5) % MOD_1;
  const right1 = (right[0] << 1) % MOD_1;
  const left2 = (left[1] << 7) % MOD_2;
  const right2 = (right[1] << 1) % MOD_2;

  const hashpair: [number, number] = [
    (left1 + right1 + node.val) % MOD_1,
    (left2 + right2 + node.val) % MOD_2,
  ];

  // If `needToAdd` is true, add the hashpair to the memo array
  if (needToAdd) {
    memo.push(hashpair);
  }

  return hashpair;
}

export default function binaryTreeSubtree(
  root: TreeNode | null,
  subRoot: TreeNode | null,
): boolean {
  // Clear the memo array before starting
  memo = [];

  // Hash the entire tree rooted at `root` and store the hashes
  hashSubtreeAtNode(root, true);

  // Hash the tree rooted at `subRoot` without storing the hash
  const s = hashSubtreeAtNode(subRoot, false);

  // Check if the hash of `subRoot` exists in the memo array
  return memo.some((hash) => hash[0] === s[0] && hash[1] === s[1]);
}
