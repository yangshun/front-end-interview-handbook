const DIRECTIONS: number[][] = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];

export default function oceanFlow(matrix: number[][]): number[][] {
  // Check if input is empty
  if (matrix.length === 0 || matrix[0].length === 0) {
    return [];
  }

  const numRows = matrix.length;
  const numCols = matrix[0].length;

  function dfs(row: number, col: number, reachable: boolean[][]): void {
    // This cell is reachable, so mark it
    reachable[row][col] = true;
    for (const dir of DIRECTIONS) {
      // Check all 4 directions
      const newRow = row + dir[0];
      const newCol = col + dir[1];
      // Check if new cell is within bounds
      if (newRow < 0 || newRow >= numRows || newCol < 0 || newCol >= numCols) {
        continue;
      }
      // Check that the new cell hasn't already been visited
      if (reachable[newRow][newCol]) {
        continue;
      }
      // Check that the new cell has a higher or equal height,
      // So that water can flow from the new cell to the old cell
      if (matrix[newRow][newCol] < matrix[row][col]) {
        continue;
      }
      // If we've gotten this far, that means the new cell is reachable
      dfs(newRow, newCol, reachable);
    }
  }

  const oceanTopLeftReachable: boolean[][] = Array.from(Array(numRows), () =>
    Array(numCols).fill(false),
  );
  const oceanBottomRightReachable: boolean[][] = Array.from(
    Array(numRows),
    () => Array(numCols).fill(false),
  );

  // Explore each cell adjacent to the oceans and start a DFS
  for (let row = 0; row < numRows; row++) {
    dfs(row, 0, oceanTopLeftReachable); // Left edge
    dfs(row, numCols - 1, oceanBottomRightReachable); // Right edge
  }

  for (let col = 0; col < numCols; col++) {
    dfs(0, col, oceanTopLeftReachable); // Top edge
    dfs(numRows - 1, col, oceanBottomRightReachable); // Bottom edge
  }

  // Find all cells that can reach both oceans
  const commonCells: number[][] = [];

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if (
        oceanTopLeftReachable[row][col] &&
        oceanBottomRightReachable[row][col]
      ) {
        commonCells.push([row, col]);
      }
    }
  }

  return commonCells;
}
