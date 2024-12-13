export default function gridDistinctPaths(m: number, n: number): number {
  // Create a 2D DP table (d) to store the number of unique paths reaching each cell.
  // Initialize all cells to 1, representing 1 path (straight down or right from the top/left edge).
  const d = new Array(m).fill(0).map(() => new Array(n).fill(1));

  // Iterate through the table (excluding the first row and column since they already have 1 path).
  for (let col = 1; col < m; col++) {
    for (let row = 1; row < n; row++) {
      // The number of unique paths reaching this cell (col, row) is the sum of:
      //   - Paths reaching the cell above (col-1, row) - only one possible move (down).
      //   - Paths reaching the cell to the left (col, row-1) - only one possible move (right).
      d[col][row] = d[col - 1][row] + d[col][row - 1];
    }
  }

  // The final element (d[m-1][n-1]) represents the total number of unique paths reaching the bottom-right corner.
  return d[m - 1][n - 1];
}
