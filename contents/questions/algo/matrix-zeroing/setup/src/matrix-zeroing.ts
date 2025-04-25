export default function matrixZeroing(matrix: number[][]): void {
  // Flag to indicate if the first column should be zeroed
  let isCol = false;
  const ROWS = matrix.length;
  const COLS = matrix[0].length;

  // Iterate through the matrix
  for (let i = 0; i < ROWS; i++) {
    // Check if the first column needs to be zeroed
    if (matrix[i][0] === 0) {
      isCol = true;
    }
    // Check each cell in the row starting from the second column
    for (let j = 1; j < COLS; j++) {
      if (matrix[i][j] === 0) {
        // Mark the corresponding row and column in the first row and column
        matrix[0][j] = 0;
        matrix[i][0] = 0;
      }
    }
  }

  // Use the markers to set zeroes in the matrix (excluding the first row and column)
  for (let i = 1; i < ROWS; i++) {
    for (let j = 1; j < COLS; j++) {
      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
        matrix[i][j] = 0;
      }
    }
  }

  // If the first cell of the matrix is zero, set the entire first row to zero
  if (matrix[0][0] === 0) {
    for (let j = 0; j < COLS; j++) {
      matrix[0][j] = 0;
    }
  }

  // If the first column needs to be zeroed, set the entire first column to zero
  if (isCol) {
    for (let i = 0; i < ROWS; i++) {
      matrix[i][0] = 0;
    }
  }
}
