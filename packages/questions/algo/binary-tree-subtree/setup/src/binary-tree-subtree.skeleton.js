/**
 * Definition for a binary tree node
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
 * Function to check if 'subRoot' is a subtree of 'root'
 * @param {TreeNode | null} root
 * @param {TreeNode | null} subRoot
 * @return {boolean}
 */
export default function binaryTreeSubtree(root, subRoot) {
  throw 'Not implemented!';
}
