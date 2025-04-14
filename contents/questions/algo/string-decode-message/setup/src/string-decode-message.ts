export default function decodeMessage(str: string): number {
  // DP array to store the subproblem results
  const dp: number[] = new Array(str.length + 1).fill(0);

  // Base case: There's one way to decode an empty string
  dp[0] = 1;

  // Ways to decode a string of size 1 is 1, unless the string is '0'
  dp[1] = str[0] === '0' ? 0 : 1;

  // Iterate through the string to fill the DP array
  for (let i = 2; i <= str.length; i++) {
    // Check if successful single digit decode is possible
    if (str[i - 1] !== '0') {
      dp[i] += dp[i - 1];
    }

    // Check if successful two-digit decode is possible
    const twoDigit = parseInt(str.substring(i - 2, i), 10);
    if (twoDigit >= 10 && twoDigit <= 26) {
      dp[i] += dp[i - 2];
    }
  }

  // The last element in the DP array contains the number of ways to decode the entire string
  return dp[str.length];
}
