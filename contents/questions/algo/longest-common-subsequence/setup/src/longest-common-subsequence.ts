// Initialize a 2D array for memoization
const dp: number[][] = Array.from({ length: 1001 }, () => Array(1001).fill(-1));

// Recursive function to find the length of the longest common subsequence
function lcs(
  str1: string,
  str2: string,
  index1: number,
  index2: number,
): number {
  // Check if the result is already computed
  if (dp[index1][index2] !== -1) {
    return dp[index1][index2];
  }

  // Base case: if any string is exhausted, return 0
  if (index1 === str1.length || index2 === str2.length) {
    return 0;
  }

  // If characters match, move both indices and add 1 to the result
  if (str1[index1] === str2[index2]) {
    dp[index1][index2] = 1 + lcs(str1, str2, index1 + 1, index2 + 1);
  } else {
    // If characters don't match, find the max between skipping one character in either string
    dp[index1][index2] = Math.max(
      lcs(str1, str2, index1 + 1, index2),
      lcs(str1, str2, index1, index2 + 1),
    );
  }

  return dp[index1][index2];
}

export default function longestCommonSubsequence(
  str1: string,
  str2: string,
): number {
  // Initialize the dp array with -1
  for (let i = 0; i <= 1000; i++) {
    for (let j = 0; j <= 1000; j++) {
      dp[i][j] = -1;
    }
  }
  // Start the recursion
  return lcs(str1, str2, 0, 0);
}
