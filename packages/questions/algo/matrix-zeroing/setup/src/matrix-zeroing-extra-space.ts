export default function matrixZeroing(matrix: number[][]): void {
  const rows = new Set<number>(); // Set to keep track of rows that need to be zeroed
  const cols = new Set<number>(); // Set to keep track of columns that need to be zeroed

  // First pass: Identify all rows and columns that contain a zero
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === 0) {
        rows.add(i); // Mark this row for zeroing
        cols.add(j); // Mark this column for zeroing
      }
    }
  }

  // Second pass: Update the matrix based on identified rows and columns
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (rows.has(i) || cols.has(j)) {
        matrix[i][j] = 0; // Set element to zero if its row or column is marked
      }
    }
  }
}
