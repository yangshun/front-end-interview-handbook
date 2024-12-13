export default function longestCommonSubsequence(
  str1: string,
  str2: string,
): number {
  // Create a 2D array (grid) of zeros with dimensions (str1.length + 1) x (str2.length + 1)
  const dpGrid: number[][] = Array.from({ length: str1.length + 1 }, () =>
    Array(str2.length + 1).fill(0),
  );

  // Iterate through each column starting from the last one
  for (let col = str2.length - 1; col >= 0; col--) {
    for (let row = str1.length - 1; row >= 0; row--) {
      // If the characters at the current positions in both strings are the same
      if (str1[row] === str2[col]) {
        // Set the current cell to 1 plus the value from the diagonally next cell
        dpGrid[row][col] = 1 + dpGrid[row + 1][col + 1];
      } else {
        // Otherwise, take the maximum value from the cell directly below or the cell to the right
        dpGrid[row][col] = Math.max(dpGrid[row + 1][col], dpGrid[row][col + 1]);
      }
    }
  }

  // The answer to the problem is in the top-left cell of the grid
  return dpGrid[0][0];
}
