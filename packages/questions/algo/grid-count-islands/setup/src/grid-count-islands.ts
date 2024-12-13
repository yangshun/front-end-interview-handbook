// Helper function for Depth-First Search (DFS)
function dfs(grid: number[][], row: number, col: number): void {
  // Get the number of rows and columns
  const rows = grid.length;
  const cols = grid[0].length;

  // Mark the current cell as visited by setting it to 0
  grid[row][col] = 0;

  // Check and visit the cell above the current cell
  if (row - 1 >= 0 && grid[row - 1][col] === 1) {
    dfs(grid, row - 1, col);
  }

  // Check and visit the cell below the current cell
  if (row + 1 < rows && grid[row + 1][col] === 1) {
    dfs(grid, row + 1, col);
  }

  // Check and visit the cell to the left of the current cell
  if (col - 1 >= 0 && grid[row][col - 1] === 1) {
    dfs(grid, row, col - 1);
  }

  // Check and visit the cell to the right of the current cell
  if (col + 1 < cols && grid[row][col + 1] === 1) {
    dfs(grid, row, col + 1);
  }
}

// Main function to count the number of islands
export default function countGridIslands(grid: number[][]): number {
  const rows = grid.length; // Get the number of rows
  if (rows === 0) {
    return 0; // If grid is empty, return 0
  }

  const cols = grid[0].length; // Get the number of columns

  let numIslands = 0; // Initialize island count

  // Iterate through each cell in the grid
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // If the cell is land ('1'), it's part of an island
      if (grid[row][col] === 1) {
        ++numIslands; // Increment island count
        dfs(grid, row, col); // Perform DFS to mark the entire island
      }
    }
  }

  return numIslands; // Return the total number of islands
}
