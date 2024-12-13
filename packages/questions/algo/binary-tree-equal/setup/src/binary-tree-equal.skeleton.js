/**
 * Definition for a binary tree node.
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
 * @param {TreeNode | null} a
 * @param {TreeNode | null} b
 * @return {boolean}
 */
export default function binaryTreeEqual(a, b) {
  throw 'Not implemented!';
}
