export default function matrixRotation(matrix: number[][]): void {
  // Get the number of rows (or columns) of the matrix
  let n = matrix.length;

  // Loop through each layer of the matrix
  // The outer loop goes over each "layer" from the outside towards the center
  for (let i = 0; i < Math.floor((n + 1) / 2); i++) {
    // The inner loop goes over each element in the layer
    for (let j = 0; j < Math.floor(n / 2); j++) {
      // Store the value of the top-left element temporarily
      let temp = matrix[n - 1 - j][i];

      // Move the bottom-left element to the top-left
      matrix[n - 1 - j][i] = matrix[n - 1 - i][n - j - 1];

      // Move the bottom-right element to the bottom-left
      matrix[n - 1 - i][n - j - 1] = matrix[j][n - 1 - i];

      // Move the top-right element to the bottom-right
      matrix[j][n - 1 - i] = matrix[i][j];

      // Move the stored top-left element to the top-right
      matrix[i][j] = temp;
    }
  }
}
