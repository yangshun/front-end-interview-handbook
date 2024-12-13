/**
 * // Definition for a binary tree node.
 * @param {number} val
 * @param {TreeNode | null} left
 * @param {TreeNode | null} right
 */
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * Function to find the k-th smallest element in a binary search tree
 * @param {TreeNode | null} root
 * @param {number} k
 * @return {number}
 */
export default function kthSmallestElementInABst(root, k) {
  throw 'Not implemented!';
}
