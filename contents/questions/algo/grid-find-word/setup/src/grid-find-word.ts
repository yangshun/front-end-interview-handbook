export default function exist(grid: string[][], target: string): boolean {
  const rows = grid.length; // Number of rows in the grid
  const cols = grid[0].length; // Number of columns in the grid

  function backtrack(row: number, col: number, suffix: string): boolean {
    // Step 1: Check if we've matched the entire target word
    if (suffix.length === 0) {
      return true;
    }

    // Step 2: Check the boundaries and if the current cell matches the first character of the suffix
    if (
      row < 0 || // Out of bounds (top)
      row === rows || // Out of bounds (bottom)
      col < 0 || // Out of bounds (left)
      col === cols || // Out of bounds (right)
      grid[row][col] !== suffix.charAt(0) // Current cell doesn't match the suffix character
    ) {
      return false;
    }

    // Step 3: Explore the neighbors in DFS
    let ret = false;
    // Mark the path before the next exploration
    const temp = grid[row][col];
    grid[row][col] = '#'; // Mark the current cell as visited

    const directions = [
      [0, 1], // Move right
      [1, 0], // Move down
      [0, -1], // Move left
      [-1, 0], // Move up
    ];

    // Explore all possible directions
    for (let [rowOffset, colOffset] of directions) {
      ret = backtrack(row + rowOffset, col + colOffset, suffix.slice(1)); // Recursively check the next cell
      if (ret) break; // If found, break out of the loop
    }

    // Step 4: Clean up and return the result
    grid[row][col] = temp; // Restore the current cell's value
    return ret; // Return whether we found the target word
  }

  // Iterate through each cell in the grid
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (backtrack(row, col, target)) return true; // Start backtracking from each cell
    }
  }
  return false; // If no match is found, return false
}
