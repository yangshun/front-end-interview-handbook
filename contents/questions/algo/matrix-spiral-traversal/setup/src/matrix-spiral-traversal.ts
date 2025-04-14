export default function matrixSpiralTraversal(matrix: number[][]): number[] {
  let result = [];
  const rows = matrix.length;
  const columns = matrix[0].length;
  let up = 0;
  let left = 0;
  let right = columns - 1;
  let down = rows - 1;

  // Continue until all elements are added to the result
  while (result.length < rows * columns) {
    // Traverse from left to right along the top row
    for (let col = left; col <= right; col++) {
      result.push(matrix[up][col]);
    }
    // Traverse downwards along the right column
    for (let row = up + 1; row <= down; row++) {
      result.push(matrix[row][right]);
    }
    // Make sure we are now on a different row to avoid reprocessing
    if (up != down) {
      // Traverse from right to left along the bottom row
      for (let col = right - 1; col >= left; col--) {
        result.push(matrix[down][col]);
      }
    }
    // Make sure we are now on a different column to avoid reprocessing
    if (left != right) {
      // Traverse upwards along the left column
      for (let row = down - 1; row > up; row--) {
        result.push(matrix[row][left]);
      }
    }
    // Move the boundaries inward
    left++;
    right--;
    up++;
    down--;
  }
  return result;
}
