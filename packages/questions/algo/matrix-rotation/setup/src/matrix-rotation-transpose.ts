export default function matrixRotation(matrix: number[][]): void {
  // Get the number of rows (or columns) of the matrix
  const n = matrix.length;

  // Step 1: Transpose the matrix
  // Transposing involves swapping matrix[i][j] with matrix[j][i]
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }

  // Step 2: Reflect the matrix horizontally
  // Reflecting involves swapping elements in each row, from the start to the middle
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n / 2; j++) {
      [matrix[i][j], matrix[i][n - 1 - j]] = [
        matrix[i][n - 1 - j],
        matrix[i][j],
      ];
    }
  }
}
