export default function gridDistinctPaths(m: number, n: number): number {
  // Create a memoization table to store previously calculated results (optional for top-down approach)
  const memo = new Array(m).fill(null).map(() => new Array(n).fill(null));

  // Recursive helper function to calculate the number of paths from a specific cell
  function helper(row: number, col: number): number {
    // Base cases:
    if (row === m - 1 && col === n - 1) return 1; // Reached the destination (bottom-right) - 1 path
    if (row >= m || col >= n) return 0; // Outside the grid - no paths possible

    // Check if the value has already been calculated and stored in the memo table
    if (memo[row][col] !== null) {
      return memo[row][col];
    }

    // Calculate the number of paths by combining paths from below and to the right
    const pathsDown = helper(row + 1, col);
    const pathsRight = helper(row, col + 1);

    // Memoize the result for future use
    memo[row][col] = pathsDown + pathsRight;

    return memo[row][col];
  }

  // Call the helper function to start from the top-left corner
  return helper(0, 0);
}
