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

  function bfs(queue: number[][]): boolean[][] {
    const reachable: boolean[][] = Array.from({ length: numRows }, () =>
      Array(numCols).fill(false),
    );
    while (queue.length > 0) {
      const cell = queue.shift() as number[];
      // This cell is reachable, so mark it
      reachable[cell[0]][cell[1]] = true;
      for (const dir of DIRECTIONS) {
        // Check all 4 directions
        const newRow = cell[0] + dir[0];
        const newCol = cell[1] + dir[1];
        // Check if new cell is within bounds
        if (
          newRow < 0 ||
          newRow >= numRows ||
          newCol < 0 ||
          newCol >= numCols
        ) {
          continue;
        }
        // Check that the new cell hasn't already been visited
        if (reachable[newRow][newCol]) {
          continue;
        }
        // Check that the new cell has a higher or equal height,
        // So that water can flow from the new cell to the old cell
        if (matrix[newRow][newCol] < matrix[cell[0]][cell[1]]) {
          continue;
        }
        // If we've gotten this far, that means the new cell is reachable
        queue.push([newRow, newCol]);
      }
    }
    return reachable;
  }

  // Setup each queue with cells adjacent to their respective ocean
  const oceanTopLeftQueue: number[][] = [];
  const oceanBottomRightQueue: number[][] = [];

  for (let row = 0; row < numRows; row++) {
    oceanTopLeftQueue.push([row, 0]); // Left edge
    oceanBottomRightQueue.push([row, numCols - 1]); // Right edge
  }

  for (let col = 0; col < numCols; col++) {
    oceanTopLeftQueue.push([0, col]); // Top edge
    oceanBottomRightQueue.push([numRows - 1, col]); // Bottom edge
  }

  // Perform a BFS for each ocean to find all cells accessible by each ocean
  const oceanTopLeftReachable = bfs(oceanTopLeftQueue);
  const oceanBottomRightReachable = bfs(oceanBottomRightQueue);

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
