export default function longestCommonSubsequence(
  str1: string,
  str2: string,
): number {
  // Create two rows for DP, initialized with zeros
  let currentRow: number[] = Array(str2.length + 1).fill(0);
  let nextRow: number[] = Array(str2.length + 1).fill(0);

  // Iterate through str1 from bottom to top
  for (let row = str1.length - 1; row >= 0; row--) {
    // Swap rows: `currentRow` becomes `nextRow`, and vice versa
    [currentRow, nextRow] = [nextRow, currentRow];

    // Iterate through str2 from right to left
    for (let col = str2.length - 1; col >= 0; col--) {
      if (str1[row] === str2[col]) {
        // If characters match, take 1 + diagonal value from `nextRow`
        currentRow[col] = 1 + nextRow[col + 1];
      } else {
        // Otherwise, take max of right or below values
        currentRow[col] = Math.max(nextRow[col], currentRow[col + 1]);
      }
    }
  }

  // The result is stored in `currentRow[0]` after the final iteration
  return currentRow[0];
}
